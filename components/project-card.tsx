"use client"

import type { Project, User } from "@/lib/storage"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, X, Calendar, DollarSign } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface ProjectCardProps {
  project: Project
  participants: User[]
  onDelete?: (id: string) => void
  onClick?: () => void
}

const priorityColors = {
  low: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  high: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
}

export function ProjectCard({ project, participants, onDelete, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card
        className="overflow-hidden cursor-pointer h-full flex flex-col hover:shadow-lg transition-shadow bg-card/60 backdrop-blur border-border/50"
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Cover Image */}
        <div className="relative h-40 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 overflow-hidden">
          <img
            src={project.cover || "/placeholder.svg?height=160&width=400&query=project-cover"}
            alt={project.name}
            className="w-full h-full object-cover"
          />

          {/* Participants Stickers */}
          <div className="absolute top-3 right-3 flex flex-row-reverse -space-x-2">
            {participants.slice(0, 5).map((participant, idx) => (
              <Avatar key={participant.id} className="w-8 h-8 border-2 border-card">
                <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                <AvatarFallback>{participant.name[0]}</AvatarFallback>
              </Avatar>
            ))}
          </div>

          {/* Delete Button */}
          {isHovered && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => {
                e.stopPropagation()
                onDelete?.(project.id)
              }}
              className="absolute top-3 left-3 p-1.5 rounded-lg bg-destructive/90 hover:bg-destructive text-destructive-foreground transition-colors"
            >
              <X className="w-4 h-4" />
            </motion.button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col gap-3">
          {/* Title and Priority */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-base text-card-foreground truncate">{project.name}</h3>
              <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{project.description}</p>
            </div>
            <Badge className={`${priorityColors[project.priority]} text-xs shrink-0`}>{project.priority}</Badge>
          </div>

          {/* Info Grid */}
          <div className="space-y-2 text-xs">
            {project.dueDate && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                <span>{new Date(project.dueDate).toLocaleDateString("pt-BR")}</span>
              </div>
            )}
            {project.value && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="w-3.5 h-3.5" />
                <span>R$ {project.value.toLocaleString("pt-BR")}</span>
              </div>
            )}
          </div>

          {/* Comments Count */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>{project.comments.length} comments</span>
          </div>
        </div>

        {/* Comment Box */}
        <div className="border-t border-border/50 p-3">
          <input
            type="text"
            placeholder="Add a comment..."
            onClick={(e) => e.stopPropagation()}
            className="w-full text-xs px-3 py-2 rounded-lg bg-input border border-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </Card>
    </motion.div>
  )
}
