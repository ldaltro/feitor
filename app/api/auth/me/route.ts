import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  if (!token) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const payload = await verifyToken(token.value);

  if (!payload) {
    return NextResponse.json(
      { error: "Invalid token" },
      { status: 401 }
    );
  }

  // Get fresh user data from database
  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    include: { farm: true },
  });

  if (!user || !user.active) {
    return NextResponse.json(
      { error: "User not found or inactive" },
      { status: 401 }
    );
  }

  return NextResponse.json({
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      role: user.role,
      farmId: user.farmId,
      farmName: user.farm?.name || null,
    },
  });
}