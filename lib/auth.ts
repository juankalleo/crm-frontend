import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "crm-secret-key-change-in-production"

export function generateToken(userId: string, email: string) {
  return jwt.sign({ userId, email }, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: string; email: string }
  } catch {
    return null
  }
}

export function generateId() {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}
