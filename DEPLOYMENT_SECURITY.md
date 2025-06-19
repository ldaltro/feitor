# Deployment Security Guide

## Important Security Notice

This application requires you to set a secure admin password during deployment. The default hardcoded password has been removed for security reasons.

## Required Environment Variables

Before deploying the application, you MUST set the following environment variables:

### For Production Deployment

```bash
# Required - Admin user password
ADMIN_PASSWORD="YourVerySecurePassword123"

# Optional - Admin username (defaults to "feitor")
ADMIN_USERNAME="feitor"

# Required - JWT secret for authentication
JWT_SECRET="your-random-secret-key-change-in-production"

# Database URL (defaults to SQLite in Docker)
DATABASE_URL="file:///data/production.db"
```

### Password Requirements

The admin password must meet the following criteria:
- Minimum 8 characters long
- At least one lowercase letter (a-z)
- At least one uppercase letter (A-Z)
- At least one number (0-9)

## Deployment Methods

### Docker Deployment

When running with Docker, pass the environment variables:

```bash
docker run -e ADMIN_PASSWORD="YourSecurePassword123" \
           -e JWT_SECRET="your-jwt-secret" \
           -e ADMIN_USERNAME="admin" \
           -p 3000:3000 \
           your-image-name
```

### Docker Compose

```yaml
version: '3.8'
services:
  app:
    image: your-image-name
    environment:
      - ADMIN_PASSWORD=YourSecurePassword123
      - JWT_SECRET=your-jwt-secret
      - ADMIN_USERNAME=admin
    ports:
      - "3000:3000"
    volumes:
      - ./data:/data
```

### Manual Setup

If you need to create the admin user manually:

```bash
ADMIN_PASSWORD="YourSecurePassword123" npm run create-user
```

## Security Best Practices

1. **Never commit passwords to version control**
2. **Use a password manager to generate secure passwords**
3. **Rotate the JWT_SECRET periodically**
4. **Use environment-specific passwords for different deployments**
5. **Enable HTTPS in production**
6. **Restrict database file access permissions**

## First-Time Setup

On first deployment:
1. The application will check for the database
2. If not found, it will create the database and run migrations
3. If `ADMIN_PASSWORD` is set, it will create the admin user
4. If `ADMIN_PASSWORD` is not set, you'll need to run the seed script manually

## Troubleshooting

If you forgot to set the admin password during deployment:

1. Access the container/server
2. Run: `ADMIN_PASSWORD="YourSecurePassword123" npx tsx prisma/seed-production.ts`
3. Restart the application

## Environment File Example

See `.env.example` for a complete list of environment variables and their descriptions.