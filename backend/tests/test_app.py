from __future__ import annotations

from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_root_returns_metadata() -> None:
    response = client.get("/")

    assert response.status_code == 200
    assert response.json()["service"] == "Viq Systems API"
    assert response.json()["docs_url"] == "/docs"


def test_health_returns_ok() -> None:
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {
        "service": "Viq Systems API",
        "version": "0.1.0",
        "status": "ok",
    }


def test_version_returns_public_site_url() -> None:
    response = client.get("/version")

    assert response.status_code == 200
    assert response.json()["public_site_url"] == "https://viqsystems.tech"


def test_contact_accepts_valid_payload() -> None:
    response = client.post(
        "/contact",
        json={
            "name": "Victor",
            "email": "victor@example.com",
            "business": "Agency",
            "problem": "We need a better intake flow",
            "impact": "Faster response times",
            "timeline": "ASAP (within 2-4 weeks)",
            "package": "business",
        },
    )

    body = response.json()

    assert response.status_code == 202
    assert body["status"] == "received"
    assert body["package"] == "business"
    assert body["intake_id"].startswith("lead_")


def test_contact_rejects_invalid_email() -> None:
    response = client.post(
        "/contact",
        json={
            "name": "Victor",
            "email": "not-an-email",
            "business": "Agency",
            "problem": "We need a better intake flow",
            "impact": "Faster response times",
        },
    )

    assert response.status_code == 422

