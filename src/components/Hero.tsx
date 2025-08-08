import React from 'react'
import { ArrowRight, Play, Shield, Zap, Globe } from 'lucide-react'

const Hero = () => {
  const scrollToDemo = () => {
    const demoSection = document.querySelector('#demo-video')
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-sm font-medium text-gray-700">
                <Zap className="h-4 w-4 mr-2 text-blue-500" />
                Next-Gen Blockchain Technology
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                The Future of
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Blockchain</span>
                <br />is Here
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience lightning-fast transactions, unparalleled security, and seamless integration with our revolutionary blockchain platform. Built for the next generation of decentralized applications.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-xl flex items-center justify-center">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={scrollToDemo}
                className="group px-8 py-4 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-gray-700 font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg flex items-center justify-center"
              >
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">1M+</div>
                <div className="text-sm text-gray-600">Transactions</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-800">50+</div>
                <div className="text-sm text-gray-600">Countries</div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Blockchain Technology"
                className="rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-4 -left-4 p-4 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
              <Shield className="h-8 w-8 text-green-500 mb-2" />
              <div className="text-sm font-semibold text-gray-800">Secure</div>
              <div className="text-xs text-gray-600">256-bit encryption</div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 p-4 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
              <Globe className="h-8 w-8 text-blue-500 mb-2" />
              <div className="text-sm font-semibold text-gray-800">Global</div>
              <div className="text-xs text-gray-600">Worldwide access</div>
            </div>
            
            <div className="absolute top-1/2 -right-8 p-4 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
              <Zap className="h-8 w-8 text-yellow-500 mb-2" />
              <div className="text-sm font-semibold text-gray-800">Fast</div>
              <div className="text-xs text-gray-600">{'<'} 1s transactions</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
