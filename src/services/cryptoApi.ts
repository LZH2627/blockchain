// CoinGecko API service for real cryptocurrency data
const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3'

interface CoinGeckoPrice {
  id: string
  symbol: string
  name: string
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: any
  last_updated: string
  price_change_percentage_7d_in_currency: number
  sparkline_in_7d?: {
    price: number[]
  }
}

interface HistoricalData {
  prices: [number, number][]
  market_caps: [number, number][]
  total_volumes: [number, number][]
}

export interface CryptoData {
  id: string
  symbol: string
  name: string
  currentPrice: number
  change24h: number
  change7d: number
  volume24h: number
  marketCap: number
  icon: string
  color: string
  priceHistory: number[]
  userHolding?: number
  image?: string
}

// Cryptocurrency mapping with colors and user holdings
const CRYPTO_CONFIG = {
  bitcoin: { 
    color: 'from-orange-400 to-orange-600', 
    icon: '₿', 
    userHolding: 0.5432 
  },
  ethereum: { 
    color: 'from-blue-400 to-blue-600', 
    icon: 'Ξ', 
    userHolding: 3.2156 
  },
  cardano: { 
    color: 'from-blue-500 to-indigo-600', 
    icon: '₳', 
    userHolding: 1250.75 
  },
  solana: { 
    color: 'from-purple-400 to-purple-600', 
    icon: '◎', 
    userHolding: 45.25 
  },
  chainlink: { 
    color: 'from-blue-600 to-cyan-600', 
    icon: '⬡', 
    userHolding: 125.50 
  },
  'matic-network': { 
    color: 'from-purple-500 to-pink-600', 
    icon: '⬟', 
    userHolding: 850.25 
  }
}

const SUPPORTED_COINS = Object.keys(CRYPTO_CONFIG).join(',')

// Generate realistic price history data
function generateRealisticPriceHistory(currentPrice: number, change24h: number, points: number = 24): number[] {
  const history: number[] = []
  const volatility = Math.abs(change24h) / 100 * 0.5 // Base volatility on actual change
  
  // Start from 24 hours ago
  let price = currentPrice / (1 + change24h / 100)
  
  for (let i = 0; i < points; i++) {
    // Add some realistic price movement
    const randomChange = (Math.random() - 0.5) * volatility * currentPrice
    price += randomChange
    
    // Ensure price doesn't go negative
    price = Math.max(price, currentPrice * 0.1)
    
    history.push(price)
  }
  
  // Ensure the last price matches current price
  history[history.length - 1] = currentPrice
  
  return history
}

// Direct API request with better error handling
async function makeApiRequest(url: string): Promise<any> {
  console.log('Making API request to:', url)
  
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    
    const data = await response.json()
    console.log('API response received:', data)
    return data
    
  } catch (error) {
    console.error('Direct API request failed:', error)
    
    // Try with CORS proxy as fallback
    try {
      console.log('Trying CORS proxy fallback...')
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`
      const proxyResponse = await fetch(proxyUrl)
      
      if (!proxyResponse.ok) {
        throw new Error(`Proxy HTTP ${proxyResponse.status}: ${proxyResponse.statusText}`)
      }
      
      const proxyData = await proxyResponse.json()
      const parsedData = JSON.parse(proxyData.contents)
      console.log('Proxy API response received:', parsedData)
      return parsedData
      
    } catch (proxyError) {
      console.error('Proxy API request also failed:', proxyError)
      throw new Error('Both direct and proxy API requests failed')
    }
  }
}

// Fetch current prices and market data
export async function fetchCryptoPrices(): Promise<CryptoData[]> {
  try {
    console.log('Fetching crypto prices...')
    const url = `${COINGECKO_BASE_URL}/coins/markets?vs_currency=usd&ids=${SUPPORTED_COINS}&order=market_cap_desc&per_page=10&page=1&sparkline=true&price_change_percentage=7d`
    
    const data: CoinGeckoPrice[] = await makeApiRequest(url)
    console.log('Crypto prices fetched successfully:', data)
    
    return data.map(coin => {
      const config = CRYPTO_CONFIG[coin.id as keyof typeof CRYPTO_CONFIG]
      
      // Use sparkline data if available, otherwise generate realistic data
      let priceHistory: number[] = []
      if (coin.sparkline_in_7d?.price && coin.sparkline_in_7d.price.length > 0) {
        // Use last 24 points from 7-day sparkline
        priceHistory = coin.sparkline_in_7d.price.slice(-24)
      } else {
        // Generate realistic price history based on current price and 24h change
        priceHistory = generateRealisticPriceHistory(coin.current_price, coin.price_change_percentage_24h || 0)
      }
      
      return {
        id: coin.id,
        symbol: coin.symbol.toUpperCase(),
        name: coin.name,
        currentPrice: coin.current_price,
        change24h: coin.price_change_percentage_24h || 0,
        change7d: coin.price_change_percentage_7d_in_currency || 0,
        volume24h: coin.total_volume,
        marketCap: coin.market_cap,
        icon: config?.icon || coin.symbol.charAt(0).toUpperCase(),
        color: config?.color || 'from-gray-400 to-gray-600',
        priceHistory: priceHistory,
        userHolding: config?.userHolding || 0,
        image: coin.image
      }
    })
  } catch (error) {
    console.error('Error fetching crypto prices:', error)
    throw new CryptoApiError('Failed to fetch cryptocurrency prices. Please check your internet connection.')
  }
}

// Fetch historical price data for charts
export async function fetchHistoricalData(coinId: string, days: number = 7): Promise<number[]> {
  try {
    console.log(`Fetching historical data for ${coinId}, ${days} days...`)
    const interval = days <= 1 ? 'hourly' : days <= 7 ? 'hourly' : 'daily'
    const url = `${COINGECKO_BASE_URL}/coins/${coinId}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`
    
    const data: HistoricalData = await makeApiRequest(url)
    console.log(`Historical data for ${coinId}:`, data)
    
    if (!data.prices || data.prices.length === 0) {
      console.warn(`No historical price data for ${coinId}`)
      return []
    }
    
    // Extract prices from the historical data
    const prices = data.prices.map(([timestamp, price]) => price)
    
    // Return appropriate number of data points based on timeframe
    const pointsToReturn = days <= 1 ? 24 : days <= 7 ? 48 : 30
    return prices.slice(-pointsToReturn)
    
  } catch (error) {
    console.error(`Error fetching historical data for ${coinId}:`, error)
    return []
  }
}

// Fetch historical data for all supported coins
export async function fetchAllHistoricalData(days: number = 7): Promise<Record<string, number[]>> {
  console.log(`Fetching historical data for all coins, ${days} days...`)
  const historicalData: Record<string, number[]> = {}
  
  // Process coins sequentially to avoid rate limiting
  for (const coinId of Object.keys(CRYPTO_CONFIG)) {
    try {
      console.log(`Fetching historical data for ${coinId}...`)
      const data = await fetchHistoricalData(coinId, days)
      historicalData[coinId] = data
      
      // Add small delay to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 200))
      
    } catch (error) {
      console.error(`Failed to fetch historical data for ${coinId}:`, error)
      historicalData[coinId] = []
    }
  }
  
  console.log('All historical data fetched:', historicalData)
  return historicalData
}

// Get price change for a specific timeframe
export function getPriceChange(priceHistory: number[], timeframe: string): number {
  if (priceHistory.length < 2) return 0
  
  const current = priceHistory[priceHistory.length - 1]
  let previous: number
  
  switch (timeframe) {
    case '1h':
      previous = priceHistory[Math.max(0, priceHistory.length - 2)]
      break
    case '24h':
      previous = priceHistory[Math.max(0, priceHistory.length - 24)]
      break
    case '7d':
      previous = priceHistory[0]
      break
    case '30d':
      previous = priceHistory[0]
      break
    default:
      previous = priceHistory[0]
  }
  
  return ((current - previous) / previous) * 100
}

// Format large numbers for display
export function formatNumber(num: number): string {
  if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T'
  if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B'
  if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M'
  if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K'
  return num.toFixed(2)
}

// Format currency values
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: amount < 1 ? 6 : 2
  }).format(amount)
}

// Error handling for API failures
export class CryptoApiError extends Error {
  constructor(message: string, public statusCode?: number) {
    super(message)
    this.name = 'CryptoApiError'
  }
}

// Rate limiting helper
let lastRequestTime = 0
const MIN_REQUEST_INTERVAL = 2000 // 2 seconds between requests

export function shouldAllowRequest(): boolean {
  const now = Date.now()
  if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
    return false
  }
  lastRequestTime = now
  return true
}
