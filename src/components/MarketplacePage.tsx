import React, { useState } from 'react'
import { ShoppingBag, Star, Shield, Zap, Users, Vote, Crown, Award, Image, TrendingUp, Eye, Heart, Filter, Grid, List, Search, X } from 'lucide-react'

export const MarketplacePage: React.FC = () => {
  const [activeNFTTab, setActiveNFTTab] = useState<'featured' | 'trending' | 'collections' | 'art' | 'gaming' | 'music'>('featured')
  const [nftViewMode, setNftViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedNFT, setSelectedNFT] = useState<any>(null)

  const products = [
    {
      id: 1,
      name: 'DAO Basic Membership',
      price: 99.99,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Join the CryptoVault DAO with basic voting rights and governance participation',
      type: 'membership',
      tier: 'basic',
      benefits: ['Voting Rights', 'Proposal Viewing', 'Community Access', 'Monthly Reports']
    },
    {
      id: 2,
      name: 'DAO Premium Membership',
      price: 299.99,
      rating: 4.9,
      image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Premium DAO membership with enhanced voting power and proposal creation rights',
      type: 'membership',
      tier: 'premium',
      benefits: ['Enhanced Voting Power (3x)', 'Proposal Creation', 'Priority Support', 'Exclusive Events', 'Treasury Insights']
    },
    {
      id: 3,
      name: 'DAO Elite Membership',
      price: 599.99,
      rating: 5.0,
      image: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Elite DAO membership with maximum voting power and governance privileges',
      type: 'membership',
      tier: 'elite',
      benefits: ['Maximum Voting Power (5x)', 'Fast-Track Proposals', 'Direct Treasury Access', 'Advisory Board Access', 'Custom Analytics']
    },
    {
      id: 4,
      name: 'Crypto Trading Course',
      price: 199.99,
      rating: 4.8,
      image: 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Master cryptocurrency trading with expert guidance and strategies',
      type: 'course'
    },
    {
      id: 5,
      name: 'Premium Analytics',
      price: 49.99,
      rating: 4.7,
      image: 'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Advanced market analysis and trading signals for better decisions',
      type: 'service'
    }
  ]

  const nftCollections = [
    {
      id: 1,
      name: 'CryptoVault Genesis',
      description: 'The original CryptoVault NFT collection featuring unique digital art',
      image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400',
      floorPrice: 2.5,
      totalVolume: 1250,
      items: 10000,
      owners: 3420,
      verified: true
    },
    {
      id: 2,
      name: 'Digital Legends',
      description: 'Legendary characters from the crypto universe',
      image: 'https://images.pexels.com/photos/8369769/pexels-photo-8369769.jpeg?auto=compress&cs=tinysrgb&w=400',
      floorPrice: 1.8,
      totalVolume: 890,
      items: 5000,
      owners: 2100,
      verified: true
    },
    {
      id: 3,
      name: 'Pixel Warriors',
      description: 'Retro-style pixel art warriors ready for battle',
      image: 'https://images.pexels.com/photos/8369641/pexels-photo-8369641.jpeg?auto=compress&cs=tinysrgb&w=400',
      floorPrice: 0.75,
      totalVolume: 450,
      items: 8000,
      owners: 1800,
      verified: false
    }
  ]

  const featuredNFTs = [
    {
      id: 1,
      name: 'Genesis Dragon #1247',
      collection: 'CryptoVault Genesis',
      price: 3.2,
      image: 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400',
      rarity: 'Legendary',
      likes: 234,
      views: 1520,
      owner: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      verified: true,
      traits: [
        { trait_type: 'Background', value: 'Cosmic', rarity: '2%' },
        { trait_type: 'Dragon Type', value: 'Fire', rarity: '15%' },
        { trait_type: 'Eyes', value: 'Golden', rarity: '5%' },
        { trait_type: 'Wings', value: 'Ethereal', rarity: '3%' }
      ]
    },
    {
      id: 2,
      name: 'Cyber Samurai #0089',
      collection: 'Digital Legends',
      price: 2.1,
      image: 'https://images.pexels.com/photos/8369769/pexels-photo-8369769.jpeg?auto=compress&cs=tinysrgb&w=400',
      rarity: 'Epic',
      likes: 189,
      views: 980,
      owner: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      verified: true,
      traits: [
        { trait_type: 'Armor', value: 'Neon', rarity: '8%' },
        { trait_type: 'Weapon', value: 'Plasma Katana', rarity: '4%' },
        { trait_type: 'Helmet', value: 'Cyber Mask', rarity: '12%' }
      ]
    },
    {
      id: 3,
      name: 'Pixel Knight #4521',
      collection: 'Pixel Warriors',
      price: 0.95,
      image: 'https://images.pexels.com/photos/8369641/pexels-photo-8369641.jpeg?auto=compress&cs=tinysrgb&w=400',
      rarity: 'Rare',
      likes: 156,
      views: 720,
      owner: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      verified: false,
      traits: [
        { trait_type: 'Class', value: 'Knight', rarity: '25%' },
        { trait_type: 'Shield', value: 'Royal', rarity: '10%' },
        { trait_type: 'Sword', value: 'Enchanted', rarity: '15%' }
      ]
    },
    {
      id: 4,
      name: 'Mystic Phoenix #0001',
      collection: 'CryptoVault Genesis',
      price: 5.8,
      image: 'https://images.pexels.com/photos/8369652/pexels-photo-8369652.jpeg?auto=compress&cs=tinysrgb&w=400',
      rarity: 'Mythic',
      likes: 567,
      views: 3240,
      owner: '0xA0b86a33E6441e8e5c3F27f9c5c3F27f9c5c3F27',
      verified: true,
      traits: [
        { trait_type: 'Element', value: 'Fire & Ice', rarity: '0.5%' },
        { trait_type: 'Wings', value: 'Rainbow', rarity: '1%' },
        { trait_type: 'Aura', value: 'Divine', rarity: '0.8%' }
      ]
    },
    {
      id: 5,
      name: 'Tech Wizard #2847',
      collection: 'Digital Legends',
      price: 1.6,
      image: 'https://images.pexels.com/photos/8369755/pexels-photo-8369755.jpeg?auto=compress&cs=tinysrgb&w=400',
      rarity: 'Rare',
      likes: 203,
      views: 1100,
      owner: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      verified: true,
      traits: [
        { trait_type: 'Staff', value: 'Quantum', rarity: '7%' },
        { trait_type: 'Robe', value: 'Holographic', rarity: '9%' },
        { trait_type: 'Hat', value: 'Neural Crown', rarity: '6%' }
      ]
    },
    {
      id: 6,
      name: 'Battle Mage #1337',
      collection: 'Pixel Warriors',
      price: 1.2,
      image: 'https://images.pexels.com/photos/8369663/pexels-photo-8369663.jpeg?auto=compress&cs=tinysrgb&w=400',
      rarity: 'Epic',
      likes: 178,
      views: 890,
      owner: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      verified: false,
      traits: [
        { trait_type: 'Magic Type', value: 'Lightning', rarity: '18%' },
        { trait_type: 'Armor', value: 'Mage Robes', rarity: '20%' },
        { trait_type: 'Weapon', value: 'Staff of Power', rarity: '12%' }
      ]
    }
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case 'mythic': return 'text-purple-600 bg-purple-100'
      case 'legendary': return 'text-yellow-600 bg-yellow-100'
      case 'epic': return 'text-blue-600 bg-blue-100'
      case 'rare': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'basic': return <Users className="h-5 w-5" />
      case 'premium': return <Award className="h-5 w-5" />
      case 'elite': return <Crown className="h-5 w-5" />
      default: return <Star className="h-5 w-5" />
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'basic': return 'from-blue-500 to-cyan-600'
      case 'premium': return 'from-purple-500 to-pink-600'
      case 'elite': return 'from-yellow-500 to-orange-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const getTierBadge = (tier: string) => {
    switch (tier) {
      case 'basic': return 'bg-blue-100 text-blue-800'
      case 'premium': return 'bg-purple-100 text-purple-800'
      case 'elite': return 'bg-yellow-100 text-yellow-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const NFTDetailModal = ({ nft }: { nft: any }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <Image className="h-6 w-6 text-white" />
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
                  <div className="text-sm text-purple-100 mb-1">Current Price</div>
                  <div className="text-3xl font-bold">{nft.price} ETH</div>
                  <div className="text-sm text-purple-100 mt-1">≈ ${(nft.price * 2400).toLocaleString()}</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <button className="w-full px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
                  Buy Now
                </button>
                <button className="w-full px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                  Make Offer
                </button>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Owner:</span>
                    <span className="text-gray-900 font-mono text-xs">
                      {nft.owner.slice(0, 6)}...{nft.owner.slice(-4)}
                    </span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace</h1>
          <p className="text-gray-600">Discover premium crypto tools, services, DAO memberships, and exclusive NFTs</p>
        </div>

        {/* NFT Marketplace Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
              <Image className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">NFT Marketplace</h2>
              <p className="text-gray-600">Discover, collect, and trade unique digital assets</p>
            </div>
          </div>

          {/* NFT Navigation */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex space-x-1 bg-gray-100 rounded-xl p-1">
                {[
                  { id: 'featured', label: 'Featured' },
                  { id: 'trending', label: 'Trending' },
                  { id: 'collections', label: 'Collections' },
                  { id: 'art', label: 'Art' },
                  { id: 'gaming', label: 'Gaming' },
                  { id: 'music', label: 'Music' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveNFTTab(tab.id as any)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeNFTTab === tab.id
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
                    className="border-none outline-none text-sm bg-transparent"
                  />
                </div>
                <button className="p-2 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                  <Filter className="h-4 w-4 text-gray-600" />
                </button>
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setNftViewMode('grid')}
                    className={`p-2 rounded-md transition-colors ${
                      nftViewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <Grid className="h-4 w-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => setNftViewMode('list')}
                    className={`p-2 rounded-md transition-colors ${
                      nftViewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <List className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Collections Tab */}
          {activeNFTTab === 'collections' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {nftCollections.map((collection) => (
                <div key={collection.id} className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <div className="relative">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-48 object-cover"
                    />
                    {collection.verified && (
                      <div className="absolute top-4 right-4">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <Star className="h-4 w-4 text-white fill-current" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{collection.name}</h3>
                    <p className="text-gray-600 mb-4">{collection.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                      <div>
                        <div className="text-gray-600">Floor Price</div>
                        <div className="font-semibold text-gray-900">{collection.floorPrice} ETH</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Volume</div>
                        <div className="font-semibold text-gray-900">{collection.totalVolume} ETH</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Items</div>
                        <div className="font-semibold text-gray-900">{collection.items.toLocaleString()}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">Owners</div>
                        <div className="font-semibold text-gray-900">{collection.owners.toLocaleString()}</div>
                      </div>
                    </div>
                    
                    <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-300">
                      View Collection
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Featured/Trending NFTs */}
          {(activeNFTTab === 'featured' || activeNFTTab === 'trending' || activeNFTTab === 'art' || activeNFTTab === 'gaming' || activeNFTTab === 'music') && (
            <div className={`grid gap-6 mb-8 ${
              nftViewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {featuredNFTs.map((nft) => (
                <div key={nft.id} className={`bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer ${
                  nftViewMode === 'list' ? 'flex' : ''
                }`} onClick={() => setSelectedNFT(nft)}>
                  <img
                    src={nft.image}
                    alt={nft.name}
                    className={`object-cover ${
                      nftViewMode === 'grid' ? 'w-full h-64' : 'w-48 h-48'
                    }`}
                  />
                  
                  <div className="p-4 flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{nft.name}</h3>
                      {nft.verified && (
                        <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                          <Star className="h-3 w-3 text-white fill-current" />
                        </div>
                      )}
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
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm text-gray-600">Price</div>
                        <div className="text-lg font-bold text-gray-900">{nft.price} ETH</div>
                      </div>
                      <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-600 text-white rounded-xl font-medium hover:from-purple-600 hover:to-pink-700 transition-all duration-300 text-sm">
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* NFT Stats */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">NFT Marketplace Stats</h3>
              <p className="text-purple-100">Discover the hottest digital collectibles</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Image className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">25,000+</h4>
                <p className="text-purple-100 text-sm">Total NFTs</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">8,500+</h4>
                <p className="text-purple-100 text-sm">Active Collectors</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">2,450 ETH</h4>
                <p className="text-purple-100 text-sm">Total Volume</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">150+</h4>
                <p className="text-purple-100 text-sm">Verified Collections</p>
              </div>
            </div>
          </div>
        </div>

        {/* DAO Membership Section */}
        <div className="mb-12">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Vote className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">DAO Memberships</h2>
              <p className="text-gray-600">Join our decentralized governance and shape the future of CryptoVault</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {products.filter(product => product.type === 'membership').map((product) => (
              <div key={product.id} className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 relative">
                {product.tier === 'elite' && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTierBadge(product.tier!)}`}>
                      {product.tier?.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Membership Benefits:</h4>
                    <ul className="space-y-1">
                      {product.benefits?.slice(0, 3).map((benefit, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                          {benefit}
                        </li>
                      ))}
                      {product.benefits && product.benefits.length > 3 && (
                        <li className="text-sm text-gray-500">
                          +{product.benefits.length - 3} more benefits
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    <button className={`px-6 py-3 bg-gradient-to-r ${getTierColor(product.tier!)} text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-2`}>
                      {getTierIcon(product.tier!)}
                      Join DAO
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* DAO Membership Features */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Why Join Our DAO?</h3>
              <p className="text-blue-100">Become part of the decentralized future of cryptocurrency management</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Vote className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Governance Rights</h4>
                <p className="text-blue-100 text-sm">Vote on proposals and shape platform decisions</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Exclusive Access</h4>
                <p className="text-blue-100 text-sm">Access premium features and early releases</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-semibold mb-2">Rewards Program</h4>
                <p className="text-blue-100 text-sm">Earn rewards for active participation</p>
              </div>
            </div>
          </div>
        </div>

        {/* Other Products Section */}
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
              <ShoppingBag className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Tools & Services</h2>
              <p className="text-gray-600">Premium crypto tools and educational resources</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.filter(product => product.type !== 'membership').map((product) => (
              <div key={product.id} className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                    <button className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center gap-2">
                      <ShoppingBag className="h-4 w-4" />
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Secure Payments</h3>
            <p className="text-gray-600">All transactions are protected with bank-level security</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Instant Delivery</h3>
            <p className="text-gray-600">Digital products delivered immediately after purchase</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="h-6 w-6 text-white" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Premium Quality</h3>
            <p className="text-gray-600">Curated selection of the best crypto tools and services</p>
          </div>
        </div>
      </div>

      {/* NFT Detail Modal */}
      {selectedNFT && <NFTDetailModal nft={selectedNFT} />}
    </div>
  )
}

export default MarketplacePage
