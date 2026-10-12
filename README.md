# ByteWeev — Minimalist Software Engineering Studio Website

A clean, minimalist, animated scrollable website built for **ByteWeev**. The design directly reflects the company logo (`assets/logo.png` & `assets/logo.svg`): **stark monochrome palette (`#000000` / `#ffffff`), 45-degree angled square geometry with circular bite cutout and byte dots, Swiss typography, and crisp 1px borders**.

All content is centralized in **[`assets/js/data.js`](assets/js/data.js)** for effortless editing without touching HTML.

---

## ⚡ Easy Editing via [`assets/js/data.js`](assets/js/data.js)

All website copy, services, stats, showcase projects, and FAQs are managed in **`assets/js/data.js`**:
- **`brand`**: Studio name, hero headings, availability status, direct email, location, and social links.
- **`services`**: Core capabilities (Web Platforms, Cloud & APIs, Mobile Apps, Systems Architecture) with tech tags.
- **`showcase`**: Client projects with categories, years, key metrics, descriptions, and technology stacks.
- **`about`**: Studio manifesto, 4 benchmark stats, core engineering principles, and technology radar.
- **`faqs`**: Frequently asked questions displayed on the About and Contact pages.

---

## 📄 Dedicated Separate Pages

| Page | File | Purpose |
| :--- | :--- | :--- |
| **Home** | **[`index.html`](index.html)** | Minimalist, animated scrollable front page with interactive ByteWeev logo geometry, core capabilities, top client showcases, studio principles, and quick CTA. |
| **Showcase** | **[`showcase.html`](showcase.html)** | Dedicated client showcase page with category filters (`All`, `Web Platforms`, `Backend & Cloud`, `Mobile Apps`) and direct scoping links. |
| **About** | **[`about.html`](about.html)** | Studio philosophy, the direct developer-client collaboration model, 4 benchmark metrics, engineering principles, and tech radar. |
| **Connect** | **[`contact.html`](contact.html)** | Dedicated inquiry page with direct inbox channels, interactive project brief submission form, and FAQ accordion. |

---

## 🎮 Key Features & UX

1. **Brand-Aligned Geometry**: Interactive ByteWeev logo emblem with 3D tilt tracking and binary byte-dot status indicators.
2. **Zero Layout Bugs**: Pure CSS Grid / Flexbox architecture—no overlapping absolute positions or cartoon artifacts.
3. **Scroll Reveal Animations**: Smooth scroll-triggered fade-in animations via `IntersectionObserver`.
4. **Theme Switcher**: Seamless dark and light mode toggle with `localStorage` memory and system preference support.
5. **Interactive Inquiry Engine**: Smart project inquiry form with validation and instant feedback.

---

## 💻 Running the Site Locally

```bash
python3 -m http.server 8000
```

Then visit **[http://localhost:8000](http://localhost:8000)** in your browser.
