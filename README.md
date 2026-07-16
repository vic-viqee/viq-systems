# Viq Systems

Custom software, business systems, and AI tools for growing businesses.

## Live Demo

- **Website**: [https://viqsystems.tech](https://viqsystems.tech)

## About

Viq Systems is a boutique software studio building custom business tools, AI-powered solutions, and web platforms for growing businesses. The site serves as the public-facing brand and contact portal, backed by a Cloudflare Worker for form submissions and health checks.

| Layer | Stack | Target |
|-------|-------|--------|
| **Frontend** | React 19 + Vite 8 | Cloudflare Pages |
| **Backend** | TypeScript Cloudflare Worker | Cloudflare Workers |
| **Design** | Space Grotesk, Inter, JetBrains Mono | Warm off-white, teal, terracotta |

## Quick start

```bash
# Frontend
cd frontend && npm install && npm run dev     # localhost:5173

# Backend (separate terminal)
cd backend && npm install && npx wrangler dev  # local dev with Cloudflare runtime
```

## What's here

```
frontend/       Active marketing site (multi-page SPA)
backend/        Cloudflare Worker (contact intake, health, version)
```

## Contact

Contact form submits to the Cloudflare Worker backend (`POST /contact`).  
Set `VITE_API_URL` in your frontend env to override the backend URL.

## Domain

`viqsystems.tech` — the public-facing brand.
