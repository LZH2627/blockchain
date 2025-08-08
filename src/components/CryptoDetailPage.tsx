import React from 'react'
import { useParams } from 'react-router-dom'
import { TrendingUp, TrendingDown, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

const CryptoDetailPage: React.FC = () => {
  const { cryptoId } = useParams()

  // Mock data - in real app, fetch based on cryptoId
  const cryptoData = {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 43000,
    change24h: 2.5,
    marketCap: '850B',
    volume: '25B',
    supply: '19.5M',
    maxSupply: '21M'
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to="/dashboard"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>

        {/* Header */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-orange-600 flex items-center justify-center mr-4">
                <span className="text-white text-lg font-bold">{cryptoData.symbol[0]}</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{cryptoData.name}</h1>
                <p className="text-gray-600">{cryptoData.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900">${cryptoData.price.toLocaleString()}</div>
              <div className={`flex items-center justify-end ${cryptoData.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {cryptoData.change24h >= 0 ? (
                  <TrendingUp className="h-4 w-4 mr-1" />
                ) : (
                  <TrendingDown className="h-4 w-4 mr-1" />
                )}
                <span className="font-medium">{Math.abs(cryptoData.change24h)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Market Cap</h3>
            <p className="text-xl font-bold text-gray-900">${cryptoData.marketCap}</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">24h Volume</h3>
            <p className="text-xl font-bold text-gray-900">${cryptoData.volume}</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Circulating Supply</h3>
            <p className="text-xl font-bold text-gray-900">{cryptoData.supply}</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
            <h3 className="text-sm font-medium text-gray-600 mb-2">Max Supply</h3>
            <p className="text-xl font-bold text-gray-900">{cryptoData.maxSupply}</p>
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Price Chart</h2>
          <div className="h-64 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl flex items-center justify-center">
            <p className="text-gray-500">Interactive price chart would be displayed here</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CryptoDetailPage
