import { type NextRequest, NextResponse } from "next/server"
import { db, seedDatabase } from "@/lib/storage"

export async function GET() {
  try {
    seedDatabase()

    const projects = Array.from(db.projects.values())
    const users = Array.from(db.users.entries())

    return NextResponse.json({
      projects,
      users,
    })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    seedDatabase()

    const { name, description, participants, priority, dueDate, value } = await request.json()
    const userId = request.headers.get("x-user-id")

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projectId = `proj-${Date.now()}`
    const newProject = {
      id: projectId,
      name,
      description,
      priority: priority || "medium",
      participants,
      dueDate,
      value,
      comments: [],
      links: [],
      createdBy: userId,
      createdAt: new Date().toISOString(),
    }

    db.projects.set(projectId, newProject)

    return NextResponse.json(newProject)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
