'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, Filter, Grid, List, Star, Users, ArrowRight, Loader2 } from 'lucide-react'
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
  const [displaySearchTerm, setDisplaySearchTerm] = useState('')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const [textareaRows, setTextareaRows] = useState(1)
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    platform: '',
    rating: 0
  })
  
  const searchInputRef = useRef<HTMLTextAreaElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)
  const SEARCH_CHAR_LIMIT = 350 // Approximately 50 words

  const handleSearch = (term: string) => {
    setSearchTerm(term)
  }

  const calculateRows = (text: string) => {
    // Count the number of newlines in the text
    const newlines = (text.match(/\n/g) || []).length
    
    // Calculate rows based on text length and width
    // Assuming approximately 40 chars per row based on average input width
    const charsPerRow = 50
    const textRows = Math.ceil(text.length / charsPerRow)
    
    // Use the maximum of newlines+1 or textRows, with a minimum of 1 and maximum of 6
    return Math.min(Math.max(newlines + 1, textRows, 1), 4)
  }

  const handleSearchInputChange = (value: string) => {
    if (value.length <= SEARCH_CHAR_LIMIT) {
      setDisplaySearchTerm(value)
      setTextareaRows(calculateRows(value))
      
      if (value.length > 0 && !isSearchExpanded) {
        setIsSearchExpanded(true)
      } else if (value.length === 0 && isSearchExpanded) {
        setIsSearchExpanded(false)
        setTextareaRows(1)
      }
    }
  }

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (displaySearchTerm.trim() && !isSearching) {
      setIsSearching(true)
      
      // Simulate search delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      setSearchTerm(displaySearchTerm.trim())
      setIsSearchExpanded(false)
      setIsSearching(false)
      searchInputRef.current?.blur()
    }
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

  const topRatedBusinesses = getTopRatedBusinesses(3)
  const recentBusinesses = getRecentBusinesses(3)

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
          <div className="bg-gradient-to-r from-[#CACA78]/20 to-[#9A9A4A]/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Star className="w-5 h-5 text-yellow-500 mr-2" />
              Top Rated Partners
            </h3>
            <div className="space-y-2">
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
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Users className="w-5 h-5 text-green-600 mr-2" />
              Recently Added
            </h3>
            <div className="space-y-2">
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
        <div className="flex flex-col gap-4 mb-8">
          {/* Search Container */}
          <div className="w-full">
            <div ref={searchContainerRef} className="relative w-full">
              <form onSubmit={handleSearchSubmit} className="relative flex items-stretch">
                <div className="relative flex-grow">
                  <Search className={`absolute left-3 text-gray-400 w-5 h-5 z-10 top-4`} />
                  <textarea
                    ref={searchInputRef}
                    placeholder="Search businesses, categories, or locations..."
                    value={displaySearchTerm}
                    onChange={(e) => handleSearchInputChange(e.target.value)}
                    disabled={isSearching}
                    rows={textareaRows}
                    className={`w-full pl-10 pr-4 py-3 border h-full border-r-0 border-gray-300 rounded-l-lg focus:outline-none  focus:ring-none transition-all duration-300 resize-none ${isSearching ? 'bg-gray-50 cursor-not-allowed' : ''} ${isSearchExpanded ? 'min-h-[48px]' : 'h-12 overflow-hidden'}`}
                    style={{
                      lineHeight: '1.5',
                      wordWrap: 'break-word'
                    }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={!displaySearchTerm.trim() || isSearching}
                  className="flex items-center justify-center px-4 border border-l border-gray-300 rounded-r-lg bg-[#9A9A4A] hover:bg-[#a1a15d] disabled:opacity-50 disabled:cursor-not-allowed z-10"
                >
                  {isSearching ? (
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                  ) : (
                    <ArrowRight className="w-5 h-5 text-white" />
                  )}
                </button>
              </form>
              {/* Character count below input */}
              {displaySearchTerm.length > 0 && (
                <div className="text-xs text-gray-500 mt-2 pl-3">
                  {displaySearchTerm.length}/{SEARCH_CHAR_LIMIT} characters
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Count with Filter and View Buttons */}
        <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-gray-600">
            Showing {filteredBusinesses.length} of {mockBusinesses.length} businesses
            {searchTerm && (
              <span className="ml-2 text-[#8A8A3A] font-medium">
                for "{searchTerm.length > 30 ? searchTerm.substring(0, 30) + '...' : searchTerm}"
              </span>
            )}
          </p>
          
          {/* Filter and View buttons moved here */}
          <div className="flex items-center justify-end space-x-4">
            {/* View Mode Toggle */}
            <div className="flex items-center border border-gray-300 rounded-lg h-10">
              <button
                onClick={() => setViewMode('list')}
                className={`px-3 py-2 rounded-l-lg h-full ${viewMode === 'list' ? 'bg-[#9A9A4A] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <List className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-2 rounded-r-lg h-full ${viewMode === 'grid' ? 'bg-[#9A9A4A] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
              >
                <Grid className="w-4 h-4" />
              </button>
            </div>
          
            {/* Filter Button */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 h-10"
            >
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-gray-700 font-medium">Filters</span>
            </button>
          </div>
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
            <p className="text-gray-600 mb-4">
              {searchTerm 
                ? `No results found for "${searchTerm.length > 50 ? searchTerm.substring(0, 50) + '...' : searchTerm}". Try adjusting your search terms or filters.`
                : 'Try adjusting your search terms or filters'
              }
            </p>
            {(searchTerm || filters.category || filters.location || filters.platform || filters.rating > 0) && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setDisplaySearchTerm('')
                  setIsSearchExpanded(false)
                  setFilters({
                    category: '',
                    location: '',
                    platform: '',
                    rating: 0
                  })
                }}
                className="bg-[#9A9A4A] text-white px-6 py-2 rounded-lg hover:bg-[#8A8A3A] transition-colors duration-200"
              >
                Clear all filters
              </button>
            )}
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