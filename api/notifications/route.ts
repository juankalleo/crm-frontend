import { type NextRequest, NextResponse } from "next/server"
import { db, seedDatabase } from "@/lib/storage"

export async function GET() {
  try {
    seedDatabase()

    const notifications = Array.from(db.notifications.values())

    return NextResponse.json({ notifications })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    seedDatabase()

    const { userId, title, message, taskId } = await request.json()

    const notification = {
      id: `notif-${Date.now()}`,
      userId,
      title,
      message,
      taskId,
      read: false,
      createdAt: new Date().toISOString(),
    }

    db.notifications.set(notification.id, notification)

    return NextResponse.json(notification)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
