# Deploy to Vercel with AWS RDS (MySQL)

This project uses Prisma + MySQL.

## 1) Create your RDS MySQL database

In AWS RDS:
- Engine: MySQL
- Region: `eu-north-1` (your endpoint is in this region)
- Initial DB name: `insta_cleaning` (recommended)

## 2) Security Group inbound rules

In the RDS instance security group, allow TCP 3306:
- From your laptop IP (for initial setup/testing)
- From Vercel (Vercel does not provide stable outbound IPs on the default plan; if you temporarily open `0.0.0.0/0`, lock it down later)

## 3) Set env vars

### Vercel (Project → Settings → Environment Variables)

Required:
- `DATABASE_URL`
- `AUTH_SECRET`
- `NEXTAUTH_URL`

Recommended:
- Use different values per environment (Preview vs Production).

### DATABASE_URL format

```
mysql://<DB_USER>:<DB_PASSWORD>@insta-cleaning-db.cliwqcc0a0k7.eu-north-1.rds.amazonaws.com:3306/insta_cleaning
```

If your password contains special URL characters, URL-encode them in the URL (example: `@` → `%40`).

## 4) Run migrations + seed (one-time)

After Vercel deploy is configured, run these once from your laptop with `DATABASE_URL` set to the RDS connection string:

```bash
DATABASE_URL="mysql://..." npx prisma migrate deploy
DATABASE_URL="mysql://..." npm run db:seed
```

## 5) Vercel build settings

Build Command:
- `npm run vercel-build`

The repo includes a `vercel-build` script that runs Prisma migrations + generates Prisma Client + builds Next.

## Admin login

- URL: `/login`
- Seeded admin: `admin@instacleaning.com` / `admin123`
