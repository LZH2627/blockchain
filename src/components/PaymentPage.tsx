import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  CreditCard, 
  Wallet, 
  Building2, 
  Shield, 
  Lock, 
  CheckCircle, 
  ArrowLeft, 
  Star,
  Bitcoin,
  Banknote,
  Smartphone,
  Globe,
  Eye,
  EyeOff,
  AlertCircle,
  Clock,
  Award,
  Users,
  Crown
} from 'lucide-react'

interface PaymentPageProps {
  product?: any
  onClose?: () => void
}

export const PaymentPage: React.FC<PaymentPageProps> = ({ product: propProduct, onClose }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const product = propProduct || location.state?.product
  
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'crypto' | 'bank' | 'paypal' | 'apple' | 'google'>('card')
  const [cryptoType, setCryptoType] = useState<'btc' | 'eth' | 'usdc'>('btc')
  const [showCardNumber, setShowCardNumber] = useState(false)
  const [showCVV, setShowCVV] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    email: '',
    billingAddress: '',
    city: '',
    zipCode: '',
    country: 'United States'
  })

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Product Selected</h2>
          <button
            onClick={() => navigate('/marketplace')}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
          >
            Return to Marketplace
          </button>
        </div>
      </div>
    )
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

  const getProductGradient = (type: string, tier?: string) => {
    if (type === 'membership') {
      return getTierColor(tier || 'basic')
    }
    switch (type) {
      case 'course': return 'from-green-500 to-emerald-600'
      case 'service': return 'from-indigo-500 to-purple-600'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      processingTime: 'Instant',
      fee: '$2.99'
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency',
      icon: Bitcoin,
      description: 'Bitcoin, Ethereum, USDC',
      processingTime: '5-15 minutes',
      fee: 'Network fees apply'
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Building2,
      description: 'Direct bank account transfer',
      processingTime: '1-3 business days',
      fee: 'Free'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Wallet,
      description: 'Pay with your PayPal account',
      processingTime: 'Instant',
      fee: '$1.99'
    },
    {
      id: 'apple',
      name: 'Apple Pay',
      icon: Smartphone,
      description: 'Touch ID or Face ID',
      processingTime: 'Instant',
      fee: 'Free'
    },
    {
      id: 'google',
      name: 'Google Pay',
      icon: Globe,
      description: 'Pay with Google',
      processingTime: 'Instant',
      fee: 'Free'
    }
  ]

  const cryptoOptions = [
    { id: 'btc', name: 'Bitcoin', symbol: 'BTC', rate: 0.0000234, address: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa' },
    { id: 'eth', name: 'Ethereum', symbol: 'ETH', rate: 0.000456, address: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4' },
    { id: 'usdc', name: 'USD Coin', symbol: 'USDC', rate: 1.02, address: '0xA0b86a33E6441e8e5c3F27f9c5c3F27f9c5c3F27' }
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000))

    setIsProcessing(false)
    setPaymentComplete(true)
  }

  const handleBackToMarketplace = () => {
    if (onClose) {
      onClose()
    } else {
      navigate('/marketplace')
    }
  }

  if (paymentComplete) {
    return (
      <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase of <strong>{product.name}</strong>. 
              {product.type === 'membership' ? ' Your DAO membership is now active!' : ' You now have access to your purchase.'}
            </p>
            
            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Order Total:</span>
                <span className="font-bold text-gray-900">${product.price}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Method:</span>
                <span className="text-gray-900 capitalize">{paymentMethod}</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => navigate('/dashboard')}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:shadow-lg transition-all duration-300"
              >
                Go to Dashboard
              </button>
              <button
                onClick={handleBackToMarketplace}
                className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
              >
                Back to Marketplace
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={handleBackToMarketplace}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Marketplace</span>
          </button>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Checkout</h1>
          <p className="text-gray-600">Complete your purchase securely with multiple payment options</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Payment Method Selection */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      type="button"
                      onClick={() => setPaymentMethod(method.id as any)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        paymentMethod === method.id
                          ? 'border-blue-500 bg-blue-50/50'
                          : 'border-gray-200 hover:border-gray-300 bg-white/50'
                      }`}
                    >
                      <div className="flex items-center space-x-3 mb-2">
                        <method.icon className={`h-5 w-5 ${
                          paymentMethod === method.id ? 'text-blue-600' : 'text-gray-600'
                        }`} />
                        <span className="font-medium text-gray-900">{method.name}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{method.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Fee: {method.fee}</span>
                        <span>{method.processingTime}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Payment Details</h3>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <div className="relative">
                        <input
                          type={showCardNumber ? 'text' : 'password'}
                          value={formatCardNumber(formData.cardNumber)}
                          onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                          placeholder="1234 5678 9012 3456"
                          className="w-full p-3 pr-12 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowCardNumber(!showCardNumber)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showCardNumber ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          value={formatExpiryDate(formData.expiryDate)}
                          onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <div className="relative">
                          <input
                            type={showCVV ? 'text' : 'password'}
                            value={formData.cvv}
                            onChange={(e) => handleInputChange('cvv', e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            className="w-full p-3 pr-12 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            required
                          />
                          <button
                            type="button"
                            onClick={() => setShowCVV(!showCVV)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                          >
                            {showCVV ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Cardholder Name
                      </label>
                      <input
                        type="text"
                        value={formData.cardholderName}
                        onChange={(e) => handleInputChange('cardholderName', e.target.value)}
                        placeholder="John Doe"
                        className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'crypto' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Cryptocurrency
                      </label>
                      <div className="grid grid-cols-1 gap-3">
                        {cryptoOptions.map((crypto) => (
                          <button
                            key={crypto.id}
                            type="button"
                            onClick={() => setCryptoType(crypto.id as any)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                              cryptoType === crypto.id
                                ? 'border-blue-500 bg-blue-50/50'
                                : 'border-gray-200 hover:border-gray-300 bg-white/50'
                            }`}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <span className="font-medium text-gray-900">{crypto.name} ({crypto.symbol})</span>
                                <div className="text-sm text-gray-600 mt-1">
                                  Amount: {(product.price * crypto.rate).toFixed(8)} {crypto.symbol}
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm text-gray-500">≈ ${product.price}</div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="bg-yellow-50/50 border border-yellow-200/50 rounded-xl p-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-800">Payment Instructions</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            Send exactly {(product.price * cryptoOptions.find(c => c.id === cryptoType)!.rate).toFixed(8)} {cryptoOptions.find(c => c.id === cryptoType)!.symbol} to the address below. 
                            Payment will be confirmed automatically within 5-15 minutes.
                          </p>
                          <div className="mt-3 p-2 bg-white/50 rounded-lg">
                            <div className="text-xs text-gray-600 mb-1">Send to address:</div>
                            <div className="font-mono text-sm text-gray-900 break-all">
                              {cryptoOptions.find(c => c.id === cryptoType)!.address}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === 'bank' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50/50 border border-blue-200/50 rounded-xl p-4">
                      <div className="flex items-start space-x-2">
                        <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-blue-800">Bank Transfer Details</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            You will receive bank transfer instructions via email after confirming this order. 
                            Processing takes 1-3 business days.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {(paymentMethod === 'paypal' || paymentMethod === 'apple' || paymentMethod === 'google') && (
                  <div className="space-y-4">
                    <div className="bg-green-50/50 border border-green-200/50 rounded-xl p-4">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-green-800">Quick Payment</h4>
                          <p className="text-sm text-green-700 mt-1">
                            You will be redirected to {paymentMethod === 'paypal' ? 'PayPal' : paymentMethod === 'apple' ? 'Apple Pay' : 'Google Pay'} to complete your payment securely.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Billing Information */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Billing Information</h4>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="john@example.com"
                        className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Billing Address
                      </label>
                      <input
                        type="text"
                        value={formData.billingAddress}
                        onChange={(e) => handleInputChange('billingAddress', e.target.value)}
                        placeholder="123 Main Street"
                        className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          City
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          placeholder="New York"
                          className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ZIP Code
                        </label>
                        <input
                          type="text"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          placeholder="10001"
                          className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Country
                      </label>
                      <select
                        value={formData.country}
                        onChange={(e) => handleInputChange('country', e.target.value)}
                        className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                      >
                        <option>United States</option>
                        <option>Canada</option>
                        <option>United Kingdom</option>
                        <option>Germany</option>
                        <option>France</option>
                        <option>Australia</option>
                        <option>Japan</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full px-8 py-4 bg-gradient-to-r ${getProductGradient(product.type, product.tier)} text-white rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-3 ${
                  isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <Lock className="h-5 w-5" />
                    Complete Purchase - ${product.price}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6 sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{product.name}</h4>
                    <p className="text-sm text-gray-600 capitalize">{product.type}</p>
                    {product.tier && (
                      <div className="flex items-center space-x-1 mt-1">
                        {getTierIcon(product.tier)}
                        <span className="text-xs text-gray-500 uppercase">{product.tier}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal:</span>
                    <span className="font-medium text-gray-900">${product.price}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Processing Fee:</span>
                    <span className="font-medium text-gray-900">
                      {paymentMethod === 'bank' ? 'Free' : 
                       paymentMethod === 'crypto' ? 'Network fees' :
                       paymentMethod === 'card' ? '$2.99' : 
                       paymentMethod === 'paypal' ? '$1.99' : 'Free'}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                    <span>Total:</span>
                    <span>
                      ${paymentMethod === 'card' ? (product.price + 2.99).toFixed(2) : 
                        paymentMethod === 'paypal' ? (product.price + 1.99).toFixed(2) : 
                        product.price}
                    </span>
                  </div>
                </div>

                {product.features && (
                  <div className="border-t border-gray-200 pt-4">
                    <h5 className="font-semibold text-gray-900 mb-3">What's Included:</h5>
                    <ul className="space-y-2">
                      {product.features.slice(0, 4).map((feature: string, index: number) => (
                        <li key={index} className="flex items-start space-x-2 text-sm text-gray-600">
                          <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                      {product.features.length > 4 && (
                        <li className="text-sm text-gray-500">
                          +{product.features.length - 4} more features
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Security Badge */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-500" />
                  <span>Secured by 256-bit SSL encryption</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600 mt-2">
                  <Lock className="h-4 w-4 text-green-500" />
                  <span>PCI DSS compliant payment processing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentPage
