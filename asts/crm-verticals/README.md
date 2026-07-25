# CRM Vertical ASTs

JSON configs that define each SaaS CRM “flavor” shown on `/demo`.

## Add a new vertical (humans or AI agents)

1. Copy `indie-stripe.json` (or `agency.json`) to `my-vertical.json`
2. Set unique `id`, `meta`, `homeRoute`, `sidebar`, `pages`, `entities`
3. Register the import in `index.js` → `verticalAstModules`
4. Keep `kind: "saas-crm-vertical"` and `version: 1`

## Shape

See `schema.js` for block types. Sidebar items use the same shape as `modules/navConfig.js` (`label`, `route`, `icon`, optional `children`, `keywords`).

## Runtime

- `utils/CrmVerticalContext.jsx` loads the active AST and feeds the Sidebar
- `/demo` renders a chooser grid from `listVerticalAsts()`
- Selecting a card sets `localStorage` key `saas-crm-vertical` and navigates to `homeRoute`

Pages still map to existing Next routes (hybrid). Future: render list pages from `pages[].blocks` via a shared block catalog.
