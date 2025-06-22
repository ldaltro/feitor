import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  console.log("🐄 GET /api/animals - Request started");
  
  try {
    // Log all headers for debugging
    console.log("📋 Request headers:");
    request.headers.forEach((value, key) => {
      if (key.startsWith('x-user-')) {
        console.log(`  ${key}: ${value}`);
      }
    });

    // Get farm ID from headers (set by middleware)
    const farmId = request.headers.get("x-user-farm-id");
    console.log("🏠 Farm ID from headers:", farmId);
    
    if (!farmId) {
      console.log("❌ No farm ID found in headers");
      return NextResponse.json(
        { error: "Farm ID not found" },
        { status: 400 }
      );
    }

    console.log("🔍 Querying animals for farm:", farmId);
    
    // Test database connection first
    console.log("🔌 Testing database connection...");
    await prisma.$connect();
    console.log("✅ Database connected successfully");

    const animals = await prisma.animal.findMany({
      where: { farmId },
      select: {
        id: true,
        name: true,
        tag: true,
        breed: true,
        status: true,
        birthDate: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    console.log("📊 Found animals:", animals.length);
    console.log("📋 Animals data:", JSON.stringify(animals, null, 2));

    return NextResponse.json(animals);
  } catch (error) {
    console.error("❌ Error in GET /api/animals:");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Error code:", error.code);
    console.error("Full error:", error);
    
    return NextResponse.json(
      { error: "Failed to fetch animals", details: error.message },
      { status: 500 }
    );
  }
}
