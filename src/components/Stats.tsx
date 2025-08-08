import React from 'react'
import { Users, DollarSign, Activity, Award } from 'lucide-react'

const Stats = () => {
  const stats = [
    {
      icon: Users,
      value: "2.5M+",
      label: "Active Users",
      description: "Growing community worldwide"
    },
    {
      icon: DollarSign,
      value: "$50B+",
      label: "Transaction Volume",
      description: "Processed securely"
    },
    {
      icon: Activity,
      value: "99.99%",
      label: "Network Uptime",
      description: "Reliable infrastructure"
    },
    {
      icon: Award,
      value: "150+",
      label: "Enterprise Clients",
      description: "Trust our platform"
    }
  ]

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Trusted by Millions
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Worldwide</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join the growing ecosystem of users, developers, and enterprises building the future of finance.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 hover:scale-105"
            >
              <div className="p-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 w-fit mx-auto mb-6">
                <stat.icon className="h-8 w-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-700 mb-2">{stat.label}</div>
              <div className="text-sm text-gray-600">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
