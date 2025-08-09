import React, { useState, useEffect } from 'react'
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownLeft, BarChart3, Activity, Clock, DollarSign, Brain, Target, AlertTriangle, CheckCircle, XCircle, Zap, TrendingUp as TrendIcon, Eye, Star } from 'lucide-react'
import { fetchCryptoPrices, CryptoData, formatCurrency } from '../services/cryptoApi'

interface PredictionData {
  id: string
  cryptoId: string
  timeframe: '1h' | '4h' | '24h' | '7d'
  prediction: 'bullish' | 'bearish' | 'neutral'
  confidence: number
  targetPrice: number
  currentPrice: number
  priceChange: number
  signals: {
    technical: {
      rsi: number
      macd: 'bullish' | 'bearish' | 'neutral'
      movingAverage: 'above' | 'below' | 'crossing'
      support: number
      resistance: number
    }
    sentiment: {
      score: number
      volume: 'high' | 'medium' | 'low'
      socialMentions: number
      newsScore: number
    }
    onChain: {
      whaleActivity: 'accumulating' | 'distributing' | 'neutral'
      exchangeFlow: 'inflow' | 'outflow' | 'neutral'
      activeAddresses: number
    }
  }
  riskLevel: 'low' | 'medium' | 'high'
  recommendation: string
  reasoning: string[]
  lastUpdated: string
}

export const TradePage: React.FC = () => {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [selectedCrypto, setSelectedCrypto] = useState<CryptoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState('24h')
  const [buyAmount, setBuyAmount] = useState('')
  const [sellAmount, setSellAmount] = useState('')
  const [selectedBuyCrypto, setSelectedBuyCrypto] = useState('bitcoin')
  const [selectedSellCrypto, setSelectedSellCrypto] = useState('bitcoin')
  const [showPredictions, setShowPredictions] = useState(true)
  const [selectedPredictionTimeframe, setSelectedPredictionTimeframe] = useState<'1h' | '4h' | '24h' | '7d'>('24h')

  // Mock prediction data - in real app, this would come from AI/ML models
  const mockPredictions: PredictionData[] = [
    {
      id: '1',
      cryptoId: 'bitcoin',
      timeframe: '24h',
      prediction: 'bullish',
      confidence: 78,
      targetPrice: 44500,
      currentPrice: 43000,
      priceChange: 3.49,
      signals: {
        technical: {
          rsi: 45,
          macd: 'bullish',
          movingAverage: 'above',
          support: 42000,
          resistance: 44800
        },
        sentiment: {
          score: 72,
          volume: 'high',
          socialMentions: 15420,
          newsScore: 68
        },
        onChain: {
          whaleActivity: 'accumulating',
          exchangeFlow: 'outflow',
          activeAddresses: 950000
        }
      },
      riskLevel: 'medium',
      recommendation: 'BUY',
      reasoning: [
        'Strong bullish MACD crossover detected',
        'Whale accumulation pattern observed',
        'Price holding above key support at $42,000',
        'Positive sentiment shift in social media',
        'Exchange outflows indicate hodling behavior'
      ],
      lastUpdated: '2024-01-15T14:30:00Z'
    },
    {
      id: '2',
      cryptoId: 'ethereum',
      timeframe: '24h',
      prediction: 'bearish',
      confidence: 65,
      targetPrice: 1950,
      currentPrice: 2000,
      priceChange: -2.5,
      signals: {
        technical: {
          rsi: 68,
          macd: 'bearish',
          movingAverage: 'below',
          support: 1900,
          resistance: 2100
        },
        sentiment: {
          score: 45,
          volume: 'medium',
          socialMentions: 8750,
          newsScore: 42
        },
        onChain: {
          whaleActivity: 'distributing',
          exchangeFlow: 'inflow',
          activeAddresses: 720000
        }
      },
      riskLevel: 'high',
      recommendation: 'SELL',
      reasoning: [
        'RSI showing overbought conditions',
        'Bearish MACD divergence forming',
        'Large whale distributions detected',
        'Increased exchange inflows suggest selling pressure',
        'Negative sentiment in recent news coverage'
      ],
      lastUpdated: '2024-01-15T14:25:00Z'
    },
    {
      id: '3',
      cryptoId: 'cardano',
      timeframe: '24h',
      prediction: 'bullish',
      confidence: 82,
      targetPrice: 0.52,
      currentPrice: 0.45,
      priceChange: 15.56,
      signals: {
        technical: {
          rsi: 42,
          macd: 'bullish',
          movingAverage: 'crossing',
          support: 0.42,
          resistance: 0.55
        },
        sentiment: {
          score: 85,
          volume: 'high',
          socialMentions: 12300,
          newsScore: 78
        },
        onChain: {
          whaleActivity: 'accumulating',
          exchangeFlow: 'outflow',
          activeAddresses: 450000
        }
      },
      riskLevel: 'low',
      recommendation: 'STRONG BUY',
      reasoning: [
        'Golden cross formation on moving averages',
        'Strong community sentiment and development activity',
        'Significant whale accumulation patterns',
        'Low RSI indicates room for growth',
        'Positive news around ecosystem developments'
      ],
      lastUpdated: '2024-01-15T14:28:00Z'
    },
    {
      id: '4',
      cryptoId: 'solana',
      timeframe: '24h',
      prediction: 'neutral',
      confidence: 55,
      targetPrice: 92,
      currentPrice: 90,
      priceChange: 2.22,
      signals: {
        technical: {
          rsi: 52,
          macd: 'neutral',
          movingAverage: 'above',
          support: 85,
          resistance: 95
        },
        sentiment: {
          score: 58,
          volume: 'medium',
          socialMentions: 6800,
          newsScore: 55
        },
        onChain: {
          whaleActivity: 'neutral',
          exchangeFlow: 'neutral',
          activeAddresses: 380000
        }
      },
      riskLevel: 'medium',
      recommendation: 'HOLD',
      reasoning: [
        'Consolidation pattern forming',
        'Mixed signals from technical indicators',
        'Neutral whale activity',
        'Moderate trading volume',
        'Wait for clearer directional signals'
      ],
      lastUpdated: '2024-01-15T14:32:00Z'
    }
  ]

  const [predictions, setPredictions] = useState<PredictionData[]>(mockPredictions)

  useEffect(() => {
    const loadCryptoData = async () => {
      try {
        setLoading(true)
        const data = await fetchCryptoPrices()
        setCryptoData(data)
        if (data.length > 0) {
          setSelectedCrypto(data[0]) // Default to first crypto (Bitcoin)
        }
      } catch (error) {
        console.error('Failed to load crypto data:', error)
        // Fallback to mock data
        const mockData = [
          {
            id: 'bitcoin',
            symbol: 'BTC',
            name: 'Bitcoin',
            currentPrice: 43000,
            change24h: 2.5,
            change7d: 5.2,
            volume24h: 25000000000,
            marketCap: 850000000000,
            icon: '₿',
            color: 'from-orange-400 to-orange-600',
            priceHistory: [42000, 42500, 41800, 43200, 43000, 42800, 43500, 43000],
            userHolding: 0.5432
          },
          {
            id: 'ethereum',
            symbol: 'ETH',
            name: 'Ethereum',
            currentPrice: 2000,
            change24h: -1.2,
            change7d: 3.1,
            volume24h: 15000000000,
            marketCap: 240000000000,
            icon: 'Ξ',
            color: 'from-blue-400 to-blue-600',
            priceHistory: [2050, 2020, 1980, 2100, 2000, 1950, 2080, 2000],
            userHolding: 3.2156
          },
          {
            id: 'cardano',
            symbol: 'ADA',
            name: 'Cardano',
            currentPrice: 0.45,
            change24h: 5.8,
            change7d: 8.2,
            volume24h: 500000000,
            marketCap: 15000000000,
            icon: '₳',
            color: 'from-blue-500 to-indigo-600',
            priceHistory: [0.42, 0.44, 0.41, 0.46, 0.45, 0.43, 0.47, 0.45],
            userHolding: 1250.75
          },
          {
            id: 'solana',
            symbol: 'SOL',
            name: 'Solana',
            currentPrice: 90,
            change24h: 3.1,
            change7d: 12.5,
            volume24h: 2000000000,
            marketCap: 40000000000,
            icon: '◎',
            color: 'from-purple-400 to-purple-600',
            priceHistory: [87, 89, 85, 92, 90, 88, 94, 90],
            userHolding: 45.25
          }
        ]
        setCryptoData(mockData)
        setSelectedCrypto(mockData[0])
      } finally {
        setLoading(false)
      }
    }

    loadCryptoData()
  }, [])

  const generateTimeLabels = (length: number, timeframe: string) => {
    const labels = []
    const now = new Date()
    
    for (let i = length - 1; i >= 0; i--) {
      const date = new Date(now)
      
      switch (timeframe) {
        case '1h':
          date.setMinutes(now.getMinutes() - (i * 10)) // 10-minute intervals
          labels.push(date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
          break
        case '24h':
          date.setHours(now.getHours() - (i * 3)) // 3-hour intervals
          labels.push(date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }))
          break
        case '7d':
          date.setDate(now.getDate() - i) // Daily intervals
          labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
          break
        case '30d':
          date.setDate(now.getDate() - (i * 4)) // 4-day intervals
          labels.push(date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }))
          break
        default:
          labels.push(`${i}h`)
      }
    }
    
    return labels
  }

  const renderMiniChart = (priceHistory: number[], color: string) => {
    if (!priceHistory || priceHistory.length === 0) return null

    const maxPrice = Math.max(...priceHistory)
    const minPrice = Math.min(...priceHistory)
    const priceRange = maxPrice - minPrice

    const points = priceHistory.map((price, index) => {
      const x = (index / (priceHistory.length - 1)) * 100
      const y = 100 - ((price - minPrice) / priceRange) * 100
      return `${x},${y}`
    }).join(' ')

    const isPositive = priceHistory[priceHistory.length - 1] > priceHistory[0]

    return (
      <div className="h-16 w-24">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
          <defs>
            <linearGradient id={`gradient-${color}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0.3" />
              <stop offset="100%" stopColor={isPositive ? "#10b981" : "#ef4444"} stopOpacity="0" />
            </linearGradient>
          </defs>
          <polyline
            fill="none"
            stroke={isPositive ? "#10b981" : "#ef4444"}
            strokeWidth="2"
            points={points}
          />
          <polygon
            fill={`url(#gradient-${color})`}
            points={`${points} 100,100 0,100`}
          />
        </svg>
      </div>
    )
  }

  const renderDetailedChart = (crypto: CryptoData) => {
    if (!crypto.priceHistory || crypto.priceHistory.length === 0) return null

    const maxPrice = Math.max(...crypto.priceHistory)
    const minPrice = Math.min(...crypto.priceHistory)
    const priceRange = maxPrice - minPrice
    const timeLabels = generateTimeLabels(crypto.priceHistory.length, timeframe)

    // Generate Y-axis labels (price levels)
    const yAxisLabels = []
    const numYLabels = 8
    for (let i = 0; i < numYLabels; i++) {
      const price = minPrice + (priceRange * i / (numYLabels - 1))
      yAxisLabels.push(price)
    }

    // Chart coordinates
    const chartLeft = 10
    const chartRight = 96
    const chartTop = 10
    const chartBottom = 80
    const chartWidth = chartRight - chartLeft
    const chartHeight = chartBottom - chartTop

    // Generate points with coordinates
    const chartPoints = crypto.priceHistory.map((price, index) => {
      const x = chartLeft + (index / (crypto.priceHistory.length - 1)) * chartWidth
      const y = chartTop + (1 - (price - minPrice) / priceRange) * chartHeight
      return { x, y, price, index }
    })

    // Create line segments with dynamic colors
    const createLineSegments = () => {
      const segments = []
      
      for (let i = 0; i < chartPoints.length - 1; i++) {
        const currentPoint = chartPoints[i]
        const nextPoint = chartPoints[i + 1]
        
        // Determine color based on price movement
        const isUpward = nextPoint.price > currentPoint.price
        const segmentColor = isUpward ? "#10b981" : "#ef4444" // Green for up, red for down
        
        segments.push({
          x1: currentPoint.x,
          y1: currentPoint.y,
          x2: nextPoint.x,
          y2: nextPoint.y,
          color: segmentColor,
          isUpward
        })
      }
      
      return segments
    }

    const lineSegments = createLineSegments()

    return (
      <div className="h-[500px] w-full">
        <svg width="100%" height="100%" viewBox="0 0 100 100" className="overflow-visible">
          <defs>
            {/* Gradients for area fills */}
            <linearGradient id={`green-gradient-${crypto.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
            </linearGradient>
            <linearGradient id={`red-gradient-${crypto.id}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ef4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
            </linearGradient>
            
            {/* Enhanced overlay grid pattern */}
            <pattern id={`overlay-grid-${crypto.id}`} width="8" height="6" patternUnits="userSpaceOnUse">
              <path d="M 8 0 L 0 0 0 6" fill="none" stroke="#d1d5db" strokeWidth="0.15" opacity="0.6"/>
              <path d="M 0 6 L 8 6" fill="none" stroke="#d1d5db" strokeWidth="0.15" opacity="0.6"/>
            </pattern>
            
            {/* Fine grid pattern for subtle background */}
            <pattern id={`fine-grid-${crypto.id}`} width="2" height="2" patternUnits="userSpaceOnUse">
              <path d="M 2 0 L 0 0 0 2" fill="none" stroke="#e5e7eb" strokeWidth="0.08" opacity="0.3"/>
            </pattern>
          </defs>
          
          {/* Fine background grid */}
          <rect x={chartLeft} y={chartTop} width={chartWidth} height={chartHeight} fill={`url(#fine-grid-${crypto.id})`} />
          
          {/* Major overlay grid lines */}
          <rect x={chartLeft} y={chartTop} width={chartWidth} height={chartHeight} fill={`url(#overlay-grid-${crypto.id})`} />
          
          {/* Major horizontal grid lines */}
          {yAxisLabels.map((price, index) => {
            const y = chartBottom - (index / (yAxisLabels.length - 1)) * chartHeight
            return (
              <line
                key={`h-grid-${index}`}
                x1={chartLeft}
                y1={y}
                x2={chartRight}
                y2={y}
                stroke="#d1d5db"
                strokeWidth="0.2"
                opacity="0.5"
              />
            )
          })}
          
          {/* Major vertical grid lines */}
          {timeLabels.map((label, index) => {
            if (index % Math.ceil(timeLabels.length / 8) === 0) {
              const x = chartLeft + (index / (timeLabels.length - 1)) * chartWidth
              return (
                <line
                  key={`v-grid-${index}`}
                  x1={x}
                  y1={chartTop}
                  x2={x}
                  y2={chartBottom}
                  stroke="#d1d5db"
                  strokeWidth="0.2"
                  opacity="0.5"
                />
              )
            }
            return null
          })}
          
          {/* Y-axis */}
          <line x1={chartLeft} y1={chartTop} x2={chartLeft} y2={chartBottom} stroke="#6b7280" strokeWidth="0.3" />
          
          {/* X-axis */}
          <line x1={chartLeft} y1={chartBottom} x2={chartRight} y2={chartBottom} stroke="#6b7280" strokeWidth="0.3" />
          
          {/* Y-axis labels (prices) */}
          {yAxisLabels.map((price, index) => {
            const y = chartBottom - (index / (yAxisLabels.length - 1)) * chartHeight
            return (
              <g key={`y-${index}`}>
                <line x1={chartLeft - 0.5} y1={y} x2={chartLeft} y2={y} stroke="#6b7280" strokeWidth="0.15" />
                <text 
                  x={chartLeft - 1} 
                  y={y + 0.5} 
                  textAnchor="end" 
                  fontSize="1.4" 
                  fill="#6b7280"
                  fontFamily="system-ui, -apple-system, sans-serif"
                >
                  ${price.toFixed(price < 1 ? 3 : 0)}
                </text>
              </g>
            )
          })}
          
          {/* X-axis labels (time) */}
          {timeLabels.map((label, index) => {
            if (index % Math.ceil(timeLabels.length / 10) === 0 || index === timeLabels.length - 1) {
              const x = chartLeft + (index / (timeLabels.length - 1)) * chartWidth
              return (
                <g key={`x-${index}`}>
                  <line x1={x} y1={chartBottom} x2={x} y2={chartBottom + 0.5} stroke="#6b7280" strokeWidth="0.15" />
                  <text 
                    x={x} 
                    y={chartBottom + 2.5} 
                    textAnchor="middle" 
                    fontSize="1.3" 
                    fill="#6b7280"
                    fontFamily="system-ui, -apple-system, sans-serif"
                  >
                    {label}
                  </text>
                </g>
              )
            }
            return null
          })}
          
          {/* Price area with overall trend color */}
          <polygon
            fill={`url(#${crypto.change24h >= 0 ? 'green' : 'red'}-gradient-${crypto.id})`}
            points={`${chartPoints.map(p => `${p.x},${p.y}`).join(' ')} ${chartRight},${chartBottom} ${chartLeft},${chartBottom}`}
          />
          
          {/* Dynamic colored line segments */}
          {lineSegments.map((segment, index) => (
            <line
              key={`segment-${index}`}
              x1={segment.x1}
              y1={segment.y1}
              x2={segment.x2}
              y2={segment.y2}
              stroke={segment.color}
              strokeWidth="1.0"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          
          {/* Data points with dynamic colors */}
          {chartPoints.map((point, index) => {
            let pointColor = "#6b7280" // Default gray for first point
            
            if (index > 0) {
              const prevPrice = crypto.priceHistory[index - 1]
              pointColor = point.price > prevPrice ? "#10b981" : "#ef4444"
            }
            
            return (
              <circle
                key={index}
                cx={point.x}
                cy={point.y}
                r="0.7"
                fill={pointColor}
                stroke="white"
                strokeWidth="0.2"
                className="opacity-80 hover:opacity-100 transition-all"
              />
            )
          })}
          
          {/* Y-axis label */}
          <text 
            x="3" 
            y="45" 
            textAnchor="middle" 
            fontSize="1.6" 
            fill="#374151"
            fontFamily="system-ui, -apple-system, sans-serif"
            transform="rotate(-90 3 45)"
            fontWeight="500"
          >
            Price (USD)
          </text>
          
          {/* X-axis label */}
          <text 
            x="53" 
            y="95" 
            textAnchor="middle" 
            fontSize="1.6" 
            fill="#374151"
            fontFamily="system-ui, -apple-system, sans-serif"
            fontWeight="500"
          >
            Time ({timeframe})
          </text>
        </svg>
      </div>
    )
  }

  const getPredictionIcon = (prediction: string) => {
    switch (prediction) {
      case 'bullish':
        return <TrendingUp className="h-5 w-5 text-green-600" />
      case 'bearish':
        return <TrendingDown className="h-5 w-5 text-red-600" />
      case 'neutral':
        return <Activity className="h-5 w-5 text-gray-600" />
      default:
        return <Activity className="h-5 w-5 text-gray-600" />
    }
  }

  const getPredictionColor = (prediction: string) => {
    switch (prediction) {
      case 'bullish':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'bearish':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'neutral':
        return 'text-gray-600 bg-gray-50 border-gray-200'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'STRONG BUY':
        return 'text-green-700 bg-green-100 border-green-300'
      case 'BUY':
        return 'text-green-600 bg-green-50 border-green-200'
      case 'HOLD':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200'
      case 'SELL':
        return 'text-red-600 bg-red-50 border-red-200'
      case 'STRONG SELL':
        return 'text-red-700 bg-red-100 border-red-300'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low':
        return 'text-green-600 bg-green-100'
      case 'medium':
        return 'text-yellow-600 bg-yellow-100'
      case 'high':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const handleBuySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle buy transaction
    console.log('Buy:', { amount: buyAmount, crypto: selectedBuyCrypto })
  }

  const handleSellSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sell transaction
    console.log('Sell:', { amount: sellAmount, crypto: selectedSellCrypto })
  }

  if (loading) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading market data...</p>
        </div>
      </div>
    )
  }

  const selectedPrediction = predictions.find(p => p.cryptoId === selectedCrypto?.id && p.timeframe === selectedPredictionTimeframe)

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI-Powered Trading</h1>
          <p className="text-gray-600">Make informed decisions with predictive analytics and real-time market data</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Trading Interface */}
          <div className="lg:col-span-2">
            {/* AI Predictions Panel */}
            {showPredictions && selectedPrediction && (
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl border border-purple-200 shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-600 rounded-xl">
                      <Brain className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">AI Prediction</h2>
                      <p className="text-sm text-gray-600">Last updated: {new Date(selectedPrediction.lastUpdated).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {['1h', '4h', '24h', '7d'].map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setSelectedPredictionTimeframe(tf as any)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          selectedPredictionTimeframe === tf
                            ? 'bg-purple-600 text-white'
                            : 'bg-white text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {/* Prediction Summary */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Prediction</span>
                      {getPredictionIcon(selectedPrediction.prediction)}
                    </div>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getPredictionColor(selectedPrediction.prediction)}`}>
                      {selectedPrediction.prediction.toUpperCase()}
                    </div>
                    <div className="mt-2">
                      <div className="text-lg font-bold text-gray-900">
                        {formatCurrency(selectedPrediction.targetPrice)}
                      </div>
                      <div className={`text-sm ${selectedPrediction.priceChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedPrediction.priceChange >= 0 ? '+' : ''}{selectedPrediction.priceChange.toFixed(2)}%
                      </div>
                    </div>
                  </div>

                  {/* Confidence Score */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Confidence</span>
                      <Target className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedPrediction.confidence}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${selectedPrediction.confidence}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Recommendation */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-gray-600">Action</span>
                      <Zap className="h-4 w-4 text-yellow-600" />
                    </div>
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-bold border ${getRecommendationColor(selectedPrediction.recommendation)}`}>
                      {selectedPrediction.recommendation}
                    </div>
                    <div className="mt-2">
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(selectedPrediction.riskLevel)}`}>
                        {selectedPrediction.riskLevel.toUpperCase()} RISK
                      </span>
                    </div>
                  </div>
                </div>

                {/* Signal Analysis */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Technical Signals */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2 text-blue-600" />
                      Technical
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">RSI:</span>
                        <span className={`font-medium ${selectedPrediction.signals.technical.rsi > 70 ? 'text-red-600' : selectedPrediction.signals.technical.rsi < 30 ? 'text-green-600' : 'text-gray-900'}`}>
                          {selectedPrediction.signals.technical.rsi}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">MACD:</span>
                        <span className={`font-medium capitalize ${selectedPrediction.signals.technical.macd === 'bullish' ? 'text-green-600' : selectedPrediction.signals.technical.macd === 'bearish' ? 'text-red-600' : 'text-gray-600'}`}>
                          {selectedPrediction.signals.technical.macd}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Support:</span>
                        <span className="font-medium text-gray-900">${selectedPrediction.signals.technical.support.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Resistance:</span>
                        <span className="font-medium text-gray-900">${selectedPrediction.signals.technical.resistance.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Sentiment Signals */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <TrendIcon className="h-4 w-4 mr-2 text-green-600" />
                      Sentiment
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Score:</span>
                        <span className={`font-medium ${selectedPrediction.signals.sentiment.score > 60 ? 'text-green-600' : selectedPrediction.signals.sentiment.score < 40 ? 'text-red-600' : 'text-gray-900'}`}>
                          {selectedPrediction.signals.sentiment.score}/100
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Volume:</span>
                        <span className={`font-medium capitalize ${selectedPrediction.signals.sentiment.volume === 'high' ? 'text-green-600' : selectedPrediction.signals.sentiment.volume === 'low' ? 'text-red-600' : 'text-yellow-600'}`}>
                          {selectedPrediction.signals.sentiment.volume}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Social:</span>
                        <span className="font-medium text-gray-900">{selectedPrediction.signals.sentiment.socialMentions.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">News:</span>
                        <span className={`font-medium ${selectedPrediction.signals.sentiment.newsScore > 60 ? 'text-green-600' : selectedPrediction.signals.sentiment.newsScore < 40 ? 'text-red-600' : 'text-gray-900'}`}>
                          {selectedPrediction.signals.sentiment.newsScore}/100
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* On-Chain Signals */}
                  <div className="bg-white rounded-xl p-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <Activity className="h-4 w-4 mr-2 text-purple-600" />
                      On-Chain
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Whales:</span>
                        <span className={`font-medium capitalize ${selectedPrediction.signals.onChain.whaleActivity === 'accumulating' ? 'text-green-600' : selectedPrediction.signals.onChain.whaleActivity === 'distributing' ? 'text-red-600' : 'text-gray-600'}`}>
                          {selectedPrediction.signals.onChain.whaleActivity}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Exchange:</span>
                        <span className={`font-medium capitalize ${selectedPrediction.signals.onChain.exchangeFlow === 'outflow' ? 'text-green-600' : selectedPrediction.signals.onChain.exchangeFlow === 'inflow' ? 'text-red-600' : 'text-gray-600'}`}>
                          {selectedPrediction.signals.onChain.exchangeFlow}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Active:</span>
                        <span className="font-medium text-gray-900">{selectedPrediction.signals.onChain.activeAddresses.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Reasoning */}
                <div className="bg-white rounded-xl p-4 border border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
                    <Eye className="h-4 w-4 mr-2 text-indigo-600" />
                    AI Analysis
                  </h3>
                  <ul className="space-y-2">
                    {selectedPrediction.reasoning.map((reason, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{reason}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Price Chart Section */}
            {selectedCrypto && (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-8 mb-8">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${selectedCrypto.color} flex items-center justify-center`}>
                      <span className="text-white text-lg font-bold">{selectedCrypto.icon}</span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{selectedCrypto.name}</h2>
                      <p className="text-gray-600">{selectedCrypto.symbol}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {formatCurrency(selectedCrypto.currentPrice)}
                      </div>
                      <div className={`flex items-center ${selectedCrypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {selectedCrypto.change24h >= 0 ? (
                          <TrendingUp className="h-4 w-4 mr-1" />
                        ) : (
                          <TrendingDown className="h-4 w-4 mr-1" />
                        )}
                        <span className="font-medium">{Math.abs(selectedCrypto.change24h).toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Timeframe Selector */}
                  <div className="flex space-x-2">
                    {['1h', '24h', '7d', '30d'].map((tf) => (
                      <button
                        key={tf}
                        onClick={() => setTimeframe(tf)}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                          timeframe === tf
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {tf}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Detailed Chart */}
                <div className="bg-gray-50 rounded-xl p-10 overflow-hidden">
                  {renderDetailedChart(selectedCrypto)}
                </div>
              </div>
            )}

            {/* Quick Trade Section */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6 mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Trade</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Buy Section */}
                <form onSubmit={handleBuySubmit} className="space-y-4">
                  <h3 className="text-lg font-semibold text-green-600 flex items-center">
                    <ArrowDownLeft className="h-5 w-5 mr-2" />
                    Buy
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount (USD)</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={buyAmount}
                      onChange={(e) => setBuyAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cryptocurrency</label>
                    <select 
                      value={selectedBuyCrypto}
                      onChange={(e) => setSelectedBuyCrypto(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80"
                    >
                      {cryptoData.map((crypto) => (
                        <option key={crypto.id} value={crypto.id}>
                          {crypto.name} ({crypto.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                  {buyAmount && (
                    <div className="p-3 bg-green-50 rounded-xl">
                      <p className="text-sm text-green-700">
                        You will receive: ~{(parseFloat(buyAmount) / (cryptoData.find(c => c.id === selectedBuyCrypto)?.currentPrice || 1)).toFixed(6)} {cryptoData.find(c => c.id === selectedBuyCrypto)?.symbol}
                      </p>
                    </div>
                  )}
                  <button 
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-teal-600 text-white rounded-xl font-medium hover:from-green-600 hover:to-teal-700 transition-all duration-300"
                  >
                    Buy Now
                  </button>
                </form>

                {/* Sell Section */}
                <form onSubmit={handleSellSubmit} className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-600 flex items-center">
                    <ArrowUpRight className="h-5 w-5 mr-2" />
                    Sell
                  </h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                    <input
                      type="number"
                      placeholder="0.00"
                      value={sellAmount}
                      onChange={(e) => setSellAmount(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/80"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cryptocurrency</label>
                    <select 
                      value={selectedSellCrypto}
                      onChange={(e) => setSelectedSellCrypto(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent bg-white/80"
                    >
                      {cryptoData.map((crypto) => (
                        <option key={crypto.id} value={crypto.id}>
                          {crypto.name} ({crypto.symbol})
                        </option>
                      ))}
                    </select>
                  </div>
                  {sellAmount && (
                    <div className="p-3 bg-red-50 rounded-xl">
                      <p className="text-sm text-red-700">
                        You will receive: ~${(parseFloat(sellAmount) * (cryptoData.find(c => c.id === selectedSellCrypto)?.currentPrice || 0)).toFixed(2)} USD
                      </p>
                    </div>
                  )}
                  <button 
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl font-medium hover:from-red-600 hover:to-pink-700 transition-all duration-300"
                  >
                    Sell Now
                  </button>
                </form>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prediction</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chart</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {cryptoData.map((crypto) => {
                      const prediction = predictions.find(p => p.cryptoId === crypto.id && p.timeframe === '24h')
                      return (
                        <tr 
                          key={crypto.id} 
                          className={`hover:bg-gray-50/50 transition-colors cursor-pointer ${
                            selectedCrypto?.id === crypto.id ? 'bg-blue-50/50' : ''
                          }`}
                          onClick={() => setSelectedCrypto(crypto)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${crypto.color} flex items-center justify-center mr-3`}>
                                <span className="text-white text-xs font-bold">{crypto.icon}</span>
                              </div>
                              <div>
                                <div className="text-sm font-medium text-gray-900">{crypto.name}</div>
                                <div className="text-sm text-gray-500">{crypto.symbol}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(crypto.currentPrice)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`flex items-center text-sm font-medium ${crypto.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                              {crypto.change24h >= 0 ? (
                                <TrendingUp className="h-4 w-4 mr-1" />
                              ) : (
                                <TrendingDown className="h-4 w-4 mr-1" />
                              )}
                              {Math.abs(crypto.change24h).toFixed(2)}%
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {prediction ? (
                              <div className="flex items-center space-x-2">
                                {getPredictionIcon(prediction.prediction)}
                                <div>
                                  <div className={`text-xs font-medium capitalize ${prediction.prediction === 'bullish' ? 'text-green-600' : prediction.prediction === 'bearish' ? 'text-red-600' : 'text-gray-600'}`}>
                                    {prediction.prediction}
                                  </div>
                                  <div className="text-xs text-gray-500">{prediction.confidence}%</div>
                                </div>
                              </div>
                            ) : (
                              <span className="text-xs text-gray-400">No data</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {renderMiniChart(crypto.priceHistory, crypto.id)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedBuyCrypto(crypto.id)
                                setSelectedSellCrypto(crypto.id)
                              }}
                              className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                            >
                              Trade
                            </button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* AI Insights Summary */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl border border-purple-200 shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Brain className="h-5 w-5 mr-2 text-purple-600" />
                AI Market Insights
              </h3>
              <div className="space-y-4">
                {predictions.slice(0, 3).map((prediction) => {
                  const crypto = cryptoData.find(c => c.id === prediction.cryptoId)
                  if (!crypto) return null
                  
                  return (
                    <div key={prediction.id} className="bg-white rounded-xl p-4 border border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${crypto.color} flex items-center justify-center`}>
                            <span className="text-white text-xs font-bold">{crypto.icon}</span>
                          </div>
                          <span className="font-medium text-gray-900">{crypto.symbol}</span>
                        </div>
                        {getPredictionIcon(prediction.prediction)}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Target: {formatCurrency(prediction.targetPrice)}
                      </div>
                      <div className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getRecommendationColor(prediction.recommendation)}`}>
                        {prediction.recommendation}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Order Book */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Order Book
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                  <span>Price (USD)</span>
                  <span>Amount</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-600 font-medium">43,250</span>
                  <span className="text-gray-600">0.5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-600 font-medium">43,200</span>
                  <span className="text-gray-600">1.2</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-600 font-medium">43,150</span>
                  <span className="text-gray-600">0.8</span>
                </div>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">43,000</span>
                  <span className="text-gray-600">2.1</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">42,950</span>
                  <span className="text-gray-600">1.5</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">42,900</span>
                  <span className="text-gray-600">0.9</span>
                </div>
              </div>
            </div>

            {/* Recent Trades */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Recent Trades
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
                  <span>Price</span>
                  <span>Amount</span>
                  <span>Time</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">43,100</span>
                  <span className="text-gray-600">0.25</span>
                  <span className="text-gray-500">12:34</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-600 font-medium">43,050</span>
                  <span className="text-gray-600">0.15</span>
                  <span className="text-gray-500">12:33</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">43,080</span>
                  <span className="text-gray-600">0.45</span>
                  <span className="text-gray-500">12:32</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-red-600 font-medium">43,020</span>
                  <span className="text-gray-600">0.30</span>
                  <span className="text-gray-500">12:31</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-green-600 font-medium">43,150</span>
                  <span className="text-gray-600">0.18</span>
                  <span className="text-gray-500">12:30</span>
                </div>
              </div>
            </div>

            {/* Market Stats */}
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2" />
                Market Stats
              </h3>
              {selectedCrypto && (
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Market Cap</span>
                    <span className="text-sm font-medium text-gray-900">
                      ${(selectedCrypto.marketCap / 1e9).toFixed(1)}B
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">24h Volume</span>
                    <span className="text-sm font-medium text-gray-900">
                      ${(selectedCrypto.volume24h / 1e9).toFixed(1)}B
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">7d Change</span>
                    <span className={`text-sm font-medium ${selectedCrypto.change7d >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {selectedCrypto.change7d >= 0 ? '+' : ''}{selectedCrypto.change7d.toFixed(2)}%
                    </span>
                  </div>
                  {selectedCrypto.userHolding && (
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-sm text-gray-600">Your Holdings</span>
                      <span className="text-sm font-medium text-blue-600">
                        {selectedCrypto.userHolding} {selectedCrypto.symbol}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TradePage
