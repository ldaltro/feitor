import { PrismaClient } from "@/lib/generated/prisma";
import { hashPassword } from "@/lib/auth";

const prisma = new PrismaClient();

async function main() {
  const username = process.env.ADMIN_USERNAME || "feitor";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    console.error("ERROR: ADMIN_PASSWORD environment variable is required");
    console.error("Please set ADMIN_PASSWORD to a secure password before running this script");
    console.error("Example: ADMIN_PASSWORD='YourSecurePassword123' npm run create-user");
    process.exit(1);
  }

  // Validate password strength
  if (password.length < 8) {
    console.error("ERROR: Password must be at least 8 characters long");
    process.exit(1);
  }

  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(password)) {
    console.error("ERROR: Password must contain at least one lowercase letter, one uppercase letter, and one number");
    process.exit(1);
  }

  try {
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      console.log(`User ${username} already exists`);
      return;
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create the user
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    console.log(`User created successfully:`, {
      id: user.id,
      username: user.username,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();