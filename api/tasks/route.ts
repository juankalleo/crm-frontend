import { type NextRequest, NextResponse } from "next/server"
import { db, seedDatabase } from "@/lib/storage"

export async function GET() {
  try {
    seedDatabase()

    const tasks = Array.from(db.tasks.values())
    const users = Array.from(db.users.entries())

    return NextResponse.json({ tasks, users })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    seedDatabase()

    const { title, description, priority, assignedTo, dueDate } = await request.json()

    const taskId = `task-${Date.now()}`
    const newTask = {
      id: taskId,
      title,
      description,
      priority: priority || "medium",
      assignedTo,
      completed: false,
      dueDate,
      createdAt: new Date().toISOString(),
    }

    db.tasks.set(taskId, newTask)

    return NextResponse.json(newTask)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
