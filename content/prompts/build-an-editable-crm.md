# Build an Editable CRM Table

You are building a **frontend-only, Airtable/Notion-style CRM** inside this existing Next.js App Router project.

Use the existing stack and components where possible: **Next.js, Tailwind, shadcn/ui, lucide-react, and Framer Motion.**

No backend, database, API calls, authentication, or localStorage. Everything is editable mock state and resets on refresh.

## 1. Understand the business

From the business description below, determine:

* business type
* entities needed
* workflow/stages in order
* terminology used by the business
* important fields for each entity

Do not create unnecessary CRM entities.

## 2. Build the database-like tables

For each required entity, create an Airtable/Notion-style editable table.

Support:

* inline cell editing
* text
* email
* phone
* number
* currency
* dates
* status/select
* priority
* tags
* checkbox
* URL
* person/owner
* notes

Clicking a row opens a right-side detail Sheet containing all fields.

Keep tables to **5–7 important visible columns**; put remaining fields in the Sheet.

Add:

* search
* filtering
* sorting
* column visibility where useful
* empty states
* row hover
* add-record button
* delete record
* duplicate record where useful

## 3. Workflow view

If the entity has stages, also create a Kanban view using the stages in workflow order.

Table and Kanban must use the **same React state**.

## 4. UX

Create a clean sidebar + top-bar CRM shell.

Use restrained Framer Motion animations.

Add realistic seed data.

Add a small randomised fake-activity loop that occasionally creates a record or moves one forward and shows a toast.

## 5. Code structure

Use:

`app/(crm)/`
`components/crm/`
`lib/crm/`

Create reusable components for:

* DataTable
* EditableCell
* EntitySheet
* KanbanBoard
* CRMProvider
* ActivityToaster

First inspect the existing repository and reuse its configuration/components. Do not rewrite unrelated code.

Finally, run TypeScript/lint/build checks and fix errors you introduced.

## BUSINESS

[PASTE BUSINESS DESCRIPTION + WORKFLOW HERE]
