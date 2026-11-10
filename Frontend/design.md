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

**Interface font:** Inter for headings, body text, navigation, buttons, forms, labels, and captions.

**Code font:** JetBrains Mono for code snippets and technical code blocks, if included.

**Fallback stack:**

```css
font-family: Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
```

Use one family for the interface. Establish hierarchy through size, weight, line height, letter spacing, and colour rather than mixing unrelated typefaces.

---

## 3. Typography Scale and Hierarchy

Display weights use 700. Body and supporting text use 400, 500, or 600 according to emphasis. Negative letter spacing is reserved for large display text.

| Token | Size | Weight | Line height | Letter spacing | Usage |
|---|---:|---:|---:|---:|---|
| `display-xl` | 72px | 700 | 1.05 | -2.5px | Exceptional desktop homepage headline |
| `display-lg` | 56px | 700 | 1.1 | -2px | Main hero or major section headline |
| `display-md` | 40px | 700 | 1.15 | -1.5px | Section headings |
| `display-sm` | 32px | 700 | 1.2 | -1px | Subsection headings |
| `heading-xl` | 28px | 700 | 1.25 | -0.5px | Page headings |
| `title-lg` | 24px | 700 | 1.3 | -0.3px | Featured course/card title |
| `title-md` | 18px | 600 | 1.4 | 0 | Course and card titles |
| `title-sm` | 16px | 600 | 1.4 | 0 | Small titles and field labels |
| `stat-display` | 56px | 700 | 1.0 | -1.5px | Key metrics; use amber where contrast allows |
| `body-lg` | 18px | 400 | 1.6 | 0 | Hero supporting copy or introductions |
| `body-md` | 16px | 400 | 1.55 | 0 | Default body copy |
| `body-sm` | 14px | 400 | 1.55 | 0 | Secondary descriptions and footer text |
| `caption` | 13px | 500 | 1.4 | 0 | Captions and compact metadata |
| `label` | 12px | 600 | 1.4 | 1.2px | Section labels, category labels, small badges |
| `button` | 14px | 600 | 1.0 | 0 | Button labels |
| `nav-link` | 14px | 500 | 1.4 | 0 | Navigation links |
| `code` | 14px | 400 | 1.55 | 0 | Code blocks in JetBrains Mono |

### Text hierarchy rules

1. Use one `h1` per page for the primary page heading.
2. Use `h2` for major sections and `h3` for subsections or card-group headings.
3. Do not choose heading levels only for visual size; preserve semantic order.
4. Use 700 weight for display headings and 600 for smaller titles.
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

Use `next/font/google` for Inter and JetBrains Mono where appropriate.

```tsx
// app/layout.tsx
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable}`}>
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
}
```

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
4. Inter is used throughout the interface; JetBrains Mono is reserved for code.
5. Use the documented typography hierarchy instead of arbitrary font sizes.
6. Use a 4px spacing base and consistent spacing tokens.
7. Use semantic CSS variables for theme-dependent colours.
8. Avoid heavy shadows and unnecessary visual decoration.
9. Keep the design responsive, accessible, and consistent across every page.
10. Do not introduce additional brand colours without a clear semantic reason.
11. No eyebrow labels above headings — the label is the heading.
