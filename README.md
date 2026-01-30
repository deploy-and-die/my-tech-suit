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

### Using the Docker database from the host

When you run Next.js directly on your machine but still want to reuse the Postgres
container, expose the database and run migrations from the host. Migrations live in
`prisma/migrations`—commit them so every environment can apply the same schema.

1. Start the database: `docker compose up -d postgres` (port `5432` is published to `localhost`).
2. Use `postgresql://mytech:mytech@localhost:5432/mytech?schema=public` as `DATABASE_URL` in `.env.local`.
3. Run `npm run db:ready` whenever you start the stack. This waits for PostgreSQL to accept connections and then executes `prisma migrate deploy` against the exposed port.
4. Start your dev server with `npm run dev`.

You can automate steps 1–4 with `make up`, which starts the database, waits for it via `npm run db:ready`, and finally runs `npm run dev`. Override the defaults with `DB_URL=...` or `NEXTPORT=4000 make up` if needed.

This flow keeps Prisma migrations in sync even though the API and database are
running in different environments.

### Hot-reload while developing in Docker

Use the dev override file to mount your working tree into the container and run `next dev`. Code changes are recompiled automatically without restarting Compose:

```bash
docker compose \
  -f docker-compose.yml \
  -f docker-compose.dev.yml \
  up --build
```

The override mounts the current repository at `/app`, keeps `node_modules` in a named volume, and starts `npm run dev -- --hostname 0.0.0.0 --port 3000` so the Next.js dev server is reachable from your host. Database migrations are skipped in this mode (set `SKIP_DB_MIGRATE=false` if you want to test them). Stop the stack with `Ctrl+C` when you are done.
