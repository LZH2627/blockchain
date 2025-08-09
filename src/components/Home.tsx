import React from 'react'
import { Link } from 'react-router-dom'
import { Shield, TrendingUp, Zap, Users, ArrowRight, Star, CheckCircle } from 'lucide-react'

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-primary via-cryptobolt-600 to-cryptobolt-700 bg-clip-text text-transparent">
              Your Crypto
            </span>
            <br />
            <span className="text-gray-900">Journey Starts Here</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Trade, invest, and manage your cryptocurrency portfolio with confidence. 
            Join thousands of users who trust CryptoBolt for their digital asset needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/signin"
              className="px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold text-lg hover:from-primary-dark hover:to-cryptobolt-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Free
            </Link>
            <a
              href="#features"
              className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold text-lg hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2"
            >
              Learn More <ArrowRight className="h-5 w-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose CryptoBolt?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of cryptocurrency trading with our cutting-edge platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary-dark rounded-xl flex items-center justify-center mb-6">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Bank-Level Security</h3>
              <p className="text-gray-600 leading-relaxed">
                Your assets are protected with military-grade encryption and multi-layer security protocols.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-cryptobolt-500 to-cryptobolt-600 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Advanced Trading</h3>
              <p className="text-gray-600 leading-relaxed">
                Professional trading tools with real-time charts, technical indicators, and market analysis.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-light to-primary rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Lightning Fast</h3>
              <p className="text-gray-600 leading-relaxed">
                Execute trades in milliseconds with our high-performance trading engine and global infrastructure.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-cryptobolt-600 to-cryptobolt-700 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">24/7 Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Get help whenever you need it with our dedicated customer support team available around the clock.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-primary to-cryptobolt-600 rounded-xl flex items-center justify-center mb-6">
                <Star className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Premium Features</h3>
              <p className="text-gray-600 leading-relaxed">
                Access exclusive features, advanced analytics, and priority customer support with our premium plans.
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-r from-cryptobolt-700 to-primary-dark rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Trusted Platform</h3>
              <p className="text-gray-600 leading-relaxed">
                Join over 1 million users who trust CryptoBolt for their cryptocurrency trading and investment needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Ready to Start Trading?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join CryptoBolt today and take control of your financial future
          </p>
          <Link
            to="/signin"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold text-lg hover:from-primary-dark hover:to-cryptobolt-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Create Free Account <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
