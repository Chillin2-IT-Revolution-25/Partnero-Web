// src/services/recommendationsService.ts

export interface RecommendationRequest {
    business_id: string
    prompt: string
  }
  
  export interface BusinessLocation {
    DisplayName: string
    Street: string
    City: string
    State: string
    Postcode: string
    Country: string
    Latitude: number
    Longitude: number
  }
  
  export interface SocialMedia {
    Instagram?: string
    YouTube?: string
    LinkedIn?: string
    Website?: string
  }
  
  export interface RecommendationBusiness {
    _id: string
    BusinessName: string
    UserId: string
    Category: string
    Location: BusinessLocation
    Description: string
    CompanySize: number
    FoundedYear: number
    BusinessImageUrls: string[]
    SocialMedia: SocialMedia
    collaboration_ideas: string[]
  }
  
  export interface RecommendationsResponse {
    recommendations: RecommendationBusiness[]
  }
  
  export interface ApiError {
    message: string
    status: number
  }
  
  class RecommendationsService {
    private baseUrl: string
  
    constructor() {
      this.baseUrl = process.env.NEXT_PUBLIC_RECOMMENDATIONS_API_URL || 'http://localhost:8001'
    }
  
    async getRecommendations(request: RecommendationRequest): Promise<RecommendationsResponse> {
      try {
        const response = await fetch(`${this.baseUrl}/api/search_collab`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(request),
        })
  
        if (!response.ok) {
          const errorText = await response.text()
          throw new ApiError({
            message: errorText || 'Failed to fetch recommendations',
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
          message: 'Network error occurred while fetching recommendations',
          status: 0,
        })
      }
    }
  
    getBusinessImageUrl(business: RecommendationBusiness): string {
      return business.BusinessImageUrls?.[0] || '/api/placeholder/300/200'
    }
  
    formatLocation(location: BusinessLocation): string {
      const parts = [location.City, location.State, location.Country].filter(part => part && part !== '-')
      return parts.join(', ') || location.DisplayName || 'Location not specified'
    }
  
    getBusinessOwnerName(business: RecommendationBusiness): string {
      return `Owner of ${business.BusinessName}`
    }
  }
  
  export class ApiError extends Error {
    status: number
  
    constructor({ message, status }: { message: string; status: number }) {
      super(message)
      this.name = 'ApiError'
      this.status = status
    }
  }
  
  export const recommendationsService = new RecommendationsService()
  
  export default RecommendationsService