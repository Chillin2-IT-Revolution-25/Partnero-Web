import { ArrowRight } from 'lucide-react'
import HeroImg from "../assets/images/Hero_image.png"
import PartnersImg from "../assets/images/Partners.png"

interface HeroSectionProps {
  onBrowseClick?: () => void
}

export default function HeroSection({ onBrowseClick }: HeroSectionProps) {
  const handleGetStarted = () => {
    if (onBrowseClick) {
      onBrowseClick()
    }
  }

  return (
    <>
      {/* Add Google Fonts */}
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=K2D:wght@400;700;800&family=Lato:wght@400;700&family=Kanit:wght@400;500;600;700&display=swap');
      `}</style>
      
      <section className="relative bg-white py-8 sm:py-12 lg:py-16 overflow-hidden w-full">
        {/* Background Image */}
        <div className="absolute flex items-start justify-center pointer-events-none select-none mt-[26%] w-full">
          <img 
            src={PartnersImg.src}
            alt="Partners Background"
            className="opacity-100 object-contain w-full h-full"
            style={{ 
              zIndex: 1,
              // maxWidth: 'min(90vw, 800px)',
              maxHeight: 'min(50vh, 400px)',
              transform: 'translateY(-10%)'
            }}
          />
        </div>

        <div className="max-w-[95%] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6 sm:space-y-8 lg:space-y-10 text-center lg:text-left">
              {/* Main Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-9xl font-black leading-none" style={{ fontFamily: 'Kanit, sans-serif' }}>
                  <span className="text-black">SEARCH FOR</span>
                  <br />
                  <span className="text-black">COLLAB.</span>
                  <br />
                  <span style={{ color: '#CACA78' }}>PROMOTE</span>
                  <br />
                  <span className="text-black">YOURSELF.</span>
                </h1>

              {/* Get Started Button */}
              <div>
                <button
                  onClick={handleGetStarted}
                  className="bg-black text-white px-6 sm:px-8 lg:px-9 py-4 sm:py-4 lg:py-5 rounded-full font-medium text-base sm:text-lg hover:bg-gray-800 transition-colors duration-200"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  GET STARTED
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative order-first lg:order-last">
              <div className="rounded-[30px] sm:rounded-[40px] lg:rounded-[60px] overflow-hidden shadow-lg">
                <img
                  src={HeroImg.src}
                  alt="Business professionals shaking hands"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Description Text */}
          <div className='mt-10 sm:mt-14 lg:mt-18'>
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-0">
              {/* Left Column */}
                <div className="w-full lg:w-[40%] order-2 lg:order-1">
                  <p className="text-gray-700 leading-relaxed text-center lg:text-left text-base sm:text-lg lg:text-xl mt-0 lg:mt-3" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Our website allows you to promote your business and
                    collaborate with other businesses that pursue common
                    goals. Search quickly and conveniently, and don't forget
                    to use our artificial intelligence — it will help you find the best partner for your
                    business. Location, cost, quality, time — it will analyze everything for you and
                    provide results. All you have to do is get in touch.
                  </p>
                </div>

              {/* Right Column */}
                <div className="w-full lg:w-[60%] order-1 lg:order-2">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-normal leading-tight text-center lg:text-right" style={{ fontFamily: 'K2D, sans-serif' }}>
                    <span className="text-black">CHOOSE YOUR PARTNER</span> <br />
                    <span style={{ color: '#CACA78' }}>OR</span>
                    <br />
                    <span className="text-black">BE CHOSEN</span>
                  </h2>
                </div>
            </div>
          </div>
        </div>

        {/* Services Section with Olive Background */}
        <div className="mt-16 sm:mt-20 lg:mt-26 relative">
          <div 
            className="absolute inset-4 sm:inset-6 lg:inset-7 bg-[#CACA78] blur-lg transform scale-105"
            style={{ borderRadius: '20px', height: '90%' }}
          ></div>
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="space-y-6 sm:space-y-8 flex flex-col items-center">
              <hr className="w-[90%] mx-auto border-black opacity-30 border-t-2" />
              
              {/* Service for Service */}
              <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-[80%] gap-4 lg:gap-0">
                <div className="flex flex-col sm:flex-row items-center lg:items-start space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-24 text-center lg:text-left">
                  <span className="text-4xl sm:text-5xl lg:text-7xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>1.</span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                      SERVICE FOR SERVICE
                    </h3>
                  </div>
                </div>
                <div className="text-center lg:text-left lg:max-w-md">
                  <p className="text-black text-sm sm:text-base lg:text-lg" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Businesses exchange services—advertising for advertising, or other types of collaboration.
                  </p>
                </div>
              </div>

              <hr className="w-[90%] mx-auto border-black opacity-30 border-t-2" />

              {/* Service for Money */}
              <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-[80%] gap-4 lg:gap-0">
                <div className="flex flex-col sm:flex-row items-center lg:items-start space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-24 text-center lg:text-left">
                  <span className="text-4xl sm:text-5xl lg:text-7xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>2.</span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                      SERVICE FOR MONEY
                    </h3>
                  </div>
                </div>
                <div className="text-center lg:text-left lg:max-w-md">
                  <p className="text-black text-sm sm:text-base lg:text-lg" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Offer your services to other businesses for a fee.
                  </p>
                </div>
              </div>

              <hr className="w-[90%] mx-auto border-black opacity-30 border-t-2" />

              {/* Money for Service */}
              <div className="flex flex-col lg:flex-row items-center justify-between w-full lg:w-[80%] gap-4 lg:gap-0">
                <div className="flex flex-col sm:flex-row items-center lg:items-start space-y-4 sm:space-y-0 sm:space-x-8 lg:space-x-24 text-center lg:text-left">
                  <span className="text-4xl sm:text-5xl lg:text-7xl font-black text-black" style={{ fontFamily: 'Kanit, sans-serif' }}>3.</span>
                  <div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                      MONEY FOR SERVICE
                    </h3>
                  </div>
                </div>
                <div className="text-center lg:text-left lg:max-w-md">
                  <p className="text-black text-sm sm:text-base lg:text-lg" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Pay other businesses for services and get effective promotion for your company.
                  </p>
                </div>
              </div>

              <hr className="w-[90%] mx-auto border-black opacity-30 border-t-2" />
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="bg-white pt-12 sm:pt-16 lg:pt-26 pb-12 sm:pb-16 lg:pb-22">
          <div className="max-w-[90%] mx-auto px-4">
            <div className="text-center">
              {/* Desktop/Tablet Layout (md and up) */}
              <div className="hidden md:flex justify-center items-center mb-8 lg:mb-10">
                <div className="text-center flex-1">
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-black mb-2" style={{ fontFamily: 'K2D, sans-serif' }}>
                    REGISTER AN
                    <br />
                    ACCOUNT
                  </h3>
                </div>
                
                <div className="flex items-center px-4 lg:px-8">
                  <svg className="w-24 lg:w-48 h-6 lg:h-8" fill="none" stroke="#CACA78" viewBox="0 0 96 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h86m-6-6l6 6-6 6" />
                  </svg>
                </div>
                
                <div className="text-center flex-1">
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-black mb-2" style={{ fontFamily: 'K2D, sans-serif' }}>
                    ADD SOME INFORMATION
                    <br />
                    ABOUT YOUR BUSINESS
                  </h3>
                </div>
                
                <div className="flex items-center px-4 lg:px-8">
                  <svg className="w-24 lg:w-48 h-6 lg:h-8" fill="none" stroke="#CACA78" viewBox="0 0 96 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h86m-6-6l6 6-6 6" />
                  </svg>
                </div>
                
                <div className="text-center flex-1">
                  <h3 className="text-2xl lg:text-3xl font-extrabold text-black mb-2" style={{ fontFamily: 'K2D, sans-serif' }}>
                    FIND A PERFECT
                    <br />
                    COLLABORATOR!
                  </h3>
                </div>
              </div>

              {/* Mobile Layout (sm and below) */}
              <div className="md:hidden space-y-6 mb-8">
                <div className="text-center">
                  <h3 className="text-xl font-extrabold text-black mb-2" style={{ fontFamily: 'K2D, sans-serif' }}>
                    REGISTER AN ACCOUNT
                  </h3>
                </div>
                
                <div className="flex justify-center">
                  <svg className="w-16 h-6" fill="none" stroke="#CACA78" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-extrabold text-black mb-2" style={{ fontFamily: 'K2D, sans-serif' }}>
                    ADD INFORMATION ABOUT YOUR BUSINESS
                  </h3>
                </div>
                
                <div className="flex justify-center">
                  <svg className="w-16 h-6" fill="none" stroke="#CACA78" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                
                <div className="text-center">
                  <h3 className="text-xl font-extrabold text-black mb-2" style={{ fontFamily: 'K2D, sans-serif' }}>
                    FIND A PERFECT COLLABORATOR!
                  </h3>
                </div>
              </div>
              
              <button
                onClick={handleGetStarted}
                className="bg-black text-white px-8 sm:px-10 lg:px-13 py-3 sm:py-4 rounded-full font-medium text-lg sm:text-xl hover:bg-gray-800 transition-colors duration-200"
                style={{ fontFamily: 'Lato, sans-serif' }}
              >
                LET'S GO!
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}