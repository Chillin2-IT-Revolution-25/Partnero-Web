import { useState } from 'react'
import { ChevronLeft, ChevronRight, MapPin, Users, Mail, Lock } from 'lucide-react'
import { RecommendationBusiness, recommendationsService } from '@/services/recommendationsService'

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
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [currentRecommendationIndex, setCurrentRecommendationIndex] = useState(0)

  const handleMessage = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      setTimeout(() => setShowLoginPrompt(false), 3000)
      return
    }
    onEmailBusiness(business._id)
  }

  const handleCardClick = () => {
    onBusinessClick(business._id)
  }

  const nextRecommendation = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentRecommendationIndex((prev) => 
      (prev + 1) % business.collaboration_ideas.length
    )
  }

  const prevRecommendation = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentRecommendationIndex((prev) => 
      (prev - 1 + business.collaboration_ideas.length) % business.collaboration_ideas.length
    )
  }

  const imageUrl = recommendationsService.getBusinessImageUrl(business)
  const location = recommendationsService.formatLocation(business.Location)
  const ownerName = recommendationsService.getBusinessOwnerName(business)

  if (viewMode === 'list') {
    return (
      <div 
        className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300 relative cursor-pointer"
        onClick={handleCardClick}
      >
        {showLoginPrompt && (
          <div className="absolute top-4 right-4 bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm z-10">
            Please login to interact
          </div>
        )}
        
        <div className="flex gap-6">
          {/* Image */}
          <div className="relative w-32 h-24 flex-shrink-0">
            <img
              src={imageUrl}
              alt={business.BusinessName}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{business.BusinessName}</h3>
                <p className="text-sm text-gray-600 mb-1">{ownerName}</p>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {business.Category}
                </span>
              </div>
            </div>

            {/* Recommendations Carousel */}
            <div className="mb-3">
              <div className="relative">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm text-blue-800 font-medium">
                        Collaboration Idea {currentRecommendationIndex + 1} of {business.collaboration_ideas.length}
                      </p>
                      <p className="text-sm text-blue-700 mt-1">
                        {business.collaboration_ideas[currentRecommendationIndex]}
                      </p>
                    </div>
                    {business.collaboration_ideas.length > 1 && (
                      <div className="flex items-center space-x-1 ml-3">
                        <button
                          onClick={prevRecommendation}
                          className="p-1 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors"
                        >
                          <ChevronLeft className="w-4 h-4 text-blue-700" />
                        </button>
                        <button
                          onClick={nextRecommendation}
                          className="p-1 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors"
                        >
                          <ChevronRight className="w-4 h-4 text-blue-700" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {location}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {business.CompanySize} employees
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={handleMessage}
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center text-sm font-medium"
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
      className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 relative cursor-pointer flex flex-col h-full"
      onClick={handleCardClick}
    >
      {showLoginPrompt && (
        <div className="absolute top-4 right-4 bg-red-100 border border-red-300 text-red-700 px-3 py-2 rounded-lg text-sm z-10">
          Please login to interact
        </div>
      )}
      
      {/* Image */}
      <div className="relative h-48 flex-shrink-0">
        <img
          src={imageUrl}
          alt={business.BusinessName}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{business.BusinessName}</h3>
            <p className="text-sm text-gray-600">{ownerName}</p>
          </div>
          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
            {business.Category}
          </span>
        </div>

        {/* Recommendations Carousel */}
        <div className="mb-4">
          <div className="relative">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <div className="text-center">
                <p className="text-xs text-blue-600 font-medium mb-2">
                  Collaboration Idea {currentRecommendationIndex + 1} of {business.collaboration_ideas.length}
                </p>
                <p className="text-sm text-blue-800">
                  {business.collaboration_ideas[currentRecommendationIndex]}
                </p>
                {business.collaboration_ideas.length > 1 && (
                  <div className="flex items-center justify-center space-x-2 mt-3">
                    <button
                      onClick={prevRecommendation}
                      className="p-1 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors"
                    >
                      <ChevronLeft className="w-3 h-3 text-blue-700" />
                    </button>
                    <div className="flex space-x-1">
                      {business.collaboration_ideas.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === currentRecommendationIndex ? 'bg-blue-500' : 'bg-blue-200'
                          }`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextRecommendation}
                      className="p-1 rounded-full bg-blue-200 hover:bg-blue-300 transition-colors"
                    >
                      <ChevronRight className="w-3 h-3 text-blue-700" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {location}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {business.CompanySize} employees
          </div>
        </div>

        {/* Message Button */}
        <button
          onClick={handleMessage}
          className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center font-medium mt-auto"
        >
          {!isLoggedIn && <Lock className="w-4 h-4 mr-2" />}
          <Mail className="w-4 h-4 mr-2" />
          {isLoggedIn ? 'Send Message' : 'Login to Contact'}
        </button>
      </div>
    </div>
  )
}