# MET Repairs Website Development SOP

## Purpose

To maintain consistent, high-quality standards across development, design, and deployment of metrepairs.com and related subprojects.

---

## Stack & Standards

- **Framework:** Next.js 15 + TypeScript
- **UI:** Tailwind CSS + shadcn/ui + Framer Motion
- **Styling:** Use Tailwind utility classes only. Avoid inline CSS.
- **Components:** Modular, reusable, named with PascalCase.
- **Forms:** React Hook Form + Zod for validation.
- **APIs:** Route Handlers (Next.js) → Brevo (email) / Stripe (payment).
- **Accessibility:** WCAG 2.2 AA (semantic HTML, alt text, ARIA).
- **Performance Goal:** Lighthouse ≥90 across all categories.

---

## File Structure

```
app/
├── (marketing)
│ ├── page.tsx
│ ├── services/
│ ├── booking/
│ ├── quote/
│ ├── resources/
│ └── contact/
├── api/
│ ├── quote/
│ ├── contact/
│ └── booking/
components/
├── ui/
├── sections/
└── layout/
data/
├── services.json
├── reviews.json
├── projects.json
└── faqs.json
```

---

## Coding Standards
- Use **TypeScript strict mode**.
- Limit component size to **≤150 lines**.
- Use **async/await** and **try/catch** for all API calls.
- Use **Prettier + ESLint** for formatting.
- Comments should explain *why*, not *what*.

---

## Git Workflow
- **Main** → production
- **Dev** → staging
- **Feature/**page-name for work branches
- Commit convention:
  - `feat:` new feature
  - `fix:` bug fix
  - `style:` design or layout change
  - `docs:` documentation only
  - `chore:` maintenance task

---

## Deployment
- Host: **Vercel**
- Domain: Hostinger → Vercel DNS
- Verify forms before publishing.
- Generate sitemap and robots.txt via Next.js config.

---

## SEO & Analytics
- Each page must include:
  - `<title>` and `<meta description>`
  - Structured data (`LocalBusiness`, `Service`)
  - OG/Twitter meta tags
- Connect **Plausible or GA4**.
- Verify Lighthouse scores before merge.

---

## QA / Review
- Test all forms (Quote, Contact, Booking).
- Check responsiveness on iPhone, Android, and desktop.
- Test load time (<2s goal).
- Verify email delivery via Brevo logs.

---

## Maintenance
- Update dependencies quarterly.
- Review SEO quarterly.
- Refresh hero visuals annually.
- Back up `/data` JSON and environment variables.

