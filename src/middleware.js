import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export function middleware(request) {
  // Only apply middleware to admin routes
  if (request.nextUrl.pathname.startsWith("/super")) {
    // Skip login page
    if (request.nextUrl.pathname === "/super/login") {
      return NextResponse.next();
    }

    // Get admin token from cookies
    const token = request.cookies.get("admin_token")?.value;

    if (!token) {
      // Redirect to login if no token
      return NextResponse.redirect(new URL("/super/login", request.url));
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      // Redirect to login if token is invalid
      const response = NextResponse.redirect(
        new URL("/super/login", request.url)
      );
      response.cookies.delete("admin_token");
      return response;
    }

    // Add user data to request headers for use in components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-admin-id", decoded.id);
    requestHeaders.set("x-admin-email", decoded.email);
    requestHeaders.set("x-admin-role", decoded.role);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/super/:path*"],
};
