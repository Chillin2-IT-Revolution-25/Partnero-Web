'use client'

import { useState, useEffect } from 'react'
import { X, User, Settings, LogOut, Camera, MapPin, Mail, Phone, Globe, Save, Edit3, Check } from 'lucide-react'
import Logo from '../assets/logo/Logo.svg'

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

interface ProfileModalProps {
  user: User
  onClose: () => void
  onLogout: () => void
}

export default function ProfileModal({ user, onClose, onLogout }: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'business' | 'settings'>('profile')
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)
  const [showSaveSuccess, setShowSaveSuccess] = useState(false)

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

  const handleSave = () => {
    // Here you would typically save to your backend
    console.log('Saving user data:', editedUser)
    setIsEditing(false)
    setShowSaveSuccess(true)
    setTimeout(() => setShowSaveSuccess(false), 3000)
  }

  const handleCancel = () => {
    setEditedUser(user)
    setIsEditing(false)
  }

  const handleInputChange = (field: string, value: string, isBusinessField = false) => {
    if (isBusinessField) {
      setEditedUser(prev => ({
        ...prev,
        business: {
          ...prev.business,
          [field]: value
        }
      }))
    } else {
      setEditedUser(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const getInitials = (name: string) => {
    return name.charAt(0).toUpperCase()
  }

  const menuItems = [
    { id: 'profile', label: 'Personal Info', icon: <User className="w-5 h-5" /> },
    { id: 'business', label: 'Business Profile', icon: <Settings className="w-5 h-5" /> },
    { id: 'settings', label: 'Account Settings', icon: <Settings className="w-5 h-5" /> }
  ]

  const categories = [
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

  return (
    <>
      {/* Add Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=K2D:wght@400;700;800&family=Lato:wght@400;700&display=swap');
      `}</style>

      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
        data-aos="fade"
        data-aos-duration="300"
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[800px] flex overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          data-aos="zoom-in"
          data-aos-duration="400"
        >
          {/* Left Sidebar */}
          <div className="w-80 bg-gray-50 border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img 
                  src={Logo.src}
                  alt="Partnero Logo"
                  className="w-8 h-8 rounded-lg object-cover" 
                />
                <span className="text-xl font-bold text-gray-900" style={{ fontFamily: 'K2D, sans-serif' }}>Partnero</span>
              </div>
            </div>

            {/* Menu Items */}
            <div className="flex-1 p-4">
              <nav className="space-y-2">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 ${
                      activeTab === item.id 
                        ? 'bg-[#CACA78] text-white border border-[#9A9A4A]' 
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span className="font-medium">{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Sign Out Button */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={onLogout}
                className="w-full flex items-center space-x-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </div>

          {/* Right Content */}
          <div className="flex-1 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                {activeTab === 'profile' && 'Personal Information'}
                {activeTab === 'business' && 'Business Profile'}
                {activeTab === 'settings' && 'Account Settings'}
              </h2>
              <div className="flex items-center space-x-3">
                {showSaveSuccess && (
                  <div className="flex items-center text-green-600 text-sm">
                    <Check className="w-4 h-4 mr-1" />
                    Saved successfully!
                  </div>
                )}
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 text-[#9A9A4A] hover:bg-[#CACA78]/10 rounded-lg transition-colors duration-200"
                  >
                    <Edit3 className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-[#9A9A4A] text-white rounded-lg hover:bg-[#8A8A3A] transition-colors duration-200 flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Save</span>
                    </button>
                  </div>
                )}
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              {/* Personal Info Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-8">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <div className="w-20 h-20 bg-[#CACA78] rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl">
                          {getInitials(editedUser.name)}
                        </span>
                      </div>
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 p-2 bg-[#9A9A4A] text-white rounded-full shadow-lg hover:bg-[#8A8A3A] transition-colors duration-200">
                          <Camera className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{editedUser.name}</h3>
                      <p className="text-gray-500 text-sm">Your profile displays the first letter of your name</p>
                      {isEditing && (
                        <button className="mt-2 text-[#9A9A4A] hover:text-[#8A8A3A] text-sm font-medium">
                          Change display name to update initial
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Personal Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedUser.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{editedUser.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                      {isEditing ? (
                        <input
                          type="email"
                          value={editedUser.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{editedUser.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      {isEditing ? (
                        <input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-500">+1 (555) 123-4567</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                      {isEditing ? (
                        <input
                          type="url"
                          placeholder="https://yourwebsite.com"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-500">https://yourwebsite.com</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                      {isEditing ? (
                        <input
                          type="date"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-500">January 15, 1990</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      {isEditing ? (
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent">
                          <option value="">Prefer not to say</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-500">Prefer not to say</p>
                      )}
                    </div>
                  </div>

                  {/* Bio Section */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent resize-none"
                        defaultValue="Passionate content creator and digital marketer with 5+ years of experience. I love connecting brands with their audiences through authentic storytelling."
                      />
                    ) : (
                      <p className="p-3 bg-gray-50 rounded-lg text-gray-900">
                        Passionate content creator and digital marketer with 5+ years of experience. I love connecting brands with their audiences through authentic storytelling.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Business Profile Tab */}
              {activeTab === 'business' && (
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedUser.business.name}
                          onChange={(e) => handleInputChange('name', e.target.value, true)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{editedUser.business.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      {isEditing ? (
                        <select
                          value={editedUser.business.category}
                          onChange={(e) => handleInputChange('category', e.target.value, true)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                        >
                          {categories.map(category => (
                            <option key={category} value={category}>{category}</option>
                          ))}
                        </select>
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{editedUser.business.category}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedUser.business.location}
                          onChange={(e) => handleInputChange('location', e.target.value, true)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{editedUser.business.location}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Description</label>
                      {isEditing ? (
                        <textarea
                          value={editedUser.business.description}
                          onChange={(e) => handleInputChange('description', e.target.value, true)}
                          rows={4}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent resize-none"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{editedUser.business.description}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company Size</label>
                      {isEditing ? (
                        <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent">
                          <option value="1-10">1-10 employees</option>
                          <option value="11-50">11-50 employees</option>
                          <option value="51-200">51-200 employees</option>
                          <option value="201-500">201-500 employees</option>
                          <option value="500+">500+ employees</option>
                        </select>
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-900">1-10 employees</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Founded Year</label>
                      {isEditing ? (
                        <input
                          type="number"
                          placeholder="2020"
                          min="1900"
                          max="2024"
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-900">2020</p>
                      )}
                    </div>
                  </div>

                  {/* Business Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Business Images</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-[#CACA78] transition-colors duration-200 cursor-pointer">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-2">Upload high-quality images of your business, products, or services</p>
                  </div>

                  {/* Social Media Links */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Social Media & Online Presence</label>
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Instagram</label>
                          {isEditing ? (
                            <input
                              type="url"
                              placeholder="https://instagram.com/yourbusiness"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                            />
                          ) : (
                            <p className="p-3 bg-gray-50 rounded-lg text-gray-500">@creativestudios</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">YouTube</label>
                          {isEditing ? (
                            <input
                              type="url"
                              placeholder="https://youtube.com/yourbusiness"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                            />
                          ) : (
                            <p className="p-3 bg-gray-50 rounded-lg text-gray-500">Creative Studios Channel</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">LinkedIn</label>
                          {isEditing ? (
                            <input
                              type="url"
                              placeholder="https://linkedin.com/company/yourbusiness"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                            />
                          ) : (
                            <p className="p-3 bg-gray-50 rounded-lg text-gray-500">Creative Studios LLC</p>
                          )}
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Website</label>
                          {isEditing ? (
                            <input
                              type="url"
                              placeholder="https://yourbusiness.com"
                              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#CACA78] focus:border-transparent"
                            />
                          ) : (
                            <p className="p-3 bg-gray-50 rounded-lg text-gray-500">creativestudios.com</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Visibility Settings */}
                  <div className="bg-[#CACA78]/10 border border-[#CACA78]/30 rounded-lg p-6">
                    <h3 className="font-medium text-[#8A8A3A] mb-4">Business Visibility Settings</h3>
                    <div className="space-y-3">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-[#9A9A4A] focus:ring-[#CACA78] mr-3" defaultChecked />
                        <span className="text-[#8A8A3A] text-sm">Show my business in public listings</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-[#9A9A4A] focus:ring-[#CACA78] mr-3" defaultChecked />
                        <span className="text-[#8A8A3A] text-sm">Allow direct contact from potential partners</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-[#9A9A4A] focus:ring-[#CACA78] mr-3" />
                        <span className="text-[#8A8A3A] text-sm">Featured business (premium option)</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Preferences</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-gray-700 font-medium">Email notifications for new messages</span>
                          <p className="text-sm text-gray-500">Get notified when someone sends you a message</p>
                        </div>
                        <input type="checkbox" className="rounded border-gray-300 text-[#9A9A4A] focus:ring-[#CACA78]" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-gray-700 font-medium">Email notifications for collaboration requests</span>
                          <p className="text-sm text-gray-500">Get notified about new partnership opportunities</p>
                        </div>
                        <input type="checkbox" className="rounded border-gray-300 text-[#9A9A4A] focus:ring-[#CACA78]" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-gray-700 font-medium">SMS notifications</span>
                          <p className="text-sm text-gray-500">Receive important updates via text message</p>
                        </div>
                        <input type="checkbox" className="rounded border-gray-300 text-[#9A9A4A] focus:ring-[#CACA78]" />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-gray-700 font-medium">Marketing emails</span>
                          <p className="text-sm text-gray-500">Receive tips, news, and platform updates</p>
                        </div>
                        <input type="checkbox" className="rounded border-gray-300 text-[#9A9A4A] focus:ring-[#CACA78]" defaultChecked />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-gray-700 font-medium">Show my profile in search results</span>
                          <p className="text-sm text-gray-500">Allow others to find your profile when searching</p>
                        </div>
                        <input type="checkbox" className="rounded border-gray-300 text-[#9A9A4A] focus:ring-[#CACA78]" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-gray-700 font-medium">Allow direct messages from other users</span>
                          <p className="text-sm text-gray-500">Let registered users contact you directly</p>
                        </div>
                        <input type="checkbox" className="rounded border-gray-300 text-[#9A9A4A] focus:ring-[#CACA78]" defaultChecked />
                      </label>
                      <label className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <span className="text-gray-700 font-medium">Public activity feed</span>
                          <p className="text-sm text-gray-500">Show your recent activity to other users</p>
                        </div>
                        <input type="checkbox" className="rounded border-gray-300 text-[#9A9A4A] focus:ring-[#CACA78]" />
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Security</h3>
                    <div className="space-y-4">
                      <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <span className="text-gray-700 font-medium">Change Password</span>
                        <p className="text-sm text-gray-500">Update your account password</p>
                      </button>
                      <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <span className="text-gray-700 font-medium">Two-Factor Authentication</span>
                        <p className="text-sm text-gray-500">Add an extra layer of security to your account</p>
                      </button>
                      <button className="w-full text-left p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                        <span className="text-gray-700 font-medium">Download My Data</span>
                        <p className="text-sm text-gray-500">Export all your account information</p>
                      </button>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-red-600 mb-4">Danger Zone</h3>
                    <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                      <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium">
                        Delete Account
                      </button>
                      <p className="text-red-600 text-sm mt-2">
                        This action cannot be undone. This will permanently delete your account and remove all your data.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};