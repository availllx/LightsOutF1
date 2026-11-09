# LightsOutF1 — Design System & Guidelines

Based on the official Formula 1 dashboard design tokens and specifications (`download.md`).

## 1. Intent & Identity
LightsOutF1 is a high-performance Formula 1 dashboard web application. The visual direction is structured, token-driven, and content-first, combining a stealth motorsport surface (`#15151e`), high-contrast technical typography (`Titillium Web`), and precision racing-red accents (`#e10600` / `#e03535`).

---

## 2. Design Tokens & Foundations

### Typography
- **Primary Font Family**: `'Titillium Web', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`
- **Mono Font Family**: `'Geist Mono', 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', monospace`
- **Scale**:
  - `font.size.xs`: `11px` (Telemetry labels, position numbers, round badges, section tags)
  - `font.size.sm`: `12px` (Timestamps, table sub-labels, secondary session times)
  - `font.size.md`: `14px` (Base body, table primary cells, metadata)
  - `font.size.lg`: `16px` (Card sub-headers, navigation links, prominent metrics)
  - `font.size.xl`: `17px` (Section headers, card race titles)
  - `font.size.2xl`: `20px` (Secondary page titles, circuit titles)
  - `font.size.3xl`: `24px` (Grand Prix titles, primary countdown numbers)
  - `font.size.4xl`: `32px` (Major page titles, championship hero headers)
- **Weights**:
  - `Regular`: `400`
  - `Semibold`: `600`
  - `Bold`: `700`
  - `Black`: `900` (Driver codes, positions, countdown units)

### Color Palette & Tokens
- **Surfaces**:
  - `surface.base`: `#0b0b10` (Solid near-black / charcoal canvas)
  - `surface.raised`: `#15151e` (Primary cards, table panels, navigation container)
  - `surface.overlay`: `#1b1b26` (Sub-cards, session chips, table hover rows)
  - `surface.active`: `#222230` (Selected elements, active states)
  - `surface.strong`: `rgba(255, 255, 255, 0.08)`
- **Background Architecture**:
  - Pure CSS static depth vignette (`radial-gradient`) with ultra-fine static micro-grain matte texture (zero CPU/GPU animation overhead).
  - No purple hues, glowing waves, or neon drop-shadows. Complete visual separation between `#0b0b10` base and `#15151e` content cards.
- **Borders**:
  - `border.default`: `#303037` (`rgb(48, 48, 55)`)
  - `border.subtle`: `rgba(255, 255, 255, 0.07)`
  - `border.active`: `#e10600` (Racing red accent border)
  - `border.focus`: `#e0dedc` (WCAG 2.2 AA compliant focus indicator)
- **Text & Content**:
  - `text.primary`: `#ffffff` (High-contrast headings, main names, points)
  - `text.secondary`: `#aaaaaa` (Circuits, nationalities, table headers)
  - `text.muted`: `#70707c` (Round indicators, session dates, tertiary notes)
  - `text.inverse`: `#f7f4f1`
- **Motorsport Accents**:
  - `accent.red`: `#e10600` (F1 signature racing red)
  - `accent.red.hover`: `#ff1801`
  - `accent.green`: `#00d26a` (Live green flag, finished status)
  - `podium.p1`: `#e10600` (Gold / Winner / Champion border & text)
  - `podium.p2`: `#c0c0c8` (Silver border & text)
  - `podium.p3`: `#cd7f32` (Bronze border & text)

### Spacing Scale
- `space.1`: `4px`
- `space.2`: `6px`
- `space.3`: `8px`
- `space.4`: `12px`
- `space.5`: `16px`
- `space.6`: `24px`
- `space.7`: `48px`

### Border Radii
- `radius.xs`: `8px` (Inputs, chips, grid cards, session badges)
- `radius.md`: `12px` (Feature cards, table enclosures)
- `radius.lg`: `16px` (Major dashboard cards, navigation shell)
- `radius.sm`: `1000px` (Pills, status badges, round indicator tags)

---

## 3. Component & Layout Rules

### Eliminating AI-Slop & Redundant SVG Waves
- **Anti-Pattern Removed**: Generic, identical SVG bezier curve gradients copy-pasted into card headers.
- **Replacement**: Authentic Formula 1 design language:
  - Clean speed-stripes (`border-l-4 border-l-[#e10600]`)
  - Precision telemetry grids
  - High-contrast typographic hierarchy
  - Subtle dark glassmorphism (`#15151e` at 85% opacity with `backdrop-blur-md`)
  - Dedicated state indicators for Live, Upcoming, and Finished sessions.

### Standardized Component Anatomy
1. **Navigation**: Floating `#15151e/85` container, active tab indicator in `#e10600`, focus ring `#e0dedc`.
2. **Page Headers**: Red tag pill + uppercase font-black headline (`32px`) + muted subtitle.
3. **Cards (`surface.raised`)**:
   - Background: `#15151e`
   - Border: `#303037` (hover: `#454550` or `#e10600`)
   - Header: Round indicator, status pill, GP title, circuit locality, date.
   - Body: Sessions / Phase content with monospace timing chips.
4. **Tables**:
   - Header: `11px` uppercase tracking-widest, `#70707c`, with border separator.
   - Rows: Hover background `#1b1b26`, podium border accents (`p1=red`, `p2=silver`, `p3=bronze`).
   - Cells: Monospace numbers for points and times; driver codes uppercase bold.
5. **Interactive Controls (Inputs, Selects, Buttons)**:
   - Default: `#1b1b26` bg, `#303037` border, `#aaaaaa` text.
   - Hover: `#222230` bg, `#454550` border.
   - Focus-Visible: `ring-2 ring-[#e0dedc] ring-offset-2 ring-offset-[#0e0e14]`.
   - Disabled: opacity 50%, not-allowed cursor.

---

## 4. Accessibility (WCAG 2.2 AA)
- Focus indicators: All interactive elements feature a visible ring `#e0dedc`.
- Color contrast: Ratio > 4.5:1 for body text (`#ffffff` and `#aaaaaa` on `#15151e`).
- Screen reader support:
  - Skip link at top of document.
  - Visually hidden `<h1>` for decorative text elements.
  - `role="timer"` and dynamic `aria-label` for countdowns.
  - `aria-live="polite"` for live grid updates.
- Touch targets: Minimum 44x44px clickable areas for mobile buttons and navigation controls.

