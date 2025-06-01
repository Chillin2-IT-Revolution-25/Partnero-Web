// src/types/auth.ts
// Additional types for authentication

export interface AuthUser {
  firstName: string
  lastName: string
  name: string // Full name for display
  email: string
  avatar: string
  userId: string
  accessToken: string
  business: {
    name: string
    description: string
    location: string
    category: string
  }
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  businessName: string
  category: string
  description: string
}

export interface AuthResponse {
  success: boolean
  error?: string
}

export interface AuthContextType {
  isLoggedIn: boolean
  user: AuthUser | null
  login: (credentials: LoginCredentials) => Promise<AuthResponse>
  register: (userData: RegisterData) => Promise<AuthResponse>
  logout: () => void
  updateUser: (userData: Partial<AuthUser>) => void
  isLoading: boolean
}