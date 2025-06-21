#!/bin/bash

# Production Admin Setup Script
# This script helps set up the production admin user securely

echo "==================================="
echo "Production Admin Setup"
echo "==================================="
echo ""
echo "This script will help you set up the production admin user securely."
echo "The password will be set as a Fly.io secret and never stored in code."
echo ""

# Generate a secure memorable password in Portuguese
generate_password() {
    # Portuguese words for memorable password
    ADJECTIVES=("Forte" "Veloz" "Alto" "Novo" "Belo" "Grande" "Feliz" "Seguro")
    NOUNS=("Cavalo" "Touro" "Campo" "Gado" "Fazenda" "Pasto" "Cerca" "Curral")
    NUMBERS=("23" "47" "89" "12" "56" "78" "34" "91")
    SYMBOLS=("@" "#" "!" "&")
    
    # Select random elements
    ADJ=${ADJECTIVES[$RANDOM % ${#ADJECTIVES[@]}]}
    NOUN=${NOUNS[$RANDOM % ${#NOUNS[@]}]}
    NUM=${NUMBERS[$RANDOM % ${#NUMBERS[@]}]}
    SYM=${SYMBOLS[$RANDOM % ${#SYMBOLS[@]}]}
    
    echo "${ADJ}${NOUN}${NUM}${SYM}"
}

# Check if fly CLI is installed
if ! command -v fly &> /dev/null; then
    echo "ERROR: Fly CLI is not installed. Please install it first."
    exit 1
fi

# Set admin username
ADMIN_USERNAME="gustavo"
ADMIN_EMAIL="gustavo@fazendavistaalegre.com.br"

echo "Setting up admin user:"
echo "- Username: $ADMIN_USERNAME"
echo "- Email: $ADMIN_EMAIL"
echo ""

# Generate or prompt for password
read -p "Do you want to generate a secure password? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    ADMIN_PASSWORD=$(generate_password)
    echo ""
    echo "Generated password: $ADMIN_PASSWORD"
    echo ""
    echo "⚠️  IMPORTANT: Save this password in a secure password manager NOW!"
    echo "This is the only time you'll see it."
    echo ""
    read -p "Press Enter when you've saved the password..."
else
    echo ""
    echo "Enter a secure password (min 12 chars, must include uppercase, lowercase, numbers, and symbols):"
    read -s ADMIN_PASSWORD
    echo ""
fi

# Validate password
if [[ ${#ADMIN_PASSWORD} -lt 12 ]]; then
    echo "ERROR: Password must be at least 12 characters long"
    exit 1
fi

if ! [[ "$ADMIN_PASSWORD" =~ [a-z] ]] || ! [[ "$ADMIN_PASSWORD" =~ [A-Z] ]] || ! [[ "$ADMIN_PASSWORD" =~ [0-9] ]] || ! [[ "$ADMIN_PASSWORD" =~ [!@#$%^&*] ]]; then
    echo "ERROR: Password must contain lowercase, uppercase, numbers, and special characters"
    exit 1
fi

echo "Setting Fly.io secrets..."

# Set secrets in Fly.io
fly secrets set ADMIN_USERNAME="$ADMIN_USERNAME" \
                ADMIN_EMAIL="$ADMIN_EMAIL" \
                ADMIN_PASSWORD="$ADMIN_PASSWORD" \
                --app vdg-app

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Secrets set successfully!"
    echo ""
    echo "Now you need to SSH into the production server and run the seed:"
    echo ""
    echo "1. SSH into the server:"
    echo "   fly ssh console --app vdg-app"
    echo ""
    echo "2. Run the production seed:"
    echo "   cd /app"
    echo "   npx tsx prisma/seed-production.ts"
    echo ""
    echo "3. Exit SSH:"
    echo "   exit"
    echo ""
    echo "After seeding, you can login at https://vdg-app.fly.dev with:"
    echo "- Username: $ADMIN_USERNAME"
    echo "- Password: [the password you saved]"
else
    echo ""
    echo "❌ Failed to set secrets. Please check your Fly.io authentication."
    exit 1
fi