import { ArrowRight } from 'lucide-react'
import HeroImg from "../assets/images/Hero_image.png"

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
      
      <section className="relative bg-white py-12 lg:py-16">
        <div className="max-w-[95%] mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-10">
              {/* Main Headline */}
                <h1 className="text-6xl md:text-7xl lg:text-9xl font-black" style={{ fontFamily: 'Kanit, sans-serif' }}>
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
                  className="bg-black text-white px-9 py-3 rounded-full font-medium text-lg hover:bg-gray-800 transition-colors duration-200"
                  style={{ fontFamily: 'Lato, sans-serif' }}
                >
                  GET STARTED
                </button>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative">
              <div className="rounded-[60px] overflow-hidden shadow-lg">
                <img
                  src={HeroImg.src}
                  alt="Business professionals shaking hands"
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>

          {/* Description Text */}
          <div className='mt-16'>
            <div className="flex flex-row">
              {/* Left Column */}
                <div className="h-full w-[40%]">
                  <p className="text-gray-700 leading-relaxed text-left mt-3" style={{ fontFamily: 'Lato, sans-serif', fontSize: '20px' }}>
                    Our website allows you to promote your business and
                    collaborate with other businesses that pursue common
                    goals. Search quickly and conveniently, and don't forget
                    to use our artificial intelligence — it will help you find the best partner for your
                    business. Location, cost, quality, time — it will analyze everything for you and
                    provide results. All you have to do is get in touch.
                  </p>
                </div>

              {/* Right Column */}
                <div className="h-full w-[60%]">
                  <h2 className="text-5xl md:text-6xl lg:text-7xl font-normal leading-tight text-right" style={{ fontFamily: 'K2D, sans-serif' }}>
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
        <div className="mt-26 relative">
          <div 
            className="absolute inset-7 bg-[#CACA78] blur-lg transform scale-105"
            style={{ borderRadius: '30px', height: '90%' }}
          ></div>
          <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-16 ">
            <div className="space-y-8 flex flex-col items-center">
              <hr className="w-[90%] mx-auto border-black opacity-30 border-t-2" />
              
              {/* Service for Service */}
              <div className="flex items-center justify-between w-[80%]">
                <div className="flex items-start space-x-24">
                  <span className="text-7xl font-black text-black -mt-4" style={{ fontFamily: 'Kanit, sans-serif' }}>1.</span>
                  <div>
                    <h3 className="text-4xl font-bold text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                      SERVICE FOR SERVICE
                    </h3>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-black text-lg" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Businesses exchange services—advertising for advertising, or other types of collaboration.
                  </p>
                </div>
              </div>

              <hr className="w-[90%] mx-auto border-black opacity-30 border-t-2" />

              {/* Service for Money */}
              <div className="flex items-center justify-between w-[80%]">
                <div className="flex items-start space-x-24">
                  <span className="text-7xl font-black text-black -mt-4" style={{ fontFamily: 'Kanit, sans-serif' }}>2.</span>
                  <div>
                    <h3 className="text-4xl font-bold text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                      SERVICE FOR MONEY
                    </h3>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-black text-lg" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Offer your services to other businesses for a fee.
                  </p>
                </div>
              </div>

              <hr className="w-[90%] mx-auto border-black opacity-30 border-t-2" />

              {/* Money for Service */}
              <div className="flex items-center justify-between w-[80%]">
                <div className="flex items-start space-x-24">
                  <span className="text-7xl font-black text-black -mt-4" style={{ fontFamily: 'Kanit, sans-serif' }}>3.</span>
                  <div>
                    <h3 className="text-4xl font-bold text-white" style={{ fontFamily: 'Kanit, sans-serif' }}>
                      MONEY FOR SERVICE
                    </h3>
                  </div>
                </div>
                <div className="text-center">
                  <p className="text-black text-lg" style={{ fontFamily: 'Lato, sans-serif' }}>
                    Pay other businesses for services and get effective promotion for your company.
                  </p>
                </div>
              </div>

              <hr className="w-[90%] mx-auto border-black opacity-30 border-t-2" />
            </div>
          </div>
        </div>

        {/* Bottom Call to Action */}
        <div className="bg-white pt-26 pb-22">
          <div className="max-w-[90%] mx-auto">
            <div className="text-center">
              <div className="flex justify-center items-center mb-10">
                <div className="text-center flex-1">
                  <h3 className="text-3xl font-extrabold text-black mb-2" style={{ fontFamily: 'K2D, sans-serif' }}>
                    REGISTER AN
                    <br />
                    ACCOUNT
                  </h3>
                </div>
                
                <div className="flex items-center px-8">
                  <svg className="w-48 h-8" fill="none" stroke="#CACA78" viewBox="0 0 96 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h86m-6-6l6 6-6 6" />
                  </svg>
                </div>
                
                <div className="text-center flex-1">
                  <h3 className="text-3xl font-extrabold text-black mb-2" style={{ fontFamily: 'K2D, sans-serif' }}>
                    ADD SOME INFORMATION
                    <br />
                    ABOUT YOUR BUSINESS
                  </h3>
                </div>
                
                <div className="flex items-center px-8">
                  <svg className="w-48 h-8" fill="none" stroke="#CACA78" viewBox="0 0 96 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12h86m-6-6l6 6-6 6" />
                  </svg>
                </div>
                
                <div className="text-center flex-1">
                  <h3 className="text-3xl font-extrabold text-black mb-2" style={{ fontFamily: 'K2D, sans-serif' }}>
                    FIND A PERFECT
                    <br />
                    COLLABORATOR!
                  </h3>
                </div>
              </div>
              
              <button
                onClick={handleGetStarted}
                className="bg-black text-white px-13 py-4 rounded-full font-medium text-xl hover:bg-gray-800 transition-colors duration-200"
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