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
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: "24h", // Token expires in 24 hours
  });
}

// Verify JWT token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
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
