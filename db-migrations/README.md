# Database Migrations

This directory contains SQL migration files for the TUFF+ INTEGRATOR database.

## Running Migrations

### Using Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of each migration file in order
4. Execute the SQL

### Using Supabase CLI

```bash
# Install Supabase CLI if not already installed
npm install -g supabase

# Link to your project
supabase link --project-ref your-project-ref

# Run migrations
supabase db push
```

### Manual Execution

Execute each migration file in numerical order:

1. `001_initial_schema.sql` - Creates initial tables for users, roles, and items

## Migration Order

- 001_initial_schema.sql - Initial MVP schema (users, items)

## Notes

- The default admin user password is 'admin123' - CHANGE THIS IN PRODUCTION
- All timestamps use UTC timezone
- UUIDs are used for all primary keys
