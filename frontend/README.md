# Viq Systems Frontend

React + Vite implementation of the Viq Systems marketing site.

## Structure

- `index.html`, `services.html`, `work.html`, `about.html`, `contact.html` are page entry points.
- `src/App.jsx` renders the page content and shared shell.
- `src/siteContent.js` holds the copy and structured content for the site.
- `src/index.css` and `src/App.css` implement the design system and legacy-aligned layout.
- `public/brand/` contains the local Viq Systems logo assets used by the frontend.

## Commands

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Notes

- The frontend is self-contained and can run without `../legacy-html/`.
- The legacy HTML site in `../legacy-html/` remains the design and copy reference for future adjustments.
- Contact form submissions are wired for Web3Forms and require `VITE_WEB3FORMS_ACCESS_KEY`.
