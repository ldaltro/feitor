# Deployment Guide for Fly.io

## Prerequisites
- Install Fly CLI: `brew install flyctl` (macOS) or see [Fly.io docs](https://fly.io/docs/hands-on/install-flyctl/)
- Create a Fly.io account: `fly auth signup`

## Initial Setup

1. **Login to Fly.io**
   ```bash
   fly auth login
   ```

2. **Create the app** (only needed once)
   ```bash
   fly apps create vdg-app
   ```

3. **Create a volume for SQLite database** (only needed once)
   ```bash
   fly volumes create vdg_data --region gru --size 1
   ```

## Deployment

1. **Deploy the application**
   ```bash
   fly deploy
   ```

2. **Check deployment status**
   ```bash
   fly status
   ```

3. **View logs**
   ```bash
   fly logs
   ```

## Database Management

### Access the database
```bash
fly ssh console
cd /data
sqlite3 production.db
```

### Backup database
```bash
fly ssh console -C "sqlite3 /data/production.db .dump" > backup.sql
```

### Restore database
```bash
cat backup.sql | fly ssh console -C "sqlite3 /data/production.db"
```

## Environment Variables

Set any additional environment variables:
```bash
fly secrets set SECRET_KEY="your-secret-key"
```

## Scaling

### Scale horizontally (not recommended for SQLite)
```bash
fly scale count 1
```

### Scale vertically
```bash
fly scale vm shared-cpu-2x --memory 2048
```

## Monitoring

- View app dashboard: `fly dashboard`
- Check metrics: `fly metrics`

## Troubleshooting

1. **SSH into the container**
   ```bash
   fly ssh console
   ```

2. **Check database file**
   ```bash
   ls -la /data/
   ```

3. **Run migrations manually**
   ```bash
   fly ssh console -C "cd /app && npx prisma migrate deploy"
   ```

## Important Notes

- SQLite database is stored in `/data/production.db`
- The volume `vdg_data` persists the database between deployments
- Only one instance should run at a time (SQLite limitation)
- Regular backups are recommended