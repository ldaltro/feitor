#!/usr/bin/env node

const { PrismaClient } = require('../lib/generated/prisma');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetPassword() {
  try {
    const newPassword = 'admin123';
    const hashedPassword = await bcrypt.hash(newPassword, 12);
    
    await prisma.user.update({
      where: { username: 'feitor' },
      data: { password: hashedPassword }
    });
    
    console.log('✅ Password reset successfully!');
    console.log('Username: feitor');
    console.log('New Password: admin123');
    console.log('\n⚠️  Remember to change this password after logging in!');
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

resetPassword();