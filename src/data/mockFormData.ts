// data/mockFormData.ts

export const categories = [
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
  ]
  
  export const locations = [
    'All Locations',
    'New York, NY',
    'Los Angeles, CA',
    'San Francisco, CA',
    'Chicago, IL',
    'Miami, FL',
    'Austin, TX',
    'Seattle, WA',
    'Boston, MA',
    'Denver, CO',
    'Atlanta, GA',
    'Portland, OR',
    'Las Vegas, NV'
  ]
  
  export interface Platform {
    name: string
    value: string
    icon?: React.ReactElement
  }
  
  export const platforms: Platform[] = [
    { name: 'All Platforms', value: '' },
    { name: 'Instagram', value: 'Instagram' },
    { name: 'YouTube', value: 'YouTube' },
    { name: 'TikTok', value: 'TikTok' },
    { name: 'Telegram', value: 'Telegram' },
    { name: 'LinkedIn', value: 'LinkedIn' },
    { name: 'Pinterest', value: 'Pinterest' }
  ]
  
  export const collaborationTypes = [
    'Sponsored Content',
    'Product Review',
    'Brand Ambassador',
    'Long-term Partnership',
    'Event Coverage',
    'Content Creation',
    'Other'
  ]
  
  export const subjectTemplates = [
    'Partnership Inquiry - [Your Name/Brand]',
    'Collaboration Proposal for [Campaign/Project]',
    'Content Creator Partnership Request',
    'Brand Ambassador Application',
    'Custom Collaboration Opportunity'
  ]
  
  export const budgetRanges = [
    { value: '', label: 'Select budget range' },
    { value: 'under-500', label: 'Under $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000-2500', label: '$1,000 - $2,500' },
    { value: '2500-5000', label: '$2,500 - $5,000' },
    { value: '5000-10000', label: '$5,000 - $10,000' },
    { value: 'over-10000', label: 'Over $10,000' },
    { value: 'negotiable', label: 'Negotiable' }
  ]
  
  export const partnershipTips = [
    'Be specific about what type of collaboration you\'re proposing',
    'Include your audience demographics and engagement rates',
    'Mention previous brand collaborations or relevant experience',
    'Explain why you\'re interested in their specific brand',
    'Be professional but let your personality shine through'
  ]
  
  export const companySizes = [
    { value: '1-10', label: '1-10 employees' },
    { value: '11-50', label: '11-50 employees' },
    { value: '51-200', label: '51-200 employees' },
    { value: '201-500', label: '201-500 employees' },
    { value: '500+', label: '500+ employees' }
  ]
  
  export const additionalCollaborationTypes = [
    'Sponsorship',
    'Product Review',
    'Content Creation',
    'Brand Ambassador',
    'Event Collaboration',
    'Affiliate Marketing',
    'Giveaway/Contest'
  ]