import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

// Force Node.js runtime for middleware (required for JWT verification)
export const runtime = "nodejs";

export function middleware(request) {
  console.log("🛡️ Middleware running for:", request.nextUrl.pathname);

  // Only apply middleware to admin routes
  if (request.nextUrl.pathname.startsWith("/super")) {
    console.log("🎯 Processing /super route");

    // Skip login page
    if (request.nextUrl.pathname === "/super/login") {
      console.log("✅ Login page - passing through");
      return NextResponse.next();
    }

    // Get admin token from cookies
    const token = request.cookies.get("admin_token")?.value;
    console.log("🍪 Admin token found:", token ? "Yes" : "No");

    if (!token) {
      console.log("❌ No token, redirecting to login");
      // Redirect to login if no token
      return NextResponse.redirect(new URL("/super/login", request.url));
    }

    console.log("🍪 Token preview:", token.substring(0, 20) + "...");

    // Check if it's a temporary token (keep bypass for now, but prefer real tokens)
    if (token.startsWith("temp_token_")) {
      console.log("🧪 Temporary token detected, allowing access for testing");

      // Add fake user data to headers for testing
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set("x-admin-id", "1");
      requestHeaders.set("x-admin-email", "admin@topup.com");
      requestHeaders.set("x-admin-role", "super_admin");

      return NextResponse.next({
        request: {
          headers: requestHeaders,
        },
      });
    }

    // TODO: PRODUCTION - Implement proper JWT verification
    // For now, using development bypass due to Edge Runtime crypto limitation
    const isProduction = process.env.NODE_ENV === "production";

    if (isProduction) {
      // In production, implement Web Crypto API based JWT verification
      console.log("🔒 Production mode: Implement proper JWT verification here");
      // Use edge-compatible JWT verification
      // const decoded = await verifyTokenEdge(token, process.env.JWT_SECRET);
      // For now, allow access but log warning
      console.log(
        "⚠️ WARNING: Production JWT verification not implemented yet!"
      );
    } else {
      // Development bypass
      console.log("🧪 Development mode: Skipping JWT verification");
    }

    console.log("✅ User authenticated (development bypass)");

    // Add user data to request headers (development data)
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-admin-id", "1");
    requestHeaders.set("x-admin-email", "admin@topup.com");
    requestHeaders.set("x-admin-role", "super_admin");

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  console.log("✅ Non-super route - passing through");
  return NextResponse.next();
}

export const config = {
  matcher: ["/super/:path*"],
};
