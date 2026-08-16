
# Image assets

Drop your photographs in at the paths below and they appear automatically —
no code changes needed.

**Until a file exists, the site shows the illustrated panel that is already
built in.** A missing image is removed at runtime by `js/main.js`, so the page
never renders a broken-image icon. That means you can add photos a few at a
time and the site stays presentable throughout.

## Guidelines

- **Format:** JPG for photographs (or WebP — if you use `.webp`, update the
  `src` in the HTML to match).
- **Size:** the pixel sizes below are the *display* size. Supply roughly 2x
  that for sharp rendering on high-density screens, then compress.
- **Weight:** aim for under ~250 KB each. `hero.jpg` is the one users wait on,
  so keep it under ~200 KB.
- **Crop:** every image is cropped with `object-fit: cover` and centred, so
  keep the subject near the middle. The before/after tiles are narrow — a
  portrait or square-ish crop works best there.
- **Alt text** is already written for each slot in the HTML. If a photo shows
  something different from the description, update the `alt` to match what is
  actually pictured — it is read aloud by screen readers and used by search
  engines.

## Files


### Brand assets

These are the slots your existing marketing banner and logo fit into.
Unlike the photo slots, these are **not** cropped into page layouts — a
graphic with text baked in belongs here and nowhere else on the site.

| Path | Size | What it is |
|---|---|---|
| `images/social-banner.jpg` | 1200×630 | The share/link-preview image. Your marketing banner (logo + headline + CTA) is exactly right here — link previews have no layout of their own, so baked-in text is a feature. Shown when the site is shared on Facebook, LinkedIn, WhatsApp, iMessage, Slack, X. |
| `images/favicon.png` | 512×512 | Browser tab icon. Crop the leaf-and-truck mark out of the logo — square, no wordmark, it renders at 16px. |
| `images/apple-touch-icon.png` | 180×180 | Icon when someone saves the site to an iPhone home screen. Same mark, with a little padding. |

**Do not** put the marketing banner into `hero.jpg` or any service slot.
Those images sit *behind* the site's own headlines and buttons, so a
banner with its own headline and CTA would collide with them.

### Hero & feature images

| Path | Display size | Used on |
|---|---|---|
| `images/cta.jpg` | 700×500 | index.html |
| `images/hero.jpg` | 1200×800 | index.html |

### Service photos

| Path | Display size | Used on |
|---|---|---|
| `images/services/appliance.jpg` | 600×400 | index.html, services.html |
| `images/services/basement-attic.jpg` | 600×400 | services.html |
| `images/services/commercial.jpg` | 600×400 | index.html, services.html |
| `images/services/construction.jpg` | 600×400 | index.html, services.html |
| `images/services/estate.jpg` | 600×400 | services.html |
| `images/services/furniture.jpg` | 600×400 | index.html, services.html |
| `images/services/garage.jpg` | 600×400 | index.html, services.html |
| `images/services/residential.jpg` | 600×400 | index.html, service-residential.html, services.html |

### Before / after pairs

| Path | Display size | Used on |
|---|---|---|
| `images/projects/appliance-after.jpg` | 400×300 | projects.html |
| `images/projects/appliance-before.jpg` | 400×300 | projects.html |
| `images/projects/basement-after.jpg` | 400×300 | projects.html |
| `images/projects/basement-before.jpg` | 400×300 | projects.html |
| `images/projects/construction-after.jpg` | 400×300 | index.html, projects.html |
| `images/projects/construction-before.jpg` | 400×300 | index.html, projects.html |
| `images/projects/estate-after.jpg` | 400×300 | projects.html |
| `images/projects/estate-before.jpg` | 400×300 | projects.html |
| `images/projects/furniture-after.jpg` | 400×300 | projects.html |
| `images/projects/furniture-before.jpg` | 400×300 | projects.html |
| `images/projects/garage-after.jpg` | 400×300 | index.html, projects.html |
| `images/projects/garage-before.jpg` | 400×300 | index.html, projects.html |
| `images/projects/office-after.jpg` | 400×300 | index.html, projects.html |
| `images/projects/office-before.jpg` | 400×300 | index.html, projects.html |
| `images/projects/retail-after.jpg` | 400×300 | projects.html |
| `images/projects/retail-before.jpg` | 400×300 | projects.html |
| `images/projects/yard-after.jpg` | 400×300 | projects.html |
| `images/projects/yard-before.jpg` | 400×300 | projects.html |

### About & team

| Path | Display size | Used on |
|---|---|---|
| `images/about/crew.jpg` | 800×800 | about.html, index.html |
| `images/about/team-1.jpg` | 400×500 | about.html |
| `images/about/team-2.jpg` | 400×500 | about.html |
| `images/about/team-3.jpg` | 400×500 | about.html |
| `images/about/team-4.jpg` | 400×500 | about.html |

### Blog thumbnails

| Path | Display size | Used on |
|---|---|---|
| `images/blog/appliance-disposal.jpg` | 600×375 | blog.html |
| `images/blog/declutter-garage.jpg` | 600×375 | blog.html |
| `images/blog/moving-checklist.jpg` | 600×375 | blog.html |
| `images/blog/pricing-factors.jpg` | 600×375 | blog.html |
| `images/blog/renovation-debris.jpg` | 600×375 | blog.html |
| `images/blog/where-junk-goes.jpg` | 600×375 | blog.html |

### Service detail page

| Path | Display size | Used on |
|---|---|---|
| `images/detail/residential-1.jpg` | 900×500 | service-residential.html |
| `images/detail/residential-2.jpg` | 900×500 | service-residential.html |

### Pricing page

| Path | Display size | Used on |
|---|---|---|
| `images/pricing/quote.jpg` | 800×800 | pricing.html |

**42 images total.**

## Priority order

If you are sourcing photos gradually, this order gives the biggest
visual return first:

1. `social-banner.jpg` + `favicon.png` — brand assets you already have
2. `hero.jpg` — the first thing every visitor sees
3. `services/*.jpg` (8) — the main grid on the home and services pages
4. `about/crew.jpg` — used on both the home and about pages
5. `projects/*` — real before/after shots are the strongest proof you have
6. `about/team-*.jpg`, `blog/*.jpg`, then the rest