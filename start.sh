#!/bin/sh

# Create database tables if they don't exist
echo "📋 Setting up database tables..."
psql "$DATABASE_URL" -f scripts/create-tables.sql || echo "⚠️ Table creation failed or tables already exist"

# Start the Next.js application (standalone)
echo "🎉 Starting Next.js application..."
node server.js