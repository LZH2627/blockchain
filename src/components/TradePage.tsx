import React from 'react'
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft } from 'lucide-react'

export const TradePage: React.FC = () => {
  const cryptoData = [
    { symbol: 'BTC', name: 'Bitcoin', price: 43000, change: 2.5, volume: '1.2B' },
    { symbol: 'ETH', name: 'Ethereum', price: 2000, change: -1.2, volume: '800M' },
    { symbol: 'ADA', name: 'Cardano', price: 0.45, change: 5.8, volume: '200M' },
    { symbol: 'SOL', name: 'Solana', price: 90, change: 3.1, volume: '150M' }
  ]

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Trading</h1>
          <p className="text-gray-600">Buy and sell cryptocurrencies with real-time market data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trading Interface */}
          <div className="lg:col-span-2">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Trade</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Buy Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-600 flex items-center">
                    <ArrowDownLeft className="h-5 w-5 mr-2" />
                    Buy
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cryptocurrency</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80">
                      <option>Bitcoin (BTC)</option>
                      <option>Ethereum (ETH)</option>
                      <option>Cardano (ADA)</option>
                      <option>Solana (SOL)</option>
                    </select>
                  </div>
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-teal-700 transition-all duration-300">
                    Buy Now
                  </button>
                </div>

                {/* Sell Section */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-600 flex items-center">
                    <ArrowUpRight className="h-5 w-5 mr-2" />
                    Sell
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/80"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cryptocurrency</label>
                    <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/80">
                      <option>Bitcoin (BTC)</option>
                      <option>Ethereum (ETH)</option>
                      <option>Cardano (ADA)</option>
                      <option>Solana (SOL)</option>
                    </select>
                  </div>
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300">
                    Sell Now
                  </button>
                </div>
              </div>
            </div>

            {/* Market Data */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Market Overview</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">24h Change</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Volume</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cryptoData.map((crypto) => (
                      <tr key={crypto.symbol} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-gray-400 to-gray-600 flex items-center justify-center mr-3">
                              <span className="text-white text-xs font-bold">{crypto.symbol[0]}</span>
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{crypto.name}</div>
                              <div className="text-sm text-gray-500">{crypto.symbol}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">${crypto.price.toLocaleString()}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`flex items-center text-sm font-medium ${crypto.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {crypto.change >= 0 ? (
                              <TrendingUp className="h-4 w-4 mr-1" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1" />
                            )}
                            {Math.abs(crypto.change)}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{crypto.volume}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Book */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Order Book</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-red-600">43,250</span>
                  <span className="text-gray-600">0.5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-600">43,200</span>
                  <span className="text-gray-600">1.2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-600">43,150</span>
                  <span className="text-gray-600">0.8</span>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">43,000</span>
                  <span className="text-gray-600">2.1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">42,950</span>
                  <span className="text-gray-600">1.5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">42,900</span>
                  <span className="text-gray-600">0.9</span>
                </div>
              </div>
            </div>

            {/* Recent Trades */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Trades</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">43,100</span>
                  <span className="text-gray-600">0.25</span>
                  <span className="text-gray-500">12:34</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-600">43,050</span>
                  <span className="text-gray-600">0.15</span>
                  <span className="text-gray-500">12:33</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600">43,080</span>
                  <span className="text-gray-600">0.45</span>
                  <span className="text-gray-500">12:32</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradePage
