"use client"

import { type ReactNode, useState } from "react"
import { Sidebar } from "./sidebar"
import { TopBar } from "./top-bar"
import { motion } from "framer-motion"

interface DashboardLayoutProps {
  children: ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <motion.div initial={{ x: -250 }} animate={{ x: 0 }} transition={{ duration: 0.3 }} className="hidden md:block">
        <Sidebar />
      </motion.div>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <motion.div initial={{ x: -250 }} animate={{ x: 0 }} exit={{ x: -250 }} className="fixed md:hidden z-40 h-full">
          <Sidebar onClose={() => setSidebarOpen(false)} />
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
