'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { 
  ArrowLeft, MapPin, Star, Users, Calendar, Globe, Mail, Phone, Instagram, 
  Youtube, Heart, Share2, MessageCircle, ChevronLeft, ChevronRight, Clock,
  DollarSign, Award, CheckCircle, Eye, Bookmark, Flag, ExternalLink,
  Camera, Play, Download, Filter, Search, ThumbsUp, ThumbsDown, Lock,
  Loader2, Building, TrendingUp, Target, Zap, Shield, Copy, Check,
  Send, X, Plus, Minus, ChevronDown, ChevronUp, AlertCircle, Info
} from 'lucide-react'
import EmailModal from '@/components/EmailModal'
import { useAuth } from '@/contexts/AuthContext'
import { businessService, type BusinessData, ApiError } from '@/services/businessService'

// Business data interface matching the API response
interface BusinessLocation {
  displayName: string
  street: string
  city: string
  state: string
  postcode: string
  country: string
  latitude: number
  longitude: number
}

interface SocialMedia {
  instagram?: string
  youTube?: string
  linkedIn?: string
  website?: string
}

interface Review {
  id: string
  author: string
  avatar: string
  rating: number
  date: string
  content: string
  helpful: number
  notHelpful: number
  businessResponse?: string
  verified: boolean
  collaboration?: string
}

interface Service {
  id: string
  name: string
  description: string
  price: string
  duration?: string
  features: string[]
  popular?: boolean
}

interface Portfolio {
  id: string
  title: string
  description: string
  image: string
  category: string
  client: string
  completedDate: string
  budget: string
  results: string[]
  tags: string[]
}

interface BusinessStats {
  totalProjects: number
  clientRetention: string
  averageRating: number
  responseTime: string
  completionRate: string
  totalReviews: number
}

export default function BusinessDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { isLoggedIn, user } = useAuth()
  
  // State management
  const [business, setBusiness] = useState<BusinessData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [showLoginPrompt, setShowLoginPrompt] = useState(false)
  const [showShareModal, setShowShareModal] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'overview' | 'portfolio' | 'reviews' | 'services'>('overview')
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [reviewFilter, setReviewFilter] = useState<'all' | '5' | '4' | '3' | '2' | '1'>('all')
  const [reviewSort, setReviewSort] = useState<'newest' | 'oldest' | 'rating-high' | 'rating-low' | 'helpful'>('newest')
  const [portfolioFilter, setPortfolioFilter] = useState<'all' | string>('all')
  const [showContactForm, setShowContactForm] = useState(false)
  const [copiedUrl, setCopiedUrl] = useState(false)
  const [expandedFaqs, setExpandedFaqs] = useState<number[]>([])

  // Fetch business data from API
  useEffect(() => {
    const fetchBusinessData = async () => {
      if (!params.id) return

      try {
        setLoading(true)
        setError(null)
        
        const data = await businessService.getBusinessById(params.id as string)
        setBusiness(data)
        
        // Reset image index if business has images
        if (data.businessImageUrls && data.businessImageUrls.length > 0) {
          setCurrentImageIndex(0)
        }
      } catch (err) {
        console.error('Error fetching business data:', err)
        if (err instanceof ApiError) {
          setError(err.message)
          // You can also display err.details for more debugging info
          if (err.details) {
            console.error('Error details:', err.details)
          }
        } else {
          setError('Failed to load business data')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBusinessData()
  }, [params.id])

  // Mock data for features not yet implemented in API
  const mockStats: BusinessStats = {
    totalProjects: 247,
    clientRetention: '94%',
    averageRating: 4.8,
    responseTime: '< 2 hours',
    completionRate: '98%',
    totalReviews: 127
  }

  const mockReviews: Review[] = [
    {
      id: '1',
      author: 'Sarah Johnson',
      avatar: '/api/placeholder/50/50',
      rating: 5,
      date: '2024-01-15',
      content: 'Outstanding service! The team exceeded our expectations and delivered a fantastic campaign that increased our engagement by 300%. Professional, creative, and results-driven.',
      helpful: 23,
      notHelpful: 1,
      verified: true,
      collaboration: 'Social Media Campaign',
      businessResponse: 'Thank you Sarah! It was a pleasure working with your team. We\'re thrilled to see such amazing results and look forward to future collaborations.'
    },
    {
      id: '2',
      author: 'Michael Chen',
      avatar: '/api/placeholder/50/50',
      rating: 5,
      date: '2024-01-10',
      content: 'Incredible attention to detail and creative vision. They transformed our brand identity completely and the results speak for themselves. Highly recommend!',
      helpful: 18,
      notHelpful: 0,
      verified: true,
      collaboration: 'Brand Development'
    },
    {
      id: '3',
      author: 'Emily Rodriguez',
      avatar: '/api/placeholder/50/50',
      rating: 4,
      date: '2024-01-08',
      content: 'Great experience overall. The team was responsive and delivered quality work. Minor delays in the initial phase but they made up for it with excellent results.',
      helpful: 12,
      notHelpful: 2,
      verified: true,
      collaboration: 'Content Creation'
    },
    {
      id: '4',
      author: 'David Kim',
      avatar: '/api/placeholder/50/50',
      rating: 5,
      date: '2024-01-05',
      content: 'Best investment we\'ve made for our business. The ROI was incredible and the team\'s expertise in our industry really showed. Will definitely work with them again.',
      helpful: 31,
      notHelpful: 0,
      verified: true,
      collaboration: 'Influencer Campaign'
    }
  ]

  const mockServices: Service[] = [
    {
      id: '1',
      name: 'Social Media Management',
      description: 'Complete social media strategy, content creation, and daily management across all platforms',
      price: 'Starting at $2,500/month',
      duration: 'Ongoing',
      features: [
        'Daily content posting',
        'Community management',
        'Analytics reporting',
        'Strategy development',
        'Influencer outreach',
        'Ad campaign management'
      ],
      popular: true
    },
    {
      id: '2',
      name: 'Brand Development',
      description: 'Comprehensive brand strategy, visual identity, and positioning for market success',
      price: 'Starting at $5,000',
      duration: '4-6 weeks',
      features: [
        'Brand strategy development',
        'Logo and visual identity',
        'Brand guidelines',
        'Market positioning',
        'Competitor analysis',
        'Brand voice development'
      ]
    },
    {
      id: '3',
      name: 'Content Creation',
      description: 'High-quality photos, videos, and graphics tailored to your brand and audience',
      price: 'Starting at $500/piece',
      duration: '1-2 weeks',
      features: [
        'Professional photography',
        'Video production',
        'Graphic design',
        'Content planning',
        'Post-production editing',
        'Multiple format delivery'
      ]
    },
    {
      id: '4',
      name: 'Influencer Partnerships',
      description: 'End-to-end influencer campaign management and partnership development',
      price: 'Starting at $3,000/campaign',
      duration: '2-4 weeks',
      features: [
        'Influencer research & vetting',
        'Campaign strategy',
        'Contract negotiation',
        'Content approval process',
        'Performance tracking',
        'ROI reporting'
      ]
    }
  ]

  const mockPortfolio: Portfolio[] = [
    {
      id: '1',
      title: 'EcoFresh Brand Launch',
      description: 'Complete brand identity and social media launch for sustainable food brand that resulted in 500K+ impressions and 150% sales growth',
      image: '/api/placeholder/500/400',
      category: 'Brand Development',
      client: 'EcoFresh Foods',
      completedDate: 'December 2023',
      budget: '$15,000',
      results: [
        '500K+ social media impressions',
        '25% increase in brand awareness',
        '150% growth in online sales',
        '40% increase in website traffic'
      ],
      tags: ['Branding', 'Social Media', 'Sustainability', 'Food & Beverage']
    },
    {
      id: '2',
      title: 'TechStart Influencer Campaign',
      description: 'Multi-platform influencer campaign for tech startup product launch with exceptional ROI',
      image: '/api/placeholder/500/400',
      category: 'Influencer Marketing',
      client: 'TechStart Inc.',
      completedDate: 'November 2023',
      budget: '$25,000',
      results: [
        '2M+ total reach',
        '40% increase in app downloads',
        '300% ROI on ad spend',
        '15% conversion rate'
      ],
      tags: ['Influencer Marketing', 'Technology', 'App Launch', 'ROI']
    },
    {
      id: '3',
      title: 'Fashion Week Content Series',
      description: 'Behind-the-scenes content creation for luxury fashion brand during fashion week',
      image: '/api/placeholder/500/400',
      category: 'Content Creation',
      client: 'Luxe Fashion House',
      completedDate: 'October 2023',
      budget: '$20,000',
      results: [
        '1M+ video views',
        '35% increase in engagement',
        '50% growth in followers',
        '25% increase in website visits'
      ],
      tags: ['Content Creation', 'Fashion', 'Video Production', 'Luxury']
    }
  ]

  const faqs = [
    {
      question: 'How long does a typical project take?',
      answer: 'Project timelines vary depending on scope and complexity. Social media management is ongoing, while brand development typically takes 4-6 weeks. We provide detailed timelines during our initial consultation.'
    },
    {
      question: 'Do you work with businesses of all sizes?',
      answer: 'Yes! We work with startups, small businesses, and enterprise clients. Our services are scalable and customized to fit your specific needs and budget.'
    },
    {
      question: 'What industries do you specialize in?',
      answer: 'We have experience across various industries including technology, fashion, food & beverage, health & wellness, and e-commerce. Our team adapts our strategies to each industry\'s unique requirements.'
    },
    {
      question: 'How do you measure success?',
      answer: 'We use comprehensive analytics and KPIs tailored to your goals, including engagement rates, conversion rates, ROI, brand awareness metrics, and more. Monthly reports keep you informed of progress.'
    },
    {
      question: 'Can I see examples of your work?',
      answer: 'Absolutely! Check out our portfolio section above to see detailed case studies of our recent projects and their results.'
    }
  ]

  // Helper functions
  const formatLocation = (location: BusinessData['location']): string => {
    return businessService.formatLocation(location)
  }

  const getFullAddress = (location: BusinessData['location']): string => {
    return businessService.getFullAddress(location)
  }

  const getCompanySizeLabel = (size: number): string => {
    return businessService.getCompanySizeLabel(size)
  }

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

  const handleShare = () => {
    setShowShareModal(true)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopiedUrl(true)
    setTimeout(() => setCopiedUrl(false), 2000)
  }

  const toggleFaq = (index: number) => {
    setExpandedFaqs(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'instagram':
        return <Instagram className="w-5 h-5" />
      case 'youtube':
        return <Youtube className="w-5 h-5" />
      case 'linkedin':
        return <div className="w-5 h-5 bg-blue-700 rounded-sm flex items-center justify-center text-white text-xs font-bold">in</div>
      default:
        return <div className="w-5 h-5 bg-gray-400 rounded-sm"></div>
    }
  }

  const nextImage = () => {
    if (business && business.businessImageUrls.length > 0) {
      setCurrentImageIndex((prev) => (prev + 1) % business.businessImageUrls.length)
    }
  }

  const prevImage = () => {
    if (business && business.businessImageUrls.length > 0) {
      setCurrentImageIndex((prev) => (prev - 1 + business.businessImageUrls.length) % business.businessImageUrls.length)
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star 
        key={index} 
        className={`w-4 h-4 ${index < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`} 
      />
    ))
  }

  // Loading state
  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#9A9A4A] mx-auto mb-4" />
          <p className="text-gray-600">Loading business details...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !business) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">😔</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {error === 'Business not found' ? 'Business Not Found' : 'Something went wrong'}
          </h1>
          <p className="text-gray-600 mb-6">
            {error === 'Business not found' 
              ? 'The business you\'re looking for doesn\'t exist or has been removed.'
              : 'We couldn\'t load the business details. Please try again later.'
            }
          </p>
          <button
            onClick={() => router.push('/browse')}
            className="bg-[#9A9A4A] text-white px-6 py-3 rounded-lg hover:bg-[#8A8A3A] transition-colors duration-200 flex items-center mx-auto"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Browse
          </button>
        </div>
      </div>
    )
  }

  const filteredReviews = reviewFilter === 'all' 
    ? mockReviews 
    : mockReviews.filter(review => review.rating === parseInt(reviewFilter))

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (reviewSort) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case 'rating-high':
        return b.rating - a.rating
      case 'rating-low':
        return a.rating - b.rating
      case 'helpful':
        return b.helpful - a.helpful
      default:
        return 0
    }
  })

  const filteredPortfolio = portfolioFilter === 'all'
    ? mockPortfolio
    : mockPortfolio.filter(item => item.category === portfolioFilter)

  // Get available social platforms
  const availablePlatforms = businessService.getAvailableSocialPlatforms(business.socialMedia)

  const portfolioCategories = ['all', ...Array.from(new Set(mockPortfolio.map(item => item.category)))]

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

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Share Business</h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="text"
                  value={window.location.href}
                  readOnly
                  className="flex-1 bg-transparent text-sm text-gray-600"
                />
                <button
                  onClick={copyToClipboard}
                  className="flex items-center space-x-2 bg-[#9A9A4A] text-white px-3 py-2 rounded-lg hover:bg-[#8A8A3A] transition-colors duration-200"
                >
                  {copiedUrl ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span className="text-sm">{copiedUrl ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mb-2">
                    <span className="text-white text-xs font-bold">f</span>
                  </div>
                  <span className="text-xs text-gray-600">Facebook</span>
                </button>
                <button className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                  <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center mb-2">
                    <span className="text-white text-xs font-bold">T</span>
                  </div>
                  <span className="text-xs text-gray-600">Twitter</span>
                </button>
                <button className="flex flex-col items-center p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors duration-200">
                  <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center mb-2">
                    <span className="text-white text-xs font-bold">in</span>
                  </div>
                  <span className="text-xs text-gray-600">LinkedIn</span>
                </button>
              </div>
            </div>
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
            {business.businessImageUrls && business.businessImageUrls.length > 0 && (
              <div className="relative mb-8">
                <div className="relative h-96 rounded-lg overflow-hidden">
                  <img
                    src={business.businessImageUrls[currentImageIndex] || '/api/placeholder/800/600'}
                    alt={business.businessName}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/api/placeholder/800/600'
                    }}
                  />
                  
                  {/* Badge Overlay */}
                  <div className="absolute top-4 left-4 flex space-x-2">
                    {mockStats.averageRating >= 4.5 && (
                      <div className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="w-4 h-4 mr-1 fill-current" />
                        Top Rated
                      </div>
                    )}
                    <div className="bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                      {business.businessImageUrls.length} Photos
                    </div>
                  </div>
                  
                  {/* Navigation Buttons */}
                  {business.businessImageUrls.length > 1 && (
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
                  {business.businessImageUrls.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {business.businessImageUrls.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                            index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Thumbnail Gallery */}
                {business.businessImageUrls.length > 1 && (
                  <div className="flex space-x-2 mt-4 overflow-x-auto">
                    {business.businessImageUrls.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors duration-200 ${
                          index === currentImageIndex ? 'border-[#9A9A4A]' : 'border-gray-200'
                        }`}
                      >
                        <img
                          src={image || '/api/placeholder/80/80'}
                          alt={`${business.businessName} ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/api/placeholder/80/80'
                          }}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Business Header */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-3xl font-bold text-gray-900">{business.businessName}</h1>
                    {mockStats.averageRating >= 4.5 && (
                      <div className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                        <Award className="w-3 h-3 mr-1" />
                        Verified
                      </div>
                    )}
                  </div>
                  <p className="text-lg text-gray-600 mb-3">
                    Expert {business.category} services with proven results
                  </p>
                  <span className="inline-block bg-[#CACA78]/20 text-[#8A8A3A] text-sm px-3 py-1 rounded-full font-medium">
                    {business.category}
                  </span>
                </div>
              </div>

              {/* Key Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                <div className="text-center p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{mockStats.totalProjects}+</div>
                  <div className="text-sm text-gray-600">Projects</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">{mockStats.clientRetention}</div>
                  <div className="text-sm text-gray-600">Client Retention</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
                  <div className="text-2xl font-bold text-yellow-600">{mockStats.averageRating}</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">{mockStats.responseTime}</div>
                  <div className="text-sm text-gray-600">Response</div>
                </div>
                <div className="text-center p-3 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">{mockStats.completionRate}</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>

              {/* Basic Info */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  {formatLocation(business.location)}
                </div>
                <div className="flex items-center">
                  <Star className="w-4 h-4 mr-1 text-yellow-500" />
                  {mockStats.averageRating} ({mockStats.totalReviews} reviews)
                </div>
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {getCompanySizeLabel(business.companySize)}
                </div>
                <div className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  2.3M+ profile views
                </div>
                {business.foundedYear && (
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Est. {business.foundedYear}
                  </div>
                )}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="bg-white rounded-lg shadow-sm mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {[
                    { id: 'overview', label: 'Overview', icon: Info },
                    { id: 'services', label: 'Services', icon: DollarSign },
                    { id: 'portfolio', label: 'Portfolio', icon: Target },
                    { id: 'reviews', label: 'Reviews', icon: Star }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-200 flex items-center space-x-2 ${
                        activeTab === tab.id
                          ? 'border-[#9A9A4A] text-[#8A8A3A]'
                          : 'border-transparent text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
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
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">About {business.businessName}</h3>
                      <div className="prose max-w-none">
                        <p className="text-gray-600 mb-4">
                          {showFullDescription ? business.description : 
                            (business.description.length > 300 
                              ? `${business.description.substring(0, 300)}...` 
                              : business.description)
                          }
                        </p>
                        {business.description.length > 300 && (
                          <button
                            onClick={() => setShowFullDescription(!showFullDescription)}
                            className="text-[#9A9A4A] hover:text-[#8A8A3A] font-medium"
                          >
                            {showFullDescription ? 'Show less' : 'Read more'}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Key Features */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Us</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
                          <div className="bg-blue-500 p-2 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Proven Results</h4>
                            <p className="text-sm text-gray-600">Track record of delivering measurable ROI and business growth</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
                          <div className="bg-green-500 p-2 rounded-lg">
                            <Zap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Fast Turnaround</h4>
                            <p className="text-sm text-gray-600">Quick response times and efficient project delivery</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
                          <div className="bg-purple-500 p-2 rounded-lg">
                            <Shield className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Reliable Partnership</h4>
                            <p className="text-sm text-gray-600">Long-term client relationships built on trust and results</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-4 p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg">
                          <div className="bg-orange-500 p-2 rounded-lg">
                            <Target className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Custom Solutions</h4>
                            <p className="text-sm text-gray-600">Tailored strategies that fit your specific business needs</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Business Information */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Business Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Building className="w-5 h-5 text-gray-400 mr-2" />
                              <span className="font-medium text-gray-700">Company Size</span>
                            </div>
                            <span className="text-gray-600">{getCompanySizeLabel(business.companySize)}</span>
                          </div>
                          
                          {business.foundedYear && (
                            <div className="p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center mb-2">
                                <Calendar className="w-5 h-5 text-gray-400 mr-2" />
                                <span className="font-medium text-gray-700">Founded</span>
                              </div>
                              <span className="text-gray-600">{business.foundedYear}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="space-y-4">
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center mb-2">
                              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                              <span className="font-medium text-gray-700">Location</span>
                            </div>
                            <span className="text-gray-600">{formatLocation(business.location)}</span>
                          </div>
                          
                          <div className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center mb-2">
                              <Award className="w-5 h-5 text-gray-400 mr-2" />
                              <span className="font-medium text-gray-700">Specialization</span>
                            </div>
                            <span className="text-gray-600">{business.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* FAQ Section */}
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h3>
                      <div className="space-y-4">
                        {faqs.map((faq, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg">
                            <button
                              onClick={() => toggleFaq(index)}
                              className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50"
                            >
                              <span className="font-medium text-gray-900">{faq.question}</span>
                              {expandedFaqs.includes(index) ? (
                                <ChevronUp className="w-5 h-5 text-gray-400" />
                              ) : (
                                <ChevronDown className="w-5 h-5 text-gray-400" />
                              )}
                            </button>
                            {expandedFaqs.includes(index) && (
                              <div className="px-6 pb-4 text-gray-600">
                                {faq.answer}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Services Tab */}
                {activeTab === 'services' && (
                  <div className="space-y-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xl font-semibold text-gray-900">Our Services</h3>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {mockServices.length} Services Available
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-6">
                      {mockServices.map((service, index) => (
                        <div key={service.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 relative">
                          {service.popular && (
                            <div className="absolute -top-3 left-6 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                              Most Popular
                            </div>
                          )}
                          
                          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                            <div className="flex-1">
                              <h4 className="text-lg font-semibold text-gray-900 mb-2">{service.name}</h4>
                              <p className="text-gray-600 mb-3">{service.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                                <div className="flex items-center">
                                  <DollarSign className="w-4 h-4 mr-1" />
                                  {service.price}
                                </div>
                                {service.duration && (
                                  <div className="flex items-center">
                                    <Clock className="w-4 h-4 mr-1" />
                                    {service.duration}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="md:ml-6">
                              <div className="text-right mb-4">
                                <div className="text-2xl font-bold text-[#9A9A4A] mb-1">{service.price}</div>
                                {service.duration && (
                                  <div className="text-sm text-gray-500">{service.duration}</div>
                                )}
                              </div>
                              <button
                                onClick={handleEmailBusiness}
                                className={`w-full md:w-auto px-6 py-3 rounded-lg transition-colors duration-200 font-medium ${
                                  isLoggedIn 
                                    ? 'bg-[#9A9A4A] text-white hover:bg-[#8A8A3A]' 
                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                                disabled={!isLoggedIn}
                              >
                                {isLoggedIn ? 'Get Quote' : 'Login Required'}
                              </button>
                            </div>
                          </div>
                          
                          <div>
                            <h5 className="font-medium text-gray-900 mb-2">What's Included:</h5>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                              {service.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center text-sm text-gray-600">
                                  <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Custom Quote CTA */}
                    <div className="bg-gradient-to-r from-[#CACA78]/20 to-[#9A9A4A]/20 rounded-lg p-8 text-center">
                      <h4 className="text-2xl font-semibold text-gray-900 mb-3">Need Something Custom?</h4>
                      <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                        Every business is unique. We offer tailored solutions designed specifically for your goals, budget, and timeline. Let's discuss how we can help you succeed.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                          onClick={handleEmailBusiness}
                          className={`px-8 py-4 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center ${
                            isLoggedIn 
                              ? 'bg-[#9A9A4A] text-white hover:bg-[#8A8A3A]' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                          }`}
                          disabled={!isLoggedIn}
                        >
                          {!isLoggedIn && <Lock className="w-5 h-5 mr-2" />}
                          <MessageCircle className="w-5 h-5 mr-2" />
                          {isLoggedIn ? 'Request Custom Quote' : 'Login to Request Quote'}
                        </button>
                        <button className="px-8 py-4 border-2 border-[#9A9A4A] text-[#9A9A4A] rounded-lg hover:bg-[#9A9A4A] hover:text-white transition-colors duration-200 font-medium">
                          View Portfolio
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Portfolio Tab */}
                {activeTab === 'portfolio' && (
                  <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <h3 className="text-xl font-semibold text-gray-900">Our Work</h3>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">Filter by:</span>
                        <select
                          value={portfolioFilter}
                          onChange={(e) => setPortfolioFilter(e.target.value)}
                          className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                        >
                          {portfolioCategories.map((category) => (
                            <option key={category} value={category}>
                              {category === 'all' ? 'All Projects' : category}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                      {filteredPortfolio.map((project) => (
                        <div key={project.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                          <div className="md:flex">
                            <div className="md:w-1/3">
                              <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-64 md:h-full object-cover"
                              />
                            </div>
                            <div className="md:w-2/3 p-6">
                              <div className="flex items-start justify-between mb-4">
                                <div>
                                  <h4 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h4>
                                  <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                                    <span className="bg-[#CACA78]/20 text-[#8A8A3A] px-2 py-1 rounded-full">
                                      {project.category}
                                    </span>
                                    <span>{project.client}</span>
                                    <span>{project.completedDate}</span>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-lg font-semibold text-[#9A9A4A]">{project.budget}</div>
                                  <div className="text-sm text-gray-500">Investment</div>
                                </div>
                              </div>
                              
                              <p className="text-gray-600 mb-4">{project.description}</p>
                              
                              <div className="mb-4">
                                <h5 className="font-medium text-gray-900 mb-2">Key Results:</h5>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  {project.results.map((result, index) => (
                                    <div key={index} className="flex items-center text-sm text-gray-600">
                                      <TrendingUp className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                      {result}
                                    </div>
                                  ))}
                                </div>
                              </div>
                              
                              <div className="flex flex-wrap gap-2">
                                {project.tags.map((tag, index) => (
                                  <span key={index} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {filteredPortfolio.length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                          <Target className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
                        <p className="text-gray-600">Try selecting a different category.</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Reviews Tab */}
                {activeTab === 'reviews' && (
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <h3 className="text-xl font-semibold text-gray-900">Customer Reviews</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Filter:</span>
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
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600">Sort:</span>
                          <select
                            value={reviewSort}
                            onChange={(e) => setReviewSort(e.target.value as any)}
                            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                          >
                            <option value="newest">Newest First</option>
                            <option value="oldest">Oldest First</option>
                            <option value="rating-high">Highest Rating</option>
                            <option value="rating-low">Lowest Rating</option>
                            <option value="helpful">Most Helpful</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Review Summary */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-gray-900 mb-2">{mockStats.averageRating}</div>
                          <div className="flex items-center justify-center mb-2">
                            {renderStars(Math.floor(mockStats.averageRating))}
                          </div>
                          <div className="text-gray-600">Based on {mockStats.totalReviews} reviews</div>
                          <div className="text-sm text-green-600 font-medium mt-2">98% would recommend</div>
                        </div>
                        <div className="space-y-3">
                          {[5, 4, 3, 2, 1].map((stars) => {
                            const count = mockReviews.filter(r => r.rating === stars).length
                            const percentage = (count / mockReviews.length) * 100
                            return (
                              <div key={stars} className="flex items-center space-x-3">
                                <span className="text-sm w-8">{stars}★</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-3">
                                  <div
                                    className="bg-yellow-400 h-3 rounded-full transition-all duration-500"
                                    style={{ width: `${percentage}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 w-12">{count} ({Math.round(percentage)}%)</span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Individual Reviews */}
                    <div className="space-y-6">
                      {sortedReviews.map((review) => (
                        <div key={review.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-300">
                          <div className="flex items-start space-x-4">
                            <img
                              src={review.avatar}
                              alt={review.author}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <div>
                                  <div className="flex items-center space-x-2">
                                    <h4 className="font-medium text-gray-900">{review.author}</h4>
                                    {review.verified && (
                                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                                        ✓ Verified
                                      </div>
                                    )}
                                  </div>
                                  <div className="flex items-center space-x-3 mt-1">
                                    <div className="flex items-center">
                                      {renderStars(review.rating)}
                                    </div>
                                    <span className="text-sm text-gray-500">
                                      {new Date(review.date).toLocaleDateString()}
                                    </span>
                                    {review.collaboration && (
                                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                                        {review.collaboration}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              <p className="text-gray-600 mb-4 leading-relaxed">{review.content}</p>
                              
                              {/* Business Response */}
                              {review.businessResponse && (
                                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
                                  <div className="flex items-center mb-2">
                                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                                      <span className="text-white text-xs font-bold">
                                        {business.businessName.charAt(0)}
                                      </span>
                                    </div>
                                    <span className="font-medium text-gray-900">Response from {business.businessName}</span>
                                  </div>
                                  <p className="text-gray-600 text-sm pl-11">{review.businessResponse}</p>
                                </div>
                              )}

                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                  <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600 transition-colors duration-200">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span className="text-sm">Helpful ({review.helpful})</span>
                                  </button>
                                  <button className="flex items-center space-x-1 text-gray-500 hover:text-red-600 transition-colors duration-200">
                                    <ThumbsDown className="w-4 h-4" />
                                    <span className="text-sm">({review.notHelpful})</span>
                                  </button>
                                </div>
                                <button className="flex items-center space-x-1 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                                  <Flag className="w-4 h-4" />
                                  <span className="text-sm">Report</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {sortedReviews.length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                          <Star className="w-16 h-16 mx-auto" />
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
                        <p className="text-gray-600">No reviews match your current filter selection.</p>
                      </div>
                    )}

                    {/* Review CTA */}
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg p-6 text-center">
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Have you worked with {business.businessName}?</h4>
                      <p className="text-gray-600 mb-4">Share your experience to help other businesses make informed decisions.</p>
                      <button
                        onClick={handleEmailBusiness}
                        className={`px-6 py-3 rounded-lg transition-colors duration-200 font-medium ${
                          isLoggedIn 
                            ? 'bg-yellow-500 text-white hover:bg-yellow-600' 
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={!isLoggedIn}
                      >
                        {isLoggedIn ? 'Write a Review' : 'Login to Review'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Contact & Info */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Quick Contact Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h3>
                
                {/* Response Time */}
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-green-600 mr-2" />
                    <div>
                      <div className="text-sm font-medium text-green-800">Usually responds in {mockStats.responseTime}</div>
                      <div className="text-xs text-green-600">Active now</div>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <button
                  onClick={handleEmailBusiness}
                  className={`w-full py-4 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center font-medium text-lg mb-4 ${
                    isLoggedIn
                      ? 'bg-[#9A9A4A] text-white hover:bg-[#8A8A3A] shadow-lg hover:shadow-xl'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                  disabled={!isLoggedIn}
                >
                  {!isLoggedIn && <Lock className="w-5 h-5 mr-2" />}
                  <MessageCircle className="w-5 h-5 mr-2" />
                  {isLoggedIn ? 'Contact for Partnership' : 'Login to Contact'}
                </button>

                {/* Quick Actions */}
                <div className="grid grid-cols-3 gap-3">
                  <button
                    onClick={handleLike}
                    className={`flex flex-col items-center py-3 px-2 rounded-lg border transition-colors duration-200 ${
                      isLiked 
                        ? 'bg-red-50 border-red-200 text-red-600' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Heart className={`w-5 h-5 mb-1 ${isLiked ? 'fill-current' : ''}`} />
                    <span className="text-xs">Like</span>
                  </button>
                  <button
                    onClick={handleBookmark}
                    className={`flex flex-col items-center py-3 px-2 rounded-lg border transition-colors duration-200 ${
                      isBookmarked 
                        ? 'bg-blue-50 border-blue-200 text-blue-600' 
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 mb-1 ${isBookmarked ? 'fill-current' : ''}`} />
                    <span className="text-xs">Save</span>
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex flex-col items-center py-3 px-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors duration-200"
                  >
                    <Share2 className="w-5 h-5 mb-1" />
                    <span className="text-xs">Share</span>
                  </button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  {business.socialMedia.website && (
                    <div className="flex items-center">
                      <Globe className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                      <a 
                        href={business.socialMedia.website.startsWith('http') ? business.socialMedia.website : `https://${business.socialMedia.website}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-[#9A9A4A] hover:text-[#8A8A3A] flex items-center break-all"
                      >
                        {business.socialMedia.website}
                        <ExternalLink className="w-4 h-4 ml-1 flex-shrink-0" />
                      </a>
                    </div>
                  )}
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-600 text-sm">{getFullAddress(business.location)}</span>
                  </div>
                </div>

                {/* Social Links */}
                {availablePlatforms.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-900 mb-3">Follow Us</h4>
                    <div className="flex space-x-3">
                      {availablePlatforms.map((item, index) => (
                        <a
                          key={index}
                          href={item.url.startsWith('http') ? item.url : `https://${item.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-gray-100 rounded-lg hover:bg-[#CACA78]/20 transition-colors duration-200 group"
                          title={item.platform}
                        >
                          {getPlatformIcon(item.platform)}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Statistics Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Stats</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Success Rate
                    </span>
                    <span className="text-gray-900 font-semibold">{mockStats.completionRate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      Client Retention
                    </span>
                    <span className="text-gray-900 font-semibold">{mockStats.clientRetention}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <Target className="w-4 h-4 mr-2" />
                      Projects Completed
                    </span>
                    <span className="text-gray-900 font-semibold">{mockStats.totalProjects}+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      Avg. Response Time
                    </span>
                    <span className="text-gray-900 font-semibold">{mockStats.responseTime}</span>
                  </div>
                </div>
              </div>

              {/* Location Map */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                <div className="relative w-full h-48 rounded-lg overflow-hidden mb-4">
                  <iframe
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(formatLocation(business.location))}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                    className="absolute top-0 left-0 w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    {formatLocation(business.location)}
                  </span>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(getFullAddress(business.location))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#9A9A4A] hover:text-[#8A8A3A] flex items-center"
                  >
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Directions
                  </a>
                </div>
              </div>

              {/* Business Details */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Business Details</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Industry:</span>
                    <span className="text-gray-900 font-medium">{business.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Company Size:</span>
                    <span className="text-gray-900 font-medium">{getCompanySizeLabel(business.companySize)}</span>
                  </div>
                  {business.foundedYear && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Founded:</span>
                      <span className="text-gray-900 font-medium">{business.foundedYear}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="text-gray-900 font-medium">{formatLocation(business.location)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Profile Views:</span>
                    <span className="text-gray-900 font-medium">2.3M+</span>
                  </div>
                </div>
              </div>

              {/* Trust & Safety */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Trust & Safety</h3>
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Verified Business Profile</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Background Check Completed</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">Secure Payment Processing</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3" />
                    <span className="text-gray-700">24/7 Customer Support</span>
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
          businessId={business.id.timestamp.toString()}
          onClose={() => setShowEmailModal(false)}
          isLoggedIn={isLoggedIn}
          user={user}
        />
      )}
    </div>
  )
}