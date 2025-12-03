"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { Moon, Sun, SquareIcon, HandCoinsIcon as RoundedCornersIcon, Palette, Bell, Lock } from "lucide-react"
import { useEffect as useEffectHook } from "react"

interface UserSettings {
  theme: "light" | "dark"
  font: "geist" | "sans" | "serif"
  cardRadius: "rounded" | "square"
  notificationsEnabled: boolean
  emailNotifications: boolean
}

export default function SettingsPage() {
  const router = useRouter()
  const [settings, setSettings] = useState<UserSettings>({
    theme: "light",
    font: "geist",
    cardRadius: "rounded",
    notificationsEnabled: true,
    emailNotifications: true,
  })
  const [isSaving, setIsSaving] = useState(false)

  useEffectHook(() => {
    const token = localStorage.getItem("crm_token")
    if (!token) {
      router.push("/")
      return
    }

    // Load settings from localStorage
    const savedSettings = localStorage.getItem("crm_settings")
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }

    // Apply theme to document
    const html = document.documentElement
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings)
      if (parsed.theme === "dark") {
        html.classList.add("dark")
      } else {
        html.classList.remove("dark")
      }
    }
  }, [router])

  const handleThemeChange = (theme: "light" | "dark") => {
    const newSettings = { ...settings, theme }
    setSettings(newSettings)
    saveSettings(newSettings)

    // Apply theme
    const html = document.documentElement
    if (theme === "dark") {
      html.classList.add("dark")
    } else {
      html.classList.remove("dark")
    }
  }

  const handleFontChange = (font: "geist" | "sans" | "serif") => {
    const newSettings = { ...settings, font }
    setSettings(newSettings)
    saveSettings(newSettings)
    applyFont(font)
  }

  const handleCardRadiusChange = (radius: "rounded" | "square") => {
    const newSettings = { ...settings, cardRadius: radius }
    setSettings(newSettings)
    saveSettings(newSettings)
    applyCardRadius(radius)
  }

  const handleNotificationsChange = (type: "all" | "email") => {
    const newSettings =
      type === "all"
        ? { ...settings, notificationsEnabled: !settings.notificationsEnabled }
        : { ...settings, emailNotifications: !settings.emailNotifications }

    setSettings(newSettings)
    saveSettings(newSettings)
  }

  const saveSettings = async (newSettings: UserSettings) => {
    setIsSaving(true)
    try {
      localStorage.setItem("crm_settings", JSON.stringify(newSettings))
      await new Promise((resolve) => setTimeout(resolve, 300))
    } finally {
      setIsSaving(false)
    }
  }

  const applyFont = (font: string) => {
    const html = document.documentElement
    html.classList.remove("font-sans", "font-serif", "font-mono")
    html.classList.add(`font-${font === "serif" ? "serif" : "sans"}`)
  }

  const applyCardRadius = (radius: string) => {
    const root = document.documentElement
    if (radius === "square") {
      root.style.setProperty("--radius", "0.25rem")
    } else {
      root.style.setProperty("--radius", "0.75rem")
    }
  }

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
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground mt-2">Customize your CRM experience</p>
          </div>

          {/* Theme Section */}
          <Card className="p-6 bg-card/60 backdrop-blur">
            <div className="flex items-center gap-3 mb-4">
              <Palette className="w-5 h-5" />
              <h2 className="font-semibold">Appearance</h2>
            </div>

            <div className="space-y-4">
              {/* Theme */}
              <div>
                <label className="text-sm font-medium mb-3 block">Theme</label>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleThemeChange("light")}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      settings.theme === "light" ? "border-primary bg-primary/10" : "border-border"
                    }`}
                  >
                    <Sun className="w-4 h-4" />
                    <span className="font-medium">Light</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleThemeChange("dark")}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      settings.theme === "dark" ? "border-primary bg-primary/10" : "border-border"
                    }`}
                  >
                    <Moon className="w-4 h-4" />
                    <span className="font-medium">Dark</span>
                  </motion.button>
                </div>
              </div>

              {/* Font Selection */}
              <div>
                <label className="text-sm font-medium mb-3 block">Font</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "geist", label: "Geist (Default)", preview: "font-sans" },
                    { id: "sans", label: "System Sans", preview: "font-sans" },
                    { id: "serif", label: "Serif", preview: "font-serif" },
                  ].map((font) => (
                    <motion.button
                      key={font.id}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => handleFontChange(font.id as any)}
                      className={`p-3 rounded-lg border-2 transition-all text-center ${
                        settings.font === font.id ? "border-primary bg-primary/10" : "border-border"
                      }`}
                    >
                      <div className={`${font.preview} text-sm font-medium`}>{font.label}</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Card Radius */}
              <div>
                <label className="text-sm font-medium mb-3 block">Card Style</label>
                <div className="flex gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleCardRadiusChange("rounded")}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      settings.cardRadius === "rounded" ? "border-primary bg-primary/10" : "border-border"
                    }`}
                  >
                    <RoundedCornersIcon className="w-4 h-4" />
                    <span className="font-medium">Rounded</span>
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => handleCardRadiusChange("square")}
                    className={`flex items-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${
                      settings.cardRadius === "square" ? "border-primary bg-primary/10" : "border-border"
                    }`}
                  >
                    <SquareIcon className="w-4 h-4" />
                    <span className="font-medium">Square</span>
                  </motion.button>
                </div>
              </div>
            </div>
          </Card>

          {/* Notifications Section */}
          <Card className="p-6 bg-card/60 backdrop-blur">
            <div className="flex items-center gap-3 mb-4">
              <Bell className="w-5 h-5" />
              <h2 className="font-semibold">Notifications</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Receive in-app notifications for tasks and updates
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={settings.notificationsEnabled ? "default" : "outline"}>
                    {settings.notificationsEnabled ? "On" : "Off"}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => handleNotificationsChange("all")}>
                    Toggle
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 rounded-lg bg-background/50">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-xs text-muted-foreground mt-1">Receive email notifications for important events</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={settings.emailNotifications ? "default" : "outline"}>
                    {settings.emailNotifications ? "On" : "Off"}
                  </Badge>
                  <Button size="sm" variant="outline" onClick={() => handleNotificationsChange("email")}>
                    Toggle
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Privacy & Security */}
          <Card className="p-6 bg-card/60 backdrop-blur">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-5 h-5" />
              <h2 className="font-semibold">Privacy & Security</h2>
            </div>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Two-Factor Authentication
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Connected Devices
              </Button>
            </div>
          </Card>

          {/* Data Management */}
          <Card className="p-6 bg-card/60 backdrop-blur">
            <h2 className="font-semibold mb-4">Data Management</h2>

            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                Export My Data
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start text-destructive hover:text-destructive bg-transparent"
              >
                Delete Account
              </Button>
            </div>
          </Card>

          {/* Info Box */}
          <Card className="p-4 bg-accent/20 border-accent/30">
            <p className="text-sm">
              <span className="font-semibold">Note:</span> Your preferences are saved locally in your browser and will
              persist across sessions.
            </p>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
