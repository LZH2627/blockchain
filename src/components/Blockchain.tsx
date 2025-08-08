import React from 'react'
import { Link, Database, Network, Code } from 'lucide-react'

const Blockchain = () => {
  const blocks = [
    { id: 1, hash: "0x1a2b3c...", transactions: 247, timestamp: "2 min ago" },
    { id: 2, hash: "0x4d5e6f...", transactions: 189, timestamp: "4 min ago" },
    { id: 3, hash: "0x7g8h9i...", transactions: 312, timestamp: "6 min ago" },
    { id: 4, hash: "0xjk1l2m...", transactions: 156, timestamp: "8 min ago" }
  ]

  const technologies = [
    {
      icon: Link,
      title: "Proof of Stake",
      description: "Energy-efficient consensus mechanism with 99.9% less energy consumption than traditional mining."
    },
    {
      icon: Database,
      title: "Sharding Technology",
      description: "Horizontal scaling solution that processes multiple transactions simultaneously across network shards."
    },
    {
      icon: Network,
      title: "Cross-Chain Bridge",
      description: "Seamless interoperability between different blockchain networks and legacy financial systems."
    },
    {
      icon: Code,
      title: "Smart Contract VM",
      description: "Advanced virtual machine supporting multiple programming languages and formal verification."
    }
  ]

  return (
    <section id="technology" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Advanced Blockchain
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Architecture</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Built on cutting-edge technology stack with innovative consensus mechanisms and scalable infrastructure.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          {/* Live Blockchain Visualization */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Live Blockchain Activity</h3>
            <div className="space-y-4">
              {blocks.map((block, index) => (
                <div
                  key={block.id}
                  className="p-6 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="font-semibold text-gray-800">Block #{block.id}</span>
                    </div>
                    <span className="text-sm text-gray-600">{block.timestamp}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Hash: {block.hash}</div>
                  <div className="text-sm text-gray-600">{block.transactions} transactions</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Core Technologies</h3>
            <div className="space-y-6">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-start space-x-4 p-6 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300"
                >
                  <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex-shrink-0">
                    <tech.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-800 mb-2">{tech.title}</h4>
                    <p className="text-gray-600">{tech.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Network Visualization */}
        <div className="text-center">
          <div className="p-12 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
              alt="Blockchain Network"
              className="rounded-xl mx-auto mb-6 max-w-full h-64 object-cover"
            />
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Decentralized Global Network</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our blockchain network spans across multiple continents with thousands of validator nodes ensuring maximum decentralization, security, and performance.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Blockchain
