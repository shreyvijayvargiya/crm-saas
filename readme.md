# Next.js Frontend Boilerplate for CRM Application

This is a Next.js frontend boilerplate designed for building responsive SaaS products. It provides a solid foundation for developers to create modern web applications with ease.

## Key Features

- **Responsive Design**: Built with Tailwind CSS, ensuring your application looks great on all devices.
- **Component-Based Architecture**: Utilize reusable components for a more organized and maintainable codebase.
- **Smooth Animations**: Integrate GSAP for smooth animations and transitions throughout your application.
- **Typewriter Effect**: Add engaging text animations with the `react-simple-typewriter` library.
- **Customizable Workflows**: Tailor the application to fit your specific needs with a flexible structure.

## How to Run the Repository

1. **Install Dependencies**:

   ```bash
   npm install
   ```

2. **Run the Development Server**:

   ```bash
   npm run dev || yarn run dev
   ```

3. **Open Your Browser**:
   Navigate to `http://localhost:3000` to view your application in action.

---

## 📚 Documentation

### 🔌 API Integration Guide (For Customers/Users)

This section is for customers who want to integrate this admin template with their existing backend application using REST API.

#### Overview

This CRM admin template is designed to work with any REST API backend. Currently, the application uses mock data, but you can easily connect it to your backend by implementing API service functions.

#### Base API Configuration

1. **Create an API Configuration File**

   Create a new file `lib/api/config.js`:

   ```javascript
   const API_BASE_URL =
   	process.env.NEXT_PUBLIC_API_BASE_URL || "https://your-api-domain.com/api";
   const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || "v1";

   export const API_CONFIG = {
   	baseURL: `${API_BASE_URL}/${API_VERSION}`,
   	timeout: 30000,
   	headers: {
   		"Content-Type": "application/json",
   	},
   };

   // Get API key from environment or localStorage
   export const getApiKey = () => {
   	if (typeof window !== "undefined") {
   		return (
   			localStorage.getItem("api_key") || process.env.NEXT_PUBLIC_API_KEY
   		);
   	}
   	return process.env.NEXT_PUBLIC_API_KEY;
   };
   ```

2. **Set Environment Variables**

   Create a `.env.local` file in the root directory:

   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com/api
   NEXT_PUBLIC_API_VERSION=v1
   NEXT_PUBLIC_API_KEY=your-api-key-here
   ```

#### API Service Implementation

Create a centralized API service file `lib/api/client.js`:

```javascript
import { API_CONFIG, getApiKey } from "./config";

class ApiClient {
	constructor() {
		this.baseURL = API_CONFIG.baseURL;
		this.timeout = API_CONFIG.timeout;
	}

	async request(endpoint, options = {}) {
		const url = `${this.baseURL}${endpoint}`;
		const apiKey = getApiKey();

		const config = {
			...options,
			headers: {
				...API_CONFIG.headers,
				...(apiKey && { Authorization: `Bearer ${apiKey}` }),
				...options.headers,
			},
		};

		try {
			const response = await fetch(url, config);

			if (!response.ok) {
				throw new Error(`API Error: ${response.status} ${response.statusText}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.error("API Request Failed:", error);
			throw error;
		}
	}

	get(endpoint, params = {}) {
		const queryString = new URLSearchParams(params).toString();
		const url = queryString ? `${endpoint}?${queryString}` : endpoint;
		return this.request(url, { method: "GET" });
	}

	post(endpoint, data) {
		return this.request(endpoint, {
			method: "POST",
			body: JSON.stringify(data),
		});
	}

	put(endpoint, data) {
		return this.request(endpoint, {
			method: "PUT",
			body: JSON.stringify(data),
		});
	}

	patch(endpoint, data) {
		return this.request(endpoint, {
			method: "PATCH",
			body: JSON.stringify(data),
		});
	}

	delete(endpoint) {
		return this.request(endpoint, { method: "DELETE" });
	}
}

export const apiClient = new ApiClient();
```

#### Required REST API Endpoints

Your backend should implement the following REST API endpoints:

##### 1. **Leads API**

```
GET    /leads              - Get all leads (with pagination, filtering, sorting)
GET    /leads/:id          - Get a specific lead
POST   /leads              - Create a new lead
PUT    /leads/:id          - Update a lead
DELETE /leads/:id          - Delete a lead
```

**Request/Response Examples:**

```javascript
// GET /leads?page=1&limit=10&sort=createdAt&order=desc
{
  "data": [
    {
      "id": "lead_001",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "123-456-7890",
      "status": "new",
      "source": "website",
      "createdAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 100,
    "totalPages": 10
  }
}

// POST /leads
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "234-567-8901",
  "status": "new",
  "source": "referral"
}
```

##### 2. **Contacts API**

```
GET    /contacts           - Get all contacts
GET    /contacts/:id       - Get a specific contact
POST   /contacts           - Create a new contact
PUT    /contacts/:id       - Update a contact
DELETE /contacts/:id       - Delete a contact
```

##### 3. **Companies API**

```
GET    /companies          - Get all companies
GET    /companies/:id      - Get a specific company
POST   /companies          - Create a new company
PUT    /companies/:id      - Update a company
DELETE /companies/:id      - Delete a company
```

##### 4. **Invoices API**

```
GET    /invoices           - Get all invoices
GET    /invoices/:id       - Get a specific invoice
POST   /invoices           - Create a new invoice
PUT    /invoices/:id       - Update an invoice
DELETE /invoices/:id       - Delete an invoice
GET    /invoices/:id/pdf   - Download invoice as PDF
```

##### 5. **Tasks API**

```
GET    /tasks              - Get all tasks
GET    /tasks/:id          - Get a specific task
POST   /tasks              - Create a new task
PUT    /tasks/:id          - Update a task
DELETE /tasks/:id          - Delete a task
PATCH  /tasks/:id/status   - Update task status
```

##### 6. **Sales API**

```
GET    /sales              - Get sales data/analytics
GET    /sales/revenue      - Get revenue statistics
GET    /sales/forecast     - Get sales forecast
```

##### 7. **API Keys Management**

```
GET    /api-keys           - Get all API keys
POST   /api-keys           - Create a new API key
DELETE /api-keys/:id       - Revoke an API key
```

##### 8. **Webhooks API**

```
GET    /webhooks           - Get all webhooks
GET    /webhooks/:id       - Get a specific webhook
POST   /webhooks           - Create a new webhook
PUT    /webhooks/:id       - Update a webhook
DELETE /webhooks/:id       - Delete a webhook
POST   /webhooks/:id/test  - Test a webhook
```

##### 9. **Integrations API**

```
GET    /integrations       - Get all integrations
POST   /integrations       - Connect an integration
DELETE /integrations/:id   - Disconnect an integration
```

##### 10. **Settings API**

```
GET    /settings           - Get user/account settings
PUT    /settings           - Update settings
```

#### Authentication

The template expects Bearer token authentication. Include the API key in the Authorization header:

```
Authorization: Bearer your-api-key-here
```

#### Error Handling

Your API should return errors in the following format:

```json
{
	"error": {
		"code": "ERROR_CODE",
		"message": "Human-readable error message",
		"details": {}
	}
}
```

#### Integration Steps

1. **Create API Service Files**

   For each module (Leads, Contacts, etc.), create a service file:

   ```javascript
   // lib/api/leads.js
   import { apiClient } from "./client";

   export const leadsApi = {
   	getAll: (params) => apiClient.get("/leads", params),
   	getById: (id) => apiClient.get(`/leads/${id}`),
   	create: (data) => apiClient.post("/leads", data),
   	update: (id, data) => apiClient.put(`/leads/${id}`, data),
   	delete: (id) => apiClient.delete(`/leads/${id}`),
   };
   ```

2. **Update Component State Management**

   Replace mock data with API calls in your components:

   ```javascript
   // app/Leads/index.jsx
   import { useState, useEffect } from "react";
   import { leadsApi } from "../../lib/api/leads";
   import { toast } from "react-toastify";

   const Leads = () => {
   	const [leads, setLeads] = useState([]);
   	const [loading, setLoading] = useState(true);

   	useEffect(() => {
   		fetchLeads();
   	}, []);

   	const fetchLeads = async () => {
   		try {
   			setLoading(true);
   			const response = await leadsApi.getAll({ page: 1, limit: 50 });
   			setLeads(response.data);
   		} catch (error) {
   			toast.error("Failed to fetch leads");
   			console.error(error);
   		} finally {
   			setLoading(false);
   		}
   	};

   	const handleAddLead = async (leadData) => {
   		try {
   			const newLead = await leadsApi.create(leadData);
   			setLeads([...leads, newLead]);
   			toast.success("Lead created successfully");
   		} catch (error) {
   			toast.error("Failed to create lead");
   		}
   	};

   	// ... rest of component
   };
   ```

3. **Add Loading States**

   Implement loading indicators while API calls are in progress.

4. **Handle Errors**

   Use toast notifications or error boundaries to handle API errors gracefully.

#### CORS Configuration

If your frontend and backend are on different domains, ensure your backend allows CORS:

```javascript
// Example Express.js CORS configuration
app.use(
	cors({
		origin: process.env.FRONTEND_URL || "http://localhost:3000",
		credentials: true,
	})
);
```

---

### 👨‍💻 Frontend Developer Documentation

This section is for frontend developers working on this Next.js repository.

#### Project Architecture

This project follows a modular, component-based architecture using Next.js 12 with the Pages Router.

```
crm-saas/
├── app/                    # Page Components (Business Logic)
│   ├── Home/              # Landing/Dashboard page
│   ├── Leads/             # Leads management page
│   ├── Contacts/          # Contacts management page
│   ├── Companies/         # Companies management page
│   ├── Sales/             # Sales analytics page
│   ├── Tasks/             # Tasks management page
│   ├── Invoices/          # Invoices management page
│   ├── Integrations/      # Third-party integrations page
│   ├── Webhooks/          # Webhooks management page
│   ├── ApiKeys/           # API keys management page
│   ├── Settings/          # Settings page
│   └── index.jsx          # Component exports
│
├── modules/                # Reusable UI Components
│   ├── Layout/            # Main layout wrapper
│   ├── Navbar/            # Top navigation bar
│   ├── Sidebar/           # Side navigation menu
│   ├── UI/                # Shared UI components (buttons, pagination, etc.)
│   └── index.jsx          # Module exports
│
├── pages/                  # Next.js Routes (File-based routing)
│   ├── _app.js            # App wrapper with global styles
│   ├── index.js           # Home route (/)
│   ├── leads.js           # Leads route (/leads)
│   ├── contacts.js        # Contacts route (/contacts)
│   └── ...                # Other routes
│
├── public/                 # Static assets
│   ├── companies/         # Company logos
│   └── people/            # User avatars
│
├── lib/                    # Utility functions (create this)
│   └── api/               # API client and services
│
├── globals.css             # Global styles
├── tailwind.config.js     # Tailwind CSS configuration
└── package.json           # Dependencies and scripts
```

#### Code Flow Architecture

##### 1. **Request Flow**

```
User Action
    ↓
Next.js Page (pages/*.js)
    ↓
App Component (app/*/index.jsx)
    ↓
API Service (lib/api/*.js) [To be implemented]
    ↓
Backend REST API
    ↓
Response → Component State Update
    ↓
UI Re-render
```

##### 2. **Component Hierarchy**

```
_app.js (Root)
    ↓
LayoutWrapper (modules/Layout)
    ├── Sidebar (modules/Sidebar)
    ├── Navbar (modules/Navbar)
    └── Page Component (app/*/index.jsx)
        └── UI Components (modules/UI)
```

#### Key Concepts

##### **Pages Router (Next.js 12)**

- Each file in the `pages/` directory becomes a route
- `pages/index.js` → `/`
- `pages/leads.js` → `/leads`
- `pages/_app.js` is a special file that wraps all pages

##### **Component Structure**

Each page component in `app/` follows this pattern:

```javascript
// app/Leads/index.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Leads = () => {
	// 1. State Management
	const [leads, setLeads] = useState([]);
	const [loading, setLoading] = useState(false);

	// 2. Data Fetching (useEffect)
	useEffect(() => {
		// Fetch initial data
	}, []);

	// 3. Event Handlers
	const handleAdd = () => {
		/* ... */
	};
	const handleUpdate = () => {
		/* ... */
	};
	const handleDelete = () => {
		/* ... */
	};

	// 4. Render
	return <div>{/* Component JSX */}</div>;
};

export default Leads;
```

##### **Layout System**

The `LayoutWrapper` component (`modules/Layout/index.jsx`) provides:

- **Sidebar Navigation**: Collapsible sidebar with menu items
- **Top Navbar**: Header with user info and notifications
- **Toast Notifications**: Global toast container
- **Responsive Design**: Mobile drawer for sidebar

##### **State Management**

Currently uses React's built-in `useState` and `useEffect` hooks. For complex state management, consider:

- **Context API**: For global state (user, theme, etc.)
- **React Query / SWR**: For server state management
- **Zustand / Redux**: For complex application state

#### Styling

##### **Tailwind CSS**

The project uses Tailwind CSS for styling:

- Configuration: `tailwind.config.js`
- Global styles: `globals.css`
- Utility-first approach

##### **Color Scheme**

The template uses a zinc/gray color palette:

- Background: `bg-zinc-100`, `bg-white`
- Borders: `border-zinc-200`
- Text: Various shades of gray/black

##### **Responsive Design**

- Mobile-first approach
- Breakpoints: `md:` (768px+)
- Sidebar hidden on mobile, shown as drawer

#### Adding New Features

##### **1. Create a New Page**

**Step 1:** Create component in `app/NewPage/index.jsx`:

```javascript
import React, { useState } from "react";

const NewPage = () => {
	const [data, setData] = useState([]);

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">New Page</h1>
			{/* Your content */}
		</div>
	);
};

export default NewPage;
```

**Step 2:** Export from `app/index.jsx`:

```javascript
export { default as NewPage } from "./NewPage";
```

**Step 3:** Create route in `pages/new-page.js`:

```javascript
import { NewPage } from "../app";
export default () => <NewPage />;
```

**Step 4:** Add to sidebar navigation in `modules/Sidebar/index.jsx`:

```javascript
{
  name: "New Page",
  icon: <YourIcon />,
  path: "/new-page",
}
```

##### **2. Create Reusable Components**

Add to `modules/UI/`:

```javascript
// modules/UI/Button.jsx
const Button = ({ children, onClick, variant = "primary" }) => {
	return (
		<button
			onClick={onClick}
			className={`px-4 py-2 rounded-lg ${
				variant === "primary" ? "bg-blue-500 text-white" : "bg-gray-200"
			}`}
		>
			{children}
		</button>
	);
};

export default Button;
```

##### **3. Integrate API Calls**

1. Create API service: `lib/api/newPage.js`
2. Import in component: `import { newPageApi } from '../../lib/api/newPage';`
3. Use in `useEffect` or event handlers

#### Best Practices

1. **Component Organization**

   - Keep components focused and single-purpose
   - Extract reusable logic into custom hooks
   - Use meaningful component and variable names

2. **State Management**

   - Keep state as local as possible
   - Lift state up only when necessary
   - Use `useMemo` and `useCallback` for performance

3. **Error Handling**

   - Always wrap API calls in try-catch
   - Show user-friendly error messages
   - Log errors for debugging

4. **Performance**

   - Use React.memo for expensive components
   - Implement pagination for large lists
   - Lazy load heavy components

5. **Code Style**
   - Use functional components and hooks
   - Follow consistent naming conventions
   - Add comments for complex logic

#### Development Workflow

1. **Start Development Server**

   ```bash
   npm run dev
   ```

2. **Make Changes**

   - Edit files in `app/` or `modules/`
   - Next.js hot-reloads automatically

3. **Test Changes**

   - Check browser console for errors
   - Test responsive design on different screen sizes
   - Verify API integrations (when implemented)

4. **Build for Production**
   ```bash
   npm run build
   ```

#### Common Patterns

##### **Modal Pattern**

```javascript
const [isModalOpen, setIsModalOpen] = useState(false);

const handleOpen = () => setIsModalOpen(true);
const handleClose = () => setIsModalOpen(false);

return (
	<>
		<button onClick={handleOpen}>Open Modal</button>
		{isModalOpen && (
			<div className="fixed inset-0 bg-black bg-opacity-50">
				<div className="modal-content">
					<button onClick={handleClose}>Close</button>
				</div>
			</div>
		)}
	</>
);
```

##### **Form Handling**

```javascript
const [formData, setFormData] = useState({ name: "", email: "" });

const handleChange = (e) => {
	setFormData({ ...formData, [e.target.name]: e.target.value });
};

const handleSubmit = async (e) => {
	e.preventDefault();
	// Submit form data
};
```

##### **Pagination**

```javascript
const [page, setPage] = useState(1);
const [limit] = useState(10);

const fetchData = async () => {
	const response = await api.get("/endpoint", { page, limit });
	setData(response.data);
};
```

#### Troubleshooting

**Issue: Build fails with OpenSSL error**

- Solution: Already fixed in `package.json` with `NODE_OPTIONS=--openssl-legacy-provider`

**Issue: Styles not applying**

- Check Tailwind config
- Ensure `globals.css` is imported in `_app.js`
- Verify PostCSS configuration

**Issue: API calls failing**

- Check CORS configuration on backend
- Verify API base URL in environment variables
- Check network tab in browser DevTools

#### Next Steps

1. **Implement API Integration**: Replace mock data with real API calls
2. **Add Authentication**: Implement login/logout flow
3. **Add Form Validation**: Use libraries like `react-hook-form` + `zod`
4. **Add Testing**: Set up Jest and React Testing Library
5. **Add TypeScript**: Migrate to TypeScript for type safety
6. **Optimize Performance**: Implement code splitting and lazy loading

---

## 📝 Additional Notes

- This template uses Next.js 12.0.0 with React 17
- Tailwind CSS 3.4+ for styling
- React Toastify for notifications
- Lucide React for icons
- GSAP for animations
