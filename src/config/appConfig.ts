// config/appConfig.ts

export const APP_CONFIG = {
    // Application Info
    name: 'Partnero',
    description: 'The ultimate platform for business partnerships and collaborations',
    version: '1.0.0',
    author: 'Partnero Team',
    
    // URLs and Routes
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000',
    apiUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    
    // Authentication
    auth: {
      sessionTimeout: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
      refreshTokenExpiry: 7 * 24 * 60 * 60 * 1000, // 7 days
      localStorageKey: 'partnero_auth',
      rememberMeDuration: 30 * 24 * 60 * 60 * 1000, // 30 days
    },
    
    // Demo Credentials
    demo: {
      email: 'demo@partnero.com',
      password: 'password',
      enabled: true,
    },
    
    // Pagination
    pagination: {
      defaultPageSize: 12,
      maxPageSize: 100,
      pageSizeOptions: [6, 12, 24, 48],
    },
    
    // Search and Filtering
    search: {
      minQueryLength: 2,
      debounceDelay: 300,
      maxSuggestions: 5,
      highlightMatches: true,
    },
    
    // Business Listings
    business: {
      maxDescriptionLength: 500,
      minDescriptionLength: 50,
      maxImagesPerBusiness: 6,
      supportedImageFormats: ['jpg', 'jpeg', 'png', 'webp'],
      maxImageSizeKB: 2048,
      defaultViewMode: 'grid' as const,
    },
    
    // Email and Communication
    email: {
      maxSubjectLength: 200,
      maxMessageLength: 2000,
      minMessageLength: 50,
      responseTimeHours: 24,
      autoSaveDelay: 2000,
    },
    
    // Rating System
    rating: {
      min: 0,
      max: 5,
      precision: 1, // decimal places
      defaultRating: 0,
    },
    
    // UI and UX
    ui: {
      animationDuration: 300,
      toastDuration: 5000,
      loadingDelay: 500,
      scrollTopOffset: 80,
      mobileBreakpoint: 768,
      tabletBreakpoint: 1024,
    },
    
    // File Upload
    upload: {
      maxFileSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ['image/jpeg', 'image/png', 'image/webp', 'application/pdf'],
      maxFiles: 5,
    },
    
    // Social Media
    socialMedia: {
      supportedPlatforms: [
        'Instagram',
        'YouTube',
        'TikTok',
        'LinkedIn',
        'Twitter',
        'Pinterest',
        'Telegram',
        'Facebook'
      ],
      urlPatterns: {
        instagram: /^https?:\/\/(www\.)?instagram\.com\/.+/,
        youtube: /^https?:\/\/(www\.)?youtube\.com\/.+/,
        tiktok: /^https?:\/\/(www\.)?tiktok\.com\/.+/,
        linkedin: /^https?:\/\/(www\.)?linkedin\.com\/.+/,
        twitter: /^https?:\/\/(www\.)?twitter\.com\/.+/,
        pinterest: /^https?:\/\/(www\.)?pinterest\.com\/.+/,
        telegram: /^https?:\/\/(www\.)?t\.me\/.+/,
        facebook: /^https?:\/\/(www\.)?facebook\.com\/.+/,
      },
    },
    
    // Business Categories
    categories: [
      'Digital Marketing',
      'Technology',
      'Health & Wellness',
      'Fashion',
      'Food & Beverage',
      'Education',
      'Entertainment',
      'Finance',
      'Travel',
      'Real Estate',
      'Beauty & Cosmetics'
    ],
    
    // Collaboration Types
    collaborationTypes: [
      'Sponsored Content',
      'Product Review',
      'Brand Ambassador',
      'Long-term Partnership',
      'Event Coverage',
      'Content Creation',
      'Giveaway/Contest',
      'Affiliate Marketing',
      'Event Collaboration',
      'Other'
    ],
    
    // Budget Ranges
    budgetRanges: [
      { value: 'under-500', label: 'Under $500', min: 0, max: 499 },
      { value: '500-1000', label: '$500 - $1,000', min: 500, max: 1000 },
      { value: '1000-2500', label: '$1,000 - $2,500', min: 1000, max: 2500 },
      { value: '2500-5000', label: '$2,500 - $5,000', min: 2500, max: 5000 },
      { value: '5000-10000', label: '$5,000 - $10,000', min: 5000, max: 10000 },
      { value: 'over-10000', label: 'Over $10,000', min: 10000, max: null },
      { value: 'negotiable', label: 'Negotiable', min: null, max: null }
    ],
    
    // Company Sizes
    companySizes: [
      { value: '1-10', label: '1-10 employees' },
      { value: '11-50', label: '11-50 employees' },
      { value: '51-200', label: '51-200 employees' },
      { value: '201-500', label: '201-500 employees' },
      { value: '500+', label: '500+ employees' }
    ],
    
    // Theme Colors
    colors: {
      primary: '#9A9A4A',
      primaryHover: '#8A8A3A',
      secondary: '#CACA78',
      accent: '#F3F3E0',
      background: '#FFFFFF',
      backgroundAlt: '#F9FAFB',
      text: '#111827',
      textSecondary: '#6B7280',
      border: '#E5E7EB',
      success: '#10B981',
      warning: '#F59E0B',
      error: '#EF4444',
      info: '#3B82F6',
    },
    
    // Email Templates
    emailTemplates: {
      subjects: [
        'Partnership Inquiry - [Your Name/Brand]',
        'Collaboration Proposal for [Campaign/Project]',
        'Content Creator Partnership Request',
        'Brand Ambassador Application',
        'Custom Collaboration Opportunity'
      ],
      tips: [
        'Be specific about what type of collaboration you\'re proposing',
        'Include your audience demographics and engagement rates',
        'Mention previous brand collaborations or relevant experience',
        'Explain why you\'re interested in their specific brand',
        'Be professional but let your personality shine through'
      ],
    },
    
    // Analytics
    analytics: {
      enabled: process.env.NODE_ENV === 'production',
      trackingId: process.env.NEXT_PUBLIC_GA_TRACKING_ID,
      cookieConsent: true,
      anonymizeIP: true,
    },
    
    // Feature Flags
    features: {
      enableChat: false,
      enableNotifications: true,
      enableAnalytics: true,
      enableDarkMode: false,
      enableAdvancedFilters: true,
      enableSocialLogin: true,
      enableFileUpload: true,
      enableEmailVerification: false,
    },
    
    // API Configuration
    api: {
      timeout: 10000, // 10 seconds
      retries: 3,
      retryDelay: 1000,
      rateLimit: {
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100, // limit each IP to 100 requests per windowMs
      },
    },
    
    // SEO
    seo: {
      defaultTitle: 'Partnero - Business Partnership Platform',
      titleTemplate: '%s | Partnero',
      defaultDescription: 'Connect with businesses and creators for meaningful partnerships. Find collaboration opportunities that grow your brand.',
      defaultKeywords: 'business partnerships, collaboration, influencer marketing, brand partnerships',
      siteUrl: 'https://partnero.com',
      twitterHandle: '@partnero',
      locale: 'en_US',
    },
    
    // Contact Information
    contact: {
      supportEmail: 'support@partnero.com',
      businessEmail: 'hello@partnero.com',
      phone: '+1 (555) 123-4567',
      address: '123 Partnership St, Business City, BC 12345',
      socialMedia: {
        twitter: 'https://twitter.com/partnero',
        linkedin: 'https://linkedin.com/company/partnero',
        instagram: 'https://instagram.com/partnero',
        facebook: 'https://facebook.com/partnero',
      },
    },
  } as const
  
  // Environment-specific configurations
  export const getEnvConfig = () => {
    const env = process.env.NODE_ENV || 'development'
    
    const configs = {
      development: {
        debug: true,
        apiUrl: 'http://localhost:3000/api',
        features: {
          ...APP_CONFIG.features,
          enableChat: false,
          enableAnalytics: false,
        },
      },
      production: {
        debug: false,
        apiUrl: 'https://api.partnero.com',
        features: {
          ...APP_CONFIG.features,
          enableAnalytics: true,
        },
      },
      test: {
        debug: false,
        apiUrl: 'http://localhost:3001/api',
        features: {
          ...APP_CONFIG.features,
          enableAnalytics: false,
          enableEmailVerification: false,
        },
      },
    }
    
    return {
      ...APP_CONFIG,
      ...configs[env as keyof typeof configs],
    }
  }
  
  export default APP_CONFIG