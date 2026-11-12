# Hustle Learning — Design System

**Product:** Hustle Learning  
**Tagline:** Learn Smart. Hustle Hard.  
**Frontend:** Next.js + Tailwind CSS  
**Theme:** Light by default, with a user-controlled dark theme  
**Scope:** Colour, typography, spacing, font families, text sizes, and hierarchy.

---

## 1. Colour Palette

The visual identity is built around navy, amber, white, and grey. Use navy for structure and text, amber for emphasis, and neutral colours for surfaces.

### Brand colours

| Token | Hex | Usage |
|---|---|---|
| `brand-white` | `#FFFFFF` | Main light-theme background and cards |
| `brand-gray` | `#E5E5E5` | Neutral surfaces and muted areas |
| `brand-amber` | `#FCA311` | Primary accent, CTA, active states, key metrics |
| `brand-navy` | `#14213D` | Primary text, headings, navigation, brand elements |
| `brand-black` | `#000000` | High-contrast use where appropriate |

### Semantic colours — light theme

| Token | Value | Usage |
|---|---|---|
| `background` | `#FFFFFF` | Main page background |
| `surface` | `#FFFFFF` | Cards, dropdowns, dialogs |
| `surface-muted` | `#F5F6F8` | Secondary panels |
| `surface-subtle` | `#E5E5E5` | Neutral filled areas |
| `text-primary` | `#14213D` | Headings and primary text |
| `text-secondary` | `#46536A` | Supporting text |
| `text-muted` | `#687386` | Captions and metadata; verify contrast |
| `border` | `#D9DEE7` | Dividers, outlines, inputs |
| `accent` | `#FCA311` | Primary brand accent |
| `accent-hover` | `#E99100` | Accent hover state |
| `accent-pressed` | `#CC7F00` | Accent pressed state |
| `on-accent` | `#14213D` | Text/icons on amber |
| `focus-ring` | `#14213D` | Keyboard focus |

### Semantic colours — dark theme

| Token | Value | Usage |
|---|---|---|
| `background` | `#0B1220` | Main page background |
| `surface` | `#111B2E` | Cards, dropdowns, dialogs |
| `surface-muted` | `#17243A` | Secondary panels |
| `surface-subtle` | `#14213D` | Selected or emphasized areas |
| `text-primary` | `#FFFFFF` | Headings and primary text |
| `text-secondary` | `#D5DCE7` | Supporting text |
| `text-muted` | `#A6B0C0` | Captions and metadata |
| `border` | `#2B3950` | Dividers, outlines, inputs |
| `accent` | `#FCA311` | Primary brand accent |
| `accent-hover` | `#FFB338` | Accent hover state |
| `accent-pressed` | `#E99100` | Accent pressed state |
| `on-accent` | `#14213D` | Text/icons on amber |
| `focus-ring` | `#FCA311` | Keyboard focus |

### Colour rules

- Light theme is the default. White should remain the dominant surface.
- Navy provides the main structural colour and primary text.
- Amber highlights important actions, active navigation, progress, and key metrics. Do not use it everywhere.
- Use navy text on amber buttons. Avoid small amber text on white backgrounds.
- Dark theme uses deep navy surfaces rather than simple colour inversion.
- Do not communicate status using colour alone.
- Verify contrast for text and interactive elements in both themes.

---

## 2. Font Families

**Display font:** GT Walsheim for headings (`h1`, `h2`) and display treatments.

> **Licensed files:** GT Walsheim (Grilli Type) ships as Trial `.otf` files under `fonts/gt-walsheim-font-family/` (see `Befonts-License.txt`). They load via `next/font/local` into `--font-display`. Upright Regular (400), Medium (500), and Bold (700) cuts are wired; obliques and condensed cuts are unused — add them only if a design calls for them.

**Body & UI font:** Inter (variable) for body text, navigation, buttons, forms, labels, captions, sub-headings (`h3`–`h6`), and code snippets.

**Fallback stacks:**

```css
/* Body and everything else */
font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
/* Headings */
font-family: "GT Walsheim", "Helvetica Neue", Arial, sans-serif;
```

Headings (`h1`, `h2`) always use the display family at Medium (500); everything else uses Inter. Within each family, establish hierarchy through size, weight, line height, letter spacing, and colour rather than mixing in further typefaces.

**OpenType features:** running body text enables Inter `cv11` (`font-feature-settings: "cv11" 1` on `body`). Display headings enable Walsheim `ss02` (`h1`, `h2` rule). Headline reserves Inter `cv05` for future use.

---

## 3. Typography Scale and Hierarchy

Display styles use GT Walsheim (Archivo stand-in) at Medium (500). Headline uses Inter at Bold (700). Body and supporting text use Inter at 400 or 500 according to emphasis. Negative letter spacing scales with display size. Tailwind tokens (`text-display-xxl`, `text-headline`, `text-body`, …) are defined in `globals.css` (`@theme inline`) with size, line height, letter spacing, and weight baked in.

| Token | Family | Size | Weight | Line height | Letter spacing | Feature | Usage |
|---|---|---:|---:|---:|---:|---|---|
| `display-xxl` | GT Walsheim | 110px | 500 | 0.85 | -5.5px | — | Exceptional hero moments |
| `display-xl` | GT Walsheim | 85px | 500 | 0.95 | -4.25px | ss02 | Major display headlines |
| `display-lg` | GT Walsheim | 62px | 500 | 1.0 | -3.1px | ss02 | Main hero or major section headline |
| `display-md` | GT Walsheim | 40px | 500 | 1.13 | -1.0px | — | Section headings |
| `headline` | Inter | 22px | 700 | 1.2 | -0.8px | cv05 | Subsection / card-group headings |
| `subhead` | Inter Variable | 24px | 400 | 1.3 | -0.01px | cv11 | Supporting standfirsts |
| `body-lg` | Inter Variable | 18px | 400 | 1.3 | -0.18px | cv11 | Hero supporting copy or introductions |
| `body` | Inter Variable | 15px | 400 | 1.3 | -0.15px | cv11 | Default body copy |
| `body-sm` | Inter Variable | 14px | 500 | 1.4 | -0.14px | cv11 | Secondary descriptions and footer text |
| `caption` | Inter Variable | 13px | 500 | 1.2 | -0.13px | cv11 | Captions and compact metadata |
| `micro` | Inter Variable | 12px | 400 | 1.2 | -0.12px | cv11 | Fine print, timestamps |
| `button` | Inter Variable | 14px | 500 | 1.0 | -0.14px | cv11 | Button labels |
| `code` | Inter Variable | 14px | 400 | 1.55 | 0 | cv11 | Code blocks and formula cards |

### Text hierarchy rules

1. Use one `h1` per page for the primary page heading.
2. Use `h2` for major sections and `h3` for subsections or card-group headings.
3. Do not choose heading levels only for visual size; preserve semantic order.
4. Use Medium (500) display face for `h1`/`h2` display headings, Bold (700) Inter for `headline` subsections, and 600 for smaller titles.
5. Body copy should normally be 16px or larger, especially for lesson content.
6. Use 14px text for secondary information, not for long educational passages.
7. Use 12–13px text sparingly for metadata and labels.
8. Use uppercase, letter-spaced text only for badges and pills — never as a kicker label above a heading.
9. Aim for roughly 60–80 characters per line for long-form copy.
10. Do not use amber as small text on white.
11. No eyebrows: never place a small label above a headline. The label text IS the heading (`h1`/`h2` with display styling); the former heading becomes supporting copy below it (see the WhoWeAre section pattern). On SEO content pages the `h1` keeps the primary keyword and any context line above it is plain body text (`text-sm`, `text-secondary`, normal case) — never an eyebrow.

### Responsive text sizes

| Element | Mobile | Tablet | Desktop |
|---|---:|---:|---:|
| Hero heading | 36–44px | 44–56px | 56–72px |
| Major section heading | 28–32px | 32–40px | 40–56px |
| Page heading | 24–28px | 28–32px | 32–40px |
| Card title | 16–18px | 18–20px | 18–24px |
| Hero supporting copy | 16px | 17–18px | 18px |
| Body text | 16px | 16px | 16px |
| Secondary text | 14px | 14px | 14px |
| Caption/label | 12–13px | 12–13px | 12–13px |

Large desktop display sizes are upper bounds, not mandatory sizes on small screens. Use fluid typography where appropriate.

---

## 4. Spacing and Gaps

Use a **4px base spacing unit**. Keep spacing values consistent instead of inventing one-off margins throughout the interface.

| Token | Value | Common use |
|---|---:|---|
| `space-1` | 4px | Icon/text micro-gap |
| `space-2` | 8px | Tight element gap |
| `space-3` | 12px | Compact control or label gap |
| `space-4` | 16px | Standard component gap |
| `space-6` | 24px | Card content gap |
| `space-8` | 32px | Large card padding or group gap |
| `space-12` | 48px | Section-internal spacing |
| `space-16` | 64px | Major section spacing on tablet |
| `space-section` | 96px | Major section spacing on desktop |

### Layout spacing

- Maximum content width: approximately **1280px**, centered.
- Horizontal page padding: **16px mobile**, **20px tablet**, **24px desktop**.
- Card padding: **24px** for standard cards; **32px** for featured/large cards.
- Major marketing section spacing: **96px desktop**, **64px tablet**, **40–48px mobile**.
- Keep dashboard and lesson layouts more compact than the public landing page.
- Maintain clear separation between headings, descriptions, controls, and content groups.
- Use consistent grid gaps: typically 16px mobile, 24px tablet, and 24–32px desktop.
- Avoid spacing so large that useful course information disappears below the fold.

### Border radius

| Token | Value | Usage |
|---|---:|---|
| `radius-xs` | 2px | Micro badges and dots |
| `radius-sm` | 4px | Small badges and compact controls |
| `radius-md` | 4px | Standard buttons and inputs |
| `radius-lg` | 8px | Cards and dialogs |
| `radius-xl` | 12px | Large panels |
| `radius-pill` | 9999px | Pills and status badges |
| `radius-full` | 50% | Avatars and circular icon buttons |

Use borders and surface contrast as the primary separation method. Avoid large decorative shadows.

---

## 5. Next.js and Tailwind CSS Implementation Notes

### Font setup

Use `next/font/google` for Inter and `next/font/local` for GT Walsheim.

```tsx
// app/layout.tsx
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const walsheim = localFont({
  src: [
    {
      path: "../fonts/gt-walsheim-font-family/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/gt-walsheim-font-family/GT-Walsheim-Medium-Trial-BF651b7fc728fb3.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/gt-walsheim-font-family/GT-Walsheim-Bold-Trial-BF651b7fc737c57.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-walsheim",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${walsheim.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

### CSS variables

Keep theme values centralized in a global stylesheet and reference them from Tailwind utilities or reusable component classes.

```css
:root,
:root[data-theme="light"] {
  color-scheme: light;
  --background: #ffffff;
  --surface: #ffffff;
  --surface-muted: #f5f6f8;
  --surface-subtle: #e5e5e5;
  --text-primary: #14213d;
  --text-secondary: #46536a;
  --text-muted: #687386;
  --border: #d9dee7;
  --accent: #fca311;
  --accent-hover: #e99100;
  --accent-pressed: #cc7f00;
  --on-accent: #14213d;
  --focus-ring: #14213d;
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --background: #0b1220;
  --surface: #111b2e;
  --surface-muted: #17243a;
  --surface-subtle: #14213d;
  --text-primary: #ffffff;
  --text-secondary: #d5dce7;
  --text-muted: #a6b0c0;
  --border: #2b3950;
  --accent: #fca311;
  --accent-hover: #ffb338;
  --accent-pressed: #e99100;
  --on-accent: #14213d;
  --focus-ring: #fca311;
}

body {
  background: var(--background);
  color: var(--text-primary);
  font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  font-feature-settings: "cv11" 1;
}

h1,
h2 {
  font-family: var(--font-display), "Helvetica Neue", Arial, sans-serif;
  font-weight: 500;
  letter-spacing: -0.03em;
}

h3,
h4,
h5,
h6 {
  font-family: var(--font-inter), -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
}
```

Display/body type tokens live in `@theme inline` (`--font-sans`, `--font-display`, `--text-display-xxl` … `--text-button`, each with size, line height, letter-spacing, and weight) so components use utilities like `text-display-lg` or `text-body-sm` instead of arbitrary values.

### Theme behaviour

- Light theme is the default fallback.
- On first visit, respect `prefers-color-scheme` if no saved preference exists.
- Persist explicit theme selection.
- Apply the selected theme before first paint to prevent a flash of the wrong theme.
- Use semantic variables for component backgrounds, text, borders, and accents.
- Do not blindly invert images, videos, or diagrams.
- Respect `prefers-reduced-motion`.

### Tailwind usage

- Reuse the Tailwind version and configuration conventions already established in the project.
- Use shared design tokens rather than repeating arbitrary hex values and spacing values in JSX.
- Prefer reusable components for typography, buttons, cards, and form controls.
- Avoid arbitrary values where a documented token exists.
- Keep responsive variants consistent across the application.

---

## 6. Accessibility Requirements

- Target WCAG 2.2 AA contrast requirements.
- Maintain at least 4.5:1 contrast for normal text and 3:1 for large text where applicable.
- Test both themes and interactive states, including focus, hover, disabled, error, and selected states.
- Provide visible keyboard focus.
- Use semantic HTML and a logical heading hierarchy.
- Do not rely on colour alone to communicate state.
- Ensure controls are comfortably tappable, targeting at least 44 × 44px where practical.
- Support browser zoom and text resizing without clipping.
- Respect reduced-motion preferences.
- Keep educational content readable on mobile and desktop.

---

## 7. Non-Negotiable Rules

1. Light theme is the default; dark theme must be fully supported.
2. Navy is the structural brand colour; amber is the accent.
3. White and grey dominate light-mode surfaces.
4. GT Walsheim at Medium is used for `h1`/`h2` display headings; Inter is used for body text and everything else.
5. Use the documented typography hierarchy instead of arbitrary font sizes.
6. Use a 4px spacing base and consistent spacing tokens.
7. Use semantic CSS variables for theme-dependent colours.
8. Avoid heavy shadows and unnecessary visual decoration.
9. Keep the design responsive, accessible, and consistent across every page.
10. Do not introduce additional brand colours without a clear semantic reason.
11. No eyebrow labels above headings — the label is the heading.
