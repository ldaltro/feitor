import { NextResponse } from "next/server";
import { verifyToken, createAccessToken, createRefreshToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserRole } from "@/lib/types/auth";

export async function POST(request: Request) {
  try {
    console.log("🔄 Token refresh attempt started");
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      console.log("❌ Missing refresh token");
      return NextResponse.json(
        { error: "Refresh token é obrigatório" },
        { status: 400 }
      );
    }

    console.log("🔍 Verifying refresh token...");
    const payload = await verifyToken(refreshToken);

    if (!payload || payload.type !== "refresh") {
      console.log("❌ Invalid or expired refresh token");
      return NextResponse.json(
        { error: "Token de refresh inválido ou expirado" },
        { status: 401 }
      );
    }

    console.log("👤 Fetching user data for token refresh...");
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      include: { farm: true },
    });

    if (!user || !user.active) {
      console.log("❌ User not found or inactive");
      return NextResponse.json(
        { error: "Usuário não encontrado ou inativo" },
        { status: 401 }
      );
    }

    console.log("🔄 Generating new tokens...");
    const tokenPayload = {
      userId: user.id,
      username: user.username,
      role: user.role as UserRole,
      farmId: user.farmId,
    };

    const newAccessToken = await createAccessToken(tokenPayload);
    const newRefreshToken = await createRefreshToken(tokenPayload);

    console.log("✅ Token refresh successful");
    return NextResponse.json(
      {
        success: true,
        tokens: {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Token refresh error:");
    console.error("Error message:", error.message);
    console.error("Full error:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor. Tente novamente em alguns minutos." },
      { status: 500 }
    );
  }
}