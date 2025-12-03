"use client"

import type { Task, User } from "@/lib/storage"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Trash2 } from "lucide-react"
import { motion } from "framer-motion"

interface TaskCardProps {
  task: Task
  assignee?: User
  onToggleComplete?: (id: string) => void
  onDelete?: (id: string) => void
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export function TaskCard({ task, assignee, onToggleComplete, onDelete }: TaskCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      whileHover={{ y: -2 }}
      className="w-full"
    >
      <Card className={`p-4 bg-card/60 backdrop-blur border transition-all ${task.completed ? "opacity-60" : ""}`}>
        <div className="flex items-start gap-3">
          <Checkbox checked={task.completed} onCheckedChange={() => onToggleComplete?.(task.id)} className="mt-1" />

          <div className="flex-1 min-w-0">
            <h4 className={`font-medium ${task.completed ? "line-through text-muted-foreground" : ""}`}>
              {task.title}
            </h4>
            {task.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{task.description}</p>}

            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Badge className={`${priorityColors[task.priority]} text-xs`}>{task.priority}</Badge>

              {task.dueDate && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="w-3 h-3" />
                  {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                </div>
              )}
            </div>

            {assignee && (
              <div className="flex items-center gap-2 mt-3">
                <Avatar className="w-6 h-6">
                  <AvatarImage src={assignee.avatar || "/placeholder.svg"} alt={assignee.name} />
                  <AvatarFallback>{assignee.name[0]}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-muted-foreground">Assigned to {assignee.name}</span>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete?.(task.id)}
            className="text-destructive hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </Card>
    </motion.div>
  )
}
