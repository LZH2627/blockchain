import React, { useState } from 'react'
import { Wallet, Grid, List, Filter, Search, Star, Eye, Heart, TrendingUp, Award, Image, Send, Share2, MoreHorizontal, X, ExternalLink, Copy, Check } from 'lucide-react'

export const WalletPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [activeTab, setActiveTab] = useState<'all' | 'created' | 'purchased' | 'favorites'>('all')
  const [selectedNFT, setSelectedNFT] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [showActions, setShowActions] = useState<string | null>(null)
  const [copiedAddress, setCopiedAddress] = useState(false)

  // Mock user's NFT collection
  const userNFTs = [
    {
      id: 1,
      name: 'Genesis Dragon #1247',
      collection: 'CryptoVault Genesis',
      image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400',
      rarity: 'Legendary',
      purchasePrice: 3.2,
      currentValue: 3.8,
      dateAcquired: '2024-01-15',
      type: 'purchased',
      verified: true,
      likes: 234,
      views: 1520,
      traits: [
        { trait_type: 'Background', value: 'Cosmic', rarity: '2%' },
        { trait_type: 'Dragon Type', value: 'Fire', rarity: '15%' },
        { trait_type: 'Eyes', value: 'Golden', rarity: '5%' },
        { trait_type: 'Wings', value: 'Ethereal', rarity: '3%' }
      ]
    },
    {
      id: 2,
      name: 'My Custom Avatar #001',
      collection: 'Personal Collection',
      image: 'https://images.pexels.com/photos/8369769/pexels-photo-8369769.jpeg?auto=compress&cs=tinysrgb&w=400',
      rarity: 'Unique',
      purchasePrice: 0,
      currentValue: 1.2,
      dateAcquired: '2024-01-20',
      type: 'created',
      verified: false,
      likes: 45,
      views: 180,
      traits: [
        { trait_type: 'Style', value: 'Cyberpunk', rarity: '100%' },
        { trait_type: 'Color Scheme', value: 'Neon Blue', rarity: '100%' },
        { trait_type: 'Accessories', value: 'Cyber Mask', rarity: '100%' }
      ]
    },
    {
      id: 3,
      name: 'Pixel Knight #4521',
      collection: 'Pixel Warriors',
      image: 'https://images.pexels.com/photos/8369641/pexels-photo-8369641.jpeg?auto=compress&cs=tinysrgb&w=400',
      rarity: 'Rare',
      purchasePrice: 0.95,
      currentValue: 1.1,
      dateAcquired: '2024-01-10',
      type: 'purchased',
      verified: false,
      likes: 156,
      views: 720,
      traits: [
        { trait_type: 'Class', value: 'Knight', rarity: '25%' },
        { trait_type: 'Shield', value: 'Royal', rarity: '10%' },
        { trait_type: 'Sword', value: 'Enchanted', rarity: '15%' }
      ]
    },
    {
      id: 4,
      name: 'Tech Wizard #2847',
      collection: 'Digital Legends',
      image: 'https://images.pexels.com/photos/8369755/pexels-photo-8369755.jpeg?auto=compress&cs=tinysrgb&w=400',
      rarity: 'Rare',
      purchasePrice: 1.6,
      currentValue: 1.8,
      dateAcquired: '2024-01-08',
      type: 'purchased',
      verified: true,
      likes: 203,
      views: 1100,
      traits: [
        { trait_type: 'Staff', value: 'Quantum', rarity: '7%' },
        { trait_type: 'Robe', value: 'Holographic', rarity: '9%' },
        { trait_type: 'Hat', value: 'Neural Crown', rarity: '6%' }
      ]
    },
    {
      id: 5,
      name: 'Abstract Art #007',
      collection: 'Personal Collection',
      image: 'https://images.pexels.com/photos/8369652/pexels-photo-8369652.jpeg?auto=compress&cs=tinysrgb&w=400',
      rarity: 'Unique',
      purchasePrice: 0,
      currentValue: 0.8,
      dateAcquired: '2024-01-25',
      type: 'created',
      verified: false,
      likes: 67,
      views: 290,
      traits: [
        { trait_type: 'Style', value: 'Abstract', rarity: '100%' },
        { trait_type: 'Colors', value: 'Rainbow', rarity: '100%' },
        { trait_type: 'Composition', value: 'Fluid', rarity: '100%' }
      ]
    },
    {
      id: 6,
      name: 'Battle Mage #1337',
      collection: 'Pixel Warriors',
      image: 'https://images.pexels.com/photos/8369663/pexels-photo-8369663.jpeg?auto=compress&cs=tinysrgb&w=400',
      rarity: 'Epic',
      purchasePrice: 1.2,
      currentValue: 1.4,
      dateAcquired: '2024-01-05',
      type: 'purchased',
      verified: false,
      likes: 178,
      views: 890,
      traits: [
        { trait_type: 'Magic Type', value: 'Lightning', rarity: '18%' },
        { trait_type: 'Armor', value: 'Mage Robes', rarity: '20%' },
        { trait_type: 'Weapon', value: 'Staff of Power', rarity: '12%' }
      ]
    }
  ]

  const filteredNFTs = userNFTs.filter(nft => {
    const matchesTab = activeTab === 'all' || nft.type === activeTab || 
                      (activeTab === 'favorites' && nft.likes > 150)
    const matchesSearch = nft.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         nft.collection.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTab && matchesSearch
  })

  const totalValue = userNFTs.reduce((sum, nft) => sum + nft.currentValue, 0)
  const totalPurchaseValue = userNFTs.reduce((sum, nft) => sum + nft.purchasePrice, 0)
  const profitLoss = totalValue - totalPurchaseValue

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'unique': return 'text-purple-600 bg-purple-100'
      case 'legendary': return 'text-yellow-600 bg-yellow-100'
      case 'epic': return 'text-blue-600 bg-blue-100'
      case 'rare': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'created': return 'text-purple-600 bg-purple-100'
      case 'purchased': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAddress(true)
    setTimeout(() => setCopiedAddress(false), 2000)
  }

  const NFTDetailModal = ({ nft }: { nft: any }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <Wallet className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{nft.name}</h2>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm text-gray-600">{nft.collection}</span>
                  {nft.verified && (
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <Star className="h-2.5 w-2.5 text-white fill-current" />
                    </div>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(nft.type)}`}>
                    {nft.type === 'created' ? 'Created' : 'Purchased'}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedNFT(null)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors group"
            >
              <X className="h-6 w-6 text-gray-500 group-hover:text-gray-700" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <img
                src={nft.image}
                alt={nft.name}
                className="w-full aspect-square object-cover rounded-2xl"
              />
              
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Traits</h3>
                <div className="grid grid-cols-2 gap-3">
                  {nft.traits.map((trait: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-xl p-3">
                      <div className="text-xs text-gray-600 uppercase tracking-wide">{trait.trait_type}</div>
                      <div className="text-sm font-medium text-gray-900">{trait.value}</div>
                      <div className="text-xs text-blue-600">{trait.rarity}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity}
                  </span>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-4 w-4" />
                      <span>{nft.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-4 w-4" />
                      <span>{nft.likes}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
                  <div className="text-sm text-purple-100 mb-1">Current Value</div>
                  <div className="text-3xl font-bold">{nft.currentValue} ETH</div>
                  <div className="text-sm text-purple-100 mt-1">≈ ${(nft.currentValue * 2400).toLocaleString()}</div>
                  {nft.purchasePrice > 0 && (
                    <div className="mt-3 pt-3 border-t border-purple-400/30">
                      <div className="flex justify-between text-sm">
                        <span className="text-purple-100">Purchase Price:</span>
                        <span>{nft.purchasePrice} ETH</span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-purple-100">P&L:</span>
                        <span className={nft.currentValue > nft.purchasePrice ? 'text-green-200' : 'text-red-200'}>
                          {nft.currentValue > nft.purchasePrice ? '+' : ''}{(nft.currentValue - nft.purchasePrice).toFixed(2)} ETH
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-4">
                <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                  <Send className="h-4 w-4" />
                  Transfer NFT
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button className="px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View on OpenSea
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Ownership Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Acquired:</span>
                    <span className="text-gray-900">{new Date(nft.dateAcquired).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Type:</span>
                    <span className="text-gray-900 capitalize">{nft.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Collection:</span>
                    <span className="text-gray-900">{nft.collection}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Blockchain:</span>
                    <span className="text-gray-900">Ethereum</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token Standard:</span>
                    <span className="text-gray-900">ERC-721</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <Wallet className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My NFT Wallet</h1>
              <p className="text-gray-600">Manage your digital collectibles and creations</p>
            </div>
          </div>

          {/* Wallet Address */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-gray-600 mb-1">Wallet Address</div>
                <div className="font-mono text-gray-900">0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4</div>
              </div>
              <button
                onClick={() => copyToClipboard('0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4')}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                {copiedAddress ? (
                  <Check className="h-5 w-5 text-green-600" />
                ) : (
                  <Copy className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total NFTs</p>
                <p className="text-2xl font-bold text-gray-900">{userNFTs.length}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
                <Image className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-gray-900">{totalValue.toFixed(2)} ETH</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex items-center mt-2">
              <span className="text-sm text-gray-500">≈ ${(totalValue * 2400).toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Created</p>
                <p className="text-2xl font-bold text-gray-900">{userNFTs.filter(nft => nft.type === 'created').length}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">P&L</p>
                <p className={`text-2xl font-bold ${profitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {profitLoss >= 0 ? '+' : ''}{profitLoss.toFixed(2)} ETH
                </p>
              </div>
              <div className={`p-3 rounded-xl ${profitLoss >= 0 ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-red-500 to-rose-600'}`}>
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
              {[
                { id: 'all', label: 'All NFTs' },
                { id: 'purchased', label: 'Purchased' },
                { id: 'created', label: 'Created' },
                { id: 'favorites', label: 'Favorites' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2 bg-white rounded-xl border border-gray-200 px-4 py-2">
                <Search className="h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search NFTs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border-none outline-none text-sm bg-transparent"
                />
              </div>
              <button className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4 text-gray-600" />
              </button>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* NFT Grid/List */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredNFTs.map((nft) => (
            <div key={nft.id} className={`bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer relative ${
              viewMode === 'list' ? 'flex' : ''
            }`}>
              <div className="relative">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className={`object-cover ${
                    viewMode === 'grid' ? 'w-full h-64' : 'w-48 h-48'
                  }`}
                  onClick={() => setSelectedNFT(nft)}
                />
                {nft.verified && (
                  <div className="absolute top-3 left-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <Star className="h-3 w-3 text-white fill-current" />
                    </div>
                  </div>
                )}
                <div className="absolute top-3 right-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(nft.type)}`}>
                    {nft.type === 'created' ? 'Created' : 'Purchased'}
                  </span>
                </div>
              </div>
              
              <div className="p-4 flex-1" onClick={() => setSelectedNFT(nft)}>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-gray-900 truncate">{nft.name}</h3>
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowActions(showActions === nft.id.toString() ? null : nft.id.toString())
                      }}
                      className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <MoreHorizontal className="h-4 w-4 text-gray-600" />
                    </button>
                    {showActions === nft.id.toString() && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-10">
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <Send className="h-4 w-4" />
                          Transfer
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <Share2 className="h-4 w-4" />
                          Share
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          <ExternalLink className="h-4 w-4" />
                          View External
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">{nft.collection}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRarityColor(nft.rarity)}`}>
                    {nft.rarity}
                  </span>
                  <div className="flex items-center space-x-3 text-xs text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{nft.views}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Heart className="h-3 w-3" />
                      <span>{nft.likes}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">Current Value</div>
                    <div className="text-lg font-bold text-gray-900">{nft.currentValue} ETH</div>
                  </div>
                  {nft.purchasePrice > 0 && (
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-gray-500">P&L</div>
                      <div className={`text-sm font-medium ${nft.currentValue > nft.purchasePrice ? 'text-green-600' : 'text-red-600'}`}>
                        {nft.currentValue > nft.purchasePrice ? '+' : ''}{(nft.currentValue - nft.purchasePrice).toFixed(2)} ETH
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredNFTs.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Image className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No NFTs found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search terms' : 'Start by purchasing or creating your first NFT'}
            </p>
          </div>
        )}
      </div>

      {/* NFT Detail Modal */}
      {selectedNFT && <NFTDetailModal nft={selectedNFT} />}
    </div>
  )
}

export default WalletPage
