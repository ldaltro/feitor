import { jwtVerify } from "jose";
import { JWTPayload, UserRole } from "./types/auth";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as JWTPayload;
  } catch (error) {
    return null;
  }
}

export function isAdmin(role: string): boolean {
  return role === UserRole.ADMIN;
}