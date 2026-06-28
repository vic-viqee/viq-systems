# Viq Systems

Viq Systems is a custom software and AI solutions agency site with a React/Vite frontend, a FastAPI backend, and a legacy static implementation kept as the content and design reference.

## Structure

- `frontend/`: Active React frontend for Cloudflare Pages.
- `backend/`: FastAPI backend intended for Cloudflare Workers via Pyodide / `pywrangler`.
- `legacy-html/`: Read-only design, copy, and interaction reference.

## Frontend Notes

- The frontend mirrors the legacy multi-page structure: home, services, work, about, and contact.
- The frontend is self-contained and does not depend on `legacy-html/` at runtime.
- Visual language stays close to the legacy site: warm off-white surfaces, teal primary color, terracotta accents, and the current Viq Systems assets.
- Contact forms are wired for Web3Forms during the initial phase.
- The public-facing brand is `Viq Systems` and the domain is `viqsystems.tech`.

## Commands

- `cd frontend && npm install`
- `cd frontend && npm run dev`
- `cd frontend && npm run build`
- `cd frontend && npm run lint`
