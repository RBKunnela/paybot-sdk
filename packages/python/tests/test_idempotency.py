"""Tests for idempotency keys on pay() and register(). Mirrors tests/idempotency.test.ts.

A repeat call with the same key returns the cached success WITHOUT a second
network round-trip; only successes are cached; the header is sent on the first call.
"""
from __future__ import annotations


import pytest
import respx
from httpx import Response

from paybot_sdk import PayBotClient, PayBotConfig, PaymentRequest

PAY_TO = "0x0000000000000000000000000000000000000001"


def _client(**kw) -> PayBotClient:
    base = dict(api_key="pb_test", bot_id="bot-1", facilitator_url="https://fac.example")
    base.update(kw)
    return PayBotClient(PayBotConfig(**base))


def _req(idem=None) -> PaymentRequest:
    return PaymentRequest(
        resource="https://x.example/y",
        amount="0.01",
        pay_to=PAY_TO,
        network="eip155:84532",
        idempotency_key=idem,
    )


# ── pay() idempotency ─────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_pay_caches_success_no_second_roundtrip():
    client = _client()
    with respx.mock:
        verify = respx.post("https://fac.example/verify").mock(
            return_value=Response(200, json={"settlementToken": "st"})
        )
        settle = respx.post("https://fac.example/settle").mock(
            return_value=Response(200, json={"success": True, "txHash": "0xabc"})
        )
        first = await client.pay(_req(idem="key-1"))
        second = await client.pay(_req(idem="key-1"))
    assert first.success is True and second.success is True
    assert first is second  # exact cached object
    # Only ONE round-trip happened.
    assert verify.call_count == 1
    assert settle.call_count == 1
    await client.close()


@pytest.mark.asyncio
async def test_pay_sends_idempotency_header():
    client = _client()
    with respx.mock:
        verify = respx.post("https://fac.example/verify").mock(
            return_value=Response(200, json={"settlementToken": "st"})
        )
        respx.post("https://fac.example/settle").mock(
            return_value=Response(200, json={"success": True})
        )
        await client.pay(_req(idem="hdr-key"))
    assert verify.calls.last.request.headers.get("X-Idempotency-Key") == "hdr-key"
    await client.close()


@pytest.mark.asyncio
async def test_pay_failure_not_cached():
    client = _client(max_retries=0)
    with respx.mock:
        # First call fails (verify returns no settlement token).
        verify = respx.post("https://fac.example/verify").mock(
            side_effect=[
                Response(200, json={}),  # no settlementToken → failure
                Response(200, json={"settlementToken": "st"}),
            ]
        )
        respx.post("https://fac.example/settle").mock(
            return_value=Response(200, json={"success": True})
        )
        first = await client.pay(_req(idem="retry-key"))
        second = await client.pay(_req(idem="retry-key"))
    assert first.success is False
    assert second.success is True  # not served from cache → retried
    assert verify.call_count == 2
    await client.close()


@pytest.mark.asyncio
async def test_pay_without_key_never_caches():
    client = _client()
    with respx.mock:
        verify = respx.post("https://fac.example/verify").mock(
            return_value=Response(200, json={"settlementToken": "st"})
        )
        respx.post("https://fac.example/settle").mock(
            return_value=Response(200, json={"success": True})
        )
        await client.pay(_req())
        await client.pay(_req())
    assert verify.call_count == 2  # both hit the network
    await client.close()


# ── register() idempotency ───────────────────────────────────────────────


@pytest.mark.asyncio
async def test_register_caches_success():
    client = _client()
    with respx.mock:
        bots = respx.post("https://fac.example/bots").mock(
            return_value=Response(200, json={"success": True, "botId": "bot-1", "trustLevel": 1})
        )
        first = await client.register(idempotency_key="reg-1")
        second = await client.register(idempotency_key="reg-1")
    assert first is second
    assert bots.call_count == 1
    await client.close()


@pytest.mark.asyncio
async def test_register_without_key_hits_network_each_time():
    client = _client()
    with respx.mock:
        bots = respx.post("https://fac.example/bots").mock(
            return_value=Response(200, json={"success": True, "botId": "bot-1", "trustLevel": 1})
        )
        await client.register()
        await client.register()
    assert bots.call_count == 2
    await client.close()


# ── LRU cache internals ───────────────────────────────────────────────────


def test_lru_cache_evicts_oldest():
    from paybot_sdk.client import _LruCache

    cache: _LruCache = _LruCache(2)
    cache.set("a", 1)
    cache.set("b", 2)
    cache.set("c", 3)  # evicts "a" (LRU)
    assert cache.get("a") is None
    assert cache.get("b") == 2
    assert cache.get("c") == 3
    assert cache.size == 2


def test_lru_cache_get_refreshes_recency():
    from paybot_sdk.client import _LruCache

    cache: _LruCache = _LruCache(2)
    cache.set("a", 1)
    cache.set("b", 2)
    cache.get("a")  # mark "a" recently used
    cache.set("c", 3)  # should evict "b", not "a"
    assert cache.get("a") == 1
    assert cache.get("b") is None
