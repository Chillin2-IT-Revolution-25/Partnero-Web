'use client'

import { useState, useEffect } from 'react'
import { X, Send, User, Mail, MessageSquare, Paperclip, CheckCircle, AlertCircle } from 'lucide-react'
import { 
  collaborationTypes, 
  subjectTemplates, 
  budgetRanges, 
  partnershipTips 
} from '@/data/mockFormData'
import { getBusinessById } from '@/data/mockBusinesses'

interface User {
  name: string
  email: string
  avatar: string
  business: {
    name: string
    description: string
    location: string
    category: string
  }
}

interface EmailModalProps {
  businessId: string
  onClose: () => void
  isLoggedIn: boolean
  user?: User | null
}

export default function EmailModal({ businessId, onClose, isLoggedIn, user }: EmailModalProps) {
  const [formData, setFormData] = useState({
    name: isLoggedIn && user ? user.name : '',
    email: isLoggedIn && user ? user.email : '',
    subject: '',
    message: '',
    collaborationType: '',
    portfolio: '',
    budget: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Prevent body scroll when modal is open
  useEffect(() => {
    // Store current scroll position
    const scrollY = window.scrollY
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.width = '100%'

    // Cleanup function
    return () => {
      // Restore scroll position
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1)
      }
    }
  }, [])

  // Update form data when user changes
  useEffect(() => {
    if (isLoggedIn && user) {
      setFormData(prev => ({
        ...prev,
        name: user.name,
        email: user.email
      }))
    }
  }, [isLoggedIn, user])

  // Get business data using the helper function
  const business = getBusinessById(businessId) || {
    name: 'Creative Studios',
    email: 'hello@creativestudios.com'
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const handleSubjectTemplate = (template: string) => {
    setFormData(prev => ({
      ...prev,
      subject: template
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 50) {
      newErrors.message = 'Message should be at least 50 characters long'
    }

    if (!formData.collaborationType) {
      newErrors.collaborationType = 'Please select a collaboration type'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      setIsSubmitted(true)
      
      // Auto close after 3 seconds
      setTimeout(() => {
        onClose()
      }, 3000)
    } catch (error) {
      console.error('Error sending email:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <>
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Message Sent!</h3>
            <p className="text-gray-600 mb-6">
              Your message has been sent to {business.name}. They typically respond within 24 hours.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-[#9A9A4A] text-white py-3 rounded-lg hover:bg-[#8A8A3A] transition-colors duration-200 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay */}
        <div 
          className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" 
          onClick={onClose}
          data-aos="fade"
          data-aos-duration="300"
        ></div>

        {/* Modal panel */}
        <div 
          className="inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full"
          data-aos="zoom-in"
          data-aos-duration="400"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Contact {business.name}</h2>
              <p className="text-sm text-gray-500 mt-1">Send a partnership inquiry</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
            {!isLoggedIn && (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <AlertCircle className="w-5 h-5 text-amber-600 mr-2 mt-0.5" />
                  <div>
                    <p className="text-sm text-amber-800 font-medium">Guest User</p>
                    <p className="text-sm text-amber-700">You're sending this message as a guest. Consider creating an account for better partnership opportunities.</p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-1" />
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Enter your full name"
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-1" />
                    Your Email *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
              </div>

              {/* Collaboration Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Collaboration Type *
                </label>
                <select
                  value={formData.collaborationType}
                  onChange={(e) => handleInputChange('collaborationType', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent ${
                    errors.collaborationType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select collaboration type</option>
                  {collaborationTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.collaborationType && <p className="text-red-500 text-xs mt-1">{errors.collaborationType}</p>}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject *
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent ${
                    errors.subject ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter email subject"
                />
                {errors.subject && <p className="text-red-500 text-xs mt-1">{errors.subject}</p>}
                
                {/* Subject Templates */}
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-2">Quick templates:</p>
                  <div className="flex flex-wrap gap-2">
                    {subjectTemplates.map((template, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => handleSubjectTemplate(template)}
                        className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded transition-colors duration-200"
                      >
                        {template}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Portfolio/Social Links */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio/Social Media Links
                </label>
                <input
                  type="url"
                  value={formData.portfolio}
                  onChange={(e) => handleInputChange('portfolio', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                  placeholder="https://instagram.com/yourusername or your website"
                />
                <p className="text-xs text-gray-500 mt-1">Share your portfolio or main social media profile</p>
              </div>

              {/* Budget Range */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Budget Range (Optional)
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                >
                  {budgetRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="w-4 h-4 inline mr-1" />
                  Your Message *
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  rows={6}
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent resize-none ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Tell them about yourself, your audience, and why you'd like to collaborate. Be specific about your proposal and what value you can bring to their brand."
                />
                <div className="flex justify-between items-center mt-1">
                  {errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}
                  <p className="text-xs text-gray-500 ml-auto">{formData.message.length}/1000 characters</p>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-medium text-blue-900 mb-2">💡 Tips for a great partnership inquiry:</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  {partnershipTips.map((tip, index) => (
                    <li key={index}>• {tip}</li>
                  ))}
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-none w-20 sm:flex-1 px-2 sm:px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-[#9A9A4A] text-white rounded-lg hover:bg-[#8A8A3A] transition-colors duration-200 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      <span className="hidden sm:inline">Sending...</span>
                      <span className="sm:hidden">Sending</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-1 sm:mr-2" />
                      <span className="hidden sm:inline">Send Message</span>
                      <span className="sm:hidden">Send</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}