"use client"

import type { Project, User } from "@/lib/storage"
import { ProjectCard } from "./project-card"
import { motion } from "framer-motion"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface ProjectGridProps {
  projects: Project[]
  users: Map<string, User>
  onProjectClick?: (project: Project) => void
  onDeleteProject?: (id: string) => void
}

export function ProjectGrid({ projects, users, onProjectClick, onDeleteProject }: ProjectGridProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterPriority, setFilterPriority] = useState<string | null>(null)

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPriority = !filterPriority || project.priority === filterPriority

    return matchesSearch && matchesPriority
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage and organize your projects</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">Create Project</Button>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
      >
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-input"
          />
        </div>

        <div className="flex gap-2">
          {["low", "medium", "high"].map((priority) => (
            <Button
              key={priority}
              variant={filterPriority === priority ? "default" : "outline"}
              size="sm"
              onClick={() => setFilterPriority(filterPriority === priority ? null : priority)}
              className="capitalize"
            >
              {priority}
            </Button>
          ))}
        </div>
      </motion.div>

      {/* Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              participants={project.participants.map((id) => users.get(id)).filter(Boolean) as User[]}
              onDelete={onDeleteProject}
              onClick={() => onProjectClick?.(project)}
            />
          ))
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="col-span-full text-center py-12">
            <p className="text-muted-foreground">No projects found</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}
