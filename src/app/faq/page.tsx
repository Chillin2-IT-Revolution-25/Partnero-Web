'use client'

import { useState } from 'react'
import { Search, ChevronDown, ChevronUp, MessageCircle, Mail, Phone, HelpCircle, Users, Shield, CreditCard, Zap, Globe, Settings } from 'lucide-react'

interface FAQItem {
  id: string
  question: string
  answer: string
  category: string
}

interface FAQCategory {
  id: string
  name: string
  icon: React.ReactNode
  color: string
}

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [openItems, setOpenItems] = useState<string[]>([])

  const categories: FAQCategory[] = [
    { id: 'all', name: 'All Questions', icon: <HelpCircle className="w-5 h-5" />, color: 'bg-gray-100 text-gray-700' },
    { id: 'getting-started', name: 'Getting Started', icon: <Zap className="w-5 h-5" />, color: 'bg-blue-100 text-blue-700' },
    { id: 'partnerships', name: 'Finding Partners', icon: <Users className="w-5 h-5" />, color: 'bg-purple-100 text-purple-700' },
    { id: 'account', name: 'Account & Profile', icon: <Settings className="w-5 h-5" />, color: 'bg-green-100 text-green-700' },
    { id: 'safety', name: 'Safety & Security', icon: <Shield className="w-5 h-5" />, color: 'bg-red-100 text-red-700' },
    { id: 'billing', name: 'Billing & Pricing', icon: <CreditCard className="w-5 h-5" />, color: 'bg-yellow-100 text-yellow-700' },
    { id: 'technical', name: 'Technical Support', icon: <Globe className="w-5 h-5" />, color: 'bg-indigo-100 text-indigo-700' }
  ]

  const faqData: FAQItem[] = [
    // Getting Started
    {
      id: '1',
      question: 'What is Partnero and how does it work?',
      answer: 'Partnero is a comprehensive platform that connects businesses and content creators for meaningful partnerships. Our platform allows you to discover collaboration opportunities, exchange services, and grow your business through strategic partnerships. You can offer your services for money, exchange services with other businesses, or pay for services from other companies.',
      category: 'getting-started'
    },
    {
      id: '2',
      question: 'How do I create an account on Partnero?',
      answer: 'Creating an account is simple! Click the "Sign Up" button and follow our 3-step process: 1) Enter your personal information, 2) Add your business details and category, 3) Review and confirm your account. You can start browsing partnerships immediately after registration.',
      category: 'getting-started'
    },
    {
      id: '3',
      question: 'Is Partnero free to use?',
      answer: 'Yes! Creating an account and browsing partnerships is completely free. You can contact other businesses, send partnership proposals, and manage your profile at no cost. We also offer premium features for enhanced visibility and advanced tools.',
      category: 'getting-started'
    },
    {
      id: '4',
      question: 'What types of businesses can join Partnero?',
      answer: 'Partnero welcomes all types of businesses and content creators! Whether you\'re in digital marketing, technology, health & wellness, fashion, food & beverage, education, entertainment, finance, travel, real estate, or beauty & cosmetics, there\'s a place for you on our platform.',
      category: 'getting-started'
    },

    // Finding Partners
    {
      id: '5',
      question: 'How do I find the right business partners?',
      answer: 'Use our advanced search and filtering system! You can filter by category, location, platform, rating, and collaboration type. Our AI-powered recommendation system also suggests potential partners based on your business profile and goals.',
      category: 'partnerships'
    },
    {
      id: '6',
      question: 'What types of collaborations are available?',
      answer: 'Partnero supports various collaboration types including: Sponsored Content, Product Reviews, Brand Ambassadorships, Long-term Partnerships, Event Coverage, Content Creation, Affiliate Marketing, Giveaways & Contests, and custom collaboration opportunities.',
      category: 'partnerships'
    },
    {
      id: '7',
      question: 'How do I contact potential partners?',
      answer: 'Simply click the "Contact" or "Send Message" button on any business profile. You can send detailed partnership proposals including collaboration type, budget range, and your portfolio. All registered users can send and receive messages through our secure messaging system.',
      category: 'partnerships'
    },
    {
      id: '8',
      question: 'What should I include in my partnership proposal?',
      answer: 'Include: your collaboration type, target audience demographics, previous experience, portfolio/social media links, proposed budget or service exchange, timeline, and specific value you can bring to their brand. Be professional but let your personality shine through!',
      category: 'partnerships'
    },

    // Account & Profile
    {
      id: '9',
      question: 'How do I optimize my business profile?',
      answer: 'Complete all sections of your profile: add a compelling business description (at least 50 characters), upload high-quality images, list your social media platforms, specify your category and location, and keep your contact information updated. Complete profiles get 3x more partnership inquiries!',
      category: 'account'
    },
    {
      id: '10',
      question: 'Can I edit my business information after registration?',
      answer: 'Absolutely! You can update your business information, description, images, contact details, and category at any time through your profile settings. Keep your profile fresh and up-to-date to attract more partnerships.',
      category: 'account'
    },
    {
      id: '11',
      question: 'How do I delete my account?',
      answer: 'You can delete your account through Profile Settings > Account Settings > Danger Zone. Please note that this action is permanent and will remove all your data, messages, and partnership history. Consider deactivating your account temporarily if you\'re unsure.',
      category: 'account'
    },
    {
      id: '12',
      question: 'Why isn\'t my business showing up in search results?',
      answer: 'Check your privacy settings - ensure "Show my business in public listings" is enabled. Also, complete your profile information and verify your email address. Incomplete profiles may have limited visibility in search results.',
      category: 'account'
    },

    // Safety & Security
    {
      id: '13',
      question: 'How does Partnero ensure safe partnerships?',
      answer: 'We implement multiple safety measures: business verification processes, user ratings and reviews, secure messaging system, reporting tools for inappropriate behavior, and community guidelines enforcement. We recommend starting with small collaborations to build trust.',
      category: 'safety'
    },
    {
      id: '14',
      question: 'How do I report inappropriate behavior or scams?',
      answer: 'Use the "Report" button on any business profile or message to flag inappropriate content, scams, or policy violations. Our moderation team reviews all reports within 24 hours and takes appropriate action to maintain platform safety.',
      category: 'safety'
    },
    {
      id: '15',
      question: 'What information is visible to other users?',
      answer: 'Public information includes: business name, category, description, location, images, social media links, and ratings. Your email and phone number are only shared when you choose to include them in messages. You can control visibility through privacy settings.',
      category: 'safety'
    },

    // Billing & Pricing
    {
      id: '16',
      question: 'Are there any hidden fees on Partnero?',
      answer: 'No hidden fees! Basic membership is completely free. We only charge for optional premium features like featured listings, advanced analytics, and priority customer support. All pricing is transparent and clearly displayed.',
      category: 'billing'
    },
    {
      id: '17',
      question: 'What premium features are available?',
      answer: 'Premium features include: featured business listings for higher visibility, advanced analytics and insights, priority customer support, verified business badges, and enhanced profile customization options. Premium plans start at $29/month.',
      category: 'billing'
    },
    {
      id: '18',
      question: 'How do payments work between partners?',
      answer: 'Partnero doesn\'t process payments between partners. Financial arrangements are made directly between collaborating businesses. We recommend using secure payment methods and written agreements for paid collaborations.',
      category: 'billing'
    },

    // Technical Support
    {
      id: '19',
      question: 'I\'m having trouble logging into my account',
      answer: 'Try resetting your password using the "Forgot Password" link on the login page. Clear your browser cache and cookies, or try a different browser. If issues persist, contact our support team with your registered email address.',
      category: 'technical'
    },
    {
      id: '20',
      question: 'The website is loading slowly or not working properly',
      answer: 'Check your internet connection and try refreshing the page. Clear your browser cache and disable browser extensions temporarily. The issue might be temporary - try again in a few minutes. If problems continue, report it to our technical team.',
      category: 'technical'
    },
    {
      id: '21',
      question: 'Can I access Partnero on mobile devices?',
      answer: 'Yes! Partnero is fully responsive and works on all devices including smartphones and tablets. We\'re also developing dedicated mobile apps for iOS and Android, coming soon!',
      category: 'technical'
    },
    {
      id: '22',
      question: 'How do I contact customer support?',
      answer: 'Reach our support team via: email at support@partnero.com, phone at +1 (555) 123-4567 (business hours), or use the contact form below. We typically respond within 24 hours and provide priority support for premium members.',
      category: 'technical'
    }
  ]

  const filteredFAQs = faqData.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const handleSearchChange = (term: string) => {
    setSearchTerm(term)
    // Auto-expand relevant items when searching
    if (term) {
      const relevantItems = filteredFAQs.map(faq => faq.id)
      setOpenItems(relevantItems)
    } else {
      setOpenItems([])
    }
  }

  return (
    <>
      {/* Add Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=K2D:wght@400;700;800&family=Lato:wght@400;700&family=Kanit:wght@400;500;600;700&display=swap');
      `}</style>

      <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#CACA78]/10 via-[#CACA78]/5 to-[#9A9A4A]/15 py-16 sm:py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[#CACA78]/30 rounded-full filter blur-3xl opacity-80"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[#9A9A4A]/20 rounded-full filter blur-3xl opacity-80"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center" data-aos="fade-up"  data-aos-duration="400">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-gray-900 mb-6" style={{ fontFamily: 'Kanit, sans-serif' }}>
            Frequently Asked
            <br />
            <span style={{ color: '#9A9A4A' }}>Questions</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8" style={{ fontFamily: 'Lato, sans-serif' }}>
            Find answers to common questions about Partnero, partnerships, and how to grow your business through collaboration.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6" />
              <input
                type="text"
                placeholder="Search for answers..."
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-12 pr-6 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#CACA78] focus:border-transparent shadow-lg text-lg"
                style={{ fontFamily: 'Lato, sans-serif' }}
              />
            </div>
          </div>
        </div>
      </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Sidebar */}
            <div className="lg:col-span-1" data-aos="fade-right">
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-20">
                <h3 className="text-lg font-semibold text-gray-900 mb-4" style={{ fontFamily: 'K2D, sans-serif' }}>
                  Categories
                </h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                        selectedCategory === category.id 
                          ? 'bg-[#CACA78] text-white' 
                          : 'hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className={`p-1 rounded ${selectedCategory === category.id ? 'bg-white/20' : category.color}`}>
                        {category.icon}
                      </div>
                      <span className="font-medium text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>
                        {category.name}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Quick Stats */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-[#9A9A4A]">{filteredFAQs.length}</div>
                    <div className="text-sm text-gray-600">Questions Found</div>
                  </div>
                </div>
              </div>
            </div>

              {/* FAQ Content */}
              <div className="lg:col-span-3">
                {searchTerm && (
                  <div className="mb-6">
                    <p className="text-gray-600" style={{ fontFamily: 'Lato, sans-serif' }}>
                      Showing {filteredFAQs.length} results for "<span className="font-medium">{searchTerm}</span>"
                    </p>
                  </div>
                )}

                <div className="space-y-4">
                  {filteredFAQs.map(faq => (
                    <div key={faq.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <button
                        onClick={() => toggleItem(faq.id)}
                        className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                      >
                        <h3 className="text-lg font-semibold text-gray-900 pr-4" style={{ fontFamily: 'K2D, sans-serif' }}>
                          {faq.question}
                        </h3>
                        <div className="flex-shrink-0">
                          {openItems.includes(faq.id) ? (
                            <ChevronUp className="w-5 h-5 text-[#9A9A4A]" />
                          ) : (
                            <ChevronDown className="w-5 h-5 text-[#9A9A4A]" />
                          )}
                        </div>
                      </button>
                      
                      {openItems.includes(faq.id) && (
                        <div className="px-6 pb-5 border-t border-gray-100">
                          <p className="text-gray-600 leading-relaxed pt-4" style={{ fontFamily: 'Lato, sans-serif' }}>
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredFAQs.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2" style={{ fontFamily: 'K2D, sans-serif' }}>
                      No results found
                    </h3>
                    <p className="text-gray-600 mb-4" style={{ fontFamily: 'Lato, sans-serif' }}>
                      We couldn't find any questions matching your search. Try different keywords or browse by category.
                    </p>
                    <button
                      onClick={() => {
                        setSearchTerm('')
                        setSelectedCategory('all')
                        setOpenItems([])
                      }}
                      className="bg-[#9A9A4A] text-white px-6 py-2 rounded-lg hover:bg-[#8A8A3A] transition-colors duration-200"
                    >
                      View All Questions
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}