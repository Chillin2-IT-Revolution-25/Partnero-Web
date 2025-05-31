// File path: src/components/ProfileModal.tsx

'use client'

import { useState } from 'react'
import { X, User, Settings, LogOut, Camera, MapPin, Mail, Phone, Globe, Save, Edit3, Check } from 'lucide-react'

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
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Modal */}
        <div 
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[600px] flex overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left Sidebar */}
          <div className="w-64 bg-gray-50 border-r border-gray-200 flex flex-col">
            {/* Logo */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CC</span>
                </div>
                <span className="font-semibold text-gray-900">CollabConnect</span>
              </div>
            </div>

            {/* User Info */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                  <p className="text-gray-500 text-xs">{user.email}</p>
                </div>
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
                        ? 'bg-blue-100 text-blue-700 border border-blue-200' 
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
                    className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
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
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
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
                <div className="space-y-6">
                  {/* Avatar Section */}
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <img 
                        src={editedUser.avatar} 
                        alt={editedUser.name}
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 p-2 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors duration-200">
                          <Camera className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">Profile Picture</h3>
                      <p className="text-gray-500 text-sm">Choose a photo that represents you well</p>
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-500">https://yourwebsite.com</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Business Profile Tab */}
              {activeTab === 'business' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editedUser.business.name}
                          onChange={(e) => handleInputChange('name', e.target.value, true)}
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                      ) : (
                        <p className="p-3 bg-gray-50 rounded-lg text-gray-900">{editedUser.business.description}</p>
                      )}
                    </div>
                  </div>

                  {/* Business Images */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Business Images</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 hover:border-blue-500 transition-colors duration-200 cursor-pointer">
                          <Camera className="w-8 h-8 text-gray-400" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visibility Settings */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-900 mb-2">Visibility Settings</h3>
                    <label className="flex items-center">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3" />
                      <span className="text-blue-800 text-sm">Hide my business from public listings (Do not show me button)</span>
                    </label>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Preferences</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3" defaultChecked />
                        <span className="text-gray-700">Email notifications for new messages</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3" defaultChecked />
                        <span className="text-gray-700">Email notifications for collaboration requests</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3" />
                        <span className="text-gray-700">SMS notifications</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Privacy Settings</h3>
                    <div className="space-y-4">
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3" defaultChecked />
                        <span className="text-gray-700">Show my profile in search results</span>
                      </label>
                      <label className="flex items-center">
                        <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3" defaultChecked />
                        <span className="text-gray-700">Allow direct messages from other users</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <button className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors duration-200">
                      Delete Account
                    </button>
                    <p className="text-gray-500 text-sm mt-2">This action cannot be undone.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}