"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { MesaHeader } from "@/components/mesa-header"
import { MesaContent } from "@/components/mesa-content"
import type { Project, User } from "@/lib/storage"
import { motion } from "framer-motion"

export default function ProjectPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [participants, setParticipants] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("crm_token")
    if (!token) {
      router.push("/")
      return
    }

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`)
        if (res.ok) {
          const data = await res.json()
          setProject(data.project)
          setParticipants(data.participants)
        }
      } catch (error) {
        console.error("Error fetching project:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProject()
  }, [projectId, router])

  const handleDeleteProject = async () => {
    if (!window.confirm("Remove this project from your workspace?")) return

    try {
      await fetch(`/api/projects/${projectId}`, { method: "DELETE" })
      router.push("/dashboard")
    } catch (error) {
      console.error("Error deleting project:", error)
    }
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

  if (!project) {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">
          <p className="text-muted-foreground">Project not found</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 space-y-6 max-w-6xl mx-auto">
        <MesaHeader project={project} participants={participants} onDelete={handleDeleteProject} />

        <MesaContent project={project} onUpdateProject={setProject} />
      </div>
    </DashboardLayout>
  )
}
