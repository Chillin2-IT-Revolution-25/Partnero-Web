import { Facebook, Instagram, Github } from 'lucide-react'

export default function Footer() {
  const handleLinkClick = (link: string) => {
    console.log(`Navigate to ${link}`)
  }

  const handleSocialClick = (platform: string) => {
    console.log(`Open ${platform}`)
  }

  return (
    <>
      {/* Add Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;500;600&display=swap');
      `}</style>
      
      <footer className="py-4 sm:py-6" style={{ backgroundColor: '#CACA78' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Mobile Layout (stacked) */}
          <div className="block sm:hidden">
            <div className="flex flex-col items-center space-y-4">
              {/* Social Icons - Top on mobile */}
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleSocialClick('facebook')}
                  className="text-black hover:text-gray-700 transition-colors duration-200 p-2"
                  aria-label="Facebook"
                >
                  <Facebook className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleSocialClick('instagram')}
                  className="text-black hover:text-gray-700 transition-colors duration-200 p-2"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </button>
                <button
                  onClick={() => handleSocialClick('github')}
                  className="text-black hover:text-gray-700 transition-colors duration-200 p-2"
                  aria-label="GitHub"
                >
                  <Github className="w-6 h-6" />
                </button>
              </div>

              {/* Links - Middle on mobile */}
              <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
                <button
                  onClick={() => handleLinkClick('terms')}
                  className="text-black hover:text-gray-700 transition-colors duration-200 text-sm font-medium py-1"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  Terms Of Service
                </button>
                <button
                  onClick={() => handleLinkClick('privacy')}
                  className="text-black hover:text-gray-700 transition-colors duration-200 text-sm font-medium py-1"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  Privacy Policy
                </button>
              </div>

              {/* Copyright - Bottom on mobile */}
              <div className="text-center">
                <p className="text-black text-xs" style={{ fontFamily: 'Lato, sans-serif' }}>
                  © 2025 Partnero. All Rights Reserved
                </p>
              </div>
            </div>
          </div>

          {/* Desktop/Tablet Layout (horizontal) */}
          <div className="hidden sm:flex justify-between items-center">
            {/* Left side - Links */}
            <div className="flex items-center space-x-6 lg:space-x-8">
              <button
                onClick={() => handleLinkClick('terms')}
                className="text-black hover:text-gray-700 transition-colors duration-200 text-sm"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                Terms Of Service
              </button>
              <button
                onClick={() => handleLinkClick('privacy')}
                className="text-black hover:text-gray-700 transition-colors duration-200 text-sm"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                Privacy Policy
              </button>
            </div>

            {/* Center - Copyright */}
            <div className="text-center">
              <p className="text-black text-sm" style={{ fontFamily: 'Lato, sans-serif' }}>
                © 2025 Partnero. All Rights Reserved
              </p>
            </div>

            {/* Right side - Social Icons */}
            <div className="flex items-center space-x-3 lg:space-x-4">
              <button
                onClick={() => handleSocialClick('facebook')}
                className="text-black hover:text-gray-700 transition-colors duration-200 p-1"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSocialClick('instagram')}
                className="text-black hover:text-gray-700 transition-colors duration-200 p-1"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSocialClick('github')}
                className="text-black hover:text-gray-700 transition-colors duration-200 p-1"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}