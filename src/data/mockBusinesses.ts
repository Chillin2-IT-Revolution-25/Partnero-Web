// data/mockBusinesses.ts
export interface Business {
  id: string
  name: string
  description: string
  category: string
  location: string
  rating: number
  followers: string
  platforms: string[]
  image: string
  isTopRated: boolean
  isRecent: boolean
}

export const mockBusinesses: Business[] = [
  {
    id: '3',
    name: 'Wellness Collective',
    description: 'Health and wellness brand seeking fitness influencers and nutrition content creators. Our mission is to promote holistic wellness through natural products and lifestyle coaching.',
    category: 'Health & Wellness',
    location: 'Los Angeles, CA',
    rating: 4.7,
    followers: '32K',
    platforms: ['Instagram', 'TikTok', 'Telegram'],
    image: 'https://images.unsplash.com/photo-1554284126-aa88f22d8b74', // wellness
    isTopRated: false,
    isRecent: true
  },
  {
    id: '4',
    name: 'Fashion Forward',
    description: 'Sustainable fashion brand collaborating with style influencers and eco-conscious creators. We create trendy, environmentally responsible clothing for the modern consumer.',
    category: 'Fashion',
    location: 'Miami, FL',
    rating: 4.6,
    followers: '18K',
    platforms: ['Instagram', 'Pinterest'],
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c', // fashion
    isTopRated: false,
    isRecent: false
  },
  {
    id: '5',
    name: 'Gourmet Kitchen',
    description: 'Restaurant chain looking for food bloggers and cooking content creators for partnerships. We offer authentic, locally-sourced cuisine with a focus on sustainability and flavor.',
    category: 'Food & Beverage',
    location: 'Chicago, IL',
    rating: 4.5,
    followers: '12K',
    platforms: ['Instagram', 'YouTube'],
    image: 'https://images.unsplash.com/photo-1551218808-94e220e084d2', // food
    isTopRated: false,
    isRecent: true
  },
  {
    id: '6',
    name: 'EcoTech Innovations',
    description: 'Sustainable technology company seeking environmentally conscious creators and tech reviewers. We develop eco-friendly solutions for modern technology challenges.',
    category: 'Technology',
    location: 'Portland, OR',
    rating: 4.7,
    followers: '20K',
    platforms: ['YouTube', 'LinkedIn', 'Instagram'],
    image: 'https://images.unsplash.com/photo-1542751110-97427bbecf20', // eco tech
    isTopRated: false,
    isRecent: false
  },
  {
    id: '7',
    name: 'Artisan Coffee Co.',
    description: 'Specialty coffee roaster and café chain seeking food and lifestyle content creators. We source ethically-grown beans and create unique coffee experiences for our community.',
    category: 'Food & Beverage',
    location: 'Seattle, WA',
    rating: 4.6,
    followers: '14K',
    platforms: ['Instagram', 'Pinterest', 'TikTok'],
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085', // coffee
    isTopRated: false,
    isRecent: true
  },
  {
    id: '8',
    name: 'Luxury Travel Agency',
    description: 'Premium travel service specializing in curated experiences and luxury destinations. Seeking travel influencers and lifestyle content creators for exclusive partnerships.',
    category: 'Travel',
    location: 'Las Vegas, NV',
    rating: 4.9,
    followers: '35K',
    platforms: ['Instagram', 'YouTube', 'Pinterest'],
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e', // travel
    isTopRated: true,
    isRecent: true
  }
]

export const getBusinessById = (id: string): Business | undefined => {
  return mockBusinesses.find(business => business.id === id)
}

export const getTopRatedBusinesses = (limit: number = 5): Business[] => {
  return mockBusinesses.filter(b => b.isTopRated).slice(0, limit)
}

export const getRecentBusinesses = (limit: number = 5): Business[] => {
  return mockBusinesses.filter(b => b.isRecent).slice(0, limit)
}

export const getBusinessesByCategory = (category: string): Business[] => {
  if (!category) return mockBusinesses
  return mockBusinesses.filter(b => b.category === category)
}

export const searchBusinesses = (searchTerm: string): Business[] => {
  if (!searchTerm) return mockBusinesses

  const term = searchTerm.toLowerCase()
  return mockBusinesses.filter(business =>
    business.name.toLowerCase().includes(term) ||
    business.description.toLowerCase().includes(term) ||
    business.category.toLowerCase().includes(term) ||
    business.location.toLowerCase().includes(term)
  )
}
