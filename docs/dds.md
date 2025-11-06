## 📂 Folder Overview

```
/docs
 ├── project-spec.json          ✅ complete
 ├── web-dev-sop.md             ✅ complete
 ├── site-map.md                ✅ complete
 ├── brand-ui-guide.md          ✅ complete
 ├── content-production-guide.md ✅ complete
 ├── launch-checklist.md        ✅ complete
 ├── maintenance-plan.md        ✅ complete
 └── SETUP_NOTES.md             ✅ complete (compliance status)
```

---

### **1️⃣ web-dev-sop.md – MET Repairs Web Development SOP**

```markdown
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
```

---

### **2️⃣ site-map.md – Information Architecture**

```markdown
# MET Repairs Site Map & Content Hierarchy

## Top-Level Navigation

1. Home
2. Services
3. Booking
4. Get a Quote
5. Projects
6. Reviews
7. Resources
8. About
9. Contact

---

## Page Breakdown

### Home

- Hero (headline + CTA)
- Service highlights
- Why Choose Us
- Recent Projects
- Reviews
- Service Area Map
- Quick Contact Bar

### Services

- Overview Grid
- Detail Pages:
  - Locksmithing
  - Electrical
  - Access Control
  - Security Systems
  - Fire Alarm Systems
  - Data & Low-Voltage
  - TV Mounting
  - Electronics Repair

### Booking

- Embedded calendar (Cal.com/Calendly)
- Pre-visit form (address, scope, optional photo)
- Confirmation + follow-up email

### Quote

- Request form with file/photo upload
- Brevo integration for notifications
- Optional Stripe deposit link

### Projects

- Case studies with before/after images
- Problem → Solution → Outcome

### Reviews

- Testimonials (Google + Facebook imports)
- Star ratings and comments

### Resources

- Security System Planning Guide
- Fire Alarm Readiness Checklist
- Data & Network Cabling Guide
- Maintenance Tips

### About

- Founder story
- Credentials and insurance
- Mission & values
- Community involvement

### Contact

- Quick form
- Map and service area
- Direct contact info

---

## Footer

- Quick Links
- Service Areas
- Hours
- Licenses
- Social Links
```

---

### **3️⃣ brand-ui-guide.md – Visual Identity & UI Standards**

```markdown
# MET Repairs Brand & UI Guide

## Brand Voice

- Professional, clean, and confident
- Focused on trust, expertise, and clarity
- Speak to both homeowners and business clients

---

## Colors

| Role          | HEX     | Usage                     |
| ------------- | ------- | ------------------------- |
| Primary       | #0B41E4 | Buttons, CTAs, links      |
| Secondary     | #4AE66C | Highlights, icons         |
| Neutral Dark  | #0F172A | Headings, nav             |
| Neutral Light | #F8FAFC | Backgrounds               |
| Accent        | #FFB020 | Alerts, subtle highlights |

---

## Typography

- **Font:** Inter (or system sans)
- **Headings:** Bold, uppercase spacing
- **Body:** 400–500 weight
- **Line height:** 1.6
- **Letter spacing:** Slightly tight for headings

---

## Components

- **Buttons:** Rounded-2xl, shadow-sm, hover-elevate
- **Cards:** Subtle borders, 2xl radius, white background
- **CTAs:** Always 1 main + 1 secondary
- **Icons:** Lucide React, 1.25–1.5rem size

---

## Imagery

- Real job photos, tools, before/after installations
- Minimal filters, natural light
- Avoid stock imagery whenever possible

---

## Motion

- Light fades and slides using Framer Motion
- No heavy animations—keep transitions subtle and purposeful

---

## Accessibility

- Minimum contrast ratio: **4.5:1**
- Focus outlines visible on keyboard nav
- Alt text required for every image
```

---

### **4️⃣ content-production-guide.md – Content Workflow & SEO**

```markdown
# MET Repairs Content Production & SEO Workflow

## Purpose

Ensure all marketing content and resources are written, reviewed, and published with consistent voice, accuracy, and SEO optimization.

---

## Process

1. **Draft**
   - Outline topic (Service, Case Study, Resource)
   - Target keyword & search intent
2. **Review**
   - Check facts, spelling, and tone
   - Ensure CTA and internal links are present
3. **Approve**
   - Publish to /resources or /blog
   - Update sitemap

---

## Voice & Tone

- Confident, expert, approachable
- Use plain English; avoid jargon
- Emphasize solutions and trust

---

## SEO Checklist

- Keyword in H1 and first 100 words
- Meta description ≤160 chars
- URL slug includes main keyword
- Use semantic headings (H2/H3)
- Add internal and external links
- Image alt text optimized
- Schema markup where possible

---

## Content Pillars

- Locksmithing & Security
- Electrical & Access Control
- Fire Alarm & Compliance
- Data & Network Infrastructure
- System Integration Success Stories

---

## File Naming

`YYYY-MM-DD-topic-title.md`
Example: `2025-11-06-security-system-guide.md`
```

---

### **5️⃣ launch-checklist.md – QA & Go-Live Validation**

```markdown
# MET Repairs Launch Checklist

## Technical

☐ All forms functional (Contact, Quote, Booking)  
☐ Emails delivered correctly via Brevo  
☐ API endpoints tested  
☐ Sitemap & robots.txt generated  
☐ Domain DNS and SSL verified

## Visual

☐ Responsive on mobile, tablet, and desktop  
☐ Images optimized (<200KB average)  
☐ Fonts loading properly  
☐ No broken links or 404s

## SEO

☐ Meta titles and descriptions complete  
☐ OG/Twitter tags validated  
☐ Structured data passes Rich Results Test  
☐ Lighthouse SEO ≥90

## Performance

☐ Page load <2s  
☐ TTFB <200ms  
☐ Lazy load below fold content  
☐ Lighthouse Performance ≥90

## Accessibility

☐ Contrast meets WCAG 2.2 AA  
☐ Alt text on all images  
☐ Keyboard navigation works  
☐ ARIA for accordions & modals

## Security

☐ HTTPS forced  
☐ CSP headers configured  
☐ No exposed API keys  
☐ Form validation (Zod) enabled

## Approval

☐ Team review complete  
☐ Production deploy verified  
☐ Backup taken before launch  
☐ Post-launch monitoring enabled
```

---

### **6️⃣ maintenance-plan.md – Ongoing Care**

```markdown
# MET Repairs Website Maintenance Plan

## Monthly

- Verify uptime and SSL
- Test all contact and quote forms
- Check Brevo email deliverability
- Review analytics and lead conversions

## Quarterly

- Update dependencies
- Re-run Lighthouse audit
- Add new service pages or resources
- Refresh Google Business profile links

## Bi-Annual

- Review content accuracy and pricing
- Update testimonials and project photos
- Optimize database (if Supabase/MySQL used)
- Review SEO keyword rankings

## Annual

- Full design and performance review
- Re-audit accessibility
- Update legal pages (Terms, Privacy)
- Backup all environment variables and assets

---

**Next Review Date:** _(set 1 year from launch)_  
**Maintainer:** MET Repairs Web Admin / Ascendra Technologies
```

---

✅ **Result:** Once these are in place, you’ll have a complete documentation suite guiding:

- Your development process
- Cursor AI’s context
- Your future marketing and SEO team
- Your brand consistency
