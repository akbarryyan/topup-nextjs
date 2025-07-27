import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logout successful",
    });

    // Clear the admin token cookie
    response.cookies.delete("admin_token");

    return response;
  } catch (error) {
    console.error("Logout API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

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
