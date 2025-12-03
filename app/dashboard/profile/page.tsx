"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { motion } from "framer-motion"
import { Camera, Save, Mail, User } from "lucide-react"

interface UserProfile {
  id: string
  name: string
  email: string
  avatar?: string
  bio?: string
  joinDate?: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [name, setName] = useState("")
  const [bio, setBio] = useState("")
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("crm_token")
    if (!token) {
      router.push("/")
      return
    }

    const userData = localStorage.getItem("crm_user")
    if (userData) {
      const user = JSON.parse(userData)
      setProfile(user)
      setName(user.name)
      setBio(user.bio || "")
    }
  }, [router])

  const handleSaveProfile = async () => {
    if (!profile) return

    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      const updatedProfile = { ...profile, name, bio }
      localStorage.setItem("crm_user", JSON.stringify(updatedProfile))
      setProfile(updatedProfile)
    } finally {
      setIsSaving(false)
    }
  }

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setIsSaving(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))
      alert("Password changed successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } finally {
      setIsSaving(false)
    }
  }

  if (!profile) return null

  return (
    <DashboardLayout>
      <div className="p-6 md:p-8 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Profile</h1>
            <p className="text-muted-foreground mt-2">Manage your account and personal information</p>
          </div>

          {/* Avatar Section */}
          <Card className="p-6 bg-card/60 backdrop-blur">
            <h2 className="font-semibold mb-4">Profile Picture</h2>
            <div className="flex items-center gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={profile.avatar || "/placeholder.svg"} alt={profile.name} />
                <AvatarFallback>{profile.name[0]}</AvatarFallback>
              </Avatar>
              <Button className="gap-2 bg-primary hover:bg-primary/90">
                <Camera className="w-4 h-4" />
                Change Avatar
              </Button>
            </div>
          </Card>

          {/* Profile Info */}
          <Card className="p-6 bg-card/60 backdrop-blur">
            <h2 className="font-semibold mb-4">Personal Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <Input value={name} onChange={(e) => setName(e.target.value)} className="mt-2 bg-input" />
              </div>

              <div>
                <label className="text-sm font-medium flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email (Read-only)
                </label>
                <Input value={profile.email} disabled className="mt-2 bg-muted" />
              </div>

              <div>
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  placeholder="Tell us about yourself..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="mt-2 bg-input"
                />
              </div>

              <Button onClick={handleSaveProfile} disabled={isSaving} className="bg-primary hover:bg-primary/90 gap-2">
                <Save className="w-4 h-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </Card>

          {/* Change Password */}
          <Card className="p-6 bg-card/60 backdrop-blur">
            <h2 className="font-semibold mb-4">Change Password</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Current Password</label>
                <Input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="mt-2 bg-input"
                />
              </div>

              <div>
                <label className="text-sm font-medium">New Password</label>
                <Input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="mt-2 bg-input"
                />
              </div>

              <div>
                <label className="text-sm font-medium">Confirm Password</label>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="mt-2 bg-input"
                />
              </div>

              <Button
                onClick={handleChangePassword}
                disabled={isSaving || !currentPassword || !newPassword}
                className="bg-primary hover:bg-primary/90"
              >
                {isSaving ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </Card>

          {/* Account Info */}
          <Card className="p-4 bg-accent/20 border-accent/30">
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Account ID:</span> {profile.id}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Member since:</span> Dec 3, 2024
              </p>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}
