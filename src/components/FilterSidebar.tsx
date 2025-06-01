'use client'

import { useState, useEffect } from 'react'
import { X, Star, MapPin, Tag, Users, Instagram, Youtube } from 'lucide-react'
import { categories, locations, additionalCollaborationTypes } from '@/data/mockFormData'

interface Filters {
  category: string
  location: string
  platform: string
  rating: number
}

interface FilterSidebarProps {
  isOpen: boolean
  onClose: () => void
  filters: Filters
  onFilterChange: (filters: Filters) => void
}

export default function FilterSidebar({ isOpen, onClose, filters, onFilterChange }: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState<Filters>(filters)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  // Handle opening/closing with proper transitions
  useEffect(() => {
    if (isOpen) {
      // Set visible first, then add the transform animation
      setIsVisible(true)
      // Prevent body scroll when sidebar is open
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      // Start closing animation
      setIsVisible(false)
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }

    // Cleanup function to ensure styles are reset
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const allCategories = ['All Categories', ...categories]
  const allLocations = locations

  const platforms = [
    { name: 'All Platforms', value: '' },
    { name: 'Instagram', value: 'Instagram', icon: <Instagram className="w-4 h-4" /> },
    { name: 'YouTube', value: 'YouTube', icon: <Youtube className="w-4 h-4" /> },
    { name: 'TikTok', value: 'TikTok', icon: <div className="w-4 h-4 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div> },
    { name: 'Telegram', value: 'Telegram', icon: <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">t</div> },
    { name: 'LinkedIn', value: 'LinkedIn', icon: <div className="w-4 h-4 bg-blue-700 rounded-sm flex items-center justify-center text-white text-xs font-bold">in</div> },
    { name: 'Pinterest', value: 'Pinterest', icon: <div className="w-4 h-4 bg-red-600 rounded-full flex items-center justify-center text-white text-xs">P</div> }
  ]

  const handleFilterChange = (key: keyof Filters, value: string | number) => {
    const newFilters = { ...localFilters, [key]: value }
    setLocalFilters(newFilters)
  }

  const handleApplyFilters = () => {
    onFilterChange(localFilters)
    onClose()
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      category: '',
      location: '',
      platform: '',
      rating: 0
    }
    setLocalFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const getRatingStars = (rating: number, targetRating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < targetRating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

  // Don't render anything if not open
  if (!isOpen) {
    return null
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/20 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div 
          className={`fixed top-0 right-0 h-[calc(100vh-4rem)] w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ maxWidth: '100vw' }} // Ensure it doesn't exceed viewport width
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Filters</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-6 overflow-y-auto h-full pb-48">
          {/* Category Filter */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-900 mb-3">
              <Tag className="w-4 h-4 mr-2" />
              Category
            </label>
            <select
              value={localFilters.category}
              onChange={(e) => handleFilterChange('category', e.target.value === 'All Categories' ? '' : e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {allCategories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-900 mb-3">
              <MapPin className="w-4 h-4 mr-2" />
              Location
            </label>
            <select
              value={localFilters.location}
              onChange={(e) => handleFilterChange('location', e.target.value === 'All Locations' ? '' : e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
            >
              {allLocations.map(location => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Platform Filter */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-900 mb-3">
              <Users className="w-4 h-4 mr-2" />
              Platform/Advertisement Type
            </label>
            <div className="space-y-2">
              {platforms.map(platform => (
                <label key={platform.value} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="platform"
                    value={platform.value}
                    checked={localFilters.platform === platform.value}
                    onChange={(e) => handleFilterChange('platform', e.target.value)}
                    className="sr-only"
                  />
                  <div className={`flex items-center w-full p-3 border rounded-lg transition-colors duration-200 ${
                    localFilters.platform === platform.value 
                      ? 'border-[#CACA78] bg-[#CACA78]/10' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}>
                    {platform.icon && <div className="mr-3">{platform.icon}</div>}
                    <span className="text-sm font-medium">{platform.name}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-900 mb-3">
              <Star className="w-4 h-4 mr-2" />
              Minimum Rating
            </label>
            <div className="space-y-2">
              {[0, 1, 2, 3, 4, 5].map(rating => (
                <label key={rating} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="rating"
                    value={rating}
                    checked={localFilters.rating === rating}
                    onChange={(e) => handleFilterChange('rating', Number(e.target.value))}
                    className="sr-only"
                  />
                  <div className={`flex items-center w-full p-3 border rounded-lg transition-colors duration-200 ${
                    localFilters.rating === rating 
                      ? 'border-[#CACA78] bg-[#CACA78]/10' 
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}>
                    <div className="flex items-center mr-3">
                      {getRatingStars(5, rating)}
                    </div>
                    <span className="text-sm font-medium">
                      {rating === 0 ? 'Any Rating' : `${rating}+ Stars`}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Collaboration Type (Additional Filter) */}
          <div>
            <label className="flex items-center text-sm font-medium text-gray-900 mb-3">
              <Users className="w-4 h-4 mr-2" />
              Collaboration Type
            </label>
            <div className="grid grid-cols-1 gap-2">
              {additionalCollaborationTypes.map(type => (
                <label key={type} className="flex items-center">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300 text-[#9A9A4A] focus:ring-[#CACA78] mr-3"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-200">
          <div className="flex space-x-3">
            <button
              onClick={handleClearFilters}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
            >
              Clear All
            </button>
            <button
              onClick={handleApplyFilters}
              className="flex-1 px-4 py-3 bg-[#9A9A4A] text-white rounded-lg hover:bg-[#8A8A3A] transition-colors duration-200 font-medium"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  )
}