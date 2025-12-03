"use client"

import type { Notification, User } from "@/lib/storage"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface NotificationsPanelProps {
  notifications: Notification[]
  users: Map<string, User>
  onDismiss?: (id: string) => void
  onMarkAsRead?: (id: string) => void
}

export function NotificationsPanel({ notifications, users, onDismiss, onMarkAsRead }: NotificationsPanelProps) {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5" />
          <h3 className="font-semibold">Notifications</h3>
          {unreadCount > 0 && <Badge variant="destructive">{unreadCount}</Badge>}
        </div>
      </div>

      {/* Notifications List */}
      <AnimatePresence>
        {notifications.length > 0 ? (
          <div className="space-y-2">
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                whileHover={{ x: 4 }}
              >
                <Card
                  className={`p-3 cursor-pointer transition-all ${
                    notification.read ? "bg-card/40" : "bg-accent/20 border-accent/50"
                  }`}
                  onClick={() => onMarkAsRead?.(notification.id)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm">{notification.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(notification.createdAt).toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onDismiss?.(notification.id)
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-muted-foreground"
          >
            <p className="text-sm">No notifications</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
