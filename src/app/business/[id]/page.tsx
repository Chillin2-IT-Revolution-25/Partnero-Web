'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { ArrowLeft, MapPin, Star, Users, Calendar, Globe, Mail, Phone, Instagram, Youtube, Heart, Share2, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import Navbar from '@/components/Navbar'
import ProfileModal from '@/components/ProfileModal'
import EmailModal from '@/components/EmailModal'

export default function BusinessDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  
  const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    avatar: '/api/placeholder/40/40',
    business: {
      name: 'Creative Solutions',
      description: 'Digital marketing and content creation services',
      location: 'New York, NY',
      category: 'Digital Marketing'
    }
  })

  // Mock business data - in real app, fetch by params.id
  const business = {
    id: params.id,
    name: 'Creative Studios',
    description: 'Digital marketing agency specializing in social media content creation and brand development. We work with brands to create authentic, engaging content that resonates with their target audience.',
    fullDescription: `Creative Studios is a full-service digital marketing agency that has been helping brands tell their stories through compelling visual content for over 5 years. Our team of creative professionals specializes in social media strategy, content creation, brand development, and influencer partnerships.

We believe in the power of authentic storytelling and work closely with our clients to develop unique brand voices that stand out in today's crowded digital landscape. Our collaborative approach ensures that every piece of content we create aligns with your brand values and business objectives.

Our services include:
• Social Media Strategy & Management
• Content Creation (Photo & Video)
• Brand Identity Development
• Influencer Campaign Management
• Performance Analytics & Reporting

We're always looking for talented content creators, influencers, and brand partners who share our passion for creating meaningful connections between brands and their audiences.`,
    category: 'Digital Marketing',
    location: 'New York, NY',
    rating: 4.8,
    reviewCount: 127,
    followers: '15K',
    established: '2019',
    website: 'https://creativestudios.com',
    email: 'hello@creativestudios.com',
    phone: '+1 (555) 123-4567',
    platforms: ['Instagram', 'YouTube', 'TikTok', 'LinkedIn'],
    images: [
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600',
      '/api/placeholder/800/600'
    ],
    services: [
      'Social Media Management',
      'Content Creation',
      'Brand Strategy',
      'Influencer Partnerships',
      'Video Production',
      'Photography'
    ],
    collaborationTypes: [
      'Sponsored Content',
      'Product Reviews',
      'Brand Ambassadorships',
      'Event Coverage',
      'Long-term Partnerships'
    ],
    requirements: [
      'Minimum 10K followers on primary platform',
      'Engagement rate above 3%',
      'Content aligned with brand values',
      'Professional portfolio required'
    ]
  }

  const handleLogin = () => setIsLoggedIn(true)
  const handleLogout = () => {
    setIsLoggedIn(false)
    setShowProfileModal(false)
  }

  const handleProfileClick = () => setShowProfileModal(true)
  const handleEmailBusiness = () => setShowEmailModal(true)
  const handleLike = () => setIsLiked(!isLiked)

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar 
        isLoggedIn={isLoggedIn}
        user={user}
        onLogin={handleLogin}
        onProfileClick={handleProfileClick}
        onLogout={handleLogout}
      />

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
                      index === currentImageIndex ? 'border-purple-500' : 'border-gray-200'
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

            {/* Business Info */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>
                  <span className="inline-block bg-purple-100 text-purple-800 text-sm px-3 py-1 rounded-full">
                    {business.category}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleLike}
                    className={`p-3 rounded-full ${isLiked ? 'text-red-500 bg-red-50' : 'text-gray-400 bg-gray-50'} hover:bg-gray-100 transition-colors duration-200`}
                  >
                    <Heart className={`w-6 h-6 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-full text-gray-400 bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 mb-6 text-sm text-gray-600">
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
                  <Calendar className="w-4 h-4 mr-1" />
                  Est. {business.established}
                </div>
              </div>

              {/* Description */}
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">{business.description}</p>
                <div className="text-gray-600 whitespace-pre-line">
                  {business.fullDescription}
                </div>
              </div>
            </div>

            {/* Services */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Services Offered</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {business.services.map((service, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                    <span className="text-sm font-medium text-gray-700">{service}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboration Types */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Collaboration Opportunities</h3>
              <div className="space-y-3">
                {business.collaborationTypes.map((type, index) => (
                  <div key={index} className="flex items-center p-3 bg-purple-50 rounded-lg">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                    <span className="text-gray-700">{type}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow-sm p-6">
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

          {/* Right Column - Contact & Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              {/* Contact Card */}
              <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Globe className="w-5 h-5 text-gray-400 mr-3" />
                    <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">
                      {business.website}
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
                </div>

                {/* Platforms */}
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">Active Platforms</h4>
                  <div className="flex space-x-3">
                    {business.platforms.map((platform, index) => (
                      <div key={index} className="p-3 bg-gray-100 rounded-lg" title={platform}>
                        {getPlatformIcon(platform)}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Button */}
                <button
                  onClick={handleEmailBusiness}
                  className="w-full mt-6 bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center justify-center font-medium"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Contact for Partnership
                </button>

                <p className="text-xs text-gray-500 mt-2 text-center">
                  Response time: Usually within 24 hours
                </p>
              </div>

              {/* Similar Businesses */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Similar Partners</h3>
                <div className="space-y-4">
                  {[
                    { name: 'TechFlow Solutions', category: 'Technology', rating: 4.9 },
                    { name: 'Fashion Forward', category: 'Fashion', rating: 4.6 },
                    { name: 'Wellness Collective', category: 'Health & Wellness', rating: 4.7 }
                  ].map((similar, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{similar.name}</p>
                        <p className="text-xs text-gray-500">{similar.category}</p>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">{similar.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showProfileModal && (
        <ProfileModal 
          user={user}
          onClose={() => setShowProfileModal(false)}
          onLogout={handleLogout}
        />
      )}

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