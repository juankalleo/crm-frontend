"use client"

import { Button } from "@/components/ui/button"
import { Home, CheckSquare, FileText, History, Settings, LogOut, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { motion } from "framer-motion"

interface SidebarProps {
  onClose?: () => void
}

const menuItems = [
  { icon: Home, label: "Dashboard", href: "/dashboard" },
  { icon: CheckSquare, label: "Tasks", href: "/dashboard/tasks" },
  { icon: FileText, label: "Notes", href: "/dashboard/notes" },
  { icon: History, label: "Audit Logs", href: "/dashboard/audit" },
]

export function Sidebar({ onClose }: SidebarProps) {
  const router = useRouter()
  const pathname = usePathname()

  const handleNavigation = (href: string) => {
    router.push(href)
    onClose?.()
  }

  return (
    <motion.aside
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      exit={{ x: -250 }}
      className="w-64 h-full border-r border-border bg-sidebar flex flex-col"
    >
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <span className="text-sm font-bold text-primary-foreground">C</span>
          </div>
          <h1 className="font-bold text-lg">CRM</h1>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="md:hidden">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon

          return (
            <motion.button
              key={item.href}
              whileHover={{ x: 4 }}
              onClick={() => handleNavigation(item.href)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="font-medium">{item.label}</span>
            </motion.button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start"
          onClick={() => handleNavigation("/dashboard/settings")}
        >
          <Settings className="w-4 h-4 mr-2" />
          Settings
        </Button>

        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-destructive hover:text-destructive"
          onClick={() => {
            localStorage.removeItem("crm_token")
            localStorage.removeItem("crm_user")
            router.push("/")
          }}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Logout
        </Button>
      </div>
    </motion.aside>
  )
}
