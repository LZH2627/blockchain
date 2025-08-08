import React, { useState } from 'react'
import { Search, Calendar, TrendingUp, ExternalLink } from 'lucide-react'

interface NewsArticle {
  id: string
  title: string
  summary: string
  url: string
  publishedAt: string
  source: string
  category: string
}

const NewsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const mockNews: NewsArticle[] = [
    {
      id: '1',
      title: 'Bitcoin Reaches New All-Time High Amid Institutional Adoption',
      summary: 'Bitcoin surged to unprecedented levels as major corporations continue to add cryptocurrency to their balance sheets.',
      url: '#',
      publishedAt: '2024-01-15T10:30:00Z',
      source: 'CryptoNews',
      category: 'bitcoin'
    },
    {
      id: '2',
      title: 'Ethereum 2.0 Staking Rewards Hit Record Numbers',
      summary: 'The Ethereum network sees massive growth in staking participation, with rewards reaching new highs.',
      url: '#',
      publishedAt: '2024-01-15T08:15:00Z',
      source: 'BlockchainDaily',
      category: 'ethereum'
    },
    {
      id: '3',
      title: 'Regulatory Clarity Boosts Crypto Market Confidence',
      summary: 'New regulatory frameworks provide clearer guidelines for cryptocurrency operations and trading.',
      url: '#',
      publishedAt: '2024-01-14T16:45:00Z',
      source: 'FinanceToday',
      category: 'regulation'
    },
    {
      id: '4',
      title: 'DeFi Protocols See Massive TVL Growth',
      summary: 'Decentralized Finance protocols experience unprecedented growth in Total Value Locked.',
      url: '#',
      publishedAt: '2024-01-14T14:20:00Z',
      source: 'DeFiInsider',
      category: 'defi'
    }
  ]

  const categories = [
    { value: 'all', label: 'All News' },
    { value: 'bitcoin', label: 'Bitcoin' },
    { value: 'ethereum', label: 'Ethereum' },
    { value: 'defi', label: 'DeFi' },
    { value: 'regulation', label: 'Regulation' }
  ]

  const filteredNews = mockNews.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.summary.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Crypto News</h1>
          <p className="text-gray-600">Stay updated with the latest cryptocurrency news and market insights</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search news..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
          >
            {categories.map(category => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredNews.map((article) => (
            <article
              key={article.id}
              className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    {article.category.toUpperCase()}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(article.publishedAt)}
                  </div>
                </div>
                
                <h2 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                  {article.title}
                </h2>
                
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {article.summary}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{article.source}</span>
                  <a
                    href={article.url}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                  >
                    Read More
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No news found</h3>
            <p className="text-gray-500">Try adjusting your search terms or category filter</p>
          </div>
        )}

        {/* Market Insights */}
        <div className="mt-12 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Market Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">+12.5%</div>
              <div className="text-sm text-gray-600">Market Cap Growth</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">$2.1T</div>
              <div className="text-sm text-gray-600">Total Market Cap</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-2">45%</div>
              <div className="text-sm text-gray-600">Bitcoin Dominance</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsPage
