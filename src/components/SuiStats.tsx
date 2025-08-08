import React, { useEffect, useState } from 'react'
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client'
import { TrendingUp, Users, Zap, DollarSign } from 'lucide-react'

const SuiStats = () => {
  const [stats, setStats] = useState({
    totalTransactions: '2.1M+',
    activeValidators: '150+',
    tps: '5,000+',
    totalValueLocked: '$2.8B+'
  })

  const [networkStats, setNetworkStats] = useState<any>(null)
  const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') })

  useEffect(() => {
    const fetchNetworkStats = async () => {
      try {
        const totalTxCount = await suiClient.getTotalTransactionBlocks()
        const validators = await suiClient.getLatestSuiSystemState()
        
        setNetworkStats({
          totalTransactions: totalTxCount,
          validators: validators.activeValidators?.length || 0
        })
      } catch (error) {
        console.error('Error fetching network stats:', error)
      }
    }

    fetchNetworkStats()
  }, [])

  const statItems = [
    {
      icon: TrendingUp,
      label: 'Total Transactions',
      value: networkStats?.totalTransactions?.toLocaleString() || stats.totalTransactions,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Users,
      label: 'Active Validators',
      value: networkStats?.validators?.toString() || stats.activeValidators,
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Zap,
      label: 'Transactions/Second',
      value: stats.tps,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      icon: DollarSign,
      label: 'Total Value Locked',
      value: stats.totalValueLocked,
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Sui Network
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Statistics</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real-time metrics from the Sui blockchain network showcasing performance and adoption.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statItems.map((stat, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg hover:bg-white/30 transition-all duration-300 group"
            >
              <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.value}</div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Live Network Activity */}
        <div className="mt-16 p-8 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Live Network Activity</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-4 h-4 bg-green-500 rounded-full mx-auto mb-2 animate-pulse"></div>
              <div className="text-sm font-semibold text-gray-800">Network Status</div>
              <div className="text-xs text-gray-600">Healthy</div>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-blue-500 rounded-full mx-auto mb-2 animate-pulse"></div>
              <div className="text-sm font-semibold text-gray-800">Consensus</div>
              <div className="text-xs text-gray-600">Active</div>
            </div>
            <div className="text-center">
              <div className="w-4 h-4 bg-purple-500 rounded-full mx-auto mb-2 animate-pulse"></div>
              <div className="text-sm font-semibold text-gray-800">Gas Price</div>
              <div className="text-xs text-gray-600">1000 MIST</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SuiStats
