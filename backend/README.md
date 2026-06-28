# Viq Systems Backend

Minimal FastAPI backend for the Viq Systems marketing site.

## Prerequisites

- Python 3.11+
- pip

## Setup

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -e '.[dev]'
```

## Running

```bash
uvicorn app.main:app --reload
```

Open `http://localhost:8000/docs` for the interactive API docs.

## Testing

```bash
pytest
```

## Endpoints

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/` | API metadata |
| GET | `/health` | Health check |
| GET | `/version` | Release info |
| POST | `/contact` | Lead intake |

## Environment Variables

| Variable | Default | Purpose |
|----------|---------|---------|
| `APP_NAME` | `Viq Systems API` | Service name in responses |
| `APP_VERSION` | `0.1.0` | Version in responses |
| `APP_ENV` | `development` | Environment label |
| `PUBLIC_SITE_URL` | `https://viqsystems.tech` | Public site URL |
| `CORS_ORIGINS` | built-in allowlist | Comma-separated override |

The default CORS allowlist includes `localhost:4173`, `localhost:5173`, `viqsystems.tech`, and `viq-systems.pages.dev`. Set `CORS_ORIGINS` to override.

## Stack

- **FastAPI** + **Pydantic v2**
- Intended for **Cloudflare Workers** via pywrangler
- No database yet — leads are validated and acknowledged only
