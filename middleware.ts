import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken, isAdmin } from "./lib/middleware-auth";

const publicPaths = ["/login", "/api/auth/login"];
const adminPaths = ["/admin"];

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for auth token
  const token = request.cookies.get("auth-token");

  if (!token) {
    // Redirect to login if no token
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Verify token
  const payload = await verifyToken(token.value);

  if (!payload) {
    // Redirect to login if token is invalid
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("auth-token");
    return response;
  }

  // Check admin access for admin routes
  const isAdminRoute = adminPaths.some(path => pathname.startsWith(path));
  if (isAdminRoute && !isAdmin(payload.role)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Add user info to request headers for API routes
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-id", payload.userId);
  requestHeaders.set("x-user-role", payload.role);
  requestHeaders.set("x-user-farm-id", payload.farmId || "");

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};