"use client"

import type { Project } from "@/lib/storage"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { SendHorizontal, LinkIcon, Plus } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"

interface MesaContentProps {
  project: Project
  onUpdateProject?: (project: Project) => void
}

export function MesaContent({ project, onUpdateProject }: MesaContentProps) {
  const [newComment, setNewComment] = useState("")
  const [newLink, setNewLink] = useState({ name: "", url: "", emoji: "🔗" })
  const [notes, setNotes] = useState(project.notes || "")

  const handleAddComment = () => {
    if (!newComment.trim()) return
    setNewComment("")
  }

  const handleAddLink = () => {
    if (!newLink.name || !newLink.url) return
    setNewLink({ name: "", url: "", emoji: "🔗" })
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="space-y-6">
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="bg-muted">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="links">Links</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <Card className="p-6 bg-card/60 backdrop-blur">
            <h3 className="font-semibold mb-4">Project Details</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground">Description</label>
                <p className="mt-1">{project.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground">Status</label>
                  <p className="mt-1 font-medium capitalize">{project.priority}</p>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground">Team Size</label>
                  <p className="mt-1 font-medium">{project.participants.length} members</p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Comments Tab */}
        <TabsContent value="comments" className="space-y-4">
          <Card className="p-6 bg-card/60 backdrop-blur">
            <h3 className="font-semibold mb-4">Comments</h3>

            {/* Comment Input */}
            <div className="mb-6 flex gap-2">
              <Input
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="bg-input"
              />
              <Button size="sm" onClick={handleAddComment} className="bg-primary hover:bg-primary/90">
                <SendHorizontal className="w-4 h-4" />
              </Button>
            </div>

            {/* Comments List */}
            {project.comments.length > 0 ? (
              <div className="space-y-4">
                {project.comments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-background/50 rounded-lg"
                  >
                    <p className="text-sm">{comment.text}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {new Date(comment.createdAt).toLocaleString("pt-BR")}
                    </p>
                  </motion.div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No comments yet</p>
            )}
          </Card>
        </TabsContent>

        {/* Links Tab */}
        <TabsContent value="links" className="space-y-4">
          <Card className="p-6 bg-card/60 backdrop-blur">
            <h3 className="font-semibold mb-4">Quick Links</h3>

            {/* Add Link Form */}
            <div className="mb-6 space-y-3">
              <div className="flex gap-2">
                <Input
                  placeholder="Emoji"
                  value={newLink.emoji}
                  onChange={(e) => setNewLink({ ...newLink, emoji: e.target.value })}
                  maxLength={2}
                  className="w-16 bg-input"
                />
                <Input
                  placeholder="Link name"
                  value={newLink.name}
                  onChange={(e) => setNewLink({ ...newLink, name: e.target.value })}
                  className="flex-1 bg-input"
                />
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="URL"
                  type="url"
                  value={newLink.url}
                  onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                  className="flex-1 bg-input"
                />
                <Button size="sm" onClick={handleAddLink} className="bg-primary hover:bg-primary/90">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Links List */}
            {project.links.length > 0 ? (
              <div className="space-y-2">
                {project.links.map((link) => (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3 rounded-lg bg-background/50 hover:bg-background transition-colors"
                  >
                    <span className="text-lg">{link.emoji}</span>
                    <span className="flex-1 font-medium text-primary underline">{link.name}</span>
                    <LinkIcon className="w-4 h-4 text-muted-foreground" />
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No links added yet</p>
            )}
          </Card>
        </TabsContent>

        {/* Notes Tab */}
        <TabsContent value="notes" className="space-y-4">
          <Card className="p-6 bg-card/60 backdrop-blur">
            <h3 className="font-semibold mb-4">Internal Notes</h3>
            <Textarea
              placeholder="Add internal notes about this project..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="min-h-48 bg-input"
            />
            <Button className="mt-4 bg-primary hover:bg-primary/90">Save Notes</Button>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
