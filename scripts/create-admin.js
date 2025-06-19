#!/usr/bin/env node

const { PrismaClient } = require('../lib/generated/prisma');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const readline = require('readline');

const prisma = new PrismaClient();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

function questionHidden(prompt) {
  return new Promise((resolve) => {
    const stdin = process.stdin;
    stdin.setRawMode(true);
    stdin.resume();
    stdin.setEncoding('utf8');
    
    process.stdout.write(prompt);
    
    let password = '';
    
    stdin.on('data', function (char) {
      char = char + '';
      
      switch (char) {
        case '\n':
        case '\r':
        case '\u0004':
          stdin.setRawMode(false);
          stdin.pause();
          console.log();
          resolve(password);
          break;
        case '\u0003':
          console.log('^C');
          process.exit();
          break;
        case '\u007f':
        case '\b':
          if (password.length > 0) {
            password = password.slice(0, -1);
            process.stdout.write('\b \b');
          }
          break;
        default:
          password += char;
          process.stdout.write('*');
          break;
      }
    });
  });
}

function validatePassword(password) {
  const minLength = 12;
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  
  const errors = [];
  
  if (password.length < minLength) {
    errors.push(`Mínimo ${minLength} caracteres`);
  }
  if (!hasLowercase) {
    errors.push('Pelo menos uma letra minúscula');
  }
  if (!hasUppercase) {
    errors.push('Pelo menos uma letra maiúscula');
  }
  if (!hasNumbers) {
    errors.push('Pelo menos um número');
  }
  if (!hasSpecialChars) {
    errors.push('Pelo menos um caractere especial');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

async function createAdmin() {
  console.log('=== CRIAÇÃO DE CONTA ADMINISTRADOR ===\n');
  console.log('🔐 Esta ferramenta criará uma conta de administrador com acesso total ao sistema.');
  console.log('⚠️  Use apenas em ambiente de produção com credenciais seguras.\n');

  try {
    // Check if running in production
    const nodeEnv = process.env.NODE_ENV;
    if (nodeEnv !== 'production') {
      console.log('⚠️  AVISO: Este script deve ser executado apenas em produção.');
      const proceed = await question('Deseja continuar mesmo assim? (yes/no): ');
      if (proceed.toLowerCase() !== 'yes') {
        console.log('Operação cancelada.');
        return;
      }
    }

    // Gather admin information
    const username = await question('Nome de usuário: ');
    if (!username || username.length < 3) {
      throw new Error('Nome de usuário deve ter pelo menos 3 caracteres');
    }

    const email = await question('Email: ');
    if (!validateEmail(email)) {
      throw new Error('Email inválido');
    }

    const fullName = await question('Nome completo: ');
    if (!fullName || fullName.length < 2) {
      throw new Error('Nome completo deve ter pelo menos 2 caracteres');
    }

    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    });

    if (existingUser) {
      throw new Error(`Usuário já existe com esse ${existingUser.username === username ? 'nome de usuário' : 'email'}`);
    }

    // Password input with validation
    let password;
    let passwordValid = false;
    
    while (!passwordValid) {
      password = await questionHidden('Senha: ');
      const validation = validatePassword(password);
      
      if (validation.isValid) {
        passwordValid = true;
      } else {
        console.log('\n❌ Senha não atende aos requisitos:');
        validation.errors.forEach(error => console.log(`   - ${error}`));
        console.log();
      }
    }

    const confirmPassword = await questionHidden('Confirme a senha: ');
    if (password !== confirmPassword) {
      throw new Error('Senhas não coincidem');
    }

    // Confirmation
    console.log('\n=== CONFIRMAÇÃO ===');
    console.log(`Nome de usuário: ${username}`);
    console.log(`Email: ${email}`);
    console.log(`Nome completo: ${fullName}`);
    console.log(`Função: ADMINISTRADOR`);
    console.log();

    const confirm = await question('Confirma a criação desta conta de administrador? (yes/no): ');
    if (confirm.toLowerCase() !== 'yes') {
      console.log('Operação cancelada.');
      return;
    }

    // Create admin account
    console.log('\n🔄 Criando conta de administrador...');
    
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const admin = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        fullName,
        role: 'ADMIN',
        active: true,
        farmId: null
      }
    });

    console.log('✅ Conta de administrador criada com sucesso!');
    console.log(`ID: ${admin.id}`);
    console.log(`Criado em: ${admin.createdAt.toISOString()}`);
    
    // Log this action for audit purposes
    console.log('\n📝 AUDITORIA: Criação de conta admin registrada no sistema.');
    
  } catch (error) {
    console.error('\n❌ Erro:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    rl.close();
  }
}

// Prevent accidental execution
if (require.main === module) {
  createAdmin();
}