import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";

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

export async function POST(request: Request) {
  console.log("🐄 POST /api/animals - Create animal request started");
  
  try {
    // Get farm ID from headers (set by middleware)
    const headersList = headers();
    const farmId = headersList.get("x-user-farm-id");
    console.log("🏠 Farm ID from headers:", farmId);
    
    if (!farmId) {
      console.log("❌ No farm ID found in headers");
      return NextResponse.json(
        { error: "Farm ID not found" },
        { status: 400 }
      );
    }

    const body = await request.json();
    console.log("📝 Received animal data:", JSON.stringify(body, null, 2));

    // Validate required fields
    if (!body.name || !body.tag || !body.breed || !body.gender || !body.birthDate || !body.status) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the animal with farmId
    const animalData = {
      name: body.name,
      tag: body.tag,
      breed: body.breed,
      gender: body.gender,
      birthDate: new Date(body.birthDate),
      status: body.status,
      weight: body.weight || 0,
      purchaseValue: body.purchaseValue || 0,
      purchaseDate: body.purchaseDate ? new Date(body.purchaseDate) : null,
      notes: body.notes || null,
      farmId, // Add farmId to the animal
    };

    console.log("💾 Creating animal with data:", JSON.stringify(animalData, null, 2));

    const animal = await prisma.animal.create({
      data: animalData,
    });

    console.log("✅ Animal created successfully:", animal.id);

    return NextResponse.json(animal, { status: 201 });
  } catch (error) {
    console.error("❌ Error in POST /api/animals:");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Full error:", error);
    
    return NextResponse.json(
      { error: "Failed to create animal", details: error.message },
      { status: 500 }
    );
  }
}
