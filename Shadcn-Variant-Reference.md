# Shadcn Variant — Reference Implementation

See `app/Leads/index.shadcn.jsx` for the complete pattern.

Apply identical transformation to: **Contacts**, **Companies**, **Tasks**, **Invoices**, **Sales**.

The only differences between modules are: column definitions, form fields, API endpoint.

---

## Infrastructure (done repo-wide)

| Item | Location |
|------|----------|
| `cn()` helper | `lib/utils.js` |
| shadcn primitives | `components/ui/button`, `input`, `card`, `badge`, `sonner` |
| Path alias | `@/*` via `jsconfig.json` |
| Toast | `sonner` — `import { toast } from "sonner"`; `<Toaster />` in `modules/Layout` |
| Shared modal/dropdown | `lib/ui/modal/FormModal.jsx`, `lib/ui/dropdown/ExportDropdown.jsx` use shadcn `Button` |

Install (already in `package.json`):

```bash
npm install sonner@1.7.4 @radix-ui/react-slot --legacy-peer-deps
```

`class-variance-authority`, `clsx`, and `tailwind-merge` were already present. CSS variables live in `globals.css`; `tailwind.config.js` maps shadcn tokens (`primary`, `card`, `border`, etc.).

---

## Substitution rules

| Before | After |
|--------|--------|
| `modules/UI/Button.jsx` / raw `<button className={scheme.primary…}>` | `<Button>` from `@/components/ui/button` |
| `rounded-xl border px-4 py-2.5` outline buttons | `<Button variant="outline">` |
| `useTheme().scheme.primary` on buttons | Default `<Button>` (uses `bg-primary` CSS vars) |
| Raw search `<input>` in bordered wrapper | `<Input>` with icon offset (`pl-9`) |
| `${colors.card} border … rounded-2xl` stat/chart shells | `<Card>`, `<CardHeader>`, `<CardContent>` |
| Priority/status pills with manual Tailwind | `<Badge variant="high\|medium\|low">` or `variant="secondary"` |
| Table row icon actions | `<Button variant="ghost" size="icon">` |
| Pagination page chips | `<Button variant="ghost\|secondary" size="sm">` |
| `react-toastify` | `sonner` — same API: `toast.success()`, `toast.error()` |
| `lucide-react` | **Unchanged** ✓ |

**Keep as-is:** table markup (`<table>`), sort/filter state, seed data, API handlers, Kanban drag-and-drop logic, Recharts charts (only wrap charts in `Card`).

---

## Per-module migration checklist

For each of `app/{Contacts,Companies,Tasks,Invoices,Sales}/index.jsx`:

1. Copy to `index.shadcn.jsx` (or migrate in place when ready to switch the page export).
2. Add imports:

```jsx
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
```

3. Remove `scheme` from `useTheme()` destructuring where buttons/cards no longer need accent classes.
4. Replace module-specific UI using the Leads file as a line-by-line guide:
   - **Contacts** — columns: name, email, company, createdAt; form: name, email, phone, company.
   - **Companies** — columns: company fields from seed; form: company-specific fields.
   - **Tasks** — columns: task title, assignee, due date, status; form: task fields.
   - **Invoices** — columns: invoice #, amount, status, date; form: invoice line items.
   - **Sales** — columns: deal/sale fields; form: sale-specific fields.
5. Wire the page when ready, e.g. in `pages/contacts.js`:

```jsx
// import { Contacts } from "../app";
import Contacts from "../app/Contacts/index.shadcn";
export default () => <Contacts />;
```

---

## Leads reference — what changed

| Section | Pattern |
|---------|---------|
| Stat tiles | `<Card>` + gradient blob + `<CardContent>` |
| Charts | `<Card>` + `<CardHeader>` / `<CardDescription>` |
| Toolbar | `<Input>` search + `<Button>` Add + `<ExportDropdown>` (already shadcn) |
| Data table | `<Card className="overflow-hidden">` wrapping existing `<table>` |
| Row actions | `Button variant="ghost" size="icon"` |
| Pagination | `Button` variants instead of raw `<button>` |
| Kanban count | `<Badge variant="secondary">` |
| Kanban priority | `<Badge variant={priority}>` |
| Modal fields | `<Input>`; selects/textarea use `cn()` + input ring classes |
| Avatar picker | `cn("border-primary ring-2…")` instead of `scheme.primary` |

Business logic (`handleSubmit`, `handleDrop`, `sortedLeads`, CSV export, etc.) is **unchanged** between `index.jsx` and `index.shadcn.jsx`.

---

## Adding more shadcn components

```bash
npx shadcn@latest add dialog table dropdown-menu --yes
```

`components.json` is configured for this repo (JSX, `@/` aliases, `globals.css` variables).

---

## Notes

- Project stays on **React 17** — use `sonner@1.7.x` with `--legacy-peer-deps`.
- Tables are not migrated to shadcn Table yet; only surrounding chrome uses `Card` + `Button`.
- Theme accent picker in the navbar still drives CSS variables; shadcn `primary` tokens read from `globals.css` / `.dark` class on `document.documentElement`.
