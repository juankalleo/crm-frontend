"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion } from "framer-motion"
import { Edit, Trash2, Plus, Users } from "lucide-react"

interface AuditEntry {
  id: string
  timestamp: Date
  action: "create" | "update" | "delete" | "add_user"
  entity: string
  entityName: string
  changes: Record<string, unknown>
}

const actionIcons = {
  create: <Plus className="w-4 h-4" />,
  update: <Edit className="w-4 h-4" />,
  delete: <Trash2 className="w-4 h-4" />,
  add_user: <Users className="w-4 h-4" />,
}

const actionColors = {
  create: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  update: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  delete: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
  add_user: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
}

export default function AuditPage() {
  const router = useRouter()
  const [auditLogs, setAuditLogs] = useState<AuditEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("crm_token")
    if (!token) {
      router.push("/")
      return
    }

    // Simulate loading audit logs
    const mockLogs: AuditEntry[] = [
      {
        id: "1",
        timestamp: new Date(Date.now() - 5 * 60000),
        action: "update",
        entity: "Project",
        entityName: "Website Redesign",
        changes: { status: "in_progress", priority: "high" },
      },
      {
        id: "2",
        timestamp: new Date(Date.now() - 15 * 60000),
        action: "create",
        entity: "Task",
        entityName: "Design mockups",
        changes: { title: "Design mockups", priority: "high" },
      },
      {
        id: "3",
        timestamp: new Date(Date.now() - 60 * 60000),
        action: "add_user",
        entity: "Project",
        entityName: "Website Redesign",
        changes: { user: "João Costa" },
      },
      {
        id: "4",
        timestamp: new Date(Date.now() - 24 * 60 * 60000),
        action: "create",
        entity: "Project",
        entityName: "Website Redesign",
        changes: { name: "Website Redesign", owner: "Ana Silva" },
      },
    ]

    setAuditLogs(mockLogs)
    setIsLoading(false)
  }, [router])

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-full">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full"
          />
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Audit Logs</h1>
            <p className="text-muted-foreground mt-2">Track all changes and activities in your CRM</p>
          </div>

          {/* Filters */}
          <Card className="p-4 bg-card/60 backdrop-blur">
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-muted">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="create">Created</TabsTrigger>
                <TabsTrigger value="update">Updated</TabsTrigger>
                <TabsTrigger value="delete">Deleted</TabsTrigger>
              </TabsList>

              {/* All Activities */}
              <TabsContent value="all" className="mt-6 space-y-3">
                {auditLogs.map((log) => (
                  <motion.div
                    key={log.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start gap-4 p-4 rounded-lg bg-background/50 hover:bg-background/80 transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${actionColors[log.action]}`}>{actionIcons[log.action]}</div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium">
                        {log.action === "create" && `Created ${log.entity.toLowerCase()}`}
                        {log.action === "update" && `Updated ${log.entity.toLowerCase()}`}
                        {log.action === "delete" && `Deleted ${log.entity.toLowerCase()}`}
                        {log.action === "add_user" && `Added user to ${log.entity.toLowerCase()}`}
                      </p>
                      <p className="text-sm text-foreground/80 mt-1">
                        <span className="font-semibold">{log.entityName}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">{log.timestamp.toLocaleString("pt-BR")}</p>
                    </div>

                    <Badge className={actionColors[log.action]}>{log.action}</Badge>
                  </motion.div>
                ))}
              </TabsContent>

              {/* Created */}
              <TabsContent value="create" className="mt-6 space-y-3">
                {auditLogs
                  .filter((l) => l.action === "create")
                  .map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-background/50"
                    >
                      <div className={`p-2 rounded-lg ${actionColors.create}`}>{actionIcons.create}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">Created {log.entity.toLowerCase()}</p>
                        <p className="text-sm text-foreground/80 mt-1">{log.entityName}</p>
                        <p className="text-xs text-muted-foreground mt-2">{log.timestamp.toLocaleString("pt-BR")}</p>
                      </div>
                    </motion.div>
                  ))}
              </TabsContent>

              {/* Updated */}
              <TabsContent value="update" className="mt-6 space-y-3">
                {auditLogs
                  .filter((l) => l.action === "update")
                  .map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-background/50"
                    >
                      <div className={`p-2 rounded-lg ${actionColors.update}`}>{actionIcons.update}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">Updated {log.entity.toLowerCase()}</p>
                        <p className="text-sm text-foreground/80 mt-1">{log.entityName}</p>
                        <p className="text-xs text-muted-foreground mt-2">{log.timestamp.toLocaleString("pt-BR")}</p>
                      </div>
                    </motion.div>
                  ))}
              </TabsContent>

              {/* Deleted */}
              <TabsContent value="delete" className="mt-6 space-y-3">
                {auditLogs
                  .filter((l) => l.action === "delete")
                  .map((log) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-4 p-4 rounded-lg bg-background/50"
                    >
                      <div className={`p-2 rounded-lg ${actionColors.delete}`}>{actionIcons.delete}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium">Deleted {log.entity.toLowerCase()}</p>
                        <p className="text-sm text-foreground/80 mt-1">{log.entityName}</p>
                        <p className="text-xs text-muted-foreground mt-2">{log.timestamp.toLocaleString("pt-BR")}</p>
                      </div>
                    </motion.div>
                  ))}
              </TabsContent>
            </Tabs>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
