// utils/businessUtils.ts
import { type Business } from '@/data/mockBusinesses'

export interface FilterOptions {
  category: string
  location: string
  platform: string
  rating: number
  searchTerm?: string
}

export interface SortOptions {
  field: 'name' | 'rating' | 'followers' | 'recent'
  direction: 'asc' | 'desc'
}

/**
 * Filter businesses based on various criteria
 */
export const filterBusinesses = (
  businesses: Business[], 
  filters: FilterOptions
): Business[] => {
  return businesses.filter(business => {
    // Search term filter
    if (filters.searchTerm) {
      const searchTerm = filters.searchTerm.toLowerCase()
      const matchesSearch = 
        business.name.toLowerCase().includes(searchTerm) ||
        business.description.toLowerCase().includes(searchTerm) ||
        business.category.toLowerCase().includes(searchTerm) ||
        business.location.toLowerCase().includes(searchTerm)
      
      if (!matchesSearch) return false
    }

    // Category filter
    if (filters.category && business.category !== filters.category) {
      return false
    }

    // Location filter
    if (filters.location && !business.location.includes(filters.location)) {
      return false
    }

    // Platform filter
    if (filters.platform && !business.platforms.includes(filters.platform)) {
      return false
    }

    // Rating filter
    if (filters.rating && business.rating < filters.rating) {
      return false
    }

    return true
  })
}

/**
 * Sort businesses based on specified criteria
 */
export const sortBusinesses = (
  businesses: Business[], 
  sortOptions: SortOptions
): Business[] => {
  const sorted = [...businesses].sort((a, b) => {
    let comparison = 0

    switch (sortOptions.field) {
      case 'name':
        comparison = a.name.localeCompare(b.name)
        break
      case 'rating':
        comparison = a.rating - b.rating
        break
      case 'followers':
        // Convert followers string to number for comparison
        const aFollowers = parseFollowerCount(a.followers)
        const bFollowers = parseFollowerCount(b.followers)
        comparison = aFollowers - bFollowers
        break
      case 'recent':
        // Sort by recent first, then by top rated
        if (a.isRecent && !b.isRecent) comparison = -1
        else if (!a.isRecent && b.isRecent) comparison = 1
        else if (a.isTopRated && !b.isTopRated) comparison = -1
        else if (!a.isTopRated && b.isTopRated) comparison = 1
        else comparison = b.rating - a.rating
        break
      default:
        comparison = 0
    }

    return sortOptions.direction === 'desc' ? -comparison : comparison
  })

  return sorted
}

/**
 * Parse follower count string to number for sorting
 */
const parseFollowerCount = (followers: string): number => {
  const numStr = followers.replace(/[^\d.]/g, '')
  const num = parseFloat(numStr)
  
  if (followers.includes('K')) return num * 1000
  if (followers.includes('M')) return num * 1000000
  return num
}

/**
 * Get businesses by multiple categories
 */
export const getBusinessesByCategories = (
  businesses: Business[], 
  categories: string[]
): Business[] => {
  if (categories.length === 0) return businesses
  return businesses.filter(business => categories.includes(business.category))
}

/**
 * Get businesses within a rating range
 */
export const getBusinessesByRatingRange = (
  businesses: Business[], 
  minRating: number, 
  maxRating: number = 5
): Business[] => {
  return businesses.filter(business => 
    business.rating >= minRating && business.rating <= maxRating
  )
}

/**
 * Get featured businesses (top rated or recent)
 */
export const getFeaturedBusinesses = (
  businesses: Business[], 
  limit: number = 6
): Business[] => {
  const featured = businesses.filter(business => 
    business.isTopRated || business.isRecent
  )
  return featured.slice(0, limit)
}

/**
 * Get recommended businesses based on a business (similar category/location)
 */
export const getRecommendedBusinesses = (
  businesses: Business[], 
  currentBusiness: Business, 
  limit: number = 4
): Business[] => {
  const recommended = businesses
    .filter(business => 
      business.id !== currentBusiness.id && (
        business.category === currentBusiness.category ||
        business.location === currentBusiness.location
      )
    )
    .sort((a, b) => {
      // Prioritize same category, then same location, then rating
      if (a.category === currentBusiness.category && b.category !== currentBusiness.category) return -1
      if (a.category !== currentBusiness.category && b.category === currentBusiness.category) return 1
      if (a.location === currentBusiness.location && b.location !== currentBusiness.location) return -1
      if (a.location !== currentBusiness.location && b.location === currentBusiness.location) return 1
      return b.rating - a.rating
    })
    .slice(0, limit)

  return recommended
}

/**
 * Generate search suggestions based on business data
 */
export const generateSearchSuggestions = (
  businesses: Business[], 
  query: string, 
  limit: number = 5
): string[] => {
  if (!query) return []
  
  const lowercaseQuery = query.toLowerCase()
  const suggestions = new Set<string>()

  businesses.forEach(business => {
    // Add business names that match
    if (business.name.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(business.name)
    }
    
    // Add categories that match
    if (business.category.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(business.category)
    }
    
    // Add locations that match
    if (business.location.toLowerCase().includes(lowercaseQuery)) {
      suggestions.add(business.location)
    }
  })

  return Array.from(suggestions).slice(0, limit)
}

/**
 * Get business statistics
 */
export const getBusinessStats = (businesses: Business[]) => {
  const totalBusinesses = businesses.length
  const categories = [...new Set(businesses.map(b => b.category))]
  const locations = [...new Set(businesses.map(b => b.location))]
  const averageRating = businesses.reduce((sum, b) => sum + b.rating, 0) / totalBusinesses
  const topRatedCount = businesses.filter(b => b.isTopRated).length
  const recentCount = businesses.filter(b => b.isRecent).length

  return {
    totalBusinesses,
    totalCategories: categories.length,
    totalLocations: locations.length,
    averageRating: Math.round(averageRating * 10) / 10,
    topRatedCount,
    recentCount,
    categories,
    locations
  }
}

/**
 * Validate business data
 */
export const validateBusiness = (business: Partial<Business>): string[] => {
  const errors: string[] = []

  if (!business.name?.trim()) {
    errors.push('Business name is required')
  }

  if (!business.description?.trim()) {
    errors.push('Description is required')
  } else if (business.description.length < 50) {
    errors.push('Description must be at least 50 characters')
  }

  if (!business.category?.trim()) {
    errors.push('Category is required')
  }

  if (!business.location?.trim()) {
    errors.push('Location is required')
  }

  if (!business.platforms || business.platforms.length === 0) {
    errors.push('At least one platform is required')
  }

  if (business.rating !== undefined && (business.rating < 0 || business.rating > 5)) {
    errors.push('Rating must be between 0 and 5')
  }

  return errors
}

/**
 * Format follower count for display
 */
export const formatFollowerCount = (count: number): string => {
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`
  }
  return count.toString()
}

/**
 * Generate business URL slug
 */
export const generateBusinessSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}