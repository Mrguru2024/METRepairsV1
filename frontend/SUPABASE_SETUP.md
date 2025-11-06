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
2. Scroll down to **Connection string** section
3. Select **URI** (not Connection Pooling)
4. Copy the connection string
5. It will look like: `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`

## 3. Update Environment Variables

Add your Supabase connection string to `env.local`:

```env
DATABASE_URL=postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
```

Replace `[YOUR-PASSWORD]` and `[PROJECT-REF]` with your actual values.

## 4. Install Dependencies and Setup Database

```bash
cd frontend
npm install
npm run db:generate    # Generate Prisma client
npm run db:push        # Create tables in Supabase
npm run db:seed        # Create your super admin account
```

## 5. Verify Setup

1. Check your Supabase dashboard → **Table Editor**
2. You should see the `User` table with your super admin account
3. You can now log in at http://localhost:3000/login

## Production Setup

For production, create a separate Supabase project or use the same one with different connection pooling settings. Update `env.production` with your production database URL.

## Connection Pooling (Optional for Production)

For better performance in production, use Supabase's connection pooling:

1. In Supabase dashboard → **Settings** → **Database**
2. Use the **Connection Pooling** connection string (port 6543)
3. Format: `postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres`

