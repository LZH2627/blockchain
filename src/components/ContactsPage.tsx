import React, { useState } from 'react'
import { User, Search, Filter, MessageCircle, Send, Phone, Mail, Calendar, ArrowUpRight, ArrowDownLeft, TrendingUp, Plus, X, Edit3, Trash2, Star, StarOff } from 'lucide-react'

interface Contact {
  id: string
  name: string
  email?: string
  phone?: string
  walletAddress: string
  avatar?: string
  totalTransactions: number
  totalVolume: number
  lastTransactionDate: string
  transactionTypes: string[]
  notes?: string
  isFavorite: boolean
  tags: string[]
  firstTransactionDate: string
}

interface Transaction {
  id: string
  type: 'buy' | 'sell' | 'trade' | 'send' | 'receive'
  amount: number
  currency: string
  date: string
  contactId: string
}

export const ContactsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterTag, setFilterTag] = useState('all')
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null)
  const [showAddContact, setShowAddContact] = useState(false)
  const [editingContact, setEditingContact] = useState<Contact | null>(null)

  // Mock contacts data - in real app, this would come from transactions
  const mockContacts: Contact[] = [
    {
      id: '1',
      name: 'Alice Johnson',
      email: 'alice.johnson@email.com',
      phone: '+1 (555) 123-4567',
      walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      totalTransactions: 12,
      totalVolume: 45600,
      lastTransactionDate: '2024-01-15',
      firstTransactionDate: '2023-08-20',
      transactionTypes: ['buy', 'sell', 'trade'],
      notes: 'Regular trading partner, prefers BTC transactions',
      isFavorite: true,
      tags: ['trader', 'frequent']
    },
    {
      id: '2',
      name: 'Bob Smith',
      email: 'bob.smith@email.com',
      walletAddress: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy',
      totalTransactions: 5,
      totalVolume: 12300,
      lastTransactionDate: '2024-01-12',
      firstTransactionDate: '2023-11-15',
      transactionTypes: ['send', 'receive'],
      notes: 'Family member, occasional transfers',
      isFavorite: true,
      tags: ['family', 'trusted']
    },
    {
      id: '3',
      name: 'Carol Davis',
      email: 'carol.davis@email.com',
      phone: '+1 (555) 987-6543',
      walletAddress: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      totalTransactions: 8,
      totalVolume: 28900,
      lastTransactionDate: '2024-01-10',
      firstTransactionDate: '2023-09-05',
      transactionTypes: ['trade', 'buy'],
      notes: 'ETH specialist, good rates',
      isFavorite: false,
      tags: ['trader', 'ethereum']
    },
    {
      id: '4',
      name: 'David Wilson',
      walletAddress: '0x8ba1f109551bD432803012645Hac136c0532925a',
      totalTransactions: 3,
      totalVolume: 8500,
      lastTransactionDate: '2024-01-08',
      firstTransactionDate: '2023-12-01',
      transactionTypes: ['buy'],
      isFavorite: false,
      tags: ['new', 'buyer']
    }
  ]

  const [contacts, setContacts] = useState<Contact[]>(mockContacts)

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy':
      case 'receive':
        return <ArrowDownLeft className="h-3 w-3 text-green-600" />
      case 'sell':
      case 'send':
        return <ArrowUpRight className="h-3 w-3 text-red-600" />
      case 'trade':
        return <TrendingUp className="h-3 w-3 text-blue-600" />
      default:
        return null
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const toggleFavorite = (contactId: string) => {
    setContacts(contacts.map(contact => 
      contact.id === contactId 
        ? { ...contact, isFavorite: !contact.isFavorite }
        : contact
    ))
  }

  const deleteContact = (contactId: string) => {
    setContacts(contacts.filter(contact => contact.id !== contactId))
    setSelectedContact(null)
  }

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.walletAddress.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTag = filterTag === 'all' || contact.tags.includes(filterTag)
    const matchesFavorites = !showFavoritesOnly || contact.isFavorite
    
    return matchesSearch && matchesTag && matchesFavorites
  })

  const allTags = Array.from(new Set(contacts.flatMap(contact => contact.tags)))

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Smart Contacts</h1>
          <p className="text-gray-600">Manage contacts from your transaction history</p>
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
                  placeholder="Search contacts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Tag Filter */}
            <div className="lg:w-48">
              <select
                value={filterTag}
                onChange={(e) => setFilterTag(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Tags</option>
                {allTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            {/* Favorites Toggle */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-colors ${
                showFavoritesOnly 
                  ? 'bg-yellow-100 text-yellow-800 border border-yellow-200' 
                  : 'bg-gray-100 text-gray-700 border border-gray-200'
              }`}
            >
              <Star className={`h-4 w-4 ${showFavoritesOnly ? 'fill-current' : ''}`} />
              <span>Favorites</span>
            </button>

            {/* Add Contact Button */}
            <button
              onClick={() => setShowAddContact(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              <span>Add Contact</span>
            </button>
          </div>
        </div>

        {/* Contacts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
              onClick={() => setSelectedContact(contact)}
            >
              {/* Contact Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{contact.name}</h3>
                    <p className="text-sm text-gray-500">{formatAddress(contact.walletAddress)}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleFavorite(contact.id)
                  }}
                  className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {contact.isFavorite ? (
                    <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  ) : (
                    <StarOff className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Contact Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Transactions</p>
                  <p className="font-semibold text-gray-900">{contact.totalTransactions}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Volume</p>
                  <p className="font-semibold text-gray-900">${contact.totalVolume.toLocaleString()}</p>
                </div>
              </div>

              {/* Transaction Types */}
              <div className="flex items-center space-x-2 mb-4">
                {contact.transactionTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-1">
                    {getTransactionIcon(type)}
                    <span className="text-xs text-gray-600 capitalize">{type}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {contact.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Last Transaction */}
              <div className="text-sm text-gray-500">
                Last transaction: {contact.lastTransactionDate}
              </div>
            </div>
          ))}
        </div>

        {filteredContacts.length === 0 && (
          <div className="text-center py-12">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No contacts found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Contact Detail Modal */}
        {selectedContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-hidden">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">Contact Details</h2>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingContact(selectedContact)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <Edit3 className="h-5 w-5 text-gray-500" />
                  </button>
                  <button
                    onClick={() => setSelectedContact(null)}
                    className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <X className="h-5 w-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="space-y-6">
                  {/* Contact Overview */}
                  <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-gray-900">{selectedContact.name}</h3>
                      <p className="text-gray-600">{selectedContact.walletAddress}</p>
                      <div className="flex items-center space-x-4 mt-2">
                        <span className="text-sm text-gray-500">
                          {selectedContact.totalTransactions} transactions
                        </span>
                        <span className="text-sm text-gray-500">
                          ${selectedContact.totalVolume.toLocaleString()} volume
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(selectedContact.id)}
                      className="p-2 hover:bg-white rounded-lg transition-colors"
                    >
                      {selectedContact.isFavorite ? (
                        <Star className="h-6 w-6 text-yellow-500 fill-current" />
                      ) : (
                        <StarOff className="h-6 w-6 text-gray-400" />
                      )}
                    </button>
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      {selectedContact.email && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">{selectedContact.email}</span>
                          </div>
                        </div>
                      )}

                      {selectedContact.phone && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                          <div className="flex items-center space-x-2">
                            <Phone className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-900">{selectedContact.phone}</span>
                          </div>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Transaction</label>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">{selectedContact.firstTransactionDate}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Transaction</label>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">{selectedContact.lastTransactionDate}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Types</label>
                        <div className="flex flex-wrap gap-2">
                          {selectedContact.transactionTypes.map((type) => (
                            <div key={type} className="flex items-center space-x-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                              {getTransactionIcon(type)}
                              <span className="text-sm capitalize">{type}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                        <div className="flex flex-wrap gap-2">
                          {selectedContact.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedContact.notes && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                      <div className="p-4 bg-gray-50 rounded-xl text-gray-900">
                        {selectedContact.notes}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-gray-200 bg-gray-50 flex space-x-4">
                <button
                  onClick={() => deleteContact(selectedContact.id)}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-xl font-medium hover:bg-red-200 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </button>
                <button
                  onClick={() => setEditingContact(selectedContact)}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition-colors"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit</span>
                </button>
                <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2">
                  <Send className="h-4 w-4" />
                  <span>Send Transaction</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContactsPage
