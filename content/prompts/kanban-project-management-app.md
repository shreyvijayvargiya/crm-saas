Build a complete, editable **Kanban Project Management App** inside the existing frontend project.

The result should feel like a real product such as a lightweight Trello/Linear/ClickUp-style workspace.

### Project detection

First inspect the repository and identify whether it uses:

* Next.js
* React
* Vite

Reuse existing Tailwind CSS, shadcn/ui, lucide-react, layouts and design system.

Do not replace existing configuration.

Frontend-only:

* no backend
* no database
* no API calls
* no authentication
* no localStorage

Use shared in-memory React state.

### Application structure

Create only the pages needed:

* Workspace/Projects
* Kanban Board
* Task/Card detail

Support multiple boards/projects if useful for the business.

### Kanban

Create a fully functional drag-and-drop board.

Support:

* Drag cards between columns
* Reorder cards inside columns
* Create columns
* Rename columns
* Delete columns
* Create cards
* Edit cards
* Delete cards
* Duplicate cards
* Collapse columns
* Column card counts

Use the business workflow to determine the initial columns and keep them in logical order.

### Cards

Cards should support:

* Title
* Description
* Assignee
* Priority
* Status
* Labels/tags
* Due date
* Start date
* Checklist
* Comments/activity
* Related record where relevant

Clicking a card opens a detailed Sheet/modal.

### Board controls

Add:

* Search
* Filter by assignee
* Filter by priority
* Filter by label
* Filter by due date
* Sort options
* Clear filters

### UX

Drag-and-drop should feel smooth and reliable.

Use appropriate shadcn/ui components.

Use lucide-react icons.

Use restrained Framer Motion where useful, but don't animate every interaction.

Create realistic business-specific sample cards.

The board, cards and detail view must use the same React state.

If the project already contains SaaSCRM components, reuse them rather than rebuilding equivalents.

Finally run TypeScript/lint/build checks and fix errors introduced by your implementation.

### BUSINESS

[DESCRIBE THE BUSINESS, PROJECT WORKFLOW, CARD TYPES AND TEAM STRUCTURE HERE]
