#!/bin/sh

# Check if the database exists, if not create it and run migrations
if [ ! -f /data/production.db ]; then
  echo "Database not found. Creating and running migrations..."
  npx prisma migrate deploy
  
  # Check if admin password is set before seeding
  if [ -z "$ADMIN_PASSWORD" ]; then
    echo "WARNING: ADMIN_PASSWORD environment variable is not set!"
    echo "The database has been created but no admin user was added."
    echo "Please set ADMIN_PASSWORD and run the seed script manually:"
    echo "  ADMIN_PASSWORD='YourSecurePassword123' npx tsx prisma/seed-production.ts"
  else
    echo "Seeding database with initial data..."
    npx tsx prisma/seed-production.ts
  fi
else
  echo "Database exists. Running any pending migrations..."
  npx prisma migrate deploy
fi

# Start the Next.js application (standalone)
node server.js