---
name: seowatcher public website
description: Existing warm dark website with real product screenshots and restrained motion.
colors:
  primary: "oklch(72% 0.19 52)"
  background: "oklch(14% 0.008 60)"
  surface: "oklch(18% 0.009 60)"
  foreground: "oklch(97% 0.006 80)"
typography:
  display:
    fontFamily: "Geist, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(40px, 5.6vw, 72px)"
    fontWeight: 640
    lineHeight: 1
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Geist, Segoe UI, system-ui, sans-serif"
    fontSize: "17px"
    lineHeight: 1.55
rounded:
  panel: "18px"
  control: "999px"
spacing:
  small: "8px"
  medium: "16px"
  large: "24px"
---

## Overview

Preserve the established warm dark identity. The website is a brand surface
around a working local application, with real screenshots as its main visual.
Canonical styles are `site/assets/home.css`; the Turkish template is
`scripts/site-home.tr.html`. Generated homepages are build outputs.

This final pass uses design variance 5, motion intensity 3 on mobile and 5 on
desktop, and visual density 4. Maintain the existing layout and page structure.

## Colors

Use the existing OKLCH tokens. Orange identifies primary actions and focus;
headings use solid foreground color. Muted text retains readable contrast.

## Typography

Desktop uses self-hosted Geist with optional font display. At widths up to
860px, use system fonts so text does not wait for a font download. Preserve
heading hierarchy and responsive line wrapping across translations.

## Elevation

Use existing hairlines and tinted shadows to separate product frames. Mobile
frames remain flat: no perspective, masked decorative border, or background
grid layers competing with the first product image.

## Components

The primary button is an orange pill; secondary actions use the existing
outlined treatment. Keep visible focus and pressed states. Mobile navigation
retains its focus trap and Escape behavior. Footer links and cookie controls
remain accessible. Product screenshots keep explicit dimensions.

## Do's and Don'ts

- Preserve actual product imagery, download URLs, and translated content.
- Use transform and opacity for purposeful motion; respect reduced motion.
- Do not add an animation runtime for simple effects already handled by CSS.
- Avoid decorative gradient text and repeated layout reads during animation.
- Verify performance with comparable reports and distinguish simulation from
  DevTools throttling. Do not infer real-user results from a local score.
