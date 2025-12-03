"use client"

import type { Task, User } from "@/lib/storage"
import { TaskCard } from "./task-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Plus } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface TaskListProps {
  tasks: Task[]
  users: Map<string, User>
  onAddTask?: (task: Task) => void
  onToggleComplete?: (id: string) => void
  onDeleteTask?: (id: string) => void
}

export function TaskList({ tasks, users, onAddTask, onToggleComplete, onDeleteTask }: TaskListProps) {
  const [showNewTask, setShowNewTask] = useState(false)
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const pendingTasks = tasks.filter((t) => !t.completed)
  const completedTasks = tasks.filter((t) => t.completed)

  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTaskTitle,
      description: "",
      priority: "medium",
      completed: false,
      createdAt: new Date().toISOString(),
    }

    onAddTask?.(newTask)
    setNewTaskTitle("")
    setShowNewTask(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Tasks</h2>
            <p className="text-muted-foreground text-sm mt-1">
              {pendingTasks.length} pending, {completedTasks.length} completed
            </p>
          </div>
          <Button onClick={() => setShowNewTask(!showNewTask)} className="bg-primary hover:bg-primary/90 gap-2">
            <Plus className="w-4 h-4" />
            New Task
          </Button>
        </div>
      </motion.div>

      {/* New Task Input */}
      {showNewTask && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex gap-2">
          <Input
            placeholder="Task title..."
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
            className="bg-input"
            autoFocus
          />
          <Button onClick={handleAddTask} className="bg-primary hover:bg-primary/90">
            Add
          </Button>
          <Button variant="outline" onClick={() => setShowNewTask(false)}>
            Cancel
          </Button>
        </motion.div>
      )}

      {/* Pending Tasks */}
      {pendingTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Pending</h3>
          {pendingTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              assignee={task.assignedTo ? users.get(task.assignedTo) : undefined}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">Completed</h3>
          {completedTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              assignee={task.assignedTo ? users.get(task.assignedTo) : undefined}
              onToggleComplete={onToggleComplete}
              onDeleteTask={onDeleteTask}
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {tasks.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
          <p className="text-muted-foreground">No tasks yet. Create one to get started!</p>
        </motion.div>
      )}
    </div>
  )
}
