import { type NextRequest, NextResponse } from "next/server"
import { db, seedDatabase } from "@/lib/storage"

export async function GET(request: NextRequest) {
  try {
    seedDatabase()

    const projectId = request.nextUrl.searchParams.get("projectId")

    if (!projectId) {
      return NextResponse.json({ error: "Project ID required" }, { status: 400 })
    }

    const project = db.projects.get(projectId)
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ comments: project.comments })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    seedDatabase()

    const { projectId, text, userId } = await request.json()

    const project = db.projects.get(projectId)
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const comment = {
      id: `comment-${Date.now()}`,
      text,
      userId,
      projectId,
      createdAt: new Date().toISOString(),
    }

    project.comments.push(comment)
    db.projects.set(projectId, project)

    return NextResponse.json(comment)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
