# Viq.tech — Website Mockup

A complete, multi-page website mockup for Viq.tech, built with HTML, CSS, and vanilla JavaScript. Five pages, fully responsive, with custom design tokens, interactive elements, and a signature terminal animation on the homepage.

## 📁 File Structure

```
viqtech-site/
├── index.html              # Homepage (hero, services, process, work preview)
├── services.html           # Services & pricing page (with FAQ accordion)
├── work.html              # Portfolio / work showcase page
├── about.html             # About page (story, capabilities, principles)
├── contact.html           # Contact form page
├── css/
│   └── style.css          # All design tokens, layout, and component styles
├── js/
│   └── main.js            # Nav toggle, scroll reveal, terminal typing, form
└── assets/
    ├── viq-tech-logo-wordmark.svg        # Main logo
    ├── viq-tech-logo-wordmark-light.svg  # Logo for dark backgrounds
    └── viq-tech-logo-monogram.svg        # Avatar / favicon version
```

## 🚀 How to View

### Option 1: Local HTTP Server (recommended for full functionality)
```bash
cd viqtech-site
python3 -m http.server 8000
# Or: npx http-server
# Or: npx live-server
```
Then open `http://localhost:8000` in your browser.

### Option 2: Direct file access
Open `viqtech-site/index.html` directly in your browser. Most features work, but cross-origin restrictions may affect some remote resources.

## 🎨 Design System

### Color Palette
- **Primary Teal**: `#0F766E` (deep, trustworthy)
- **Teal Light**: `#14B8A6` (accents, interactive)
- **Terracotta**: `#E07A5F` (warm, energetic)
- **Sand**: `#F4A261` (light accent)
- **Charcoal**: `#1E2937` (dark background, text)
- **Off-white**: `#F8F1E9` (warm neutral background)

### Typography
- **Display**: Space Grotesk (500 weight) — headings, navigation
- **Body**: Inter (400/500/600) — paragraphs, form labels
- **Mono**: JetBrains Mono (400/500) — terminal, small labels

All fonts are loaded from Google Fonts (no installation needed).

## ✨ Key Features

### 1. **Sticky Navigation with Scroll State**
- Fades in a subtle border when you scroll past the hero
- Mobile-responsive hamburger menu that toggles `.nav-links`
- Active link underline animation

### 2. **Terminal Signature Component** (homepage)
- Custom typing animation that reads from `data-lines` JSON attribute
- Shows realistic terminal output with prompt, command, and response
- Triggers when scrolling into view (IntersectionObserver)
- Renders with a terminal UI: title bar with three colored dots

### 3. **Scroll-Triggered Reveal**
- All `.reveal` elements fade in and slide up as you scroll
- Relies on IntersectionObserver (fallback: instant appearance if unsupported)
- No external animation library — pure CSS transitions

### 4. **FAQ Accordion** (services page)
- Click questions to expand/collapse answers
- Smooth height animation
- Only one section open at a time

### 5. **Contact Form** (contact page)
- Front-end only for this mockup (submit shows success state)
- Ready to wire to Formspree, EmailJS, or your backend
- Form validation built into HTML5

### 6. **Responsive Grid Layout**
- `grid-3` and `grid-2` classes auto-stack to single column on mobile
- Max-width container (`--maxw: 1140px`) keeps content readable
- Consistent padding/margin using CSS custom properties

### 7. **Accessible & Semantic**
- Proper heading hierarchy (h1 → h2 → h3 → h4)
- ARIA labels on icon buttons
- Keyboard-accessible navigation and forms
- Focus-visible states on all interactive elements

## 📱 Responsive Breakpoints

- **Mobile**: < 720px (single column, hamburger nav)
- **Tablet**: 720px – 860px (1–2 column grids)
- **Desktop**: > 860px (full multi-column layout)

## 🔧 Customization

### Change Colors
Edit the CSS custom properties at the top of `css/style.css`:
```css
:root {
  --teal: #0F766E;
  --terracotta: #E07A5F;
  /* ... etc */
}
```

### Update Copy
Edit text directly in the HTML files. No build step needed.

### Add More Pages
Copy an existing page (e.g., `about.html`), update the nav links, and wire it in. The stylesheet applies to all pages.

### Terminal Lines (customize animation)
In the `data-lines` attribute of the terminal element, edit the JSON array:
```html
<div class="terminal-body" data-terminal data-lines='[
  {"type":"prompt","text":"$ whoami"},
  {"type":"out","text":"victor — nairobi"}
]'></div>
```

Types: `prompt`, `out`, `ok`

### Contact Form Backend
In `js/main.js`, replace the form success handler with your actual submission:
```javascript
// Add this inside the form submit handler:
fetch('https://your-backend-or-formspree-endpoint', {
  method: 'POST',
  body: new FormData(contactForm)
}).then(() => { /* show success */ });
```

## 📊 Page Overview

### **index.html** — Homepage
- Hero with signature terminal animation
- 3-column services overview
- 5-step process visualization
- 3-item work preview with grid
- CTA banner
- Footer

### **services.html** — Services & Pricing
- Detailed service descriptions with icon + list
- Pricing table (KES / USD dual pricing)
- 4-item FAQ accordion
- CTA banner

### **work.html** — Portfolio
- Grid of equal-sized project cards with a featured badge treatment on the first
- Cards are lean — no tech-stack tags or project-type badges
- Work process framework: Discovery → Build → Verify

### **about.html** — About
- Hero section with avatar, intro, and tech bar
- Personal story narrative with stats highlights
- 4-column capabilities grid
- How I work — three principles with flow layout
- Beyond code — personal interests grid
- CTA banner

### **contact.html** — Contact
- Contact info column (email, location, response time, payment)
- Contact form with field groups
- Success message overlay
- Footer with social links

## 🎯 Design Decisions (From Brief)

1. **Terminal as Hero Signature**: Shows personality and technical credibility
2. **Warm Palette (Teal + Terracotta)**: Stands out from generic "tech blue" + avoids cold / corporate feel
3. **One-Person, Direct Messaging**: Copy emphasizes "I do this" not "we do this"
4. **Honest About Stage**: Work page uses a cohesive framework (Discovery → Build → Verify) and a featured card for the flagship project
5. **Flat Pricing**: Services page shows packages, not hourly rates (signals confidence)
6. **Process Visualization**: 5 numbered steps encode the real workflow

## 🌐 Deployment

### Static Hosting (Vercel, Netlify, GitHub Pages)
Just push the `viqtech-site` folder and point to `index.html` as the entry. No build step needed.

### Traditional Web Hosting
Upload all files via FTP to your web root. Set the index page to `index.html`.

### With Custom Domain
1. Register `viq.tech` at Namecheap / GoDaddy / etc.
2. Point DNS to your hosting
3. Deploy the site
4. Update `hello@viq.tech` in the contact page / footer

## 🔮 Next Steps

- **Wire the contact form** to a real backend (Formspree, EmailJS, custom)
- **Add real projects** to the work page as you build them
- **Refine the about/hero copy** with your actual voice and bio
- **Customize colors** if you decide on a different palette
- **Add analytics** (Google Analytics, Plausible, etc.) in the `<head>`
- **Set up email forwarding** for `hello@viq.tech`

## ✅ Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- IntersectionObserver support (IE 11 gets instant reveals, works fine)
- CSS Grid & Flexbox (all modern browsers)
- No polyfills needed for core functionality

## 📝 License & Usage

This is a custom mockup built for Viq.tech. Feel free to modify, deploy, and evolve it as your business grows.

---

**Built with:** HTML5, CSS3, Vanilla JS (no frameworks)  
**Fonts:** Google Fonts (Space Grotesk, Inter, JetBrains Mono)  
**Icons:** Tabler Icons (CDN)  
**Responsive:** Mobile-first, tested at 320px – 2560px  

Enjoy!
