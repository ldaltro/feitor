#!/bin/sh

# Check if the database exists, if not create it and run migrations
if [ ! -f /data/production.db ]; then
  echo "Database not found. Creating and running migrations..."
  npx prisma migrate deploy
  echo "Seeding database with initial data..."
  npx tsx prisma/seed-production.ts
else
  echo "Database exists. Running any pending migrations..."
  npx prisma migrate deploy
fi

# Start the Next.js application (standalone)
node server.js