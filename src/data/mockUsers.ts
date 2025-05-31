// data/mockUsers.ts

export interface User {
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
  
  export const demoCredentials = {
    email: 'demo@partnero.com',
    password: 'password'
  }
  
  export const mockDemoUser: User = {
    name: 'John Doe',
    email: 'demo@partnero.com',
    avatar: '/api/placeholder/40/40',
    business: {
      name: 'Creative Solutions',
      description: 'Digital marketing and content creation services',
      location: 'New York, NY',
      category: 'Digital Marketing'
    }
  }
  
  export const mockUsers: User[] = [
    {
      name: 'John Doe',
      email: 'demo@partnero.com',
      avatar: '/api/placeholder/40/40',
      business: {
        name: 'Creative Solutions',
        description: 'Digital marketing and content creation services',
        location: 'New York, NY',
        category: 'Digital Marketing'
      }
    },
    {
      name: 'Sarah Johnson',
      email: 'sarah@techflow.com',
      avatar: '/api/placeholder/40/40',
      business: {
        name: 'TechFlow Solutions',
        description: 'Software development and AI solutions',
        location: 'San Francisco, CA',
        category: 'Technology'
      }
    },
    {
      name: 'Mike Chen',
      email: 'mike@wellness.com',
      avatar: '/api/placeholder/40/40',
      business: {
        name: 'Wellness Collective',
        description: 'Health and wellness brand',
        location: 'Los Angeles, CA',
        category: 'Health & Wellness'
      }
    }
  ]
  
  export const getUserByEmail = (email: string): User | undefined => {
    return mockUsers.find(user => user.email === email)
  }
  
  export const validateCredentials = (email: string, password: string): User | null => {
    if (email === demoCredentials.email && password === demoCredentials.password) {
      return mockDemoUser
    }
    return null
  }