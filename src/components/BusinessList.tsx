'use client'

import { useState } from 'react'
import { Search, Filter, Grid, List, Star, Users } from 'lucide-react'
import BusinessCard from './BusinessCard'
import FilterSidebar from './FilterSidebar'
import { 
  mockBusinesses, 
  getTopRatedBusinesses, 
  getRecentBusinesses,
  type Business 
} from '@/data/mockBusinesses'

interface BusinessListProps {
  isLoggedIn: boolean
  onBusinessClick: (businessId: string) => void
  onEmailBusiness: (businessId: string) => void
}

export default function BusinessList({ isLoggedIn, onBusinessClick, onEmailBusiness }: BusinessListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    platform: '',
    rating: 0
  })

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  const filteredBusinesses = mockBusinesses.filter(business => {
    const matchesSearch = business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         business.category.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesCategory = !filters.category || business.category === filters.category
    const matchesLocation = !filters.location || business.location.includes(filters.location)
    const matchesPlatform = !filters.platform || business.platforms.includes(filters.platform)
    const matchesRating = business.rating >= filters.rating

    return matchesSearch && matchesCategory && matchesLocation && matchesPlatform && matchesRating
  })

  const topRatedBusinesses = getTopRatedBusinesses(5)
  const recentBusinesses = getRecentBusinesses(5)

  return (
    <section className="py-16 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Discover Partnership Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through hundreds of businesses and creators looking for partnerships
          </p>
        </div>

        {/* Top Widgets */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Top Rated Widget */}
          <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Top Rated Partners
            </h3>
            <div className="space-y-3">
              {topRatedBusinesses.map(business => (
                <div key={business.id} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800">{business.name}</span>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span className="text-sm text-gray-600">{business.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recently Added Widget */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Users className="w-5 h-5 text-green-600 mr-2" />
              Recently Added
            </h3>
            <div className="space-y-3">
              {recentBusinesses.map(business => (
                <div key={business.id} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-800">{business.name}</span>
                  <span className="text-xs text-gray-500 bg-green-200 px-2 py-1 rounded-full">New</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search businesses, categories, or locations..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-purple-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Filters</span>
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredBusinesses.length} of {mockBusinesses.length} businesses
          </p>
        </div>

        {/* Business Grid/List */}
        <div className={`${viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
          : 'space-y-4'
        }`}>
          {filteredBusinesses.map(business => (
            <BusinessCard 
              key={business.id}
              business={business}
              viewMode={viewMode}
              isLoggedIn={isLoggedIn}
              onBusinessClick={onBusinessClick}
              onEmailBusiness={onEmailBusiness}
            />
          ))}
        </div>

        {/* No Results */}
        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No businesses found</h3>
            <p className="text-gray-600">Try adjusting your search terms or filters</p>
          </div>
        )}
      </div>

      {/* Filter Sidebar */}
      <FilterSidebar 
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
      />
    </section>
  )
}