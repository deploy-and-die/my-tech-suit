# Engineering - From Idea To Impact

Opinionated portfolio + community platform built with Next.js App Router, Auth.js, and Prisma.

## Quick start

```bash
npm install
npm run dev
```

## Environment

```
DATABASE_URL=
NEXTAUTH_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

## Docker

Build a production image that matches the deployment container:

```bash
docker build -t my-tech-suit .
```

Run the full stack (Next.js app + PostgreSQL) locally:

```bash
docker compose up --build
```

This uses the default Postgres connection string `postgresql://mytech:mytech@postgres:5432/mytech?schema=public`. Use that URL when adding the `DATABASE_URL` secret (for example in CI/CD or Vercel) when you provision the companion Postgres instance. Override it in `.env` or through the Compose file if you deploy a managed database instead of the bundled container.

The application container automatically runs `prisma migrate deploy` on startup so schema changes are applied whenever it boots. Set `SKIP_DB_MIGRATE=true` if you prefer to manage migrations yourself.
