# TUFF+ INTEGRATOR - MVP

A basic CRM + ERP system for TUFF+ Global, built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Supabase.

## Features (MVP)

- **User Authentication**: Login with username, password, and role selection
- **Role-Based Access**: ADMIN, MANAGER, EDITOR, SELF roles
- **Item Management**: Add and view house kits/items with prices
- **Database**: PostgreSQL via Supabase (Neon)

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- A Supabase account and project

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd crm-saas
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up Supabase**

   - Create a new project at [supabase.com](https://supabase.com)
   - Get your project URL and anon key from Settings > API
   - Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run database migrations**

   - Go to your Supabase project dashboard
   - Navigate to SQL Editor
   - Copy and paste the contents of `db-migrations/001_initial_schema.sql`
   - Execute the SQL

   This will create:

   - `user_account` table with a default admin user
   - `item` table for house kits/products
   - Required indexes and triggers

5. **Update default admin password** (Important!)

   The migration creates a default admin user with username `admin`. For MVP testing, the login accepts any password, but you should update this in production.

   To set a proper password hash, you can use a bcrypt generator or update via Supabase dashboard.

6. **Run the development server**

```bash
npm run dev
```

7. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

   You'll be redirected to `/login`. Use:

   - Username: `admin`
   - Password: (any password for MVP - see note above)
   - Role: `ADMIN`

## Project Structure

```
crm-saas/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Main ERP dashboard
│   ├── login/             # Login page
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page (redirects)
│   └── globals.css        # Global styles
├── components/            # React components
│   └── ui/               # shadcn/ui components
├── db-migrations/        # SQL migration files
├── lib/                  # Utility functions
│   ├── supabase/        # Supabase client setup
│   └── utils.ts         # Helper functions
└── public/              # Static assets
```

## Database Schema

### Tables

- **user_account**: User accounts with roles
- **item**: House kits and products

See `db-migrations/001_initial_schema.sql` for full schema details.

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## MVP Limitations

This is a minimal viable product with the following limitations:

- **Password Security**: MVP accepts any password for testing. Implement proper bcrypt verification in production.
- **Session Management**: Uses localStorage for session storage. Consider implementing proper JWT tokens or Supabase Auth.
- **No Password Reset**: Password reset functionality not included in MVP.
- **Basic UI**: Minimal styling and features focused on core functionality.

## Next Steps

For production, consider:

1. Implement proper password hashing and verification
2. Add Supabase Auth for better session management
3. Implement role-based route protection
4. Add user registration
5. Add password reset functionality
6. Expand item management (edit, delete, categories)
7. Add more ERP features (projects, orders, inventory)

## License

MIT
