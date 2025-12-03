import { type NextRequest, NextResponse } from "next/server"
import { db, seedDatabase } from "@/lib/storage"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    seedDatabase()

    const { id } = params
    const project = db.projects.get(id)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    const participants = project.participants.map((userId) => db.users.get(userId)).filter(Boolean)

    return NextResponse.json({ project, participants })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    seedDatabase()

    const { id } = params
    db.projects.delete(id)

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
