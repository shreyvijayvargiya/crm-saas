# Setup Guide - TUFF+ INTEGRATOR MVP

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the project to be provisioned
3. Go to **Settings** > **API**
4. Copy your:
   - **Project URL**
   - **anon/public key**

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Database Migration

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `db-migrations/001_initial_schema.sql`
4. Paste into the SQL Editor
5. Click **Run** (or press Cmd/Ctrl + Enter)

This will create:

- `user_account` table with a default admin user
- `item` table for house kits/products
- All necessary indexes and triggers

### 5. Verify Database Setup

In Supabase dashboard, go to **Table Editor** and verify:

- ✅ `user_account` table exists with one row (admin user)
- ✅ `item` table exists (empty)

### 6. Start Development Server

```bash
npm run dev
```

### 7. Login

Navigate to [http://localhost:3000](http://localhost:3000)

**Default Login Credentials:**

- Username: `admin`
- Password: `(any password - MVP accepts any password for testing)`
- Role: `ADMIN`

## Creating Additional Users

You can create additional users via Supabase SQL Editor:

```sql
INSERT INTO user_account (username, password_hash, role, is_active)
VALUES
  ('manager1', 'mvp_placeholder_hash', 'MANAGER', true),
  ('editor1', 'mvp_placeholder_hash', 'EDITOR', true),
  ('user1', 'mvp_placeholder_hash', 'SELF', true);
```

**Note:** For MVP, any password will work. In production, implement proper password hashing.

## Troubleshooting

### "Invalid username or password"

- Make sure the user exists in the `user_account` table
- Check that `is_active` is `true`
- Verify the role matches what you selected in the dropdown

### "Failed to fetch items"

- Check your Supabase connection in `.env.local`
- Verify the `item` table exists
- Check browser console for detailed error messages

### Database connection issues

- Verify your Supabase project is active
- Check that your `.env.local` file has the correct values
- Make sure you're using the **anon key**, not the service role key

## Next Steps

After setup:

1. Add your first house kit item via the dashboard
2. Test the login/logout flow
3. Review the code structure for customization

## Production Considerations

Before deploying to production:

1. **Implement proper password hashing** - Replace MVP password acceptance with bcrypt verification
2. **Add session management** - Consider using Supabase Auth or JWT tokens
3. **Set up Row Level Security (RLS)** - Configure Supabase RLS policies
4. **Add environment validation** - Validate all required env variables on startup
5. **Add error logging** - Implement proper error tracking
6. **Update default admin password** - Change the default admin credentials
