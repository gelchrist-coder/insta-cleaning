# Insta-Cleaning - Professional Cleaning Services Website

## Project Overview
A full-stack Next.js application for a professional cleaning services business where customers can book cleaning jobs for houses, offices, churches, events, restaurants, and similar places.

## Tech Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: SQLite with Prisma ORM
- **Authentication**: NextAuth.js
- **Form Handling**: React Hook Form with Zod validation

## Project Structure
```
/app                    # Next.js App Router pages
  /(public)            # Public pages (Home, About, Services, etc.)
  /(auth)              # Authentication pages
  /customer            # Customer dashboard pages
  /admin               # Admin dashboard pages
  /api                 # API routes
/components            # Reusable React components
/lib                   # Utility functions and configurations
/prisma                # Database schema and migrations
/types                 # TypeScript type definitions
```

## Key Features
- Online booking system with multi-step form
- Customer account management and booking history
- Admin dashboard for managing bookings, services, and staff
- Real-time booking status updates
- Responsive design for all devices

## Development Commands
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npx prisma studio` - Open database GUI
- `npx prisma db push` - Push schema changes to database
