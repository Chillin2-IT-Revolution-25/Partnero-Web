'use client'

import { useState } from 'react'
import { MapPin, Star, Users, MessageCircle, Lock, Instagram, Youtube, Heart, Share2, Mail, Lightbulb } from 'lucide-react'
import { type RecommendationBusiness } from '@/services/recommendationsService'
import { recommendationsService } from '@/services/recommendationsService'

interface RecommendationCardProps {
  business: RecommendationBusiness
  viewMode: 'grid' | 'list'
  isLoggedIn: boolean
  onBusinessClick: (businessId: string) => void
  onEmailBusiness: (businessId: string) => void
}

export default function RecommendationCard({ 
  business, 
  viewMode, 
  isLoggedIn, 
  onBusinessClick, 
  onEmailBusiness 
}: RecommendationCardProps) {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)

  const handleMessage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      setTimeout(() => setShowLoginPrompt(false), 3000)
      return
    }
    onEmailBusiness(business._id)
  }

  const handleReadMore = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      setTimeout(() => setShowLoginPrompt(false), 3000)
      return
    }
    setShowFullDescription(!showFullDescription)
  }

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      setTimeout(() => setShowLoginPrompt(false), 3000)
      return
    }
    setIsLiked(!isLiked)
  }

  const handleCardClick = () => {
    onBusinessClick(business._id)
  }

  // Get business image
  const businessImage = recommendationsService.getBusinessImageUrl(business)
  
  // Format location
  const location = recommendationsService.formatLocation(business.Location)
  
  // Get business owner name
  const ownerName = recommendationsService.getBusinessOwnerName(business)

  const truncatedDescription = business.Description.length > 120 
    ? `${business.Description.substring(0, 120)}...` 
    : business.Description

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 relative cursor-pointer border-l-4 border-l-blue-500"
        onClick={handleCardClick}
      >
        {showLoginPrompt && (
          <div className="absolute top-4 right-4 bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm z-10">
            Please login to interact
          </div>
        )}

        {/* AI Recommendation Badge */}
        <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center">
          <Lightbulb className="w-3 h-3 mr-1" />
          AI Match
        </div>
        
        <div className="flex gap-6">
          {/* Image */}
          <div className="relative w-32 h-24 flex-shrink-0">
            <img
              src={businessImage}
              alt={business.BusinessName}
              className="w-full h-full object-cover rounded-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/api/placeholder/300/200'
              }}
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{business.BusinessName}</h3>
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                  {business.Category}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3">
              {showFullDescription ? business.Description : truncatedDescription}
              {business.Description.length > 120 && (
                <button
                  onClick={handleReadMore}
                  className="text-blue-600 hover:text-blue-700 ml-1 font-medium inline-flex items-center"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                  {!isLoggedIn && <Lock className="w-3 h-3 ml-1" />}
                </button>
              )}
            </p>

            {/* Collaboration Ideas */}
            {business.collaboration_ideas && business.collaboration_ideas.length > 0 && (
              <div className="mb-3">
                <p className="text-xs font-medium text-gray-700 mb-1">Collaboration Ideas:</p>
                <div className="flex flex-wrap gap-1">
                  {business.collaboration_ideas.slice(0, 3).map((idea, index) => (
                    <span key={index} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                      {idea}
                    </span>
                  ))}
                  {business.collaboration_ideas.length > 3 && (
                    <span className="text-xs text-gray-500">+{business.collaboration_ideas.length - 3} more</span>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {location}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  4.8 {/* Default rating for recommendations */}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {business.CompanySize} employees
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {/* Message Button */}
                <button
                  onClick={handleMessage}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center text-sm font-medium"
                >
                  {!isLoggedIn && <Lock className="w-4 h-4 mr-1" />}
                  <Mail className="w-4 h-4 mr-1" />
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Grid view
  return (
    <div 
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 relative cursor-pointer flex flex-col h-full border-t-4 border-t-blue-500"
      onClick={handleCardClick}
    >
      {showLoginPrompt && (
        <div className="absolute top-4 right-4 bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm z-10">
          Please login to interact
        </div>
      )}

      {/* AI Recommendation Badge */}
      <div className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center z-10">
        <Lightbulb className="w-3 h-3 mr-1" />
        AI Match
      </div>
      
      {/* Image */}
      <div className="relative h-48 flex-shrink-0">
        <img
          src={businessImage}
          alt={business.BusinessName}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/api/placeholder/300/200'
          }}
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{business.BusinessName}</h3>
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {business.Category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {showFullDescription ? business.Description : truncatedDescription}
          {business.Description.length > 120 && (
            <button
              onClick={handleReadMore}
              className="text-blue-600 hover:text-blue-700 ml-1 font-medium inline-flex items-center"
            >
              {showFullDescription ? 'Show less' : 'Read more'}
              {!isLoggedIn && <Lock className="w-3 h-3 ml-1" />}
            </button>
          )}
        </p>

        {/* Collaboration Ideas */}
        {business.collaboration_ideas && business.collaboration_ideas.length > 0 && (
          <div className="mb-4">
            <p className="text-xs font-medium text-gray-700 mb-2">Collaboration Ideas:</p>
            <div className="flex flex-wrap gap-1">
              {business.collaboration_ideas.slice(0, 3).map((idea, index) => (
                <span key={index} className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  {idea}
                </span>
              ))}
              {business.collaboration_ideas.length > 3 && (
                <span className="text-xs text-gray-500">+{business.collaboration_ideas.length - 3} more</span>
              )}
            </div>
          </div>
        )}

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            4.8 {/* Default rating for recommendations */}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {business.CompanySize}
          </div>
        </div>

        {/* Message Button */}
        <button
          onClick={handleMessage}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center font-medium mt-auto"
        >
          {!isLoggedIn && <Lock className="w-4 h-4 mr-2" />}
          <Mail className="w-4 h-4 mr-2" />
          {isLoggedIn ? 'Send Message' : 'Login to Contact'}
        </button>
      </div>
    </div>
  )
}