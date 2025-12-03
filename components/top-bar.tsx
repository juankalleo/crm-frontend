"use client"

import { Button } from "@/components/ui/button"
import { Menu, Bell, Plus } from "lucide-react"
import { UserMenu } from "./user-menu"
import { motion } from "framer-motion"

interface TopBarProps {
  onMenuClick?: () => void
}

export function TopBar({ onMenuClick }: TopBarProps) {
  return (
    <motion.div
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b border-border bg-card/80 backdrop-blur sticky top-0 z-30 h-16 flex items-center justify-between px-6"
    >
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onMenuClick}>
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        </Button>

        <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4" />
          New Project
        </Button>

        <UserMenu />
      </div>
    </motion.div>
  )
}
