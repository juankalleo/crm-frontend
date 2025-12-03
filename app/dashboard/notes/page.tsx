"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { Save, RotateCcw } from "lucide-react"

export default function NotesPage() {
  const router = useRouter()
  const [notes, setNotes] = useState("")
  const [originalNotes, setOriginalNotes] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [lastSaved, setLastSaved] = useState<Date | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("crm_token")
    if (!token) {
      router.push("/")
      return
    }

    // Load notes from localStorage
    const savedNotes = localStorage.getItem("crm_notes") || ""
    setNotes(savedNotes)
    setOriginalNotes(savedNotes)
  }, [router])

  // Auto-save every 30 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (notes !== originalNotes) {
        handleSave()
      }
    }, 30000)

    return () => clearInterval(timer)
  }, [notes, originalNotes])

  const handleSave = async () => {
    setIsSaving(true)
    try {
      localStorage.setItem("crm_notes", notes)
      setOriginalNotes(notes)
      setLastSaved(new Date())

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))
    } finally {
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    if (window.confirm("Discard changes and reload last saved version?")) {
      setNotes(originalNotes)
    }
  }

  const hasChanges = notes !== originalNotes

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Personal Notes</h1>
            <p className="text-muted-foreground mt-2">
              Keep your thoughts and ideas organized. Notes are saved locally on your device.
            </p>
          </div>

          {/* Editor Card */}
          <Card className="p-6 bg-card/60 backdrop-blur">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="font-semibold">Your Notes</label>
                {lastSaved && (
                  <p className="text-xs text-muted-foreground">Last saved: {lastSaved.toLocaleTimeString("pt-BR")}</p>
                )}
              </div>

              <Textarea
                placeholder="Write your notes here... (saved automatically)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="min-h-96 bg-input text-base resize-none"
              />

              <div className="flex gap-2 justify-end">
                {hasChanges && (
                  <Button variant="outline" onClick={handleReset} className="gap-2 bg-transparent">
                    <RotateCcw className="w-4 h-4" />
                    Reset
                  </Button>
                )}
                <Button
                  onClick={handleSave}
                  disabled={!hasChanges || isSaving}
                  className={`bg-primary hover:bg-primary/90 gap-2 ${isSaving ? "opacity-75" : ""}`}
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? "Saving..." : "Save"}
                </Button>
              </div>
            </div>
          </Card>

          {/* Info Box */}
          <Card className="p-4 bg-accent/20 border-accent/30">
            <p className="text-sm">
              <span className="font-semibold">Note:</span> Your notes are stored securely in your browser's local
              storage and will persist even after you logout.
            </p>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
