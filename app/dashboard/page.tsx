"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { ProjectGrid } from "@/components/project-grid"
import type { Project, User } from "@/lib/storage"
import { motion } from "framer-motion"

export default function DashboardPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [users, setUsers] = useState<Map<string, User>>(new Map())
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("crm_token")
    if (!token) {
      router.push("/")
      return
    }

    // Fetch projects
    const fetchData = async () => {
      try {
        const res = await fetch("/api/projects")
        if (res.ok) {
          const data = await res.json()
          setProjects(data.projects)
          setUsers(new Map(data.users))
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [router])

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id))
  }

  const handleProjectClick = (project: Project) => {
    router.push(`/dashboard/project/${project.id}`)
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
      <div className="p-6 md:p-8">
        <ProjectGrid
          projects={projects}
          users={users}
          onDeleteProject={handleDeleteProject}
          onProjectClick={handleProjectClick}
        />
      </div>
    </DashboardLayout>
  )
}
