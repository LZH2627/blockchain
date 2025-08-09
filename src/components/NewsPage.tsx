import React, { useState } from 'react'
import { Search, Calendar, TrendingUp, ExternalLink, X } from 'lucide-react'

interface NewsArticle {
  id: string
  title: string
  summary: string
  fullContent: string
  url: string
  publishedAt: string
  source: string
  category: string
  author?: string
  imageUrl?: string
}

interface NewsModalProps {
  article: NewsArticle | null
  isOpen: boolean
  onClose: () => void
}

const NewsModal: React.FC<NewsModalProps> = ({ article, isOpen, onClose }) => {
  if (!isOpen || !article) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              {article.category.toUpperCase()}
            </span>
            <span className="text-sm text-gray-500">{article.source}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">
            {article.imageUrl && (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
            )}
            
            <h1 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
              {article.title}
            </h1>
            
            <div className="flex items-center text-sm text-gray-500 mb-6 space-x-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1" />
                {formatDate(article.publishedAt)}
              </div>
              {article.author && (
                <div>By {article.author}</div>
              )}
            </div>
            
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                {article.fullContent}
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                Read Original Article
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const NewsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const mockNews: NewsArticle[] = [
    {
      id: '1',
      title: 'Bitcoin Reaches New All-Time High Amid Institutional Adoption',
      summary: 'Bitcoin surged to unprecedented levels as major corporations continue to add cryptocurrency to their balance sheets.',
      fullContent: `Bitcoin has reached a new all-time high, surpassing previous records as institutional adoption continues to accelerate across the financial sector. The world's largest cryptocurrency by market capitalization has seen unprecedented demand from major corporations, investment funds, and financial institutions.

The surge comes as several Fortune 500 companies have announced significant Bitcoin purchases for their corporate treasuries. This institutional adoption represents a fundamental shift in how traditional finance views cryptocurrency, moving from skepticism to strategic allocation.

Key factors driving this rally include:

• Increased institutional investment from pension funds and endowments
• Growing acceptance of Bitcoin as a hedge against inflation
• Regulatory clarity in major markets providing confidence to institutional investors
• Development of Bitcoin ETFs making it easier for traditional investors to gain exposure
• Corporate treasury adoption by major technology companies

Market analysts suggest this trend is likely to continue as more institutions recognize Bitcoin's potential as a store of value. The cryptocurrency's limited supply of 21 million coins creates scarcity that appeals to investors seeking alternatives to traditional assets.

The current rally has also been supported by strong technical indicators and growing network adoption. On-chain metrics show increasing long-term holder accumulation, suggesting confidence in Bitcoin's future prospects.

However, experts caution that volatility remains a characteristic of the cryptocurrency market, and investors should be prepared for potential corrections even amid the overall bullish trend.`,
      url: 'https://example.com/bitcoin-ath',
      publishedAt: '2024-01-15T10:30:00Z',
      source: 'CryptoNews',
      category: 'bitcoin',
      author: 'Sarah Johnson',
      imageUrl: 'https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '2',
      title: 'Ethereum 2.0 Staking Rewards Hit Record Numbers',
      summary: 'The Ethereum network sees massive growth in staking participation, with rewards reaching new highs.',
      fullContent: `Ethereum's transition to proof-of-stake has reached a significant milestone as staking rewards hit record numbers, with over 32 million ETH now staked on the network. This represents approximately 26% of the total ETH supply, demonstrating strong validator participation and network security.

The Ethereum 2.0 upgrade, also known as "The Merge," has successfully transformed the network from an energy-intensive proof-of-work system to a more sustainable proof-of-stake consensus mechanism. This change has not only reduced Ethereum's energy consumption by over 99% but has also created new opportunities for ETH holders to earn rewards through staking.

Current staking statistics show:

• Annual percentage yield (APY) for validators averaging 4-6%
• Over 1 million active validators securing the network
• Reduced ETH issuance creating deflationary pressure
• Improved network finality and transaction confirmation times
• Enhanced security through economic incentives

The high participation rate in staking reflects confidence in Ethereum's long-term prospects and the attractiveness of earning passive income through validation. Liquid staking protocols have also made it easier for smaller holders to participate without meeting the 32 ETH minimum requirement for solo staking.

Industry experts note that the success of Ethereum's staking mechanism could influence other blockchain networks to adopt similar consensus mechanisms. The combination of reduced energy consumption and attractive yields has positioned Ethereum as a leader in sustainable blockchain technology.

Looking ahead, further improvements to the Ethereum network are planned, including sharding and other scalability enhancements that could further increase the network's capacity and efficiency.`,
      url: 'https://example.com/ethereum-staking',
      publishedAt: '2024-01-15T08:15:00Z',
      source: 'BlockchainDaily',
      category: 'ethereum',
      author: 'Michael Chen',
      imageUrl: 'https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '3',
      title: 'Regulatory Clarity Boosts Crypto Market Confidence',
      summary: 'New regulatory frameworks provide clearer guidelines for cryptocurrency operations and trading.',
      fullContent: `Regulatory clarity has emerged as a key driver of renewed confidence in the cryptocurrency market, with several major jurisdictions introducing comprehensive frameworks for digital asset operations. These developments have provided much-needed certainty for businesses and investors operating in the crypto space.

The European Union's Markets in Crypto-Assets (MiCA) regulation has set a precedent for comprehensive crypto regulation, covering everything from stablecoin issuance to crypto exchange operations. Similar initiatives in other jurisdictions are following suit, creating a more predictable regulatory environment.

Key regulatory developments include:

• Clear licensing requirements for crypto service providers
• Consumer protection measures for retail investors
• Anti-money laundering (AML) compliance standards
• Taxation guidelines for crypto transactions
• Institutional custody requirements and standards

The impact of regulatory clarity extends beyond compliance costs. Financial institutions that were previously hesitant to enter the crypto space are now developing digital asset strategies. Traditional banks are launching crypto custody services, and payment processors are integrating cryptocurrency options.

Market participants have responded positively to these developments, with increased trading volumes and institutional participation. The regulatory framework provides legitimacy that has been crucial for mainstream adoption.

However, the regulatory landscape remains complex, with different jurisdictions taking varying approaches. Industry participants emphasize the importance of global coordination to prevent regulatory arbitrage and ensure consistent standards across markets.

Legal experts suggest that while the current regulatory environment represents significant progress, ongoing dialogue between regulators and industry participants will be essential to address emerging challenges and technological developments in the rapidly evolving crypto ecosystem.`,
      url: 'https://example.com/crypto-regulation',
      publishedAt: '2024-01-14T16:45:00Z',
      source: 'FinanceToday',
      category: 'regulation',
      author: 'Emma Rodriguez',
      imageUrl: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '4',
      title: 'DeFi Protocols See Massive TVL Growth',
      summary: 'Decentralized Finance protocols experience unprecedented growth in Total Value Locked.',
      fullContent: `Decentralized Finance (DeFi) protocols have experienced remarkable growth in Total Value Locked (TVL), reaching new heights as investors seek yield opportunities and financial services outside traditional banking systems. The DeFi ecosystem now represents over $200 billion in locked value across various protocols.

This growth reflects the maturation of DeFi infrastructure and increasing confidence in decentralized financial services. Major protocols have demonstrated resilience through market cycles and have continuously improved their security and user experience.

Leading DeFi categories by TVL include:

• Decentralized exchanges (DEXs) facilitating peer-to-peer trading
• Lending and borrowing protocols offering competitive rates
• Yield farming platforms providing liquidity mining rewards
• Synthetic asset protocols creating exposure to traditional assets
• Insurance protocols protecting against smart contract risks

The growth in DeFi TVL has been driven by several factors, including improved user interfaces, better security practices, and the development of cross-chain bridges that allow assets to move between different blockchain networks. Layer 2 solutions have also reduced transaction costs, making DeFi more accessible to smaller investors.

Institutional participation in DeFi has increased significantly, with traditional financial institutions exploring partnerships with DeFi protocols and developing their own decentralized finance offerings. This institutional interest has brought additional capital and legitimacy to the space.

However, the DeFi sector continues to face challenges, including regulatory uncertainty, smart contract risks, and the need for better user education. Despite these challenges, innovation continues at a rapid pace, with new protocols launching regularly and existing platforms adding new features.

The future of DeFi looks promising as the technology matures and regulatory frameworks develop. Many experts believe that DeFi will play an increasingly important role in the global financial system, offering more efficient and accessible financial services.`,
      url: 'https://example.com/defi-tvl-growth',
      publishedAt: '2024-01-14T14:20:00Z',
      source: 'DeFiInsider',
      category: 'defi',
      author: 'David Kim',
      imageUrl: 'https://images.pexels.com/photos/7567486/pexels-photo-7567486.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '5',
      title: 'Central Bank Digital Currencies Gain Momentum Worldwide',
      summary: 'Multiple countries accelerate CBDC development as digital payment adoption increases globally.',
      fullContent: `Central Bank Digital Currencies (CBDCs) are gaining significant momentum worldwide as governments and central banks accelerate their digital currency initiatives. Over 100 countries are now exploring or developing CBDCs, representing a fundamental shift in how monetary systems may operate in the digital age.

The push for CBDCs has been driven by several factors, including the rise of private cryptocurrencies, the need for more efficient payment systems, and the desire to maintain monetary sovereignty in an increasingly digital economy. The COVID-19 pandemic has further accelerated interest in contactless, digital payment solutions.

Current CBDC developments include:

• China's digital yuan pilot programs expanding to major cities
• European Central Bank's digital euro investigation phase
• Federal Reserve's research into a digital dollar
• Bank of England's consultation on a digital pound
• Multiple emerging economies launching CBDC pilots

CBDCs offer several potential advantages over traditional payment systems, including faster settlement times, reduced costs for cross-border transactions, improved financial inclusion, and enhanced monetary policy transmission. They also provide central banks with better visibility into money flows and economic activity.

However, the implementation of CBDCs raises important questions about privacy, financial surveillance, and the role of commercial banks in the financial system. Central banks are working to address these concerns while designing systems that balance innovation with stability.

The technology behind CBDCs varies, with some countries exploring blockchain-based solutions while others are considering more traditional database approaches. Interoperability between different CBDC systems is also a key consideration for facilitating international trade and payments.

Industry experts suggest that CBDCs will likely coexist with existing payment systems rather than replace them entirely. The success of CBDC implementations will depend on user adoption, merchant acceptance, and the ability to provide clear benefits over existing payment methods.`,
      url: 'https://example.com/cbdc-momentum',
      publishedAt: '2024-01-13T11:30:00Z',
      source: 'CentralBankWatch',
      category: 'regulation',
      author: 'Lisa Thompson',
      imageUrl: 'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=800'
    },
    {
      id: '6',
      title: 'NFT Market Shows Signs of Recovery with Utility-Focused Projects',
      summary: 'Non-fungible token market rebounds as projects focus on real-world utility and sustainable value creation.',
      fullContent: `The Non-Fungible Token (NFT) market is showing signs of recovery as projects shift focus from speculative trading to real-world utility and sustainable value creation. After experiencing significant volatility in 2022 and early 2023, the NFT space is evolving toward more practical applications and long-term value propositions.

This recovery is being driven by projects that emphasize utility over speculation, including NFTs that provide access to exclusive services, represent ownership of physical assets, or serve as membership tokens for communities and platforms. Gaming NFTs and metaverse assets are also contributing to renewed interest in the space.

Key trends in the NFT market recovery include:

• Gaming and metaverse NFTs with in-game utility
• Music and entertainment NFTs providing fan experiences
• Real estate and physical asset tokenization
• Membership and access tokens for exclusive communities
• Educational and certification NFTs for skill verification

The market has also benefited from improved infrastructure, including better marketplaces, more efficient blockchain networks, and enhanced user experiences. Layer 2 solutions have significantly reduced transaction costs, making NFT trading more accessible to a broader audience.

Institutional interest in NFTs is growing, with major brands and corporations exploring NFT strategies for customer engagement, loyalty programs, and digital asset creation. This institutional adoption is providing stability and legitimacy to the market.

However, challenges remain, including concerns about long-term value retention, environmental impact, and the need for better education about NFT utility. The market is also working to address issues related to copyright infringement and authenticity verification.

Looking forward, industry experts believe that the NFT market will continue to mature, with successful projects being those that provide clear utility and value to holders. The integration of NFTs with emerging technologies like artificial intelligence and augmented reality is expected to create new opportunities for innovation and growth.`,
      url: 'https://example.com/nft-recovery',
      publishedAt: '2024-01-12T15:45:00Z',
      source: 'NFTDaily',
      category: 'defi',
      author: 'Alex Martinez',
      imageUrl: 'https://images.pexels.com/photos/7567528/pexels-photo-7567528.jpeg?auto=compress&cs=tinysrgb&w=800'
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

  const handleReadMore = (article: NewsArticle) => {
    setSelectedArticle(article)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedArticle(null)
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
              {article.imageUrl && (
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
              )}
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
                  <button
                    onClick={() => handleReadMore(article)}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors hover:bg-blue-50 px-3 py-1 rounded-lg"
                  >
                    Read More
                    <ExternalLink className="h-4 w-4 ml-1" />
                  </button>
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

      {/* News Modal */}
      <NewsModal
        article={selectedArticle}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  )
}

export default NewsPage
