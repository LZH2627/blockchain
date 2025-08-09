import React, { useState } from 'react'
import { Bot, Zap, TrendingUp, Shield, Clock, CheckCircle, AlertCircle, Settings, Activity, ArrowUpRight, ArrowDownLeft, Repeat, DollarSign, Target, Cpu, Network, Code } from 'lucide-react'

export const SmartContractors: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const contractorStats = {
    totalContracts: 12,
    activeContracts: 8,
    completedTransactions: 1247,
    totalVolume: 2450000,
    monthlyVolume: 385000,
    successRate: 99.2,
    averageSpeed: '2.1 seconds',
    gasOptimization: 94
  }

  const smartContractors = [
    {
      id: '1',
      name: 'DeFi Yield Optimizer',
      type: 'yield-farming',
      status: 'active',
      description: 'Automatically optimizes yield farming positions across multiple protocols',
      volume: 125000,
      transactions: 342,
      successRate: 99.8,
      gasUsed: 0.045,
      lastExecution: '2 minutes ago',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-600'
    },
    {
      id: '2',
      name: 'Arbitrage Hunter',
      type: 'arbitrage',
      status: 'active',
      description: 'Identifies and executes profitable arbitrage opportunities',
      volume: 89000,
      transactions: 156,
      successRate: 98.9,
      gasUsed: 0.032,
      lastExecution: '5 minutes ago',
      icon: Repeat,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      id: '3',
      name: 'Portfolio Rebalancer',
      type: 'rebalancing',
      status: 'active',
      description: 'Maintains optimal portfolio allocation automatically',
      volume: 67000,
      transactions: 89,
      successRate: 99.5,
      gasUsed: 0.028,
      lastExecution: '12 minutes ago',
      icon: Target,
      color: 'from-purple-500 to-violet-600'
    },
    {
      id: '4',
      name: 'Stop Loss Guardian',
      type: 'risk-management',
      status: 'active',
      description: 'Executes stop-loss orders to protect investments',
      volume: 156000,
      transactions: 234,
      successRate: 99.9,
      gasUsed: 0.019,
      lastExecution: '8 minutes ago',
      icon: Shield,
      color: 'from-red-500 to-rose-600'
    },
    {
      id: '5',
      name: 'Liquidity Provider',
      type: 'liquidity',
      status: 'paused',
      description: 'Manages liquidity positions across DEX protocols',
      volume: 234000,
      transactions: 445,
      successRate: 98.7,
      gasUsed: 0.067,
      lastExecution: '2 hours ago',
      icon: Network,
      color: 'from-orange-500 to-amber-600'
    },
    {
      id: '6',
      name: 'MEV Protection Bot',
      type: 'protection',
      status: 'active',
      description: 'Protects transactions from MEV attacks',
      volume: 98000,
      transactions: 567,
      successRate: 99.1,
      gasUsed: 0.015,
      lastExecution: '1 minute ago',
      icon: Bot,
      color: 'from-indigo-500 to-blue-600'
    }
  ]

  const recentTransactions = [
    {
      id: '1',
      contractor: 'DeFi Yield Optimizer',
      action: 'Compound Rewards',
      amount: 1250,
      token: 'USDC',
      gasUsed: 0.0045,
      status: 'completed',
      timestamp: '2 minutes ago',
      txHash: '0x1a2b3c4d...'
    },
    {
      id: '2',
      contractor: 'Arbitrage Hunter',
      action: 'Cross-DEX Arbitrage',
      amount: 890,
      token: 'ETH',
      gasUsed: 0.0032,
      status: 'completed',
      timestamp: '5 minutes ago',
      txHash: '0x2b3c4d5e...'
    },
    {
      id: '3',
      contractor: 'MEV Protection Bot',
      action: 'Protected Swap',
      amount: 2100,
      token: 'USDT',
      gasUsed: 0.0015,
      status: 'completed',
      timestamp: '1 minute ago',
      txHash: '0x3c4d5e6f...'
    },
    {
      id: '4',
      contractor: 'Portfolio Rebalancer',
      action: 'Rebalance Portfolio',
      amount: 5600,
      token: 'Mixed',
      gasUsed: 0.0028,
      status: 'pending',
      timestamp: 'Processing...',
      txHash: '0x4d5e6f7g...'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-600 bg-green-100'
      case 'completed':
        return 'text-blue-600 bg-blue-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'paused':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Activity className="h-4 w-4" />
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      case 'paused':
        return <AlertCircle className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600">
              <Bot className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Smart Contractors</h1>
              <p className="text-gray-600">Automated transaction systems powered by smart contracts</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Contractors</p>
                <p className="text-3xl font-bold text-gray-900">{contractorStats.activeContracts}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Bot className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">8 running</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                <p className="text-3xl font-bold text-gray-900">{contractorStats.completedTransactions.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-blue-600 font-medium">+47 today</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Volume</p>
                <p className="text-3xl font-bold text-gray-900">${contractorStats.totalVolume.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-purple-600 font-medium">+${contractorStats.monthlyVolume.toLocaleString()} this month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold text-gray-900">{contractorStats.successRate}%</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">Highly reliable</span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
              <Cpu className="h-5 w-5 text-blue-600" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Success Rate</span>
                  <span className="font-medium">{contractorStats.successRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${contractorStats.successRate}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Gas Optimization</span>
                  <span className="font-medium">{contractorStats.gasOptimization}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-500 h-2 rounded-full" 
                    style={{ width: `${contractorStats.gasOptimization}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Execution Speed</h3>
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              {contractorStats.averageSpeed}
            </div>
            <div className="text-sm text-purple-600 font-medium">
              Average execution time
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
              <Activity className="h-5 w-5 text-green-600" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">All Systems Operational</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <span className="text-sm text-gray-600">Real-time Monitoring</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-600">Security Verified</span>
              </div>
            </div>
          </div>
        </div>

        {/* Smart Contractors Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Active Smart Contractors</h2>
            <button className="text-purple-600 hover:text-purple-700 font-medium">
              Manage All
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {smartContractors.map((contractor) => (
              <div key={contractor.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${contractor.color}`}>
                    <contractor.icon className="h-6 w-6 text-white" />
                  </div>
                  <span className={`inline-flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded-full capitalize ${getStatusColor(contractor.status)}`}>
                    {getStatusIcon(contractor.status)}
                    <span>{contractor.status}</span>
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{contractor.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{contractor.description}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Volume:</span>
                    <span className="font-medium">${contractor.volume.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Transactions:</span>
                    <span className="font-medium">{contractor.transactions}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Success Rate:</span>
                    <span className="font-medium text-green-600">{contractor.successRate}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Last Execution:</span>
                    <span className="font-medium">{contractor.lastExecution}</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <button className="w-full px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-medium transition-colors">
                    Configure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Automated Transactions</h2>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                View All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contractor</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Gas Used</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{transaction.contractor}</h3>
                        <p className="text-sm text-gray-500">{transaction.txHash}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{transaction.action}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {transaction.amount.toLocaleString()} {transaction.token}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{transaction.gasUsed} ETH</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded-full capitalize ${getStatusColor(transaction.status)}`}>
                        {getStatusIcon(transaction.status)}
                        <span>{transaction.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{transaction.timestamp}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left">
            <Code className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Deploy New Contractor</h3>
            <p className="text-purple-100">Create custom automated transaction systems</p>
          </button>

          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left">
            <Settings className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Configure Settings</h3>
            <p className="text-blue-100">Adjust automation parameters and limits</p>
          </button>

          <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left">
            <Activity className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Monitor Performance</h3>
            <p className="text-green-100">Track real-time contractor analytics</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default SmartContractors
