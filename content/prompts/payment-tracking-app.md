Build a complete, editable **Payment Tracking App** for the business described below.

This should feel like a real financial operations dashboard, not simply a transaction table.

### Project detection

First inspect the existing repository.

Support existing:

* Next.js
* React
* Vite

Reuse existing Tailwind, shadcn/ui, lucide-react, theme and components.

Do not replace project configuration.

The application must be frontend-only.

Do not create APIs, databases, authentication, server actions or external API calls.

Use realistic in-memory mock state that resets on refresh.

### Application

Create the pages actually required by the business, such as:

* Dashboard
* Payments
* Customers
* Invoices/Orders if required
* Payment detail

Do not create unnecessary pages.

### Dashboard

Show useful metrics based on the business:

* Total revenue
* Successful payments
* Pending payments
* Failed payments
* Refunded amount
* Outstanding amount

Use charts only where they provide useful information.

### Payment table

Create an advanced editable table.

Visible fields should include the most important business-specific fields, such as:

* Payment/reference ID
* Customer
* Amount
* Date
* Method
* Status
* Related invoice/order

Support:

* Global search
* Sorting
* Multiple filters
* Status dropdown
* Payment-method dropdown
* Customer filter
* Date-range filter
* Amount filter
* Row selection
* Bulk actions
* Add payment
* Edit
* Delete
* Duplicate where useful

Clicking a row opens a detail Sheet/modal containing all payment information.

### Payment workflow

Infer appropriate payment states from the business.

For example:

Pending → Processing → Paid → Failed → Refunded

Do not blindly use these if the business requires different states.

### UX

Use shadcn/ui components and Tailwind.

Use deterministic status badges.

Use realistic business-specific payment data.

Keep table, dashboard and detail views connected to the same React state.

All editing happens instantly in memory.

Make the application responsive and polished.

Use Framer Motion only for subtle page/row transitions.

Finally run TypeScript/lint/build checks and fix implementation errors.

### BUSINESS

[DESCRIBE THE BUSINESS, HOW CUSTOMERS PAY, PAYMENT METHODS, CURRENCY AND PAYMENT WORKFLOW HERE]
