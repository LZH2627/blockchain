import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Shield, TrendingUp, Zap, Users, ArrowRight, Star, CheckCircle, Sparkles, Globe, Award } from 'lucide-react'

export const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    setIsVisible(true)
    
    // Auto-rotate featured highlights
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Shield,
      title: "Bank-Level Security",
      description: "Your assets are protected with military-grade encryption and multi-layer security protocols.",
      gradient: "from-primary to-primary-dark"
    },
    {
      icon: TrendingUp,
      title: "Advanced Trading",
      description: "Professional trading tools with real-time charts, technical indicators, and market analysis.",
      gradient: "from-cryptobolt-500 to-cryptobolt-600"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Execute trades in milliseconds with our high-performance trading engine and global infrastructure.",
      gradient: "from-primary-light to-primary"
    },
    {
      icon: Users,
      title: "24/7 Support",
      description: "Get help whenever you need it with our dedicated customer support team available around the clock.",
      gradient: "from-cryptobolt-600 to-cryptobolt-700"
    },
    {
      icon: Star,
      title: "Premium Features",
      description: "Access exclusive features, advanced analytics, and priority customer support with our premium plans.",
      gradient: "from-primary to-cryptobolt-600"
    },
    {
      icon: CheckCircle,
      title: "Trusted Platform",
      description: "Join over 1 million users who trust CryptoBolt for their cryptocurrency trading and investment needs.",
      gradient: "from-cryptobolt-700 to-primary-dark"
    }
  ]

  const highlights = [
    { icon: Globe, text: "Global Reach", value: "50+ Countries" },
    { icon: Award, text: "Industry Leader", value: "5 Years Strong" },
    { icon: Sparkles, text: "Innovation", value: "AI-Powered" }
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-cryptobolt-400/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-primary-light/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto text-center">
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}>
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-cryptobolt-600 rounded-2xl rotate-12"></div>
          </div>
          <div className="absolute top-20 right-20 opacity-20 animate-bounce" style={{ animationDelay: '1.5s' }}>
            <div className="w-12 h-12 bg-gradient-to-r from-cryptobolt-500 to-primary-dark rounded-full"></div>
          </div>
          <div className="absolute bottom-32 left-20 opacity-20 animate-bounce" style={{ animationDelay: '2.5s' }}>
            <div className="w-20 h-20 bg-gradient-to-r from-primary-light to-cryptobolt-600 rounded-3xl -rotate-12"></div>
          </div>

          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-6 py-3 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-sm font-medium text-gray-700 mb-8 animate-fade-in">
              <Sparkles className="h-4 w-4 mr-2 text-primary animate-spin" style={{ animationDuration: '3s' }} />
              Next-Generation Crypto Platform
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-primary via-cryptobolt-600 to-cryptobolt-700 bg-clip-text text-transparent animate-gradient-x">
                Your Crypto
              </span>
              <br />
              <span className="text-gray-900 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>Journey Starts Here</span>
            </h1>
            
            <p className={`text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '0.4s' }}>
              Trade, invest, and manage your cryptocurrency portfolio with confidence. 
              Join thousands of users who trust CryptoBolt for their digital asset needs.
            </p>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '0.6s' }}>
              <Link
                to="/signin"
                className="group px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold text-lg hover:from-primary-dark hover:to-cryptobolt-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="flex items-center justify-center">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
              <a
                href="#features"
                className="group px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold text-lg hover:border-primary hover:text-primary hover:bg-white/50 transition-all duration-300 flex items-center justify-center gap-2 backdrop-blur-sm hover:scale-105"
              >
                Learn More 
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>

            {/* Rotating Highlights */}
            <div className="flex justify-center space-x-8 mb-8">
              {highlights.map((highlight, index) => (
                <div
                  key={index}
                  className={`text-center transform transition-all duration-500 ${
                    activeFeature === index ? 'scale-110 opacity-100' : 'scale-100 opacity-70'
                  }`}
                >
                  <div className={`p-3 rounded-full bg-gradient-to-r from-primary to-cryptobolt-600 w-fit mx-auto mb-2 ${
                    activeFeature === index ? 'animate-pulse' : ''
                  }`}>
                    <highlight.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold text-gray-800">{highlight.value}</div>
                  <div className="text-xs text-gray-600">{highlight.text}</div>
                </div>
              ))}
            </div>

            {/* Stats Counter Animation */}
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
                <div className="text-3xl font-bold text-gray-800 animate-count-up">1M+</div>
                <div className="text-sm text-gray-600">Active Users</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '1s' }}>
                <div className="text-3xl font-bold text-gray-800 animate-count-up">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
                <div className="text-3xl font-bold text-gray-800 animate-count-up">$50B+</div>
                <div className="text-sm text-gray-600">Volume</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose 
              <span className="bg-gradient-to-r from-primary to-cryptobolt-700 bg-clip-text text-transparent"> CryptoBolt</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of cryptocurrency trading with our cutting-edge platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group p-8 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 animate-fade-in-up cursor-pointer`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onMouseEnter={() => setActiveFeature(index % 3)}
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>
                
                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 to-cryptobolt-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 relative">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-cryptobolt-400/5 to-primary-light/5 rounded-3xl mx-4"></div>
        
        <div className="max-w-4xl mx-auto text-center relative">
          <div className={`transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="inline-flex items-center px-6 py-3 rounded-full backdrop-blur-md bg-white/30 border border-white/40 text-sm font-medium text-gray-700 mb-8">
              <Star className="h-4 w-4 mr-2 text-primary animate-pulse" />
              Join the Revolution
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-fade-in-up">
              Ready to Start 
              <span className="bg-gradient-to-r from-primary to-cryptobolt-700 bg-clip-text text-transparent"> Trading</span>?
            </h2>
            <p className="text-xl text-gray-600 mb-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Join CryptoBolt today and take control of your financial future
            </p>
            
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/signin"
                className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary to-primary-dark text-white rounded-2xl font-semibold text-lg hover:from-primary-dark hover:to-cryptobolt-700 transition-all duration-300 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 hover:scale-105"
              >
                <span className="flex items-center">
                  Create Free Account 
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                
                {/* Button Glow Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-primary-dark opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
