# Viq.tech

A multi-page business website for Viq.tech — a solo developer building custom websites, business systems, and AI tools. Built with HTML, CSS, and vanilla JavaScript. No framework, no build step.

## File Structure

```
viqtech-site/
├── index.html              # Homepage: hero with featured work, problem examples, case study, CTA
├── services.html           # 6 service cards (incl. websites), 3-tier pricing with "Choose plan" CTAs, benchmarks, FAQ
├── work.html               # Portfolio gallery (coming soon) + CTA
├── about.html              # Brand intro ("What is Viq.tech?"), "Why work with us" value cards, CTA
├── contact.html            # Contact form with package pre-select, phone/WhatsApp, response info, payment methods
├── css/
│   └── style.css           # Design tokens, layout, components, responsive
├── js/
│   └── main.js             # Nav toggle, scroll reveal, FAQ accordion, contact form, package pre-select
└── assets/
    ├── viq-tech-logo-wordmark.svg
    ├── viq-tech-logo-wordmark-light.svg
    └── viq-tech-logo-monogram.svg
```

## How to View

```bash
cd viqtech-site
python3 -m http.server 8000
```

Open `http://localhost:8000`. Or just open `index.html` directly.

## Design System

- **Teal** `#0F766E` / **Teal Light** `#14B8A6` — primary
- **Terracotta** `#E07A5F` / **Sand** `#F4A261` — accent
- **Charcoal** `#1E2937` — text / dark bg
- **Off-white** `#F8F1E9` — warm background
- **Fonts**: Space Grotesk (headings), Inter (body), JetBrains Mono (code/meta)
- **Icons**: Tabler Icons 2.47.0 (CDN)
- **Border radius**: 8px buttons, 14px cards, 22px containers

## Voice & Positioning

- Problem-focused, outcome-driven copy — no tech jargon
- "We" voice establishes studio feel while being direct and honest
- Services organised by **business problem**, not technology
- Pricing is transparent with named packages and clear ranges
- Target: business owners who don't know what they need tech-wise

## Key Features

1. **Single-column Hero** (homepage) — honest hero with a "now taking on first client projects" status line instead of fabricated "recent work" cards
2. **Service Cards** (services page) — 6 problem-based service categories in a responsive 2-column grid
3. **Named Pricing Tiers** — Starter / Business / Advanced with "Choose plan" CTAs linking to contact form with pre-select
4. **Package Pre-select** (contact form) — reads `?package=starter|business|advanced` from URL, shows selected package
5. **Phone & WhatsApp** (contact page) — direct contact options with clickable WhatsApp link
6. **Scroll-Reveal** — IntersectionObserver-based fade-in on all `.reveal` elements
7. **FAQ Accordion** — single-open accordion on services page
8. **Responsive Grid** — auto-stacking columns, mobile-first at 320px
9. **Contact Form** — front-end demo, ready to wire to Formspree/EmailJS/backend
10. **Honest Work Page** — two clearly separated sections: "What we've built" (real projects, `tag-real`) and "Concept examples" (illustrative, `tag-concept`) — never mixed or mislabeled

## Page Overview

- **index.html** — Single-column hero with honest status line (no fake "recent work"), 3-step process, problem examples, CTA
- **services.html** — 6 service cards (Websites, Getting paid, Managing customers, Selling online, Data & reports, Automating busywork), 3-tier pricing with "Choose plan" CTAs, standard benchmarks, FAQ
- **work.html** — "What we've built" (real projects — currently a placeholder card, replace with your first real project) + "Concept examples" (clearly labeled `tag-concept`, written in forward-looking "what we'd build" language, never claimed as completed client work) + CTA
- **about.html** — Brand intro (name origin: Victor's nickname "Viqee"), one-person-operation disclosure, "Why work with Viq.tech" value cards, CTA
- **contact.html** — Phone + WhatsApp contact info, email, payment methods, problem-focused form with package pre-select

## A Note on Honesty

Two earlier sections of this site — a "Proof in action" homepage feature and two "case studies" on the work page — presented fictional client projects (Obsidian Heart, a logistics dashboard) as if they were completed, real client work, with fabricated metrics and a fake live URL. Those have been removed/relabeled. The rule going forward: anything called "real," "case study," or `tag-real` must be actual, verifiable work. Illustrative material is always labeled "Concept example" with `tag-concept` and written in forward-looking language ("what we'd build"), never past tense ("we built").

## Deployment

Auto-deploys from GitHub to Cloudflare Pages at `viq-tech.pages.dev`.

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). IntersectionObserver supported everywhere except IE 11 (graceful fallback).

---

**Built with:** HTML5, CSS3, Vanilla JS  
**Fonts:** Google Fonts (Space Grotesk, Inter, JetBrains Mono)  
**Icons:** Tabler Icons  
**Responsive:** 320px – 2560px
