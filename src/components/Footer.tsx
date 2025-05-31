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
      
      <footer className="py-4" style={{ backgroundColor: '#CACA78' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Left side - Links */}
            <div className="flex items-center space-x-8">
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
            <div className="flex items-center space-x-4">
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