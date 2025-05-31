'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface User {
  name: string
  email: string
  avatar: string
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
  login: (userData: User) => void
  logout: () => void
  updateUser: (userData: User) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing auth state on mount
  useEffect(() => {
    const checkAuthState = () => {
      try {
        const authData = localStorage.getItem('partnero_auth')
        if (authData) {
          const parsedData = JSON.parse(authData)
          if (parsedData.isLoggedIn && parsedData.user) {
            setIsLoggedIn(true)
            setUser(parsedData.user)
          }
        }
      } catch (error) {
        console.error('Error parsing auth data:', error)
        // Clear corrupted data
        localStorage.removeItem('partnero_auth')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuthState()
  }, [])

  const login = (userData: User) => {
    setIsLoggedIn(true)
    setUser(userData)
    
    // Store in localStorage
    try {
      localStorage.setItem('partnero_auth', JSON.stringify({
        isLoggedIn: true,
        user: userData
      }))
    } catch (error) {
      console.error('Error saving auth data:', error)
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUser(null)
    
    // Clear localStorage
    try {
      localStorage.removeItem('partnero_auth')
    } catch (error) {
      console.error('Error clearing auth data:', error)
    }
  }

  const updateUser = (userData: User) => {
    setUser(userData)
    
    // Update localStorage
    try {
      localStorage.setItem('partnero_auth', JSON.stringify({
        isLoggedIn: true,
        user: userData
      }))
    } catch (error) {
      console.error('Error updating auth data:', error)
    }
  }

  // Don't render children until we've checked auth state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-purple-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{
      isLoggedIn,
      user,
      login,
      logout,
      updateUser
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