// src/components/Navbar.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, usePathname } from 'next/navigation'
import { Menu, X, Settings, LogOut, ChevronDown } from 'lucide-react'
import Logo from '../assets/logo/Logo.svg'

interface User {
  firstName: string
  lastName: string
  name: string
  email: string
  avatar: string
  userId: string
  accessToken: string
  business: {
    name: string
    description: string
    location: string
    category: string
  }
}

interface NavbarProps {
  isLoggedIn: boolean
  user: User | null
  onProfileClick: () => void
  onLogout: () => void
  onBrowseClick?: () => void
}

export default function Navbar({ isLoggedIn, user, onProfileClick, onLogout, onBrowseClick }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const pathname = usePathname()

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Browse', href: '/browse' },
    { name: 'FAQ', href: '/faq' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  const router = useRouter()
  
  const handleLoginClick = () => {
    router.push('/auth/signin')
  }
  
  const handleSignUpClick = () => {
    router.push('/auth/signup')
  }

  // Updated function to get user initials
  const getInitials = (user: User) => {
    if (user.firstName && user.lastName) {
      return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`.toUpperCase()
    } else if (user.name) {
      return user.name.charAt(0).toUpperCase()
    }
    return 'U'
  }

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="mx-auto px-8 sm:px-12 lg:px-20">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <Link href="/" className="flex items-center space-x-3">
            <img 
              src={Logo.src} 
              alt="Partnero Logo"
              className="w-9 h-9 rounded-lg object-cover" 
            />
            <h1 className="text-2xl font-bold text-gray-900 hidden sm:block" style={{ fontFamily: 'K2D, sans-serif' }}>Partnero</h1>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors duration-200 font-medium ${
                  isActive(link.href)
                    ? 'text-[#9A9A4A] border-b-2 border-[#9A9A4A] pb-1'
                    : 'text-gray-600 hover:text-gray-900'
                }`} style={{ fontFamily: 'Lato, sans-serif' }}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Authentication Section */}
          <div className="flex items-center space-x-4">
            {!isLoggedIn ? (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleLoginClick}
                  className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={handleSignUpClick}
                  className="bg-[#9A9A4A] text-white px-4 py-2 rounded-lg hover:bg-[#8A8A3A] transition-colors duration-200 font-medium cursor-pointer"
                >
                  Sign Up
                </button>
              </div>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
                >
                  {/* User Initial Avatar */}
                  <div className="w-8 h-8 bg-[#CACA78] rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {user ? getInitials(user) : 'U'}
                    </span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-500" />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName && user?.lastName 
                          ? `${user.firstName} ${user.lastName}` 
                          : user?.name || 'User'
                        }
                      </p>
                      <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
                    </div>
                    <button
                      onClick={() => {
                        onProfileClick()
                        setIsProfileDropdownOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Settings className="w-4 h-4 mr-3" />
                      Profile Settings
                    </button>
                    <button
                      onClick={() => {
                        onLogout()
                        setIsProfileDropdownOpen(false)
                      }}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-gray-600" />
              ) : (
                <Menu className="w-6 h-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`py-2 font-medium transition-colors duration-200 ${
                    isActive(link.href) ? 'text-[#9A9A4A]' : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}