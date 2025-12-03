import { type NextRequest, NextResponse } from "next/server"
import { generateToken, generateId } from "@/lib/auth"
import { db, seedDatabase } from "@/lib/storage"

export async function POST(request: NextRequest) {
  try {
    seedDatabase()

    const { name, email, password } = await request.json()

    // Check if user exists
    const userExists = Array.from(db.users.values()).find((u) => u.email === email)
    if (userExists) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 })
    }

    // Create new user
    const userId = generateId()
    const newUser = {
      id: userId,
      name,
      email,
      password,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      bio: "",
      theme: "light" as const,
      font: "geist" as const,
      cardRadius: "rounded" as const,
    }

    db.users.set(userId, newUser)

    const token = generateToken(userId, email)

    return NextResponse.json({
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        avatar: newUser.avatar,
      },
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
