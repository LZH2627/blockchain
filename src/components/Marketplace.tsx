import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  ShoppingCart, 
  Eye, 
  Heart,
  MessageCircle,
  Share2,
  MoreHorizontal,
  Grid3X3,
  List,
  SortAsc,
  SortDesc,
  MapPin,
  Clock,
  Shield,
  Award,
  Zap,
  DollarSign,
  Users,
  Package,
  Truck,
  CreditCard
} from 'lucide-react'

interface MarketplaceItem {
  id: string
  title: string
  description: string
  price: number
  originalPrice?: number
  category: string
  seller: {
    name: string
    avatar: string
    rating: number
    verified: boolean
    location: string
  }
  images: string[]
  tags: string[]
  stats: {
    views: number
    likes: number
    comments: number
    sales: number
  }
  condition: 'new' | 'like-new' | 'good' | 'fair'
  shipping: {
    free: boolean
    cost?: number
    time: string
  }
  featured: boolean
  trending: boolean
  discount?: number
}

interface MarketplaceProps {
  onClose: () => void
}

const Marketplace: React.FC<MarketplaceProps> = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)
  const [selectedItem, setSelectedItem] = useState<MarketplaceItem | null>(null)

  const categories = [
    { id: 'all', name: 'All Items', count: 1047 },
    { id: 'electronics', name: 'Electronics', count: 224 },
    { id: 'fashion', name: 'Fashion', count: 189 },
    { id: 'home', name: 'Home & Garden', count: 156 },
    { id: 'sports', name: 'Sports', count: 98 },
    { id: 'books', name: 'Books', count: 87 },
    { id: 'collectibles', name: 'Collectibles', count: 134 },
    { id: 'services', name: 'Services', count: 159 }
  ]

  const [marketplaceItems] = useState<MarketplaceItem[]>([
    {
      id: '2',
      title: 'Vintage Rolex Submariner 1970s',
      description: 'Authentic vintage Rolex Submariner from the 1970s. Serviced and authenticated by certified watchmaker.',
      price: 12500,
      category: 'collectibles',
      seller: {
        name: 'Luxury Timepieces',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.8,
        verified: true,
        location: 'New York, NY'
      },
      images: [
        'https://images.pexels.com/photos/190819/pexels-photo-190819.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1697214/pexels-photo-1697214.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      tags: ['Rolex', 'Vintage', 'Luxury', 'Investment'],
      stats: { views: 892, likes: 156, comments: 34, sales: 23 },
      condition: 'good',
      shipping: { free: false, cost: 25, time: '1-2 days' },
      featured: true,
      trending: false
    },
    {
      id: '3',
      title: 'Designer Handbag Collection',
      description: 'Curated collection of authentic designer handbags from Louis Vuitton, Chanel, and Hermès.',
      price: 2850,
      originalPrice: 4200,
      category: 'fashion',
      seller: {
        name: 'Fashion Forward',
        avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.7,
        verified: true,
        location: 'Los Angeles, CA'
      },
      images: [
        'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      tags: ['Designer', 'Luxury', 'Authentic', 'Collection'],
      stats: { views: 634, likes: 78, comments: 19, sales: 45 },
      condition: 'like-new',
      shipping: { free: true, time: '3-5 days' },
      featured: false,
      trending: true,
      discount: 32
    },
    {
      id: '4',
      title: 'Professional Photography Services',
      description: 'Award-winning photographer offering portrait, wedding, and commercial photography services.',
      price: 500,
      category: 'services',
      seller: {
        name: 'Creative Lens Studio',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 5.0,
        verified: true,
        location: 'Chicago, IL'
      },
      images: [
        'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1264210/pexels-photo-1264210.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      tags: ['Photography', 'Professional', 'Wedding', 'Portrait'],
      stats: { views: 423, likes: 67, comments: 12, sales: 89 },
      condition: 'new',
      shipping: { free: true, time: 'On-demand' },
      featured: false,
      trending: false
    },
    {
      id: '5',
      title: 'Gaming Setup - RTX 4090 Build',
      description: 'High-end gaming PC with RTX 4090, i9-13900K, 32GB DDR5, custom water cooling.',
      price: 4299,
      originalPrice: 5200,
      category: 'electronics',
      seller: {
        name: 'Gaming Builds Pro',
        avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.9,
        verified: true,
        location: 'Austin, TX'
      },
      images: [
        'https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      tags: ['Gaming', 'RTX 4090', 'Custom Build', 'High-end'],
      stats: { views: 1156, likes: 234, comments: 45, sales: 12 },
      condition: 'new',
      shipping: { free: false, cost: 50, time: '5-7 days' },
      featured: true,
      trending: true,
      discount: 17
    },
    {
      id: '6',
      title: 'Rare Book Collection - First Editions',
      description: 'Collection of rare first edition books including classics and modern literature.',
      price: 1850,
      category: 'books',
      seller: {
        name: 'Rare Books Collector',
        avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=150',
        rating: 4.6,
        verified: true,
        location: 'Boston, MA'
      },
      images: [
        'https://images.pexels.com/photos/1370295/pexels-photo-1370295.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/159866/books-book-pages-read-159866.jpeg?auto=compress&cs=tinysrgb&w=400'
      ],
      tags: ['Books', 'First Edition', 'Rare', 'Literature'],
      stats: { views: 345, likes: 45, comments: 8, sales: 34 },
      condition: 'good',
      shipping: { free: true, time: '3-4 days' },
      featured: false,
      trending: false
    }
  ])

  const filteredItems = marketplaceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    
    return matchesSearch && matchesCategory
  })

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price
      case 'price-high':
        return b.price - a.price
      case 'newest':
        return b.stats.views - a.stats.views
      case 'popular':
        return b.stats.likes - a.stats.likes
      case 'featured':
      default:
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0)
    }
  })

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price)
  }

  const renderItemCard = (item: MarketplaceItem) => (
    <div 
      key={item.id}
      className="group rounded-2xl backdrop-blur-md bg-white/40 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden opacity-90 hover:opacity-100"
      onClick={() => setSelectedItem(item)}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={item.images[0]}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-2">
          {item.featured && (
            <span className="px-2 py-1 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-medium flex items-center space-x-1">
              <Star className="h-3 w-3" />
              <span>Featured</span>
            </span>
          )}
          {item.trending && (
            <span className="px-2 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-600 text-white text-xs font-medium flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>Trending</span>
            </span>
          )}
          {item.discount && (
            <span className="px-2 py-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium">
              -{item.discount}%
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-2 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-colors">
            <Heart className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-full backdrop-blur-md bg-white/20 border border-white/30 text-white hover:bg-white/30 transition-colors">
            <Share2 className="h-4 w-4" />
          </button>
        </div>

        {/* Condition Badge */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            item.condition === 'new' ? 'bg-green-500/80 text-white' :
            item.condition === 'like-new' ? 'bg-blue-500/80 text-white' :
            item.condition === 'good' ? 'bg-yellow-500/80 text-white' :
            'bg-gray-500/80 text-white'
          }`}>
            {item.condition.charAt(0).toUpperCase() + item.condition.slice(1)}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-center">
          {item.title}
        </h3>

        {/* Description - Centered */}
        <p className="text-sm text-gray-600 mb-3 text-center line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Price */}
        <div className="flex items-center justify-center space-x-2 mb-3">
          <span className="text-xl font-bold text-gray-800">{formatPrice(item.price)}</span>
          {item.originalPrice && (
            <span className="text-sm text-gray-500 line-through">{formatPrice(item.originalPrice)}</span>
          )}
        </div>

        {/* Seller */}
        <div className="flex items-center justify-center space-x-2 mb-3">
          <img
            src={item.seller.avatar}
            alt={item.seller.name}
            className="w-6 h-6 rounded-full object-cover"
          />
          <span className="text-sm text-gray-600">{item.seller.name}</span>
          {item.seller.verified && (
            <Shield className="h-4 w-4 text-blue-500" />
          )}
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-500 fill-current" />
            <span className="text-xs text-gray-600">{item.seller.rating}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1">
              <Eye className="h-3 w-3" />
              <span>{item.stats.views}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Heart className="h-3 w-3" />
              <span>{item.stats.likes}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-3 w-3" />
              <span>{item.stats.comments}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Package className="h-3 w-3" />
            <span>{item.stats.sales} sold</span>
          </div>
        </div>

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-gray-600">
            <Truck className="h-3 w-3" />
            <span>{item.shipping.free ? 'Free shipping' : `$${item.shipping.cost} shipping`}</span>
          </div>
          <span className="text-xs text-gray-500">{item.shipping.time}</span>
        </div>
      </div>
    </div>
  )

  const renderItemDetails = () => {
    if (!selectedItem) return null

    return (
      <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl">
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Item Details</h2>
              <button
                onClick={() => setSelectedItem(null)}
                className="p-2 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Images */}
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img
                    src={selectedItem.images[0]}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {selectedItem.images.length > 1 && (
                  <div className="grid grid-cols-4 gap-2">
                    {selectedItem.images.slice(1).map((image, index) => (
                      <div key={index} className="aspect-square rounded-lg overflow-hidden">
                        <img
                          src={image}
                          alt={`${selectedItem.title} ${index + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="space-y-6">
                {/* Title and Price */}
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h1 className="text-2xl font-bold text-gray-800">{selectedItem.title}</h1>
                    <div className="flex space-x-2">
                      <button className="p-2 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 text-gray-600 hover:text-red-500 transition-colors">
                        <Heart className="h-5 w-5" />
                      </button>
                      <button className="p-2 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 text-gray-600 hover:text-blue-500 transition-colors">
                        <Share2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-3xl font-bold text-gray-800">{formatPrice(selectedItem.price)}</span>
                    {selectedItem.originalPrice && (
                      <>
                        <span className="text-lg text-gray-500 line-through">{formatPrice(selectedItem.originalPrice)}</span>
                        <span className="px-2 py-1 rounded-full bg-green-500 text-white text-sm font-medium">
                          Save {formatPrice(selectedItem.originalPrice - selectedItem.price)}
                        </span>
                      </>
                    )}
                  </div>

                  <div className="text-center mb-4">
                    <p className="text-gray-600 leading-relaxed">{selectedItem.description}</p>
                  </div>
                </div>

                {/* Seller Info */}
                <div className="p-4 rounded-xl backdrop-blur-md bg-white/30 border border-white/40">
                  <div className="flex items-center space-x-3 mb-3">
                    <img
                      src={selectedItem.seller.avatar}
                      alt={selectedItem.seller.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <h3 className="font-semibold text-gray-800">{selectedItem.seller.name}</h3>
                        {selectedItem.seller.verified && (
                          <Shield className="h-4 w-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Star className="h-3 w-3 text-yellow-500 fill-current" />
                          <span>{selectedItem.seller.rating}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{selectedItem.seller.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="w-full p-2 rounded-xl backdrop-blur-md bg-white/40 border border-white/50 text-gray-700 font-medium hover:bg-white/50 transition-colors">
                    Contact Seller
                  </button>
                </div>

                {/* Item Details */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Condition:</span>
                    <span className="font-medium text-gray-800 capitalize">{selectedItem.condition}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="font-medium text-gray-800 capitalize">{selectedItem.category}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium text-gray-800">
                      {selectedItem.shipping.free ? 'Free' : formatPrice(selectedItem.shipping.cost!)} • {selectedItem.shipping.time}
                    </span>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 rounded-full backdrop-blur-md bg-white/30 border border-white/40 text-sm text-gray-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2">
                    <ShoppingCart className="h-5 w-5" />
                    <span>Add to Cart</span>
                  </button>
                  <button className="w-full p-4 rounded-xl backdrop-blur-md bg-white/30 border border-white/40 text-gray-700 font-semibold hover:bg-white/40 transition-colors flex items-center justify-center space-x-2">
                    <CreditCard className="h-5 w-5" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-7xl max-h-[95vh] overflow-hidden rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Marketplace</h2>
                <p className="text-gray-600 mt-1">Discover amazing deals and unique items</p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 text-gray-600 hover:text-gray-800 transition-colors"
              >
                <span className="text-2xl">×</span>
              </button>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search marketplace..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 placeholder-gray-500"
                />
              </div>

              {/* Controls */}
              <div className="flex items-center space-x-3">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name} ({category.count})
                    </option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>

                <div className="flex rounded-xl backdrop-blur-md bg-white/50 border border-white/30 overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    <Grid3X3 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:text-gray-800'}`}
                  >
                    <List className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-xl backdrop-blur-md bg-white/30 border border-white/40 text-center">
                <div className="text-2xl font-bold text-gray-800 mb-1">{sortedItems.length}</div>
                <div className="text-sm text-gray-600">Items Found</div>
              </div>
              <div className="p-4 rounded-xl backdrop-blur-md bg-white/30 border border-white/40 text-center">
                <div className="text-2xl font-bold text-green-600 mb-1">{sortedItems.filter(item => item.featured).length}</div>
                <div className="text-sm text-gray-600">Featured</div>
              </div>
              <div className="p-4 rounded-xl backdrop-blur-md bg-white/30 border border-white/40 text-center">
                <div className="text-2xl font-bold text-blue-600 mb-1">{sortedItems.filter(item => item.trending).length}</div>
                <div className="text-sm text-gray-600">Trending</div>
              </div>
              <div className="p-4 rounded-xl backdrop-blur-md bg-white/30 border border-white/40 text-center">
                <div className="text-2xl font-bold text-purple-600 mb-1">{sortedItems.filter(item => item.discount).length}</div>
                <div className="text-sm text-gray-600">On Sale</div>
              </div>
            </div>

            {/* Items Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {sortedItems.map(renderItemCard)}
            </div>

            {/* Empty State */}
            {sortedItems.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No items found</h3>
                <p className="text-gray-600">Try adjusting your search or filters</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Item Details Modal */}
      {renderItemDetails()}
    </div>
  )
}

export default Marketplace
