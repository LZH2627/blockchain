import React, { useState } from 'react'
import { 
  Coins, 
  TrendingUp, 
  TrendingDown, 
  Eye, 
  EyeOff, 
  ArrowUpCircle, 
  ArrowDownCircle, 
  ArrowRightLeft,
  BarChart3,
  DollarSign,
  Wallet,
  Star,
  StarOff,
  ExternalLink,
  Copy,
  QrCode
} from 'lucide-react'

interface AssetsViewProps {
  onClose: () => void
}

const AssetsView: React.FC<AssetsViewProps> = ({ onClose }) => {
  const [hideBalances, setHideBalances] = useState(false)
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const cryptoAssets = [
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      symbol: 'BTC',
      amount: 0.5432,
      value: 23456.78,
      currentPrice: 43150.25,
      change24h: 2.5,
      change7d: 5.2,
      color: 'from-orange-400 to-orange-600',
      icon: '₿',
      favorite: true,
      address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      network: 'Bitcoin',
      allocation: 45.2
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      symbol: 'ETH',
      amount: 3.2156,
      value: 6431.20,
      currentPrice: 2000.50,
      change24h: -1.2,
      change7d: 3.1,
      color: 'from-blue-400 to-blue-600',
      icon: 'Ξ',
      favorite: true,
      address: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      network: 'Ethereum',
      allocation: 24.8
    },
    {
      id: 'cardano',
      name: 'Cardano',
      symbol: 'ADA',
      amount: 1250.75,
      value: 562.84,
      currentPrice: 0.45,
      change24h: 5.8,
      change7d: 8.2,
      color: 'from-blue-500 to-indigo-600',
      icon: '₳',
      favorite: false,
      address: 'addr1qx2fxv2umyhttkxyxp8x0dlpdt3k6cwng5pxj3jhsydzer3jcu5d8ps7zex2k2xt3uqxgjqnnj0vs2qd4a',
      network: 'Cardano',
      allocation: 10.9
    },
    {
      id: 'solana',
      name: 'Solana',
      symbol: 'SOL',
      amount: 45.25,
      value: 4070.25,
      currentPrice: 90.00,
      change24h: 3.1,
      change7d: 12.5,
      color: 'from-purple-400 to-purple-600',
      icon: '◎',
      favorite: false,
      address: '9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM',
      network: 'Solana',
      allocation: 15.7
    },
    {
      id: 'chainlink',
      name: 'Chainlink',
      symbol: 'LINK',
      amount: 125.50,
      value: 1756.00,
      currentPrice: 14.00,
      change24h: 1.8,
      change7d: -2.3,
      color: 'from-blue-600 to-cyan-600',
      icon: '⬡',
      favorite: false,
      address: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
      network: 'Ethereum',
      allocation: 6.8
    },
    {
      id: 'polygon',
      name: 'Polygon',
      symbol: 'MATIC',
      amount: 850.25,
      value: 680.20,
      currentPrice: 0.80,
      change24h: -0.5,
      change7d: 4.2,
      color: 'from-purple-500 to-pink-600',
      icon: '⬟',
      favorite: false,
      address: '0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0',
      network: 'Polygon',
      allocation: 2.6
    }
  ]

  const totalValue = cryptoAssets.reduce((sum, asset) => sum + asset.value, 0)

  const formatValue = (value: number) => {
    if (hideBalances) return '****'
    return `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
  }

  const formatAmount = (amount: number, symbol: string) => {
    if (hideBalances) return '****'
    return `${amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${symbol}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    // You could add a toast notification here
  }

  const toggleFavorite = (assetId: string) => {
    // In a real app, this would update the backend
    console.log('Toggle favorite for:', assetId)
  }

  const renderAssetCard = (asset: any) => (
    <div
      key={asset.id}
      className={`p-6 rounded-2xl backdrop-blur-md border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer ${
        selectedAsset === asset.id 
          ? 'bg-white/40 border-white/50 shadow-lg' 
          : 'bg-white/20 border-white/30 hover:bg-white/30'
      }`}
      onClick={() => setSelectedAsset(selectedAsset === asset.id ? null : asset.id)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${asset.color} flex items-center justify-center`}>
            <span className="text-white text-lg font-bold">{asset.icon}</span>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">{asset.name}</h3>
            <p className="text-sm text-gray-600">{asset.symbol}</p>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation()
            toggleFavorite(asset.id)
          }}
          className="text-gray-400 hover:text-yellow-500 transition-colors"
        >
          {asset.favorite ? <Star className="h-5 w-5 fill-current text-yellow-500" /> : <StarOff className="h-5 w-5" />}
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Holdings</span>
          <span className="text-sm font-medium text-gray-800">{formatAmount(asset.amount, asset.symbol)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Value</span>
          <span className="text-sm font-bold text-gray-800">{formatValue(asset.value)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-gray-600">Price</span>
          <span className="text-sm font-medium text-gray-800">{formatValue(asset.currentPrice)}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className={`flex items-center text-sm font-medium ${asset.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {asset.change24h >= 0 ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          {Math.abs(asset.change24h).toFixed(2)}% (24h)
        </div>
        <div className="text-sm text-gray-600">
          {asset.allocation}% of portfolio
        </div>
      </div>

      {/* Progress bar for allocation */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className={`h-2 rounded-full bg-gradient-to-r ${asset.color}`}
          style={{ width: `${Math.min(asset.allocation, 100)}%` }}
        ></div>
      </div>

      {/* Expanded details */}
      {selectedAsset === asset.id && (
        <div className="mt-4 pt-4 border-t border-white/30 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-xs text-gray-600">7d Change</span>
              <div className={`text-sm font-medium ${asset.change7d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {asset.change7d >= 0 ? '+' : ''}{asset.change7d.toFixed(2)}%
              </div>
            </div>
            <div>
              <span className="text-xs text-gray-600">Network</span>
              <div className="text-sm font-medium text-gray-800">{asset.network}</div>
            </div>
          </div>

          <div>
            <span className="text-xs text-gray-600">Wallet Address</span>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs font-mono text-gray-700 bg-gray-100 px-2 py-1 rounded">
                {asset.address.slice(0, 20)}...
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  copyToClipboard(asset.address)
                }}
                className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              >
                <Copy className="h-4 w-4" />
              </button>
              <button className="p-1 text-gray-500 hover:text-gray-700 transition-colors">
                <QrCode className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex space-x-2">
            <button className="flex-1 px-3 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl text-sm font-medium hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
              <ArrowDownCircle className="h-4 w-4 inline mr-1" />
              Buy
            </button>
            <button className="flex-1 px-3 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-xl text-sm font-medium hover:from-red-600 hover:to-rose-700 transition-all duration-300">
              <ArrowUpCircle className="h-4 w-4 inline mr-1" />
              Sell
            </button>
            <button className="flex-1 px-3 py-2 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl text-sm font-medium hover:from-blue-600 hover:to-cyan-700 transition-all duration-300">
              <ArrowRightLeft className="h-4 w-4 inline mr-1" />
              Swap
            </button>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-7xl max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <div className="p-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-600">
                <Coins className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Your Assets</h2>
                <p className="text-gray-600 mt-1">Manage and view your cryptocurrency holdings</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>

          {/* Portfolio Summary */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/30 border border-white/40">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Portfolio Value</span>
                <button
                  onClick={() => setHideBalances(!hideBalances)}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {hideBalances ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <div className="text-2xl font-bold text-gray-800">{formatValue(totalValue)}</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-600 font-medium">+12.5%</span>
                <span className="text-sm text-gray-500 ml-2">24h</span>
              </div>
            </div>

            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/30 border border-white/40">
              <div className="flex items-center space-x-2 mb-2">
                <Wallet className="h-4 w-4 text-blue-600" />
                <span className="text-sm text-gray-600">Total Assets</span>
              </div>
              <div className="text-2xl font-bold text-gray-800">{cryptoAssets.length}</div>
              <div className="text-sm text-gray-500 mt-2">Cryptocurrencies</div>
            </div>

            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/30 border border-white/40">
              <div className="flex items-center space-x-2 mb-2">
                <BarChart3 className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">Best Performer</span>
              </div>
              <div className="text-lg font-bold text-gray-800">SOL</div>
              <div className="text-sm text-green-600 font-medium mt-1">+12.5% (7d)</div>
            </div>

            <div className="p-6 rounded-2xl backdrop-blur-md bg-white/30 border border-white/40">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="h-4 w-4 text-purple-600" />
                <span className="text-sm text-gray-600">Available Cash</span>
              </div>
              <div className="text-lg font-bold text-gray-800">{formatValue(5420)}</div>
              <div className="text-sm text-gray-500 mt-1">Ready to invest</div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-semibold text-gray-800">Holdings</h3>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white/20 text-gray-600 hover:bg-white/30'
                  }`}
                >
                  <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                    <div className="bg-current rounded-sm"></div>
                  </div>
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white/20 text-gray-600 hover:bg-white/30'
                  }`}
                >
                  <div className="w-4 h-4 flex flex-col justify-center space-y-0.5">
                    <div className="h-0.5 bg-current rounded"></div>
                    <div className="h-0.5 bg-current rounded"></div>
                    <div className="h-0.5 bg-current rounded"></div>
                  </div>
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <select className="px-3 py-2 rounded-lg backdrop-blur-md bg-white/30 border border-white/30 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>Sort by Value</option>
                <option>Sort by Name</option>
                <option>Sort by Change</option>
                <option>Sort by Holdings</option>
              </select>
            </div>
          </div>

          {/* Assets Grid/List */}
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
            : 'space-y-4'
          }>
            {cryptoAssets.map((asset) => renderAssetCard(asset))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AssetsView
