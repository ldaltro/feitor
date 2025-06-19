import { PrismaClient } from "@/lib/generated/prisma";
import { hashPassword } from "@/lib/auth";

const prisma = new PrismaClient();

async function main() {
  const username = "feitor";
  const password = "Feitor1234";

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