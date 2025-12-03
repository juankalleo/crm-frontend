"use client"

import { useEffect, useState } from "react"

export function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">("light")

  useEffect(() => {
    const savedTheme = localStorage.getItem("crm_settings")
    if (savedTheme) {
      const settings = JSON.parse(savedTheme)
      setTheme(settings.theme || "light")

      if (settings.theme === "dark") {
        document.documentElement.classList.add("dark")
      }
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)

    const settings = localStorage.getItem("crm_settings")
    const currentSettings = settings ? JSON.parse(settings) : {}
    localStorage.setItem("crm_settings", JSON.stringify({ ...currentSettings, theme: newTheme }))

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return { theme, toggleTheme }
}
