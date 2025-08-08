import React from 'react'
import { X, ArrowUpRight, ArrowDownLeft, ShoppingBag, TrendingUp, Banknote } from 'lucide-react'

interface Transaction {
  id: string
  type: 'buy' | 'sell' | 'trade' | 'purchase'
  amount: number
  currency: string
  description: string
  date: string
  status: 'completed' | 'pending' | 'failed'
}

interface TransactionHistoryProps {
  onClose: () => void
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ onClose }) => {
  const mockTransactions: Transaction[] = [
    {
      id: '1',
      type: 'buy',
      amount: 0.5,
      currency: 'BTC',
      description: 'Bought Bitcoin',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: '2',
      type: 'purchase',
      amount: 299.99,
      currency: 'USD',
      description: 'Hardware Wallet Pro',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: '3',
      type: 'trade',
      amount: 10,
      currency: 'ETH',
      description: 'ETH to BTC Trade',
      date: '2024-01-13',
      status: 'completed'
    },
    {
      id: '4',
      type: 'sell',
      amount: 1000,
      currency: 'USD',
      description: 'Sold Ethereum',
      date: '2024-01-12',
      status: 'pending'
    }
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return <ArrowDownLeft className="h-4 w-4 text-green-600" />
      case 'sell':
        return <ArrowUpRight className="h-4 w-4 text-red-600" />
      case 'trade':
        return <TrendingUp className="h-4 w-4 text-blue-600" />
      case 'purchase':
        return <ShoppingBag className="h-4 w-4 text-purple-600" />
      default:
        return <Banknote className="h-4 w-4 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      case 'failed':
        return 'text-red-600 bg-red-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        {/* Transaction List */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-white rounded-lg shadow-sm">
                    {getTransactionIcon(transaction.type)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">
                    {transaction.amount} {transaction.currency}
                  </p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                    {transaction.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {mockTransactions.length === 0 && (
            <div className="text-center py-12">
              <Banknote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
              <p className="text-gray-500">Your transaction history will appear here</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionHistory
