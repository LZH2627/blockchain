import React from 'react'
import { ArrowRight, Shield, Zap, Globe, Users, TrendingUp, Award } from 'lucide-react'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-sm font-medium text-gray-700">
                <Zap className="h-4 w-4 mr-2 text-blue-500" />
                Next-Gen Blockchain Technology
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Why Choose
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> CryptoBolt</span>?
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Experience the future of cryptocurrency trading with our cutting-edge platform
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-xl flex items-center justify-center">
                Get Started Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="group px-8 py-4 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-gray-700 font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg flex items-center justify-center">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group p-8 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Bank-Level Security</h3>
              <p className="text-gray-600 leading-relaxed">Advanced encryption and multi-layer security protocols protect your digital assets with military-grade protection.</p>
            </div>

            <div className="group p-8 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">Execute trades in milliseconds with our optimized infrastructure and advanced trading algorithms.</p>
            </div>

            <div className="group p-8 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Global Access</h3>
              <p className="text-gray-600 leading-relaxed">Trade cryptocurrencies 24/7 from anywhere in the world with our globally distributed network.</p>
            </div>

            <div className="group p-8 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Trusted Community</h3>
              <p className="text-gray-600 leading-relaxed">Join millions of traders who trust CryptoBolt for their cryptocurrency investment needs.</p>
            </div>

            <div className="group p-8 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Advanced Analytics</h3>
              <p className="text-gray-600 leading-relaxed">Make informed decisions with our comprehensive market analysis and real-time trading insights.</p>
            </div>

            <div className="group p-8 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-105">
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <Award className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Award Winning</h3>
              <p className="text-gray-600 leading-relaxed">Recognized as the leading cryptocurrency platform with multiple industry awards and certifications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Trusted Worldwide
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Join the growing ecosystem of traders and investors building wealth with CryptoBolt
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">5M+</div>
              <div className="text-lg font-semibold text-blue-100 mb-2">Active Users</div>
              <div className="text-sm text-blue-200">Growing daily</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">$100B+</div>
              <div className="text-lg font-semibold text-blue-100 mb-2">Trading Volume</div>
              <div className="text-sm text-blue-200">Processed securely</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">99.99%</div>
              <div className="text-lg font-semibold text-blue-100 mb-2">Uptime</div>
              <div className="text-sm text-blue-200">Reliable platform</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2">200+</div>
              <div className="text-lg font-semibold text-blue-100 mb-2">Countries</div>
              <div className="text-sm text-blue-200">Global reach</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join CryptoBolt today and experience the future of cryptocurrency trading with our advanced platform and tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-xl flex items-center justify-center">
              Create Account
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="group px-8 py-4 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-gray-700 font-semibold hover:bg-white/30 transition-all duration-300 shadow-lg flex items-center justify-center">
              View Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
