declare module '@/lib/storage' {
  export type User = {
    id: string
    name: string
    email: string
    password?: string
    avatar?: string
    bio?: string
    theme?: 'light' | 'dark'
    font?: string
    cardRadius?: string
  }

  export type AppNotification = {
    id: string
    userId: string
    title: string
    message: string
    taskId?: string
    read: boolean
    createdAt: string
  }

  export const db: {
    users: Map<string, User>
    projects: Map<string, any>
    tasks: Map<string, any>
    notifications: Map<string, AppNotification>
    auditLogs: Map<string, any>
  }

  export function seedDatabase(): void
  export function generateId(): string
}

declare module '@/lib/auth' {
  export function generateToken(id: string, email: string): string
  export function verifyToken(token: string): { id: string; email: string } | null
  export function generateId(): string
}