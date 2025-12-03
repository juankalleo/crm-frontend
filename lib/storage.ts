// In-memory storage (replace with database in production)
export interface User {
  id: string
  name: string
  email: string
  password: string
  avatar?: string
  bio?: string
  theme: "light" | "dark"
  font: "geist" | "sans"
  cardRadius: "rounded" | "square"
}

export interface Project {
  id: string
  name: string
  description: string
  cover?: string
  priority: "low" | "medium" | "high"
  dueDate?: string
  value?: number
  participants: string[]
  comments: Comment[]
  links: Link[]
  notes?: string
  createdBy: string
  createdAt: string
}

export interface Comment {
  id: string
  text: string
  userId: string
  projectId: string
  createdAt: string
}

export interface Link {
  id: string
  name: string
  url: string
  emoji: string
}

export interface Task {
  id: string
  title: string
  description: string
  priority: "low" | "medium" | "high"
  assignedTo?: string
  completed: boolean
  dueDate?: string
  projectId?: string
  createdAt: string
}

export interface AuditLog {
  id: string
  action: string
  entity: string
  entityId: string
  userId: string
  changes: Record<string, unknown>
  createdAt: string
}

export interface Notification {
  id: string
  userId: string
  title: string
  message: string
  taskId?: string
  read: boolean
  createdAt: string
}

// In-memory database
export const db = {
  users: new Map<string, User>(),
  projects: new Map<string, Project>(),
  tasks: new Map<string, Task>(),
  auditLogs: new Map<string, AuditLog>(),
  notifications: new Map<string, Notification>(),
}

// Seed data
export function seedDatabase() {
  if (db.users.size > 0) return

  const userId1 = "user-1"
  const userId2 = "user-2"

  db.users.set(userId1, {
    id: userId1,
    name: "Ana Silva",
    email: "ana@example.com",
    password: "password123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana",
    bio: "Product Manager",
    theme: "light",
    font: "geist",
    cardRadius: "rounded",
  })

  db.users.set(userId2, {
    id: userId2,
    name: "João Costa",
    email: "joao@example.com",
    password: "password123",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Joao",
    bio: "Designer",
    theme: "light",
    font: "geist",
    cardRadius: "rounded",
  })

  const project1: Project = {
    id: "proj-1",
    name: "Website Redesign",
    description: "Complete redesign of company website with new branding",
    priority: "high",
    dueDate: "2025-02-15",
    value: 5000,
    participants: [userId1, userId2],
    comments: [],
    links: [],
    createdBy: userId1,
    createdAt: new Date().toISOString(),
  }

  db.projects.set(project1.id, project1)
}
