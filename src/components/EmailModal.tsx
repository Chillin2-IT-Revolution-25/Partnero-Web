'use client'

import { useState } from 'react'
import { X, Send, User, Mail, MessageSquare, Paperclip, CheckCircle, AlertCircle } from 'lucide-react'

interface EmailModalProps {
  businessId: string
  onClose: () => void
  isLoggedIn: boolean
}

export default function EmailModal({ businessId, onClose, isLoggedIn }: EmailModalProps) {
  const [formData, setFormData] = useState({
    name: isLoggedIn ? 'John Doe' : '',
    email: isLoggedIn ? 'john@example.com' : '',
    subject: '',
    message: '',
    collaborationType: '',
    portfolio: '',
    budget: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Mock business data - in real app, fetch by businessId
  const business = {
    name: 'Creative Studios',
    email: 'hello@creativestudios.com'
  }

  const collaborationTypes = [
    'Sponsored Content',
    'Product Review',
    'Brand Ambassador',
    'Long-term Partnership',
    'Event Coverage',
    'Content Creation',
    'Other'
  ]

  const subjectTemplates = [
    'Partnership Inquiry - [Your Name/Brand]',
    'Collaboration Proposal for [Campaign/Project]',
    'Content Creator Partnership Request',
    'Brand Ambassador Application',
    'Custom Collaboration Opportunity'
  ]

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
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
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
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
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
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
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
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
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
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
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
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  <option value="under-500">Under $500</option>
                  <option value="500-1000">$500 - $1,000</option>
                  <option value="1000-2500">$1,000 - $2,500</option>
                  <option value="2500-5000">$2,500 - $5,000</option>
                  <option value="5000-10000">$5,000 - $10,000</option>
                  <option value="over-10000">Over $10,000</option>
                  <option value="negotiable">Negotiable</option>
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
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none ${
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
                  <li>• Be specific about what type of collaboration you're proposing</li>
                  <li>• Include your audience demographics and engagement rates</li>
                  <li>• Mention previous brand collaborations or relevant experience</li>
                  <li>• Explain why you're interested in their specific brand</li>
                  <li>• Be professional but let your personality shine through</li>
                </ul>
              </div>

              {/* Submit Button */}
              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}