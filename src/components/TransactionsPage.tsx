import React, { useState } from 'react'
import { ArrowUpRight, ArrowDownLeft, ShoppingBag, TrendingUp, Banknote, Search, Filter, Calendar, Download, Eye, ChevronRight } from 'lucide-react'

interface Transaction {
  id: string
  type: 'buy' | 'sell' | 'trade' | 'purchase'
  amount: number
  currency: string
  description: string
  date: string
  time: string
  status: 'completed' | 'pending' | 'failed'
  fee: number
  hash?: string
  fromAddress?: string
  toAddress?: string
  exchangeRate?: number
  notes?: string
}

export const TransactionsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)

  const mockTransactions: Transaction[] = [
    {
      id: '1',
      type: 'buy',
      amount: 0.5,
      currency: 'BTC',
      description: 'Bought Bitcoin',
      date: '2024-01-15',
      time: '14:30:25',
      status: 'completed',
      fee: 15.99,
      hash: '0x1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p7q8r9s0t1u2v3w4x5y6z',
      fromAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      toAddress: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      exchangeRate: 43250.00,
      notes: 'Regular DCA purchase'
    },
    {
      id: '2',
      type: 'purchase',
      amount: 299.99,
      currency: 'USD',
      description: 'Hardware Wallet Pro',
      date: '2024-01-14',
      time: '10:15:42',
      status: 'completed',
      fee: 0,
      notes: 'Ledger Nano X - Black Edition'
    },
    {
      id: '3',
      type: 'trade',
      amount: 10,
      currency: 'ETH',
      description: 'ETH to BTC Trade',
      date: '2024-01-13',
      time: '16:45:18',
      status: 'completed',
      fee: 0.025,
      hash: '0x9z8y7x6w5v4u3t2s1r0q9p8o7n6m5l4k3j2i1h0g9f8e7d6c5b4a',
      fromAddress: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      toAddress: '0x8ba1f109551bD432803012645Hac136c0532925a',
      exchangeRate: 0.065,
      notes: 'Portfolio rebalancing'
    },
    {
      id: '4',
      type: 'sell',
      amount: 1000,
      currency: 'USD',
      description: 'Sold Ethereum',
      date: '2024-01-12',
      time: '09:22:33',
      status: 'pending',
      fee: 12.50,
      hash: '0x5a4b3c2d1e0f9g8h7i6j5k4l3m2n1o0p9q8r7s6t5u4v3w2x1y0z',
      fromAddress: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      exchangeRate: 2450.00,
      notes: 'Profit taking at resistance level'
    },
    {
      id: '5',
      type: 'buy',
      amount: 2.5,
      currency: 'ETH',
      description: 'Bought Ethereum',
      date: '2024-01-11',
      time: '13:18:07',
      status: 'completed',
      fee: 8.75,
      hash: '0x3c2b1a0z9y8x7w6v5u4t3s2r1q0p9o8n7m6l5k4j3i2h1g0f9e8d',
      fromAddress: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
      toAddress: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      exchangeRate: 2380.50,
      notes: 'Dip buying opportunity'
    },
    {
      id: '6',
      type: 'trade',
      amount: 0.1,
      currency: 'BTC',
      description: 'BTC to USDC Trade',
      date: '2024-01-10',
      time: '11:55:14',
      status: 'failed',
      fee: 5.00,
      notes: 'Transaction failed due to network congestion'
    }
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return <ArrowDownLeft className="h-5 w-5 text-green-600" />
      case 'sell':
        return <ArrowUpRight className="h-5 w-5 text-red-600" />
      case 'trade':
        return <TrendingUp className="h-5 w-5 text-blue-600" />
      case 'purchase':
        return <ShoppingBag className="h-5 w-5 text-purple-600" />
      default:
        return <Banknote className="h-5 w-5 text-gray-600" />
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

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'buy':
        return 'text-green-600 bg-green-50'
      case 'sell':
        return 'text-red-600 bg-red-50'
      case 'trade':
        return 'text-blue-600 bg-blue-50'
      case 'purchase':
        return 'text-purple-600 bg-purple-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.currency.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || transaction.type === filterType
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const formatAddress = (address: string) => {
    if (!address) return 'N/A'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Transaction History</h1>
          <p className="text-gray-600">Track all your cryptocurrency transactions and marketplace purchases</p>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Type Filter */}
            <div className="lg:w-48">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="buy">Buy</option>
                <option value="sell">Sell</option>
                <option value="trade">Trade</option>
                <option value="purchase">Purchase</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="lg:w-48">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
            </div>

            {/* Export Button */}
            <button className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              <Download className="h-5 w-5" />
              <span>Export</span>
            </button>
          </div>
        </div>

        {/* Transaction List */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Transaction</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Amount</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date & Time</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fee</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-white rounded-lg shadow-sm border">
                          {getTransactionIcon(transaction.type)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{transaction.description}</h3>
                          {transaction.hash && (
                            <p className="text-sm text-gray-500">
                              Hash: {formatAddress(transaction.hash)}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full capitalize ${getTypeColor(transaction.type)}`}>
                        {transaction.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        {transaction.amount} {transaction.currency}
                      </div>
                      {transaction.exchangeRate && (
                        <div className="text-sm text-gray-500">
                          @ ${transaction.exchangeRate.toLocaleString()}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{transaction.date}</div>
                      <div className="text-sm text-gray-500">{transaction.time}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full capitalize ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">
                        {transaction.fee > 0 ? `$${transaction.fee}` : 'Free'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedTransaction(transaction)}
                        className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 font-medium"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                        <ChevronRight className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <Banknote className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>

        {/* Transaction Detail Modal */}
        {selectedTransaction && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Transaction Details</h2>
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <ArrowUpRight className="h-5 w-5 text-gray-500 rotate-45" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="space-y-6">
                  {/* Transaction Overview */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="p-3 bg-white rounded-lg shadow-sm">
                      {getTransactionIcon(selectedTransaction.type)}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{selectedTransaction.description}</h3>
                      <p className="text-gray-600">Transaction ID: {selectedTransaction.id}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">
                        {selectedTransaction.amount} {selectedTransaction.currency}
                      </div>
                      <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full capitalize ${getStatusColor(selectedTransaction.status)}`}>
                        {selectedTransaction.status}
                      </span>
                    </div>
                  </div>

                  {/* Transaction Details Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                        <div className="text-gray-900">{selectedTransaction.date} at {selectedTransaction.time}</div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <span className={`inline-block px-3 py-1 text-sm font-medium rounded-full capitalize ${getTypeColor(selectedTransaction.type)}`}>
                          {selectedTransaction.type}
                        </span>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Fee</label>
                        <div className="text-gray-900">
                          {selectedTransaction.fee > 0 ? `$${selectedTransaction.fee}` : 'Free'}
                        </div>
                      </div>

                      {selectedTransaction.exchangeRate && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Exchange Rate</label>
                          <div className="text-gray-900">${selectedTransaction.exchangeRate.toLocaleString()}</div>
                        </div>
                      )}
                    </div>

                    <div className="space-y-4">
                      {selectedTransaction.hash && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Transaction Hash</label>
                          <div className="flex items-center space-x-2">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded flex-1 truncate">
                              {selectedTransaction.hash}
                            </code>
                            <button
                              onClick={() => copyToClipboard(selectedTransaction.hash!)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Copy to clipboard"
                            >
                              <Download className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      )}

                      {selectedTransaction.fromAddress && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">From Address</label>
                          <div className="flex items-center space-x-2">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded flex-1 truncate">
                              {selectedTransaction.fromAddress}
                            </code>
                            <button
                              onClick={() => copyToClipboard(selectedTransaction.fromAddress!)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Copy to clipboard"
                            >
                              <Download className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      )}

                      {selectedTransaction.toAddress && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">To Address</label>
                          <div className="flex items-center space-x-2">
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded flex-1 truncate">
                              {selectedTransaction.toAddress}
                            </code>
                            <button
                              onClick={() => copyToClipboard(selectedTransaction.toAddress!)}
                              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                              title="Copy to clipboard"
                            >
                              <Download className="h-4 w-4 text-gray-500" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedTransaction.notes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                      <div className="p-4 bg-gray-50 rounded-xl text-gray-900">
                        {selectedTransaction.notes}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 flex space-x-4">
                <button
                  onClick={() => setSelectedTransaction(null)}
                  className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition-colors"
                >
                  Close
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Export Details</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default TransactionsPage
