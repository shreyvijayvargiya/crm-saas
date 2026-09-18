Build a complete, editable **Calendar and Scheduling App** inside the existing frontend project.

The application should support the calendar workflow required by the business rather than being a generic date picker.

### Project detection

First inspect the repository.

Detect whether it uses Next.js, React or Vite.

Reuse the existing Tailwind CSS, shadcn/ui, lucide-react, theme and components.

Do not replace existing project configuration.

Frontend-only:

* no backend
* no database
* no API calls
* no authentication
* no localStorage

Use shared in-memory React state.

### Calendar types

Understand the business and enable only the relevant calendar types:

* Tasks
* Meetings
* Content
* Social posts
* Subscriptions
* Appointments
* Events
* Deadlines

### Views

Support:

* Month
* Week
* Day
* Agenda

### Events

Users must be able to:

* Create events
* Edit events
* Delete events
* Drag events to another date/time
* Resize event duration
* Move events between time slots
* Open event details

The event modal should include:

* Title
* Description
* Start date
* Start time
* End date
* End time
* Event type
* Status
* Priority
* Assignee
* Tags
* Related business record

### Calendar interactions

Support:

* Click empty time slot → create event
* Click event → edit event
* Drag event → update date/time
* Resize event → update duration
* Search
* Event-type filters
* Assignee filters
* Status filters
* Today button
* Previous/next navigation

Use color-coded event categories consistently.

### Business-specific behavior

Infer the correct event structure from the business.

For example:

Content business:

Calendar → content ideas → writing → review → publishing

Sales business:

Calendar → calls → meetings → follow-ups → demos

Subscription business:

Calendar → renewals → billing dates → cancellations

Do not add irrelevant functionality.

### UX

Use shadcn/ui, Tailwind and lucide-react.

Make the calendar responsive.

Use realistic sample events.

Use restrained Framer Motion animations.

All calendar changes must update shared React state immediately.

Finally run TypeScript/lint/build checks and fix errors introduced by your implementation.

### BUSINESS

[DESCRIBE THE BUSINESS, CALENDAR USE CASES, EVENT TYPES AND WORKFLOW HERE]
