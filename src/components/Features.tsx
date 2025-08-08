import React from 'react'
import { Shield, Zap, Globe, Lock, Cpu, TrendingUp } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "Advanced cryptographic protocols and multi-layer security ensure your assets are protected with bank-level security standards."
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process thousands of transactions per second with our optimized consensus algorithm and parallel processing architecture."
    },
    {
      icon: Globe,
      title: "Global Network",
      description: "Decentralized nodes across 50+ countries ensure maximum uptime, redundancy, and global accessibility for all users."
    },
    {
      icon: Lock,
      title: "Smart Contracts",
      description: "Deploy and execute smart contracts with our intuitive interface and comprehensive development tools and libraries."
    },
    {
      icon: Cpu,
      title: "AI-Powered Analytics",
      description: "Leverage machine learning algorithms for predictive analytics, risk assessment, and automated trading strategies."
    },
    {
      icon: TrendingUp,
      title: "Scalable Infrastructure",
      description: "Built to handle millions of users with automatic scaling, load balancing, and enterprise-grade performance."
    }
  ]

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Powerful Features for
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Modern Blockchain</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our cutting-edge blockchain platform combines security, speed, and scalability to deliver the ultimate decentralized experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-105"
            >
              <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features
