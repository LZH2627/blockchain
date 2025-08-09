import React, { useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, Wallet, ArrowUpRight, ArrowDownLeft, ArrowUpCircle, ArrowDownCircle, ArrowRightLeft, Building2, Send, PlusCircle, MinusCircle } from 'lucide-react'
import FinancialOperations from './FinancialOperations'

export const Dashboard: React.FC = () => {
  const [showFinancialOperations, setShowFinancialOperations] = useState(false)

  const portfolioData = [
    { name: 'Bitcoin', symbol: 'BTC', amount: 0.5, value: 21500, change: 2.5, color: 'text-orange-500' },
    { name: 'Ethereum', symbol: 'ETH', amount: 3.2, value: 6400, change: -1.2, color: 'text-blue-500' },
    { name: 'Cardano', symbol: 'ADA', amount: 1000, value: 450, change: 5.8, color: 'text-green-500' },
    { name: 'Solana', symbol: 'SOL', amount: 25, value: 2250, change: 3.1, color: 'text-purple-500' }
  ]

  const totalValue = portfolioData.reduce((sum, coin) => sum + coin.value, 0)

  const quickActions = [
    {
      id: 'buy',
      title: 'Buy',
      description: 'Purchase crypto',
      icon: ArrowUpCircle,
      color: 'from-green-500 to-emerald-600',
      hoverColor: 'hover:from-green-600 hover:to-emerald-700',
      action: () => setShowFinancialOperations(true)
    },
    {
      id: 'sell',
      title: 'Sell',
      description: 'Convert to cash',
      icon: ArrowDownCircle,
      color: 'from-red-500 to-rose-600',
      hoverColor: 'hover:from-red-600 hover:to-rose-700',
      action: () => setShowFinancialOperations(true)
    },
    {
      id: 'swap',
      title: 'Swap',
      description: 'Exchange coins',
      icon: ArrowRightLeft,
      color: 'from-blue-500 to-cyan-600',
      hoverColor: 'hover:from-blue-600 hover:to-cyan-700',
      action: () => setShowFinancialOperations(true)
    },
    {
      id: 'deposit',
      title: 'Deposit',
      description: 'To bank account',
      icon: Building2,
      color: 'from-purple-500 to-violet-600',
      hoverColor: 'hover:from-purple-600 hover:to-violet-700',
      action: () => setShowFinancialOperations(true)
    },
    {
      id: 'send',
      title: 'Send',
      description: 'Transfer funds',
      icon: Send,
      color: 'from-indigo-500 to-blue-600',
      hoverColor: 'hover:from-indigo-600 hover:to-blue-700',
      action: () => setShowFinancialOperations(true)
    },
    {
      id: 'add-cash',
      title: 'Add Cash',
      description: 'Fund wallet',
      icon: PlusCircle,
      color: 'from-teal-500 to-cyan-600',
      hoverColor: 'hover:from-teal-600 hover:to-cyan-700',
      action: () => setShowFinancialOperations(true)
    },
    {
      id: 'cash-out',
      title: 'Cash Out',
      description: 'Withdraw funds',
      icon: MinusCircle,
      color: 'from-orange-500 to-amber-600',
      hoverColor: 'hover:from-orange-600 hover:to-amber-700',
      action: () => setShowFinancialOperations(true)
    }
  ]

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's your portfolio overview.</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
            <button
              onClick={() => setShowFinancialOperations(true)}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All Operations →
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {quickActions.map((action) => (
              <button
                key={action.id}
                onClick={action.action}
                className={`group p-4 rounded-2xl bg-gradient-to-r ${action.color} ${action.hoverColor} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <div className="p-2 rounded-xl bg-white/20 group-hover:bg-white/30 transition-colors">
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="text-center">
                    <div className="font-semibold text-sm">{action.title}</div>
                    <div className="text-xs opacity-90">{action.description}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Portfolio Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Portfolio</p>
                <p className="text-2xl font-bold text-gray-900">${totalValue.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Wallet className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">+12.5%</span>
              <span className="text-sm text-gray-500 ml-2">vs last month</span>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">24h Change</p>
                <p className="text-2xl font-bold text-green-600">+$1,245</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600 font-medium">+4.2%</span>
              <span className="text-sm text-gray-500 ml-2">today</span>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Available Balance</p>
                <p className="text-2xl font-bold text-gray-900">$5,420</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm text-gray-500">Ready to trade</span>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Trades</p>
                <p className="text-2xl font-bold text-gray-900">127</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
                <ArrowDownLeft className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-sm text-gray-500">This month</span>
            </div>
          </div>
        </div>

        {/* Portfolio Assets */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Your Assets</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assets</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {portfolioData.map((coin) => (
                  <tr key={coin.symbol} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center mr-3`}>
                          <span className="text-white text-xs font-bold">{coin.symbol[0]}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{coin.name}</div>
                          <div className="text-sm text-gray-500">{coin.symbol}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{coin.amount} {coin.symbol}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">${coin.value.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`flex items-center text-sm font-medium ${coin.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {coin.change >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        {Math.abs(coin.change)}%
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Financial Operations Modal */}
      {showFinancialOperations && (
        <FinancialOperations onClose={() => setShowFinancialOperations(false)} />
      )}
    </div>
  )
}

export default Dashboard
