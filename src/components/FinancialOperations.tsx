import React, { useState } from 'react'
import { 
  ArrowUpCircle, 
  ArrowDownCircle, 
  Building2, 
  Send, 
  PlusCircle, 
  MinusCircle,
  CreditCard,
  Banknote,
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowRightLeft
} from 'lucide-react'

interface FinancialOperationsProps {
  onClose: () => void
}

const FinancialOperations: React.FC<FinancialOperationsProps> = ({ onClose }) => {
  const [activeOperation, setActiveOperation] = useState<string | null>(null)

  const operations = [
    {
      id: 'buy-crypto',
      title: 'Buy Cryptocurrency',
      description: 'Purchase Bitcoin, Ethereum, and other cryptocurrencies',
      icon: ArrowUpCircle,
      color: 'from-green-500 to-emerald-600',
      category: 'crypto'
    },
    {
      id: 'sell-crypto',
      title: 'Sell Cryptocurrency',
      description: 'Convert your crypto holdings to cash',
      icon: ArrowDownCircle,
      color: 'from-red-500 to-rose-600',
      category: 'crypto'
    },
    {
      id: 'deposit-bank',
      title: 'Deposit to Bank',
      description: 'Transfer money to your connected bank accounts',
      icon: Building2,
      color: 'from-blue-500 to-blue-600',
      category: 'banking'
    },
    {
      id: 'send-bank',
      title: 'Send to Bank',
      description: 'Transfer funds to other bank accounts',
      icon: Send,
      color: 'from-purple-500 to-purple-600',
      category: 'banking'
    },
    {
      id: 'add-cash',
      title: 'Add Cash',
      description: 'Add funds to your wallet from various sources',
      icon: PlusCircle,
      color: 'from-cyan-500 to-teal-600',
      category: 'cash'
    },
    {
      id: 'cash-out',
      title: 'Cash Out',
      description: 'Withdraw funds to your preferred payment method',
      icon: MinusCircle,
      color: 'from-orange-500 to-amber-600',
      category: 'cash'
    }
  ]

  const handleOperationClick = (operationId: string) => {
    setActiveOperation(operationId)
  }

  const renderOperationDetails = () => {
    if (!activeOperation) return null

    const operation = operations.find(op => op.id === activeOperation)
    if (!operation) return null

    return (
      <div className="mt-8 p-6 rounded-2xl backdrop-blur-md bg-white/30 border border-white/40 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-xl bg-gradient-to-r ${operation.color}`}>
              <operation.icon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{operation.title}</h3>
              <p className="text-gray-600">{operation.description}</p>
            </div>
          </div>
          <button
            onClick={() => setActiveOperation(null)}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        {/* Operation-specific content */}
        {renderOperationForm(operation.id)}
      </div>
    )
  }

  const renderOperationForm = (operationId: string) => {
    switch (operationId) {
      case 'buy-crypto':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Cryptocurrency
                </label>
                <select className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Bitcoin (BTC)</option>
                  <option>Ethereum (ETH)</option>
                  <option>Cardano (ADA)</option>
                  <option>Solana (SOL)</option>
                  <option>Chainlink (LINK)</option>
                  <option>Polygon (MATIC)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50/50">
              <span className="text-sm text-gray-600">Estimated crypto amount:</span>
              <span className="font-semibold text-gray-800">0.0234 BTC</span>
            </div>
            <button className="w-full p-4 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-300">
              Buy Cryptocurrency
            </button>
          </div>
        )

      case 'sell-crypto':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Cryptocurrency
                </label>
                <select className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Bitcoin (0.5432 BTC)</option>
                  <option>Ethereum (3.2156 ETH)</option>
                  <option>Cardano (1250.75 ADA)</option>
                  <option>Solana (45.25 SOL)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount to Sell
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-red-50/50">
              <span className="text-sm text-gray-600">Estimated USD value:</span>
              <span className="font-semibold text-gray-800">$1,234.56</span>
            </div>
            <button className="w-full p-4 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold hover:from-red-600 hover:to-rose-700 transition-all duration-300">
              Sell Cryptocurrency
            </button>
          </div>
        )

      case 'deposit-bank':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select Bank Account
                </label>
                <select className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Chase Bank - ****1234</option>
                  <option>Bank of America - ****5678</option>
                  <option>Wells Fargo - ****9012</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50/50">
              <p className="text-sm text-gray-600 mb-2">Transfer Details:</p>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Processing time:</span>
                  <span className="font-medium">1-3 business days</span>
                </div>
                <div className="flex justify-between">
                  <span>Transfer fee:</span>
                  <span className="font-medium">$2.50</span>
                </div>
              </div>
            </div>
            <button className="w-full p-4 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold hover:from-blue-600 hover:to-blue-700 transition-all duration-300">
              Deposit to Bank
            </button>
          </div>
        )

      case 'send-bank':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Bank
                </label>
                <input
                  type="text"
                  placeholder="Bank name or routing number"
                  className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="Recipient account number"
                  className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Name
                </label>
                <input
                  type="text"
                  placeholder="Full name"
                  className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transfer Note (Optional)
              </label>
              <textarea
                placeholder="Add a note for this transfer"
                className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500 h-20 resize-none"
              />
            </div>
            <button className="w-full p-4 rounded-xl bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold hover:from-purple-600 hover:to-purple-700 transition-all duration-300">
              Send to Bank
            </button>
          </div>
        )

      case 'add-cash':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Funding Source
                </label>
                <select className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Bank Account - Chase ****1234</option>
                  <option>Debit Card - ****5678</option>
                  <option>Credit Card - ****9012</option>
                  <option>PayPal Account</option>
                  <option>Apple Pay</option>
                  <option>Google Pay</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <button className="p-3 rounded-xl backdrop-blur-md bg-white/40 border border-white/30 hover:bg-white/50 transition-colors text-center">
                <span className="block text-lg font-semibold text-gray-800">$100</span>
              </button>
              <button className="p-3 rounded-xl backdrop-blur-md bg-white/40 border border-white/30 hover:bg-white/50 transition-colors text-center">
                <span className="block text-lg font-semibold text-gray-800">$500</span>
              </button>
              <button className="p-3 rounded-xl backdrop-blur-md bg-white/40 border border-white/30 hover:bg-white/50 transition-colors text-center">
                <span className="block text-lg font-semibold text-gray-800">$1000</span>
              </button>
            </div>
            <div className="p-4 rounded-xl bg-cyan-50/50">
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="h-4 w-4 text-cyan-600" />
                <span className="text-sm font-medium text-gray-700">Payment Details</span>
              </div>
              <div className="space-y-1 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Processing fee:</span>
                  <span>$1.99</span>
                </div>
                <div className="flex justify-between">
                  <span>Processing time:</span>
                  <span>Instant</span>
                </div>
              </div>
            </div>
            <button className="w-full p-4 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white font-semibold hover:from-cyan-600 hover:to-teal-700 transition-all duration-300">
              Add Cash to Wallet
            </button>
          </div>
        )

      case 'cash-out':
        return (
          <div className="space-y-6">
            <div className="p-4 rounded-xl bg-orange-50/50 border border-orange-200/50">
              <div className="flex items-center space-x-2 mb-2">
                <Wallet className="h-5 w-5 text-orange-600" />
                <span className="font-medium text-gray-800">Available Balance</span>
              </div>
              <span className="text-2xl font-bold text-gray-800">$12,456.78</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Withdrawal Method
                </label>
                <select className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Bank Account - Chase ****1234</option>
                  <option>PayPal Account</option>
                  <option>Debit Card - ****5678</option>
                  <option>Check by Mail</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (USD)
                </label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full p-3 rounded-xl backdrop-blur-md bg-white/50 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 gap-3">
              <button className="p-2 rounded-xl backdrop-blur-md bg-white/40 border border-white/30 hover:bg-white/50 transition-colors text-center">
                <span className="block text-sm font-semibold text-gray-800">25%</span>
              </button>
              <button className="p-2 rounded-xl backdrop-blur-md bg-white/40 border border-white/30 hover:bg-white/50 transition-colors text-center">
                <span className="block text-sm font-semibold text-gray-800">50%</span>
              </button>
              <button className="p-2 rounded-xl backdrop-blur-md bg-white/40 border border-white/30 hover:bg-white/50 transition-colors text-center">
                <span className="block text-sm font-semibold text-gray-800">75%</span>
              </button>
              <button className="p-2 rounded-xl backdrop-blur-md bg-white/40 border border-white/30 hover:bg-white/50 transition-colors text-center">
                <span className="block text-sm font-semibold text-gray-800">Max</span>
              </button>
            </div>
            <div className="p-4 rounded-xl bg-orange-50/50">
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Withdrawal fee:</span>
                  <span className="font-medium text-gray-800">$5.00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Processing time:</span>
                  <span className="font-medium text-gray-800">1-2 business days</span>
                </div>
                <div className="flex justify-between border-t border-orange-200/50 pt-2 mt-2">
                  <span className="font-medium text-gray-700">You'll receive:</span>
                  <span className="font-bold text-gray-800">$0.00</span>
                </div>
              </div>
            </div>
            <button className="w-full p-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 text-white font-semibold hover:from-orange-600 hover:to-amber-700 transition-all duration-300">
              Cash Out
            </button>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-2xl">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Financial Operations</h2>
              <p className="text-gray-600 mt-1">Manage your crypto, banking, and cash operations</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl backdrop-blur-md bg-white/20 border border-white/30 text-gray-600 hover:text-gray-800 transition-colors"
            >
              <span className="text-2xl">×</span>
            </button>
          </div>

          {/* Categories */}
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Crypto Operations */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <ArrowRightLeft className="h-5 w-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Crypto Trading</h3>
                </div>
                {operations.filter(op => op.category === 'crypto').map((operation) => (
                  <button
                    key={operation.id}
                    onClick={() => handleOperationClick(operation.id)}
                    className={`w-full p-4 rounded-xl backdrop-blur-md border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      activeOperation === operation.id 
                        ? 'bg-white/40 border-white/50 shadow-lg' 
                        : 'bg-white/20 border-white/30 hover:bg-white/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${operation.color}`}>
                        <operation.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-800">{operation.title}</h4>
                        <p className="text-sm text-gray-600">{operation.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Banking Operations */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Building2 className="h-5 w-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Banking</h3>
                </div>
                {operations.filter(op => op.category === 'banking').map((operation) => (
                  <button
                    key={operation.id}
                    onClick={() => handleOperationClick(operation.id)}
                    className={`w-full p-4 rounded-xl backdrop-blur-md border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      activeOperation === operation.id 
                        ? 'bg-white/40 border-white/50 shadow-lg' 
                        : 'bg-white/20 border-white/30 hover:bg-white/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${operation.color}`}>
                        <operation.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-800">{operation.title}</h4>
                        <p className="text-sm text-gray-600">{operation.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {/* Cash Management */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2 mb-4">
                  <Banknote className="h-5 w-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-800">Cash Management</h3>
                </div>
                {operations.filter(op => op.category === 'cash').map((operation) => (
                  <button
                    key={operation.id}
                    onClick={() => handleOperationClick(operation.id)}
                    className={`w-full p-4 rounded-xl backdrop-blur-md border transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                      activeOperation === operation.id 
                        ? 'bg-white/40 border-white/50 shadow-lg' 
                        : 'bg-white/20 border-white/30 hover:bg-white/30'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${operation.color}`}>
                        <operation.icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-semibold text-gray-800">{operation.title}</h4>
                        <p className="text-sm text-gray-600">{operation.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Operation Details */}
          {renderOperationDetails()}
        </div>
      </div>
    </div>
  )
}

export default FinancialOperations
