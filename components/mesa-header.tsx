"use client"

import type { Project, User } from "@/lib/storage"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Edit2, Share2, Trash2, Calendar, DollarSign } from "lucide-react"
import { motion } from "framer-motion"
import { useRouter } from "next/navigation"

interface MesaHeaderProps {
  project: Project
  participants: User[]
  onDelete?: () => void
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export function MesaHeader({ project, participants, onDelete }: MesaHeaderProps) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      {/* Top Controls */}
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" className="gap-2" onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <Share2 className="w-4 h-4" />
            Share
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="gap-2 text-destructive hover:text-destructive bg-transparent"
            onClick={onDelete}
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </Button>
        </div>
      </div>

      {/* Cover and Title Section */}
      <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 h-64">
        <img
          src={project.cover || "/placeholder.svg?height=256&width=1200&query=project-cover"}
          alt={project.name}
          className="w-full h-full object-cover"
        />

        {/* Overlay with Project Info */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl font-bold text-white mb-2 text-balance">{project.name}</h1>
            <p className="text-white/80 text-lg mb-4">{project.description}</p>

            <div className="flex flex-wrap items-center gap-4">
              <Badge className={`${priorityColors[project.priority]}`}>
                {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)} Priority
              </Badge>

              {project.dueDate && (
                <div className="flex items-center gap-2 text-white text-sm">
                  <Calendar className="w-4 h-4" />
                  {new Date(project.dueDate).toLocaleDateString("pt-BR")}
                </div>
              )}

              {project.value && (
                <div className="flex items-center gap-2 text-white text-sm">
                  <DollarSign className="w-4 h-4" />
                  R$ {project.value.toLocaleString("pt-BR")}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Participants Section */}
      <div className="bg-card/60 backdrop-blur rounded-lg p-4">
        <h3 className="text-sm font-semibold mb-3">Team Members</h3>
        <div className="flex flex-wrap gap-3">
          {participants.map((participant) => (
            <div key={participant.id} className="flex items-center gap-2 bg-background/50 rounded-lg px-3 py-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                <AvatarFallback>{participant.name[0]}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="text-sm font-medium truncate">{participant.name}</p>
                <p className="text-xs text-muted-foreground">{participant.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
