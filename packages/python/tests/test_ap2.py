"""Tests for the AP2 → x402 settlement adapter. Mirrors tests/ap2.test.ts.

The adapter does NOT verify the AP2 VC signature (trust boundary) — these tests
assert structural translation, validation/expiry, and settlement wiring only.
"""
from __future__ import annotations

import pytest
import respx
from httpx import Response

from paybot_sdk.ap2 import (
    Ap2Adapter,
    Ap2PaymentMandate,
    Ap2SettleOptions,
    ap2_mandate_to_payment_requirements,
    is_ap2_mandate,
)
from paybot_sdk.errors import PayBotApiError
from paybot_sdk.x402_v2 import X402Handler

TEST_KEY = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80"


def _mandate(**kw) -> Ap2PaymentMandate:
    base = dict(
        mandate_id="m1",
        payer="0xaaa0000000000000000000000000000000000001",
        payee="0xbbb0000000000000000000000000000000000002",
        amount="1000000",
        currency="USDC",
        network="eip155:8453",
    )
    base.update(kw)
    return Ap2PaymentMandate(**base)


# ── ap2_mandate_to_payment_requirements ──────────────────────────────────


def test_translate_happy_usdc():
    reqs = ap2_mandate_to_payment_requirements(_mandate())
    assert reqs.scheme == "exact"
    assert reqs.token == "USDC"
    assert reqs.pay_to == "0xbbb0000000000000000000000000000000000002"
    assert reqs.asset.startswith("eip155:8453/erc20:")
    assert reqs.max_timeout_seconds == 300  # no expiry → default


def test_translate_missing_field_raises():
    with pytest.raises(PayBotApiError) as exc:
        ap2_mandate_to_payment_requirements(_mandate(amount=""))
    assert exc.value.code == "INVALID_AP2_MANDATE"


def test_translate_unsupported_token_raises():
    with pytest.raises(PayBotApiError) as exc:
        ap2_mandate_to_payment_requirements(_mandate(currency="DOGE"))
    assert exc.value.code == "UNSUPPORTED_TOKEN"


def test_translate_token_not_on_network_raises():
    # EURC mainnet has no public-registry address → UNSUPPORTED_NETWORK.
    with pytest.raises(PayBotApiError) as exc:
        ap2_mandate_to_payment_requirements(_mandate(currency="EURC", network="eip155:8453"))
    assert exc.value.code == "UNSUPPORTED_NETWORK"


def test_translate_derives_timeout_from_future_expiry():
    import datetime

    future = (
        datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(seconds=600)
    ).isoformat().replace("+00:00", "Z")
    reqs = ap2_mandate_to_payment_requirements(_mandate(expires_at=future))
    assert reqs.max_timeout_seconds > 0


# ── is_ap2_mandate ────────────────────────────────────────────────────────


def test_is_ap2_mandate_dataclass_and_dict():
    assert is_ap2_mandate(_mandate()) is True
    assert is_ap2_mandate(
        {
            "mandateId": "m",
            "payer": "a",
            "payee": "b",
            "amount": "1",
            "currency": "USDC",
            "network": "eip155:8453",
        }
    ) is True


def test_is_ap2_mandate_rejects_incomplete():
    assert is_ap2_mandate({"payer": "a"}) is False
    assert is_ap2_mandate(_mandate(payee="")) is False


def test_is_ap2_mandate_rejects_non_object():
    assert is_ap2_mandate(None) is False
    assert is_ap2_mandate("string") is False
    assert is_ap2_mandate(42) is False


# ── validate_mandate ──────────────────────────────────────────────────────


def test_validate_mandate_valid():
    adapter = Ap2Adapter(X402Handler(TEST_KEY))
    assert adapter.validate_mandate(_mandate()) == {"valid": True}


def test_validate_mandate_missing_field():
    adapter = Ap2Adapter(X402Handler(TEST_KEY))
    res = adapter.validate_mandate(_mandate(currency=""))
    assert res["valid"] is False
    assert "missing" in res["reason"]


def test_validate_mandate_expired():
    adapter = Ap2Adapter(X402Handler(TEST_KEY))
    res = adapter.validate_mandate(
        _mandate(expires_at="2000-01-01T00:00:00Z"), now_ms=2_000_000_000_000
    )
    assert res["valid"] is False
    assert res["reason"] == "mandate expired"


def test_validate_mandate_bad_expiry_format():
    adapter = Ap2Adapter(X402Handler(TEST_KEY))
    res = adapter.validate_mandate(_mandate(expires_at="not-a-date"))
    assert res["valid"] is False
    assert "ISO-8601" in res["reason"]


# ── settle ────────────────────────────────────────────────────────────────


@pytest.mark.asyncio
async def test_settle_signs_and_submits():
    adapter = Ap2Adapter(X402Handler(TEST_KEY))
    with respx.mock:
        route = respx.post("https://merchant.example/settle").mock(
            return_value=Response(
                200,
                json={
                    "receiptId": "rcpt_ap2",
                    "status": "confirmed",
                    "amount": "1000000",
                    "network": "eip155:8453",
                },
            )
        )
        receipt = await adapter.settle(
            _mandate(), Ap2SettleOptions(payment_endpoint="https://merchant.example/settle")
        )
    assert route.called
    assert receipt.receipt_id == "rcpt_ap2"
    assert receipt.status == "confirmed"


@pytest.mark.asyncio
async def test_settle_rejects_invalid_mandate_before_network():
    adapter = Ap2Adapter(X402Handler(TEST_KEY))
    with respx.mock:
        route = respx.post("https://merchant.example/settle")
        with pytest.raises(PayBotApiError) as exc:
            await adapter.settle(
                _mandate(amount=""),
                Ap2SettleOptions(payment_endpoint="https://merchant.example/settle"),
            )
    assert exc.value.code == "INVALID_AP2_MANDATE"
    assert not route.called  # no network round-trip on a bad mandate


@pytest.mark.asyncio
async def test_settle_uses_intent_linkage_when_present():
    adapter = Ap2Adapter(X402Handler(TEST_KEY))
    with respx.mock:
        respx.post("https://merchant.example/settle").mock(
            return_value=Response(
                200,
                json={
                    "receiptId": "r",
                    "status": "pending",
                    "amount": "1",
                    "network": "eip155:8453",
                },
            )
        )
        receipt = await adapter.settle(
            _mandate(intent_id="intent_xyz"),
            Ap2SettleOptions(payment_endpoint="https://merchant.example/settle"),
        )
    assert receipt.receipt_id == "r"
