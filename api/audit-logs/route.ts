import { type NextRequest, NextResponse } from "next/server"
import { db, seedDatabase } from "@/lib/storage"

export async function GET() {
  try {
    seedDatabase()

    const auditLogs = Array.from(db.auditLogs.values()).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

    return NextResponse.json({ auditLogs })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    seedDatabase()

    const { action, entity, entityId, userId, changes } = await request.json()

    const auditLog = {
      id: `audit-${Date.now()}`,
      action,
      entity,
      entityId,
      userId,
      changes,
      createdAt: new Date().toISOString(),
    }

    db.auditLogs.set(auditLog.id, auditLog)

    return NextResponse.json(auditLog)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
