# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

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

# Copy built application
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/node_modules ./node_modules

# Create data directory for SQLite
RUN mkdir -p /data

# Expose port
EXPOSE 3000

# Start script
COPY --from=builder /app/start.sh ./
RUN chmod +x ./start.sh

CMD ["./start.sh"]