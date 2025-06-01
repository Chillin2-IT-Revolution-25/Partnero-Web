// src/services/authService.ts
import { APP_CONFIG } from '@/config/appConfig'

// Types matching your backend DTOs
export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  success: boolean
  accessToken: string
  email: string
  userId: string
  user?: {
    firstName: string
    lastName: string
    email: string
    userId: string
    accessToken: string
    avatarUrl?: string
    businessInfo: {
      name: string
      description: string
      location?: string
      category: string
    }
  }
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  businessName: string
  category: string
  description: string
}

export interface RegisterResponse {
  message: string
  success: boolean
  accessToken: string
  email: string
  userId: string
  user?: {
    firstName: string
    lastName: string
    email: string
    userId: string
    accessToken: string
    avatarUrl?: string
    businessInfo: {
      name: string
      description: string
      location?: string
      category: string
    }
  }
}

export interface ApiError {
  message: string
  status: number
}

class AuthService {
  private baseUrl: string

  constructor() {
    // Use environment variable or fallback to localhost for development
    this.baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5219'
  }

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/Auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new ApiError({
          message: errorText || 'Login failed',
          status: response.status,
        })
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({
        message: 'Network error occurred',
        status: 0,
      })
    }
  }

  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/api/Auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new ApiError({
          message: errorText || 'Registration failed',
          status: response.status,
        })
      }

      const data = await response.json()
      return data
    } catch (error) {
      if (error instanceof ApiError) {
        throw error
      }
      throw new ApiError({
        message: 'Network error occurred',
        status: 0,
      })
    }
  }

  // Helper method to get stored token
  getStoredToken(): string | null {
    try {
      const authData = localStorage.getItem(APP_CONFIG.auth.localStorageKey)
      if (authData) {
        const parsed = JSON.parse(authData)
        return parsed.accessToken || null
      }
    } catch (error) {
      console.error('Error reading stored token:', error)
    }
    return null
  }

  // Helper method to clear stored auth data
  clearStoredAuth(): void {
    try {
      localStorage.removeItem(APP_CONFIG.auth.localStorageKey)
    } catch (error) {
      console.error('Error clearing stored auth:', error)
    }
  }

  // Helper method to check if token is expired (basic check)
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expiry = payload.exp * 1000 // Convert to milliseconds
      return Date.now() > expiry
    } catch (error) {
      return true // If we can't parse, assume expired
    }
  }

  // Create authenticated fetch wrapper
  async authenticatedFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const token = this.getStoredToken()
    
    if (!token || this.isTokenExpired(token)) {
      throw new ApiError({
        message: 'Authentication required',
        status: 401,
      })
    }

    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
  }
}

// Export singleton instance
export const authService = new AuthService()

// Custom error class
export class ApiError extends Error {
  status: number

  constructor({ message, status }: { message: string; status: number }) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}