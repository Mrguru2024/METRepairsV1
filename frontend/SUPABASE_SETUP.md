# Supabase Setup Guide

## 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in your project details:
   - Project Name: MET Repairs
   - Database Password: (create a strong password and save it)
   - Region: Choose closest to your users
5. Wait for project to be created (takes ~2 minutes)

## 2. Get Your Database Connection String

1. In your Supabase project dashboard, go to **Settings** → **Database**
2. Scroll down to **Connection Pooling** → **Transaction pooler**
3. Copy the IPv4-compatible connection string
4. It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres`

## 3. Update Environment Variables

Add your Supabase connection string to `env.local`, `env.production`, and optionally `env.sample`:

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true&sslmode=require
```

Replace `[YOUR-PASSWORD]` and `[PROJECT-REF]` with your actual values.

## 4. Install Dependencies and Setup Database

From PowerShell (recommended on Windows), run:

```powershell
cd frontend
npm install
$env:DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true&sslmode=require"
npm run db:generate    # Generate Prisma client
npm run db:push        # Create tables in Supabase
npm run db:seed        # Create your super admin account
```

> Tip: keep the PowerShell window open so the `DATABASE_URL` environment variable stays in scope for all commands.

## 5. Verify Setup

1. Check your Supabase dashboard → **Table Editor**
2. You should see the `User` table with your super admin account
3. You can now log in at http://localhost:3000/login

## Production Setup

For production, create a separate Supabase project or use the same one with different connection pooling settings. Update `env.production` with your production database URL.

## Connection Pooling (Optional for Production)

For better performance in production, use Supabase's connection pooling (already covered above).

## Smoke Test Utility

After pushing the schema you can run a quick create/read/delete check against Supabase:

```powershell
$env:DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:6543/postgres?pgbouncer=true&sslmode=require"
npm run smoke:booking
```

This script provisions a temporary booking, verifies it exists, and removes it so the calendar stays clean.
