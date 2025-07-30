import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const JWT_SECRET = process.env.JWT_SECRET || "fallback-secret-key";

// Hash password
export async function hashPassword(password) {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Verify password
export async function verifyPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

// Generate JWT token
export function generateToken(payload) {
  console.log("🎫 Generating JWT token...");
  console.log(
    "🗝️ JWT_SECRET for generation:",
    JWT_SECRET.substring(0, 10) + "..."
  );

  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "24h", // Token expires in 24 hours
  });
}

// Verify JWT token
export function verifyToken(token) {
  try {
    console.log("🔐 Verifying token...");
    console.log("🔑 Token length:", token.length);
    console.log("🗝️ JWT_SECRET exists:", !!JWT_SECRET);
    console.log("🔒 JWT_SECRET length:", JWT_SECRET.length);

    const decoded = jwt.verify(token, JWT_SECRET);
    console.log("✅ Token verification successful:", decoded.email);
    return decoded;
  } catch (error) {
    console.log("❌ Token verification failed:", error.message);
    console.log("🐛 Error details:", error.name);
    return null;
  }
}

// Generate secure session
export function generateSession(adminData) {
  const payload = {
    id: adminData.id,
    email: adminData.email,
    name: adminData.name,
    role: adminData.role,
    iat: Math.floor(Date.now() / 1000),
  };

  return {
    token: generateToken(payload),
    user: payload,
  };
}
