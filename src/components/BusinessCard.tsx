'use client'

import { useState } from 'react'
import { MapPin, Star, Users, MessageCircle, Lock, Instagram, Youtube, Heart, Share2, Mail } from 'lucide-react'
import { type Business } from '@/data/mockBusinesses'

interface BusinessCardProps {
  business: Business
  viewMode: 'grid' | 'list'
  isLoggedIn: boolean
  onBusinessClick: (businessId: string) => void
  onEmailBusiness: (businessId: string) => void
}

export default function BusinessCard({ business, viewMode, isLoggedIn, onBusinessClick, onEmailBusiness }: BusinessCardProps) {
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
    onEmailBusiness(business.id)
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
    onBusinessClick(business.id)
  }

  const truncatedDescription = business.description.length > 120 
    ? `${business.description.substring(0, 120)}...` 
    : business.description

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
              src={business.image}
              alt={business.name}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>

          {/* Content */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{business.name}</h3>
                <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
                  {business.category}
                </span>
              </div>
            </div>

            <p className="text-gray-600 text-sm mb-3">
              {showFullDescription ? business.description : truncatedDescription}
              {business.description.length > 120 && (
                <button
                  onClick={handleReadMore}
                  className="text-purple-600 hover:text-purple-700 ml-1 font-medium inline-flex items-center"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                  {!isLoggedIn && <Lock className="w-3 h-3 ml-1" />}
                </button>
              )}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {business.location}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  {business.rating}
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {business.followers}
                </div>
              </div>

              <div className="flex items-center space-x-3">

                {/* Message Button */}
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
          src={business.image}
          alt={business.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-900">{business.name}</h3>
          <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded-full">
            {business.category}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-4 flex-grow">
          {showFullDescription ? business.description : truncatedDescription}
          {business.description.length > 120 && (
            <button
              onClick={handleReadMore}
              className="text-purple-600 hover:text-purple-700 ml-1 font-medium inline-flex items-center"
            >
              {showFullDescription ? 'Show less' : 'Read more'}
              {!isLoggedIn && <Lock className="w-3 h-3 ml-1" />}
            </button>
          )}
        </p>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            {business.location}
          </div>
          <div className="flex items-center">
            <Star className="w-4 h-4 mr-1 text-yellow-500" />
            {business.rating}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {business.followers}
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