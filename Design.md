# CRM SaaS Template

## Overview

A **dual-surface** product: a **marketing landing** with violet–indigo gradients, grid texture, and editorial hero copy; and a **dense CRM application shell** built on zinc neutrals with user-selectable accent schemes (blue default). The app mood is **modern SaaS operational**—clear hierarchy, bordered cards, rounded panels, subtle motion (Framer Motion), and **Lucide** icons throughout. Information density is high in modules (leads, pipeline, email, finance); the landing balances that with more whitespace and marquee CTAs.

**Implementation anchors for designers / vibe coders / agents**

- App chrome & semantic surfaces: `utils/theme.js` (`themeColors`, `colorSchemes`)
- Theme persistence & body backdrop: `utils/ThemeContext.jsx`
- Shadcn-style CSS variables (document theming hooks): `globals.css`
- Marketing page (independent light/dark toggle via `crm-landing-theme`): `app/LandingPage/index.jsx`
- Shell layout, AI panel, FABs: `modules/Layout/index.jsx`

---

## Colors

### Application shell (`themeColors` in `utils/theme.js`)

Neutrals are **Tailwind zinc**—not pure black/white. Primary actions invert by mode: dark text on white in light mode, light fill on dark in dark mode.

**Light**

| Role | Typical classes | Notes |
|------|-----------------|--------|
| Page backdrop | `bg-zinc-50/50`, body `#f4f4f5` (zinc-100) | From `ThemeContext` |
| Main / sidebar surface | `bg-white` (`primaryBackground`) | Bordered rounded regions |
| Text primary | `text-zinc-900` | Headings, labels |
| Muted surfaces | `bg-zinc-50`, `bg-zinc-100` secondaries | Rows, subtle panels |
| Muted text | `text-zinc-400`–`500` | Meta, placeholders |
| Borders / inputs | `border-zinc-200` | 1px dividers |

**Dark**

| Role | Typical classes | Notes |
|------|-----------------|--------|
| Page backdrop | `bg-black`, body `#09090b` (zinc-950) | Deep base |
| Main surface | `bg-zinc-950` (`primaryBackground`) | Primary panel |
| Cards | `bg-zinc-900` | Elevated islands |
| Text primary | `text-zinc-50` | |
| Muted text | `text-zinc-400`–`500` | |
| Borders | `border-zinc-800` | Lower contrast than light |

### Accent schemes (`colorSchemes`)

User-switchable accents (Navbar color picker). Each scheme supplies **primary button** (`bg-*-600` light / `bg-*-500` dark), **hover**, **focus ring**, and **chip** styles. Available keys: `blue` (default), `green`, `purple`, `orange`, `red`, `pink`, `indigo`, `zinc`. Use **`scheme.primary`**, **`scheme.chip`**, etc., from `useTheme()`—do not hard-code a single brand hue inside feature modules if the UI should respect the picker.

### Semantic & fixed accents in chrome

- **Success / confirmation**: emerald (`text-emerald-600` / `text-emerald-400` dark)—e.g. landing checklist icons.
- **Floating help actions** (layout FABs): `violet-600` / `violet-500` (AI), `orange-500` (How to use), `indigo-600` (Watch demo)—see `modules/Layout/index.jsx`.
- **Destructive**: map to Tailwind red or `destructive` HSL vars in `globals.css` where form-style components use them.

### Marketing landing (`app/LandingPage/index.jsx`)

- **Dark hero base**: `#06060a` with violet/blue radial glows + 64px grid overlay at low opacity.
- **Light hero base**: `bg-zinc-50` with analogous soft violet/blue glows.
- **Primary CTA (dark mode)**: white pill on near-black; **light mode**: `bg-zinc-900` pills.
- **Accent links / badges**: `violet-*` and `indigo-*` gradients (logo tile `from-violet-600 to-indigo-600`).
- **Focus on form fields**: violet ring (`focus:ring-violet-500/40`, violet border tint).
- **Form submit**: `bg-violet-600` → `hover:bg-violet-500`.

### CSS variables (`globals.css`)

`--radius: 0.5rem`; light/dark HSL tokens for `--background`, `--foreground`, `--border`, `--primary`, `--destructive`, `--ring`, etc.—useful when aligning custom components with shadcn-style patterns.

---

## Typography

- **Family**: Default **Tailwind `font-sans`** (system UI stack). No custom webfonts are loaded in `_app.js`; add a font in `pages/_app.js` + `tailwind.config.js` if you introduce a display face.
- **Weights**: Mostly **semibold** for titles and nav, **medium** for buttons/labels, **regular** for body.
- **Tracking**: `tracking-tight` on large headings (landing hero, section titles).
- **Scale (observed patterns)**:
  - Hero: `text-4xl`–`text-5xl` (landing)
  - Section titles: `text-2xl`–`text-3xl`
  - Card / module titles: `text-sm`–`text-base` `font-semibold`
  - Body: `text-sm`–`text-lg`
  - Meta / AI panel hint: `text-[10px]`–`text-xs`
- **Icons**: **Lucide React** at 14–20px in nav and cards; keep stroke icons consistent rather than mixing filled sets.

---

## Elevation

- **App**: Light mode favors **`shadow-sm`** on cards; dark mode uses **`shadow-lg`** in `themeColors` for a slightly deeper lift.
- **Landing**: Feature cards use `shadow-sm` → `hover:shadow-md`; nav uses **`backdrop-blur-md`** with translucent surface rather than heavy shadow.
- **Modals / video**: `shadow-2xl`, `bg-black/70` scrim.
- **AI mobile drawer**: `shadow-2xl` on the sliding panel.
- **Motion**: Short hovers (`transition-colors`, `duration-200`–`300`); Framer Motion for section reveals (`whileInView`, staggered delays).

---

## Components

- **App layout**: Outer `md:p-2` **`gap-2`**; **sidebar** `h-[98vh]`, `rounded-xl`, `border`, collapsible width `w-60`; **main** column `rounded-2xl`, `h-[98vh]`, `border`, scrollable with `.hidescrollbar` where needed.
- **Navbar**: Sticky within main; search modal; theme toggle; **accent swatches** map to `colorSchemes` keys; AI toggle.
- **Primary buttons (CRM)**: Compose `${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover}` from `useTheme()`.
- **Secondary / ghost**: Zinc fills and borders from `themeColors` (`secondary`, `hoverSecondary`, `border`).
- **Chips / tags**: `${scheme.chip}` or `chipDark` for dark-on-tint treatments.
- **Inputs**: `rounded-xl`, `border`, `text-sm`, `py-2.5`, `px-3`; focus ring from `getFocusRingClass(colorScheme)` where applied.
- **Cards / tables**: White or `zinc-900` card bg, `border-zinc-200` / `zinc-800`, frequent **`rounded-xl`**.
- **AI Assistant panel**: Fixed width **384px (`w-96`)** on desktop; dashed empty state; header with **Bot** icon in bordered **`rounded-xl`** tile.
- **Landing**:
  - **Pill CTAs** and nav theme control: **`rounded-full`**
  - **Feature cards**: `rounded-2xl`, `p-5`, border + hover border tint toward violet
  - **Contact form**: `rounded-2xl` container; inputs `rounded-xl`; primary submit violet fill
- **Toasts**: `react-toastify` + `react-toast` (position bottom-right in layout).

---

## Component recipes

Copy-paste these patterns inside the **CRM shell** (any page under layout with `ThemeProvider`). Adjust paths to `useTheme` / `getFocusRingClass` from your file depth (`../../utils/...`, `../../../utils/...`, etc.).

### Primary button

```jsx
import { useTheme } from "../../utils/useTheme"; // adjust relative path

const { scheme } = useTheme();

<button
	type="button"
	className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors ${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover}`}
>
	Save changes
</button>
```

### Secondary / outline button

```jsx
import { useTheme } from "../../utils/useTheme";

const { colors } = useTheme();

<button
	type="button"
	className={`inline-flex items-center justify-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors ${colors.border} ${colors.secondary} ${colors.secondaryForeground} ${colors.hoverSecondary}`}
>
	Cancel
</button>
```

### Module shell (rounded-2xl container)

Matches the bordered, elevated card idioms inside the main column.

```jsx
import { useTheme } from "../../utils/useTheme";

const { colors } = useTheme();

<div className={`rounded-2xl border p-4 sm:p-6 ${colors.border} ${colors.card} ${colors.shadow}`}>
	<h2 className={`text-base font-semibold ${colors.cardForeground}`}>Module title</h2>
	<p className={`mt-1 text-sm ${colors.mutedForeground}`}>Description or helper text.</p>
	<div className="mt-4">{/* table, form, or list */}</div>
</div>
```

### Accent chip / tag

`scheme.chip` already matches the current light/dark mode + color picker.

```jsx
import { useTheme } from "../../utils/useTheme";

const { scheme } = useTheme();

<span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${scheme.chip}`}>
	Qualified
</span>
```

### Text input

Same pattern as `app/Leads/index.jsx` and other forms: `outline-none`, `placeholder:${colors.mutedForeground}`, and `getFocusRingClass(colorScheme)`.

```jsx
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const { colors, colorScheme } = useTheme();

<input
	type="text"
	className={`w-full rounded-xl border px-3 py-2.5 text-sm outline-none transition-colors ${colors.border} ${colors.input} ${colors.background} ${colors.foreground} placeholder:${colors.mutedForeground} ${getFocusRingClass(colorScheme)}`}
	placeholder="Search…"
/>
```

### Muted inset panel (lists / side details)

```jsx
import { useTheme } from "../../utils/useTheme";

const { colors } = useTheme();

<div className={`rounded-xl border p-3 ${colors.border} ${colors.muted}`}>
	<p className={`text-xs ${colors.mutedForeground}`}>Supporting content</p>
</div>
```

---

## When creating a new module

Use this as a **build checklist** so new pages stay consistent with the shell and color picker.

1. **Use colors from `useTheme()`** — Destructure `colors` and `scheme` at the top of the module. Put surfaces, borders, and text on `${colors.*}`; primary actions and accent chips on `${scheme.*}`. Don’t introduce a new brand hex unless it is landing-only.
2. **Wrap the page body in a `rounded-2xl` container** — Match the main column: `border`, `${colors.border}`, `${colors.card}` (or `primaryBackground` + `border` if you need a full-bleed inner page—follow neighboring modules in `app/`).
3. **Use Lucide icons only** — `import { IconName } from "lucide-react"`; size with `className="h-4 w-4"` (or `h-5 w-5` for hero-style rows). No `react-icons` in new CRM UI unless you are extending an existing screen that already uses them.
4. **Keep spacing on the 4px grid** — Prefer `px-4 py-3` or `p-4 sm:p-6` for section padding; use `gap-3` or `gap-4` between blocks; dense tables can use `py-2 px-3` on rows like existing list pages.
5. **Wire focus states** — For inputs, use `outline-none` plus `${getFocusRingClass(colorScheme)}` from `utils/theme.js`, copied from a sibling screen (e.g. `app/Leads/index.jsx`).
6. **Respect i18n** — Add copy through the same `react-i18next` / `AutoTranslate` patterns as other `app/*` modules so strings stay translatable.
7. **Optional motion** — If you add Framer Motion, keep durations ~0.2–0.45s and prefer `whileInView` with `viewport={{ once: true }}` for list sections, consistent with the landing page and layout.

---

## Spacing

- **Base**: Tailwind 4px grid (`1` = 4px). Prefer **2, 3, 4, 5, 6, 8, 12, 16** for gaps and padding.
- **Layout**: `gap-2` between sidebar and main; section padding often **`px-4 sm:px-6`** on landing with **`max-w-6xl`** containers.
- **CRM**: Compact sidebar items (`py-1 px-2`, `gap-1`); balance density with consistent **16px** horizontal rhythm in forms where possible.

---

## Border radius

| Token / class | Use |
|---------------|-----|
| `rounded-full` | Pills, FABs, icon-only theme toggle on landing |
| `--radius` / `rounded-lg` family | Shadcn-aligned defaults in config |
| `rounded-xl` | Sidebar, inputs, small panels, AI header icon |
| `rounded-2xl` | Main content shell, landing feature cards, modals |

---

## Motion & data visualization

- **Framer Motion** for landing (`fadeUp`, hero entrance) and layout (AI panel width, mobile drawer).
- **Recharts** for dashboard charts—keep chart colors harmonized with the active `colorScheme` or zinc neutrals.
- **Dnd-kit** for draggable pipelines—preserve existing hit targets and borders when modifying cards.

---

## Internationalization & content

- **`i18n`** via `react-i18next`; layout wraps pages with **`I18nextProvider`** and **`AutoTranslate`**. New user-facing strings should go through the same patterns as existing modules.

---

## Do’s and Don’ts

- **Do** use `useTheme()` → `colors` and `scheme` for any new screen inside the CRM shell so light/dark and accent picker stay coherent.
- **Do** mirror **zinc** neutrals (`zinc-50` … `zinc-950`) for app surfaces rather than introducing one-off gray scales.
- **Do** keep **landing** violet/indigo story separate: if you extend marketing, reuse **gradient**, **grid**, and **pill** idioms established in `app/LandingPage/index.jsx`.
- **Do** maintain **rounded-xl / 2xl** hierarchy—sidebar smaller radius than main shell.
- **Do** use **Lucide** icons with consistent sizes (typically `w-3 h-3`–`w-5 h-5` in dense UI).
- **Don’t** use the accent palette for large background fills except chips, CTAs, and focused highlights—reserve big areas for zinc/white/black.
- **Don’t** mix unrelated icon families alongside Lucide in the same toolbar or list row.
- **Don’t** hard-code **`#000` / `#fff`** text; use **`zinc-900`** / **`zinc-50`** (or foreground tokens) for readable contrast on tinted panels.
- **Don’t** add heavy drop shadows on every static row—elevate **modals**, **FABs**, and **hover** states primarily.
- **Don’t** bypass theme context for primary actions—prefer **`scheme.*`** classes so the Navbar color picker remains truthful.
