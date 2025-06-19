# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies with legacy peer deps
RUN npm ci --legacy-peer-deps

# Copy source files
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Install required packages for SQLite
RUN apk add --no-cache sqlite

# Copy standalone output
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Copy Prisma files and binaries
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/lib ./lib
COPY --from=builder /app/lib/generated/prisma/*.node ./lib/generated/prisma/

# Create data directory for SQLite
RUN mkdir -p /data

# Expose port
EXPOSE 3000

# Environment variables (with defaults where appropriate)
ENV DATABASE_URL="file:///data/production.db"
ENV NODE_ENV="production"

# Start script
COPY --from=builder /app/start.sh ./
RUN chmod +x ./start.sh

CMD ["./start.sh"]