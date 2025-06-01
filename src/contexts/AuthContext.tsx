// src/contexts/AuthContext.tsx
'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { authService, LoginRequest, RegisterRequest, LoginResponse, RegisterResponse } from '@/services/authService'
import { APP_CONFIG } from '@/config/appConfig'

interface User {
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

interface AuthContextType {
  isLoggedIn: boolean
  user: User | null
  login: (credentials: LoginRequest) => Promise<{ success: boolean; error?: string }>
  register: (userData: RegisterRequest) => Promise<{ success: boolean; error?: string }>
  logout: () => void
  updateUser: (userData: Partial<User>) => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing auth state on mount
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const authData = localStorage.getItem(APP_CONFIG.auth.localStorageKey)
        if (authData) {
          const parsedData = JSON.parse(authData)
          
          // Check if we have the required data and token is not expired
          if (parsedData.isLoggedIn && parsedData.user && parsedData.user.accessToken) {
            const token = parsedData.user.accessToken
            
            // Check if token is expired
            if (!authService.isTokenExpired(token)) {
              setIsLoggedIn(true)
              setUser(parsedData.user)
            } else {
              // Token expired, clear auth data
              localStorage.removeItem(APP_CONFIG.auth.localStorageKey)
            }
          }
        }
      } catch (error) {
        console.error('Error parsing auth data:', error)
        // Clear corrupted data
        localStorage.removeItem(APP_CONFIG.auth.localStorageKey)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthState()
  }, [])

  const login = async (credentials: LoginRequest): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authService.login(credentials)
      
      if (response.success && response.user) {
        const userData: User = {
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          name: `${response.user.firstName} ${response.user.lastName}`,
          email: response.user.email,
          avatar: response.user.avatarUrl || '/api/placeholder/40/40',
          userId: response.user.userId,
          accessToken: response.user.accessToken,
          business: {
            name: response.user.businessInfo.name,
            description: response.user.businessInfo.description,
            location: response.user.businessInfo.location || 'Not specified',
            category: response.user.businessInfo.category
          }
        }
        
        setIsLoggedIn(true)
        setUser(userData)
        
        // Store in localStorage
        try {
          localStorage.setItem(APP_CONFIG.auth.localStorageKey, JSON.stringify({
            isLoggedIn: true,
            user: userData
          }))
        } catch (error) {
          console.error('Error saving auth data:', error)
        }
        
        return { success: true }
      } else {
        return { success: false, error: 'Invalid credentials' }
      }
    } catch (error: any) {
      console.error('Login error:', error)
      return { 
        success: false, 
        error: error.message || 'Login failed. Please try again.' 
      }
    }
  }

  const register = async (userData: RegisterRequest): Promise<{ success: boolean; error?: string }> => {
    try {
      const response = await authService.register(userData)
      
      if (response.success && response.user) {
        const userAccount: User = {
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          name: `${response.user.firstName} ${response.user.lastName}`,
          email: response.user.email,
          avatar: response.user.avatarUrl || '/api/placeholder/40/40',
          userId: response.user.userId,
          accessToken: response.user.accessToken,
          business: {
            name: response.user.businessInfo.name,
            description: response.user.businessInfo.description,
            location: response.user.businessInfo.location || 'Not specified',
            category: response.user.businessInfo.category
          }
        }
        
        setIsLoggedIn(true)
        setUser(userAccount)
        
        // Store in localStorage
        try {
          localStorage.setItem(APP_CONFIG.auth.localStorageKey, JSON.stringify({
            isLoggedIn: true,
            user: userAccount
          }))
        } catch (error) {
          console.error('Error saving auth data:', error)
        }
        
        return { success: true }
      } else {
        return { success: false, error: response.message || 'Registration failed' }
      }
    } catch (error: any) {
      console.error('Registration error:', error)
      return { 
        success: false, 
        error: error.message || 'Registration failed. Please try again.' 
      }
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
    
    // Clear localStorage and service
    try {
      authService.clearStoredAuth()
      localStorage.removeItem(APP_CONFIG.auth.localStorageKey)
    } catch (error) {
      console.error('Error clearing auth data:', error)
    }
  }

  const updateUser = (updatedData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData }
      setUser(updatedUser)
      
      // Update localStorage
      try {
        localStorage.setItem(APP_CONFIG.auth.localStorageKey, JSON.stringify({
          isLoggedIn: true,
          user: updatedUser
        }))
      } catch (error) {
        console.error('Error updating auth data:', error)
      }
    }
  }

  // Don't render children until we've checked auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-[#9A9A4A] rounded-full animate-spin"></div>
          <p className="text-gray-600 text-sm">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      user,
      login,
      register,
      logout,
      updateUser,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}