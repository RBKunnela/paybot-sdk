"""Tests for opt-in telemetry. Mirrors tests/telemetry.test.ts.

Verifies the no-op path (zero overhead), span lifecycle on success/error, and
attribute attachment — using a fake structural tracer (no OpenTelemetry dep).
"""
from __future__ import annotations

from typing import Any, Dict, List

import pytest

from paybot_sdk.telemetry import (
    STATUS_ERROR,
    STATUS_OK,
    PayBotSpan,
    PayBotTracer,
    TelemetryConfig,
    with_span,
)


class FakeSpan:
    """Records every method call so tests can assert the lifecycle."""

    def __init__(self, name: str) -> None:
        self.name = name
        self.attributes: Dict[str, Any] = {}
        self.statuses: List[Dict[str, Any]] = []
        self.exceptions: List[Any] = []
        self.ended = False

    def set_attribute(self, key: str, value: Any) -> None:
        self.attributes[key] = value

    def set_status(self, status: Dict[str, Any]) -> None:
        self.statuses.append(status)

    def record_exception(self, err: Any) -> None:
        self.exceptions.append(err)

    def end(self) -> None:
        self.ended = True


class FakeTracer:
    def __init__(self) -> None:
        self.spans: List[FakeSpan] = []

    def start_span(self, name: str, options: Any = None) -> FakeSpan:
        span = FakeSpan(name)
        self.spans.append(span)
        return span


def test_fake_tracer_is_structurally_a_paybot_tracer():
    assert isinstance(FakeTracer(), PayBotTracer)
    assert isinstance(FakeSpan("x"), PayBotSpan)


# ── no-op path ────────────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_noop_path_runs_fn_with_none_span():
    seen = {}

    async def body(span):
        seen["span"] = span
        return 42

    result = await with_span(None, "client.pay", {"a": 1}, body)
    assert result == 42
    assert seen["span"] is None  # no span allocated


@pytest.mark.asyncio
async def test_noop_path_propagates_exceptions():
    async def body(span):
        raise ValueError("boom")

    with pytest.raises(ValueError, match="boom"):
        await with_span(None, "x", {}, body)


# ── configured path: success ─────────────────────────────────────────────


@pytest.mark.asyncio
async def test_success_sets_ok_status_and_ends():
    tracer = FakeTracer()
    cfg = TelemetryConfig(tracer=tracer)

    async def body(span):
        span.set_attribute("late", "yes")
        return "done"

    result = await with_span(cfg, "client.pay", {"network": "eip155:8453"}, body)
    assert result == "done"
    span = tracer.spans[0]
    assert span.name == "paybot.client.pay"  # default prefix applied
    assert span.attributes["network"] == "eip155:8453"
    assert span.attributes["late"] == "yes"
    assert span.statuses == [{"code": STATUS_OK}]
    assert span.exceptions == []
    assert span.ended is True


@pytest.mark.asyncio
async def test_custom_prefix_is_applied():
    tracer = FakeTracer()
    cfg = TelemetryConfig(tracer=tracer, prefix="myco.")

    async def body(span):
        return None

    await with_span(cfg, "x402.sign", {}, body)
    assert tracer.spans[0].name == "myco.x402.sign"


@pytest.mark.asyncio
async def test_failure_object_still_ok_span():
    # A returned "failure" object is NOT an exception → span stays OK.
    tracer = FakeTracer()
    cfg = TelemetryConfig(tracer=tracer)

    async def body(span):
        return {"success": False}

    result = await with_span(cfg, "client.pay", {}, body)
    assert result == {"success": False}
    assert tracer.spans[0].statuses == [{"code": STATUS_OK}]


# ── configured path: error ───────────────────────────────────────────────


@pytest.mark.asyncio
async def test_error_records_exception_sets_error_status_and_ends_then_reraises():
    tracer = FakeTracer()
    cfg = TelemetryConfig(tracer=tracer)

    async def body(span):
        raise RuntimeError("kaboom")

    with pytest.raises(RuntimeError, match="kaboom"):
        await with_span(cfg, "client.pay", {}, body)

    span = tracer.spans[0]
    assert len(span.exceptions) == 1
    assert isinstance(span.exceptions[0], RuntimeError)
    assert span.statuses[-1]["code"] == STATUS_ERROR
    assert "kaboom" in span.statuses[-1]["message"]
    assert span.ended is True  # ended even on error (finally)
