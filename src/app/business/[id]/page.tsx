'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, MapPin, Star, Users, Calendar, Globe, Mail, Phone, Instagram, 
  Youtube, Heart, Share2, MessageCircle, ChevronLeft, ChevronRight, Clock,
  DollarSign, Award, CheckCircle, Eye, Bookmark, Flag, ExternalLink,
  Camera, Play, Download, Filter, Search, ThumbsUp, ThumbsDown, Lock
} from 'lucide-react'
import EmailModal from '@/components/EmailModal'

interface Review {
  id: string
  author: string
  avatar: string
  rating: number
  date: string
  content: string
  helpful: number
  businessResponse?: string
}

interface ProjectShowcase {
  id: string
  title: string
  description: string
  image: string
  category: string
  client: string
  completedDate: string
  budget: string
  results: string[]
}

export default function BusinessDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews' | 'pricing'>('overview')
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [reviewFilter, setReviewFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all')

  // Check authentication status
  useEffect(() => {
    const authData = localStorage.getItem('partnero_auth')
    if (authData) {
      try {
        const parsedData = JSON.parse(authData)
        if (parsedData.isLoggedIn) {
          setIsLoggedIn(true)
        }
      } catch (error) {
        console.error('Error parsing auth data:', error)
      }
    }
  }, [])

  // Mock business data - in real app, fetch by params.id
  const business = {
    id: params.id,
    name: 'Creative Studios',
    tagline: 'Bringing brands to life through innovative digital experiences',
    description: 'Creative Studios is a full-service digital marketing agency that has been helping brands tell their stories through compelling visual content for over 5 years. Our team of creative professionals specializes in social media strategy, content creation, brand development, and influencer partnerships.',
    fullDescription: `Creative Studios is a full-service digital marketing agency that has been helping brands tell their stories through compelling visual content for over 5 years. Our team of creative professionals specializes in social media strategy, content creation, brand development, and influencer partnerships.

We believe in the power of authentic storytelling and work closely with our clients to develop unique brand voices that stand out in today's crowded digital landscape. Our collaborative approach ensures that every piece of content we create aligns with your brand values and business objectives.

Our mission is to bridge the gap between brands and their audiences through meaningful, engaging content that drives real results. We've worked with over 200+ brands across various industries, from startups to Fortune 500 companies.

What sets us apart:
• Data-driven approach to content strategy
• In-house team of designers, videographers, and marketers
• 24/7 customer support and project management
• Proven track record with measurable ROI
• Award-winning creative campaigns

We're passionate about helping businesses grow and thrive in the digital age. Whether you're looking to increase brand awareness, drive sales, or build a community around your brand, we have the expertise and creativity to make it happen.`,
    category: 'Digital Marketing',
    location: 'New York, NY',
    fullAddress: '123 Creative Street, Manhattan, NY 10001',
    rating: 4.8,
    reviewCount: 127,
    followers: '15K',
    views: '2.3M',
    established: '2019',
    teamSize: '15-25 employees',
    website: 'https://creativestudios.com',
    email: 'hello@creativestudios.com',
    phone: '+1 (555) 123-4567',
    businessHours: {
      monday: '9:00 AM - 6:00 PM',
      tuesday: '9:00 AM - 6:00 PM',
      wednesday: '9:00 AM - 6:00 PM',
      thursday: '9:00 AM - 6:00 PM',
      friday: '9:00 AM - 6:00 PM',
      saturday: '10:00 AM - 4:00 PM',
      sunday: 'Closed'
    },
    responseTime: 'Usually responds within 2 hours',
    platforms: ['Instagram', 'YouTube', 'TikTok', 'LinkedIn'],
    socialLinks: {
      instagram: 'https://instagram.com/creativestudios',
      youtube: 'https://youtube.com/creativestudios',
      tiktok: 'https://tiktok.com/@creativestudios',
      linkedin: 'https://linkedin.com/company/creativestudios'
    },
    images: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ],
    services: [
      {
        name: 'Social Media Management',
        description: 'Complete social media strategy and daily management',
        price: 'Starting at $2,500/month'
      },
      {
        name: 'Content Creation',
        description: 'High-quality photos, videos, and graphics',
        price: 'Starting at $500/piece'
      },
      {
        name: 'Brand Strategy',
        description: 'Comprehensive brand development and positioning',
        price: 'Starting at $5,000'
      },
      {
        name: 'Influencer Partnerships',
        description: 'End-to-end influencer campaign management',
        price: 'Starting at $3,000/campaign'
      },
      {
        name: 'Video Production',
        description: 'Professional video content for all platforms',
        price: 'Starting at $1,500/video'
      },
      {
        name: 'Photography',
        description: 'Product and lifestyle photography sessions',
        price: 'Starting at $800/session'
      }
    ],
    collaborationTypes: [
      'Sponsored Content',
      'Product Reviews',
      'Brand Ambassadorships',
      'Event Coverage',
      'Long-term Partnerships',
      'Affiliate Marketing',
      'Contest & Giveaways'
    ],
    requirements: [
      'Minimum 10K followers on primary platform',
      'Engagement rate above 3%',
      'Content aligned with brand values',
      'Professional portfolio required',
      'Previous brand collaboration experience preferred'
    ],
    achievements: [
      'Top 1% Marketing Agency 2023',
      'Instagram Partner Badge',
      'Google Premier Partner',
      'HubSpot Certified Agency',
      'Facebook Marketing Partner'
    ],
    stats: {
      projectsCompleted: 450,
      clientRetention: '95%',
      averageROI: '340%',
      yearsExperience: 5
    }
  }

  const reviews: Review[] = [
    {
      id: '1',
      author: 'Sarah Johnson',
      avatar: '/api/placeholder/50/50',
      rating: 5,
      date: '2024-01-15',
      content: 'Creative Studios transformed our brand presence completely! Their team understood our vision and delivered beyond expectations. The ROI on our campaigns increased by 250% in just 3 months.',
      helpful: 12,
      businessResponse: 'Thank you Sarah! It was a pleasure working with your team. We\'re thrilled to see such amazing results and look forward to continuing our partnership.'
    },
    {
      id: '2',
      author: 'Michael Chen',
      avatar: '/api/placeholder/50/50',
      rating: 5,
      date: '2024-01-10',
      content: 'Professional, creative, and results-driven. They managed our entire social media strategy and the engagement rates skyrocketed. Highly recommend for any business looking to grow their online presence.',
      helpful: 8
    },
    {
      id: '3',
      author: 'Emily Rodriguez',
      avatar: '/api/placeholder/50/50',
      rating: 4,
      date: '2024-01-08',
      content: 'Great experience overall. The team was responsive and creative. The only minor issue was some delays in the initial phase, but they made up for it with quality work.',
      helpful: 5,
      businessResponse: 'Thank you for the feedback Emily. We\'ve since improved our project timeline processes to prevent any delays. We appreciate your patience and are glad you were happy with the final results!'
    },
    {
      id: '4',
      author: 'David Kim',
      avatar: '/api/placeholder/50/50',
      rating: 5,
      date: '2024-01-05',
      content: 'Exceptional work on our product launch campaign. They created stunning visuals and the campaign generated 3x more leads than our previous efforts. Worth every penny!',
      helpful: 15
    }
  ]

  const portfolio: ProjectShowcase[] = [
    {
      id: '1',
      title: 'EcoFresh Brand Launch',
      description: 'Complete brand identity and social media launch for sustainable food brand',
      image: '/api/placeholder/400/300',
      category: 'Brand Development',
      client: 'EcoFresh Foods',
      completedDate: 'December 2023',
      budget: '$15,000',
      results: [
        '500K+ social media impressions',
        '25% increase in brand awareness',
        '150% growth in online sales'
      ]
    },
    {
      id: '2',
      title: 'TechStart Influencer Campaign',
      description: 'Multi-platform influencer campaign for tech startup product launch',
      image: '/api/placeholder/400/300',
      category: 'Influencer Marketing',
      client: 'TechStart Inc.',
      completedDate: 'November 2023',
      budget: '$25,000',
      results: [
        '2M+ total reach',
        '40% increase in app downloads',
        '300% ROI on ad spend'
      ]
    },
    {
      id: '3',
      title: 'Fashion Week Content Series',
      description: 'Behind-the-scenes content creation for luxury fashion brand',
      image: '/api/placeholder/400/300',
      category: 'Content Creation',
      client: 'Luxe Fashion House',
      completedDate: 'October 2023',
      budget: '$20,000',
      results: [
        '1M+ video views',
        '35% increase in engagement',
        '50% growth in followers'
      ]
    }
  ]

  const handleEmailBusiness = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      setTimeout(() => setShowLoginPrompt(false), 3000)
      return
    }
    setShowEmailModal(true)
  }

  const handleLike = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      setTimeout(() => setShowLoginPrompt(false), 3000)
      return
    }
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    if (!isLoggedIn) {
      setShowLoginPrompt(true)
      setTimeout(() => setShowLoginPrompt(false), 3000)
      return
    }
    setIsBookmarked(!isBookmarked)
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />
      case 'youtube':
        return <Youtube className="w-5 h-5" />
      case 'tiktok':
        return <div className="w-5 h-5 bg-black rounded-sm flex items-center justify-center text-white text-xs font-bold">T</div>
      case 'linkedin':
        return <div className="w-5 h-5 bg-blue-700 rounded-sm flex items-center justify-center text-white text-xs font-bold">in</div>
      default:
        return <div className="w-5 h-5 bg-gray-400 rounded-sm"></div>
    }
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % business.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + business.images.length) % business.images.length)
  }

  const filteredReviews = reviewFilter === 'all' 
    ? reviews 
    : reviews.filter(review => review.rating === parseInt(reviewFilter))

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Login Prompt */}
      {showLoginPrompt && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-lg text-sm z-50 shadow-lg">
          <div className="flex items-center">
            <Lock className="w-4 h-4 mr-2" />
            Please login to interact with businesses
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Browse
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="relative mb-8">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={business.images[currentImageIndex]}
                  alt={business.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Navigation Buttons */}
                {business.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors duration-200"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {business.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="flex space-x-2 mt-4 overflow-x-auto">
                {business.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                      index === currentImageIndex ? 'border-[#9A9A4A]' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${business.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Business Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{business.name}</h1>
                    {business.achievements.includes('Top 1% Marketing Agency 2023') && (
                      <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        Top Rated
                      </div>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mb-3">{business.tagline}</p>
                  <span className="inline-block bg-[#CACA78]/20 text-[#8A8A3A] text-sm px-3 py-1 rounded-full font-medium">
                    {business.category}
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#9A9A4A]">{business.stats.projectsCompleted}+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#9A9A4A]">{business.stats.clientRetention}</div>
                  <div className="text-sm text-gray-600">Client Retention</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#9A9A4A]">{business.stats.averageROI}</div>
                  <div className="text-sm text-gray-600">Average ROI</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-[#9A9A4A]">{business.stats.yearsExperience}</div>
                  <div className="text-sm text-gray-600">Years Experience</div>
                </div>
              </div>

              {/* Basic Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {business.location}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  {business.rating} ({business.reviewCount} reviews)
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {business.followers} followers
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {business.views} views
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Est. {business.established}
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'reviews', label: 'Reviews' },
                    { id: 'pricing', label: 'Services & Pricing' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 ${
                        activeTab === tab.id
                          ? 'border-[#9A9A4A] text-[#8A8A3A]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                  <div className="space-y-8">
                    {/* Description */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">About {business.name}</h3>
                      <div className="prose max-w-none">
                        <p className="text-gray-600 mb-4">{business.description}</p>
                        {showFullDescription && (
                          <div className="text-gray-600 whitespace-pre-line">
                            {business.fullDescription}
                          </div>
                        )}
                        <button
                          onClick={() => setShowFullDescription(!showFullDescription)}
                          className="text-[#9A9A4A] hover:text-[#8A8A3A] font-medium"
                        >
                          {showFullDescription ? 'Show less' : 'Read more'}
                        </button>
                      </div>
                    </div>

                    {/* Achievements */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Achievements & Certifications</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {business.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                            <span className="text-gray-700 font-medium">{achievement}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Collaboration Types */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Collaboration Opportunities</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {business.collaborationTypes.map((type, index) => (
                          <div key={index} className="flex items-center p-3 bg-[#CACA78]/10 rounded-lg">
                            <div className="w-2 h-2 bg-[#9A9A4A] rounded-full mr-3"></div>
                            <span className="text-gray-700">{type}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Partnership Requirements</h3>
                      <div className="space-y-3">
                        {business.requirements.map((requirement, index) => (
                          <div key={index} className="flex items-start">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <span className="text-gray-600">{requirement}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Filter by rating:</span>
                        <select
                          value={reviewFilter}
                          onChange={(e) => setReviewFilter(e.target.value as any)}
                          className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                        >
                          <option value="all">All Reviews</option>
                          <option value="5">5 Stars</option>
                          <option value="4">4 Stars</option>
                          <option value="3">3 Stars</option>
                          <option value="2">2 Stars</option>
                          <option value="1">1 Star</option>
                        </select>
                      </div>
                    </div>

                    {/* Review Summary */}
                    <div className="bg-gray-50 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="text-center">
                          <div className="text-4xl font-bold text-gray-900">{business.rating}</div>
                          <div className="flex items-center justify-center my-2">
                            {renderStars(Math.floor(business.rating))}
                          </div>
                          <div className="text-gray-600">Based on {business.reviewCount} reviews</div>
                        </div>
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((stars) => {
                            const count = reviews.filter(r => r.rating === stars).length
                            const percentage = (count / reviews.length) * 100
                            return (
                              <div key={stars} className="flex items-center space-x-3">
                                <span className="text-sm w-8">{stars}★</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-yellow-400 h-2 rounded-full"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 w-8">{count}</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-6">
                      {filteredReviews.map((review) => (
                        <div key={review.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.avatar}
                              alt={review.author}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <h4 className="font-medium text-gray-900">{review.author}</h4>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex items-center">
                                      {renderStars(review.rating)}
                                    </div>
                                    <span className="text-sm text-gray-500">
                                      {new Date(review.date).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-600 mb-4">{review.content}</p>
                              
                              {/* Business Response */}
                              {review.businessResponse && (
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                                  <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                      <span className="text-white text-xs font-bold">
                                        {business.name.charAt(0)}
                                      </span>
                                    </div>
                                    <span className="font-medium text-gray-900">Response from {business.name}</span>
                                  </div>
                                  <p className="text-gray-600 text-sm">{review.businessResponse}</p>
                                </div>
                              )}

                              <div className="flex items-center space-x-4">
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                                  <ThumbsUp className="w-4 h-4" />
                                  <span className="text-sm">Helpful ({review.helpful})</span>
                                </button>
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700">
                                  <Flag className="w-4 h-4" />
                                  <span className="text-sm">Report</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredReviews.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        No reviews found for the selected rating.
                      </div>
                    )}
                  </div>
                )}

                {/* Pricing Tab */}
                {activeTab === 'pricing' && (
                  <div className="space-y-8">
                    <h3 className="text-xl font-semibold text-gray-900">Services & Pricing</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {business.services.map((service, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                          <h4 className="font-semibold text-gray-900 mb-2">{service.name}</h4>
                          <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-[#9A9A4A]">{service.price}</span>
                            <button
                              onClick={handleEmailBusiness}
                              className={`px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium ${
                                isLoggedIn 
                                  ? 'bg-[#CACA78]/20 text-[#8A8A3A] hover:bg-[#CACA78]/30' 
                                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                              }`}
                              disabled={!isLoggedIn}
                            >
                              {isLoggedIn ? 'Get Quote' : 'Login Required'}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Custom Quote CTA */}
                    <div className="bg-gradient-to-r from-[#CACA78]/20 to-[#9A9A4A]/20 rounded-lg p-6 text-center">
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">Need a Custom Solution?</h4>
                      <p className="text-gray-600 mb-4">
                        We offer tailored packages to meet your specific needs. Contact us for a personalized quote.
                      </p>
                      <button
                        onClick={handleEmailBusiness}
                        className={`px-6 py-3 rounded-lg transition-colors duration-200 font-medium flex items-center mx-auto ${
                          isLoggedIn 
                            ? 'bg-[#9A9A4A] text-white hover:bg-[#8A8A3A]' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!isLoggedIn}
                      >
                        {!isLoggedIn && <Lock className="w-4 h-4 mr-2" />}
                        {isLoggedIn ? 'Request Custom Quote' : 'Login to Request Quote'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-17 space-y-6">
              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-400 mr-3" />
                    <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-[#9A9A4A] hover:text-[#8A8A3A] flex items-center">
                      {business.website}
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">{business.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">{business.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">{business.fullAddress}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-gray-400 mr-3" />
                    <span className="text-gray-600">{business.responseTime}</span>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Social Media</h4>
                  <div className="flex space-x-3">
                    {business.platforms.map((platform, index) => (
                      <a
                        key={index}
                        href={business.socialLinks[platform.toLowerCase() as keyof typeof business.socialLinks]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-100 rounded-lg hover:bg-[#CACA78]/20 transition-colors duration-200"
                        title={platform}
                      >
                        {getPlatformIcon(platform)}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Contact Button */}
                <button
                  onClick={handleEmailBusiness}
                  className={`w-full mt-6 py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium ${
                    isLoggedIn
                      ? 'bg-[#9A9A4A] text-white hover:bg-[#8A8A3A]'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!isLoggedIn}
                >
                  {!isLoggedIn && <Lock className="w-5 h-5 mr-2" />}
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {isLoggedIn ? 'Contact for Partnership' : 'Login to Contact'}
                </button>
              </div>

              {/* Location Map */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <div className="relative w-full h-48 rounded-lg overflow-hidden">
                  <iframe
                    src={`https://maps.google.com/maps?q=new%20york&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    className="absolute top-0 left-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {business.fullAddress}
                  </span>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(business.fullAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9A9A4A] hover:text-[#8A8A3A] flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    View
                  </a>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Facts</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Team Size:</span>
                    <span className="text-gray-900">{business.teamSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Founded:</span>
                    <span className="text-gray-900">{business.established}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Projects:</span>
                    <span className="text-gray-900">{business.stats.projectsCompleted}+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Response Rate:</span>
                    <span className="text-green-600 font-medium">98%</span>
                  </div>
                </div>
              </div>

              {/* Report Business */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <button className="w-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors duration-200">
                  <Flag className="w-4 h-4 mr-2" />
                  <span className="text-sm">Report this business</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <EmailModal 
          businessId={business.id as string}
          onClose={() => setShowEmailModal(false)}
          isLoggedIn={isLoggedIn}
        />
      )}
    </div>
  )
}