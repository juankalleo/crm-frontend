"use client"

import { useState, useCallback } from "react"
import type { AppNotification } from "@/lib/storage"

export function useNotifications() {
  const [notifications, setNotifications] = useState<AppNotification[]>([])

  const addNotification = useCallback((notification: Omit<AppNotification, "id" | "createdAt">) => {
    const newNotification: AppNotification = {
      ...notification,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    }

    setNotifications((prev) => [newNotification, ...prev])

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== newNotification.id))
    }, 5000)

    return newNotification
  }, [])

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  return { notifications, addNotification, dismissNotification }
}
