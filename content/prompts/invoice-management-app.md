You are building a complete, editable **Invoice Management App** inside the user's existing frontend project.

The goal is to create a polished SaaS-style invoice application, not just an invoice table.

### Project detection

First inspect the repository.

Detect whether it uses:

* Next.js App Router
* Next.js Pages Router
* React + Vite
* React

Reuse the existing Tailwind CSS, shadcn/ui, lucide-react, layouts, theme, components and conventions.

Do not replace the existing framework or configuration.

If starting from an empty project, use React + Vite or Next.js based on the user's project.

This is a frontend-only application. Do not create APIs, databases, authentication, server actions or external API calls.

Use realistic in-memory mock data.

### Build the application

Create the pages needed for a complete invoice workflow:

* Dashboard
* Invoices
* Customers
* Create Invoice
* Invoice Preview
* Settings

The Dashboard should show useful business metrics such as total invoiced, paid, outstanding, overdue and recent invoices.

### Invoice table

Create an advanced editable invoice table with:

* Invoice number
* Customer
* Amount
* Issue date
* Due date
* Status
* Payment status

Support:

* Search
* Sorting
* Status filters
* Date filters
* Customer filters
* Amount filtering
* Row selection
* Bulk actions
* Add invoice
* Edit
* Duplicate
* Delete

Clicking an invoice opens its detail/preview.

### Invoice builder

Build a complete invoice editor supporting:

* Customer
* Invoice number
* Issue date
* Due date
* Line items
* Quantity
* Unit price
* Tax
* Discount
* Subtotal
* Total
* Currency
* Notes
* Payment terms

Totals must calculate automatically in the frontend.

### Invoice preview

Create a professional printable invoice matching the business context.

Support downloading/exporting the invoice as:

* PNG
* JPG
* PDF

Use browser/client-side functionality only.

### UX

Use shadcn/ui, Tailwind and lucide-react.

Use responsive layouts.

Use restrained Framer Motion animations.

Use badges for invoice status.

Use realistic customer and invoice data.

All create/edit/delete operations must update shared React state immediately.

Do not duplicate state between pages.

Finally, run the available TypeScript, lint and build checks and fix errors introduced by your implementation.

### BUSINESS

[DESCRIBE THE BUSINESS, CUSTOMERS, CURRENCY, INVOICE WORKFLOW AND BRANDING HERE]
