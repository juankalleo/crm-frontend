"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { TaskList } from "@/components/task-list"
import type { Task, User } from "@/lib/storage"
import { motion } from "framer-motion"

export default function TasksPage() {
  const router = useRouter()
  const [tasks, setTasks] = useState<Task[]>([])
  const [users, setUsers] = useState<Map<string, User>>(new Map())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("crm_token")
    if (!token) {
      router.push("/")
      return
    }

    const fetchTasks = async () => {
      try {
        const res = await fetch("/api/tasks")
        if (res.ok) {
          const data = await res.json()
          setTasks(data.tasks)
          setUsers(new Map(data.users))
        }
      } catch (error) {
        console.error("Error fetching tasks:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTasks()
  }, [router])

  const handleAddTask = (newTask: Task) => {
    setTasks([newTask, ...tasks])
  }

  const handleToggleComplete = (id: string) => {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id))
  }

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
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <TaskList
          tasks={tasks}
          users={users}
          onAddTask={handleAddTask}
          onToggleComplete={handleToggleComplete}
          onDeleteTask={handleDeleteTask}
        />
      </div>
    </DashboardLayout>
  )
}
