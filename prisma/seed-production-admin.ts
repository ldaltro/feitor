import { PrismaClient } from "@/lib/generated/prisma";
import { hashPassword } from "@/lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting production admin seed...");

  // Get admin credentials from environment
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;
  const email = process.env.ADMIN_EMAIL;
  
  if (!username || !password || !email) {
    console.error("ERROR: Required environment variables are missing");
    console.error("Please set the following environment variables:");
    console.error("- ADMIN_USERNAME");
    console.error("- ADMIN_PASSWORD");
    console.error("- ADMIN_EMAIL");
    process.exit(1);
  }
  
  // Validate password strength
  if (password.length < 12) {
    console.error("ERROR: Password must be at least 12 characters long");
    process.exit(1);
  }
  
  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
    console.error("ERROR: Password must contain lowercase, uppercase, numbers, and special characters");
    process.exit(1);
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      console.log(`User ${username} already exists`);
      process.exit(0);
    }

    // Create farm
    console.log("Creating farm...");
    const farm = await prisma.farm.create({
      data: {
        name: "Fazenda Vista Alegre",
        address: "Estrada Municipal km 12, Zona Rural",
        phone: "(11) 98765-4321",
        active: true,
      },
    });
    console.log(`✅ Farm created: ${farm.name}`);

    // Create admin user
    console.log("Creating admin user...");
    const hashedPassword = await hashPassword(password);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        fullName: "Gustavo Silva",
        role: "ADMIN",
        farmId: farm.id,
        active: true,
      },
    });
    console.log(`✅ Admin user created: ${user.username}`);
    console.log("\n🎉 Production setup completed successfully!");
    
  } catch (error) {
    console.error("❌ Error during seed:", error);
    process.exit(1);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });