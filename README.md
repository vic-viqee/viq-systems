# Viq Systems

Custom software, business systems, and AI tools for growing businesses.

| Layer | Stack | Target |
|-------|-------|--------|
| **Frontend** | React 19 + Vite 8 | Cloudflare Pages |
| **Backend** | FastAPI + Pydantic v2 | Cloudflare Workers |
| **Design** | Space Grotesk, Inter, JetBrains Mono | Warm off-white, teal, terracotta |

## Quick start

```bash
# Frontend
cd frontend && npm install && npm run dev     # localhost:5173

# Backend (separate terminal)
cd backend && python3 -m venv .venv            # one-time
source .venv/bin/activate
pip install -e '.[dev]'
uvicorn app.main:app --reload                  # localhost:8000
```

## What's here

```
frontend/       Active marketing site (multi-page SPA)
backend/        API — health, version, and contact intake
```

## Contact

Forms use **Web3Forms** until the backend endpoint takes over.  
Set `VITE_WEB3FORMS_ACCESS_KEY` in your frontend env to enable submissions.

## Domain

`viqsystems.tech` — the public-facing brand.
