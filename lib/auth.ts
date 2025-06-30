import { SignJWT, jwtVerify } from "jose";
import bcrypt from "bcryptjs";
import { JWTPayload, UserRole } from "./types/auth";

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || "your-secret-key-change-in-production"
);

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compare(password, hashedPassword);
}

export async function createToken(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function createAccessToken(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("24h")
    .sign(secret);
}

export async function createRefreshToken(payload: JWTPayload) {
  return new SignJWT({ ...payload, type: "refresh" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

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

export function canAccessFarmData(userFarmId: string | null, dataFarmId: string, role: string): boolean {
  // Admins can access all farm data
  if (isAdmin(role)) return true;
  
  // Non-admin users can only access their own farm's data
  return userFarmId === dataFarmId;
}