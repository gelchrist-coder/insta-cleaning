# Deploy to Vercel with Supabase (Postgres)

This project uses Prisma.

## 1) Create a Supabase project

In Supabase:
- Create a new project
- Go to **Project Settings → Database**
- Copy both connection strings:
  - **Connection string (Transaction pooler / 6543)** → use as `DATABASE_URL`
  - **Direct connection (5432)** → use as `DIRECT_URL`

## 2) Set Vercel environment variables

Vercel → Project → Settings → Environment Variables:

- `DATABASE_URL` (pooler / 6543)
- `DIRECT_URL` (direct / 5432)
- `AUTH_SECRET` (long random string)
- `NEXTAUTH_URL` (your deployed https url)
- `AUTH_TRUST_HOST=true`

## 3) Run migrations + seed (first time)

After env vars are set, redeploy. Then run once from your laptop:

```bash
DATABASE_URL="..." DIRECT_URL="..." npx prisma migrate deploy
DATABASE_URL="..." DIRECT_URL="..." npm run db:seed
```

## Admin login

- URL: `/login`
- Seeded admin: `admin@instacleaning.com` / `admin123`
