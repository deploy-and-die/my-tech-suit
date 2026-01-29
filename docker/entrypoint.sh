#!/bin/sh
set -eu

if [ "${SKIP_DB_MIGRATE:-false}" != "true" ]; then
  echo "Running database migrations"
  npx prisma migrate deploy
fi

exec "$@"
