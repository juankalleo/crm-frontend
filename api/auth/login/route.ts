import { type NextRequest, NextResponse } from "next/server"
import { generateToken } from "@/lib/auth"
import { db, seedDatabase } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    seedDatabase()

    const { email, password } = await request.json()

    // Find user by email
    const user = Array.from(db.users.values()).find((u) => u.email === email)

    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    const token = generateToken(user.id, user.email)

    return NextResponse.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        bio: user.bio,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
