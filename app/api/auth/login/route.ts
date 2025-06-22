import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createToken } from "@/lib/auth";
import { UserRole } from "@/lib/types/auth";

export async function POST(request: Request) {
  try {
    console.log("🔐 Login attempt started");
    const { username, password } = await request.json();
    console.log("📝 Received credentials for username:", username);

    if (!username || !password) {
      console.log("❌ Missing username or password");
      return NextResponse.json(
        { error: "Usuário e senha são obrigatórios" },
        { status: 400 }
      );
    }

    console.log("🔍 Searching for user in database...");
    const user = await prisma.user.findUnique({
      where: { username },
      include: { farm: true },
    });
    console.log("👤 User found:", user ? "YES" : "NO");

    if (!user || !user.active) {
      return NextResponse.json(
        { error: "Usuário ou senha incorretos" },
        { status: 401 }
      );
    }

    const isValid = await verifyPassword(password, user.password);

    if (!isValid) {
      return NextResponse.json(
        { error: "Usuário ou senha incorretos" },
        { status: 401 }
      );
    }

    const token = await createToken({
      userId: user.id,
      username: user.username,
      role: user.role as UserRole,
      farmId: user.farmId,
    });

    const response = NextResponse.json(
      { 
        success: true, 
        user: { 
          id: user.id, 
          username: user.username, 
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          farmId: user.farmId,
          farmName: user.farm?.name || null,
        } 
      },
      { status: 200 }
    );

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24, // 24 hours
    });

    return response;
  } catch (error) {
    console.error("❌ Login error details:");
    console.error("Error message:", error.message);
    console.error("Error code:", error.code);
    console.error("Full error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor. Tente novamente em alguns minutos." },
      { status: 500 }
    );
  }
}