Insta-Cleaning is a Next.js (App Router) website for a professional cleaning service with a guest-only booking flow and an admin dashboard.

## Getting Started

Install dependencies:

```bash
npm install
```

## Database (MySQL Workbench)

This project uses Prisma with MySQL so you can manage/view the database in MySQL Workbench.

1) Create the database + app user

- Open MySQL Workbench and connect as an admin user (often `root`).
- Open and run [mysql-workbench-setup.sql](mysql-workbench-setup.sql).
- Replace `CHANGE_ME_STRONG_PASSWORD` with your real password.

2) Set `DATABASE_URL`

- Update your `.env` `DATABASE_URL` to match the user/password you created.
- If your password contains special URL characters (like `@`, `:`, `/`, `#`), URL-encode them.
	- Example: `@` becomes `%40`.

3) Push schema + seed

```bash
npm run db:push
npm run db:seed
```

## Run the app

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Admin login is available at `/login` (not linked publicly). The seed script creates an admin user.

## Deploy (Vercel + AWS RDS)

- Use a hosted MySQL database (AWS RDS) — Vercel cannot connect to `localhost`.
- Follow the step-by-step guide in [docs/deploy-vercel-rds.md](docs/deploy-vercel-rds.md).
- Use [rds.env.template](rds.env.template) to fill in Vercel environment variables.


