// types/index.ts

import { Business } from '@/data/mockBusinesses'
import { JSX } from 'react'

// Re-export business types
export type { Business } from '@/data/mockBusinesses'

// User and Authentication Types
export interface User {
  name: string
  email: string
  avatar: string
  business: BusinessProfile
}

export type { AuthUser, LoginCredentials, RegisterData, AuthResponse, AuthContextType } from './auth'

export interface BusinessProfile {
  name: string
  description: string
  location: string
  category: string
  businessId: string // Added businessId field
  companySize?: string
  foundedYear?: number
  website?: string
  socialMedia?: SocialMediaLinks
}

export interface SocialMediaLinks {
  instagram?: string
  youtube?: string
  tiktok?: string
  linkedin?: string
  twitter?: string
  pinterest?: string
  telegram?: string
  website?: string
}

// Form and Filter Types
export interface FormValidationErrors {
  [key: string]: string
}

export interface SignUpFormData {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
  businessName: string
  businessType: string
  category: string
  description: string
  agreeToTerms: boolean
  receiveUpdates: boolean
}

export interface SignInFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  collaborationType: string
  portfolio: string
  budget: string
}

export interface BusinessFilters {
  category: string
  location: string
  platform: string
  rating: number
  collaborationType?: string[]
  searchTerm?: string
}

// Component Props Types - Updated User interface
export interface BusinessCardProps {
  business: Business
  viewMode: 'grid' | 'list'
  isLoggedIn: boolean
  onBusinessClick: (businessId: string) => void
  onEmailBusiness: (businessId: string) => void
}

export interface BusinessListProps {
  isLoggedIn: boolean
  onBusinessClick: (businessId: string) => void
  onEmailBusiness: (businessId: string) => void
}

export interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  filters: BusinessFilters
  onFilterChange: (filters: BusinessFilters) => void
}

export interface EmailModalProps {
  businessId: string
  onClose: () => void
  isLoggedIn: boolean
}

// Updated User interface for profile modal
export interface ProfileModalUser {
  firstName: string
  lastName: string
  name: string
  email: string
  avatar: string
  business: {
    name: string
    description: string
    location: string
    category: string
    businessId: string // Added businessId field
  }
}

export interface ProfileModalProps {
  user: ProfileModalUser
  onClose: () => void
  onLogout: () => void
}

// Updated User interface for navbar
export interface NavbarUser {
  firstName: string
  lastName: string
  name: string
  email: string
  avatar: string
  userId: string
  accessToken: string
  business: {
    name: string
    description: string
    location: string
    category: string
    businessId: string // Added businessId field
  }
}

export interface NavbarProps {
  isLoggedIn: boolean
  user: NavbarUser | null
  onProfileClick: () => void
  onLogout: () => void
  onBrowseClick?: () => void
}

// Platform and Collaboration Types
export interface Platform {
  name: string
  value: string
  icon?: JSX.Element
}

export interface CollaborationType {
  id: string
  name: string
  description: string
  icon?: JSX.Element
}

export interface BudgetRange {
  value: string
  label: string
  min?: number
  max?: number
}

// API and Data Types
export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
  error?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  totalCount: number
  page: number
  limit: number
  totalPages: number
}

export interface BusinessSearchParams {
  query?: string
  category?: string
  location?: string
  platform?: string
  rating?: number
  page?: number
  limit?: number
  sortBy?: string
  sortDirection?: 'asc' | 'desc'
}

// Notification and UI Types
export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  duration?: number
  action?: NotificationAction
}

export interface NotificationAction {
  label: string
  onClick: () => void
}

export interface LoadingState {
  isLoading: boolean
  message?: string
}

export interface ErrorState {
  hasError: boolean
  message: string
  code?: string
}

// Theme and Style Types
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textSecondary: string
  border: string
  success: string
  warning: string
  error: string
  info: string
}

export type ViewMode = 'grid' | 'list'
export type SortDirection = 'asc' | 'desc'
export type SortField = 'name' | 'rating' | 'followers' | 'recent' | 'category' | 'location'

// Route and Navigation Types
export interface RouteConfig {
  path: string
  component: React.ComponentType
  exact?: boolean
  private?: boolean
  title?: string
}

export interface BreadcrumbItem {
  label: string
  href?: string
  active?: boolean
}

// Analytics and Tracking Types
export interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
  userId?: string
  businessId?: string
}

export interface UserActivity {
  id: string
  userId: string
  action: string
  targetType: 'business' | 'user' | 'message' | 'search'
  targetId: string
  timestamp: Date
  metadata?: Record<string, any>
}

// Utility Types
export type Prettify<T> = {
  [K in keyof T]: T[K]
} & {}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export type OptionalKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? K : never
}[keyof T]

// Constants and Enums
export const BUSINESS_CATEGORIES = [
  'Digital Marketing',
  'Technology',
  'Health & Wellness',
  'Fashion',
  'Food & Beverage',
  'Education',
  'Entertainment',
  'Finance',
  'Travel',
  'Real Estate',
  'Beauty & Cosmetics'
] as const

export const COLLABORATION_TYPES = [
  'Sponsored Content',
  'Product Review',
  'Brand Ambassador',
  'Long-term Partnership',
  'Event Coverage',
  'Content Creation',
  'Other'
] as const

export const PLATFORMS = [
  'Instagram',
  'YouTube',
  'TikTok',
  'LinkedIn',
  'Twitter',
  'Pinterest',
  'Telegram',
  'Facebook'
] as const

export type BusinessCategory = typeof BUSINESS_CATEGORIES[number]
export type CollaborationTypeName = typeof COLLABORATION_TYPES[number]
export type PlatformName = typeof PLATFORMS[number]