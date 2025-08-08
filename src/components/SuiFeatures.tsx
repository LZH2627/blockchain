import React from 'react'
import { Zap, Shield, Globe, Code, Layers, Cpu } from 'lucide-react'

const SuiFeatures = () => {
  const features = [
    {
      icon: Zap,
      title: 'Parallel Execution',
      description: 'Sui processes transactions in parallel, achieving unprecedented throughput and low latency.',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Shield,
      title: 'Object-Centric Model',
      description: 'Unique object-centric data model that enables fine-grained ownership and composability.',
      gradient: 'from-green-500 to-emerald-500'
    },
    {
      icon: Globe,
      title: 'Move Programming',
      description: 'Built with Move, a safe and expressive programming language designed for digital assets.',
      gradient: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Code,
      title: 'Developer Friendly',
      description: 'Rich SDK, comprehensive documentation, and powerful developer tools for rapid development.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      icon: Layers,
      title: 'Horizontal Scaling',
      description: 'Scales horizontally by adding more machines without compromising decentralization.',
      gradient: 'from-indigo-500 to-purple-500'
    },
    {
      icon: Cpu,
      title: 'Low Gas Fees',
      description: 'Efficient execution model results in predictable and low transaction costs.',
      gradient: 'from-red-500 to-pink-500'
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Why Choose
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Sui?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sui represents the next generation of blockchain technology, designed from the ground up for speed, security, and scalability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-105"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-4">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Technical Specifications */}
        <div className="mt-20 p-8 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-8 text-center">Technical Specifications</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{'<'}100ms</div>
              <div className="text-sm text-gray-600">Finality Time</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">120k+</div>
              <div className="text-sm text-gray-600">Peak TPS</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">$0.001</div>
              <div className="text-sm text-gray-600">Avg Gas Fee</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600 mb-2">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SuiFeatures
