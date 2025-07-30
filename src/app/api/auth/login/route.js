import { NextResponse } from "next/server";
import { AdminModel } from "@/models/Admin";
import { verifyPassword, generateSession } from "@/lib/auth";
import { testConnection } from "@/lib/database";

export async function POST(request) {
  try {
    // Test database connection
    const connected = await testConnection();
    if (!connected) {
      return NextResponse.json(
        { error: "Database connection failed" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { email, password, rememberMe } = body;

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Check if account is locked
    const isLocked = await AdminModel.isAccountLocked(email);
    if (isLocked) {
      return NextResponse.json(
        {
          error:
            "Account is temporarily locked due to multiple failed login attempts. Please try again in 15 minutes.",
          code: "ACCOUNT_LOCKED",
        },
        { status: 423 }
      );
    }

    // Find admin by email
    const admin = await AdminModel.findByEmail(email);
    if (!admin) {
      // Increment login attempts even for non-existent users to prevent enumeration
      await AdminModel.incrementLoginAttempts(email);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, admin.password);
    if (!isValidPassword) {
      await AdminModel.incrementLoginAttempts(email);
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if admin account is active
    if (admin.status !== "active") {
      return NextResponse.json(
        {
          error: "Your account is inactive. Please contact support.",
          code: "ACCOUNT_INACTIVE",
        },
        { status: 403 }
      );
    }

    // Reset login attempts and update last login
    await AdminModel.resetLoginAttempts(email);
    await AdminModel.updateLastLogin(admin.id);

    console.log("🎫 Generating session for admin:", admin.email);

    // Generate session
    const session = generateSession({
      id: admin.id,
      email: admin.email,
      name: admin.name,
      role: admin.role,
    });

    console.log("✅ Session generated:", {
      hasToken: !!session.token,
      tokenLength: session.token?.length,
      user: session.user,
    });

    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: session.user,
      token: session.token, // Include token in response for client-side setting
    });

    // Set HTTP-only cookie for security
    const cookieOptions = {
      httpOnly: false, // Change to false for debugging
      secure: false, // Force false for localhost
      sameSite: "lax",
      maxAge: rememberMe ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000, // 7 days or 1 day
      path: "/",
    };

    console.log("🍪 Setting cookie with options:", cookieOptions);
    console.log(
      "🔑 Token to set:",
      session.token ? "Token exists" : "No token"
    );

    response.cookies.set("admin_token", session.token, cookieOptions);

    console.log("✅ Cookie set successfully in response");
    return response;
  } catch (error) {
    console.error("Login API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Handle preflight requests
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
