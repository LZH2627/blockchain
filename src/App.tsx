import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Zap, Menu, X, User, LogOut, Settings, Wallet, ShoppingBag, TrendingUp, Newspaper, Receipt } from 'lucide-react'
import { AuthContextProvider, useAuth } from './contexts/AuthContext'
import { Home } from './components/Home'
import { SignIn } from './components/SignIn'
import { Dashboard } from './components/Dashboard'
import { MarketplacePage } from './components/MarketplacePage'
import { TradePage } from './components/TradePage'
import { CryptoDetailPage } from './components/CryptoDetailPage'
import { NewsPage } from './components/NewsPage'
import { Footer } from './components/Footer'

// Transaction History Component
interface TransactionHistoryProps {
  onClose: () => void
}

const TransactionHistory: React.FC<TransactionHistoryProps> = ({ onClose }) => {
  const mockTransactions = [
    {
      id: '1',
      type: 'buy' as const,
      amount: 0.5,
      currency: 'BTC',
      description: 'Bought Bitcoin',
      date: '2024-01-15',
      status: 'completed' as const
    },
    {
      id: '2',
      type: 'purchase' as const,
      amount: 299.99,
      currency: 'USD',
      description: 'Hardware Wallet Pro',
      date: '2024-01-14',
      status: 'completed' as const
    },
    {
      id: '3',
      type: 'trade' as const,
      amount: 10,
      currency: 'ETH',
      description: 'ETH to BTC Trade',
      date: '2024-01-13',
      status: 'completed' as const
    },
    {
      id: '4',
      type: 'sell' as const,
      amount: 1000,
      currency: 'USD',
      description: 'Sold Ethereum',
      date: '2024-01-12',
      status: 'pending' as const
    }
  ]

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return <Receipt className="h-4 w-4 text-green-600" />
      case 'sell':
        return <Receipt className="h-4 w-4 text-red-600" />
      case 'trade':
        return <TrendingUp className="h-4 w-4 text-blue-600" />
      case 'purchase':
        return <ShoppingBag className="h-4 w-4 text-purple-600" />
      default:
        return <Receipt className="h-4 w-4 text-gray-600" />
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
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Transaction History</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

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
        </div>

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

// Header Component
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [showTransactions, setShowTransactions] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsProfileOpen(false)
  }

  const handleTransactionsClick = () => {
    setShowTransactions(true)
    setIsProfileOpen(false)
  }

  return (
    <>
      <header className="relative z-20 backdrop-blur-md bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
              <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CryptoVault
              </span>
            </Link>

            {/* Desktop Navigation */}
            {isAuthenticated ? (
              <nav className="hidden md:flex items-center space-x-8">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <Link
                  to="/marketplace"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Marketplace</span>
                </Link>
                <Link
                  to="/trade"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Trade</span>
                </Link>
                <Link
                  to="/news"
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <Newspaper className="h-4 w-4" />
                  <span>News</span>
                </Link>
                <button
                  onClick={handleTransactionsClick}
                  className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                >
                  <Receipt className="h-4 w-4" />
                  <span>Transactions</span>
                </button>
              </nav>
            ) : (
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Features
                </a>
                <a href="#about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  About
                </a>
                <a href="#contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                  Contact
                </a>
              </nav>
            )}

            {/* Desktop Auth */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-2 p-2 rounded-xl hover:bg-white/20 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{user?.name || user?.email}</span>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-xl backdrop-blur-md bg-white/90 border border-white/30 shadow-lg py-2">
                      <button
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-white/50 transition-colors"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </button>
                      <button
                        onClick={handleTransactionsClick}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-white/50 transition-colors"
                      >
                        <Receipt className="h-4 w-4" />
                        <span>Transactions</span>
                      </button>
                      <button
                        onClick={() => setIsProfileOpen(false)}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-white/50 transition-colors"
                      >
                        <Wallet className="h-4 w-4" />
                        <span>Wallet</span>
                      </button>
                      <hr className="my-2 border-white/30" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut className="h-4 w-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/signin"
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Sign In
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-xl hover:bg-white/20 transition-colors"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-700" />
              ) : (
                <Menu className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/20">
              {isAuthenticated ? (
                <div className="space-y-4">
                  <Link
                    to="/dashboard"
                    className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    to="/marketplace"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Marketplace</span>
                  </Link>
                  <Link
                    to="/trade"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span>Trade</span>
                  </Link>
                  <Link
                    to="/news"
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Newspaper className="h-4 w-4" />
                    <span>News</span>
                  </Link>
                  <button
                    onClick={() => {
                      handleTransactionsClick()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition-colors"
                  >
                    <Receipt className="h-4 w-4" />
                    <span>Transactions</span>
                  </button>
                  <hr className="border-white/30" />
                  <div className="flex items-center space-x-2 py-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                      <User className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{user?.name || user?.email}</span>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout()
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <a
                    href="#features"
                    className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Features
                  </a>
                  <a
                    href="#about"
                    className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    About
                  </a>
                  <a
                    href="#contact"
                    className="block text-gray-700 hover:text-blue-600 font-medium transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Contact
                  </a>
                  <Link
                    to="/signin"
                    className="block w-full text-center px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Transaction History Modal */}
      {showTransactions && (
        <TransactionHistory onClose={() => setShowTransactions(false)} />
      )}
    </>
  )
}

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" replace />
}

// Public Route Component (redirect to dashboard if authenticated)
const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? <>{children}</> : <Navigate to="/dashboard" replace />
}

function AppContent() {
  const { isAuthenticated } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 font-inter">
      {/* Background Pattern */}
      <div className="fixed inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-cyan-400/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)`
        }}></div>
      </div>
      
      <div className="relative z-10">
        <Header />
        
        <Routes>
          <Route 
            path="/" 
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            } 
          />
          <Route 
            path="/signin" 
            element={
              <PublicRoute>
                <SignIn />
              </PublicRoute>
            } 
          />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/marketplace" 
            element={
              <ProtectedRoute>
                <MarketplacePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/trade" 
            element={
              <ProtectedRoute>
                <TradePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/news" 
            element={
              <ProtectedRoute>
                <NewsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/crypto/:cryptoId" 
            element={
              <ProtectedRoute>
                <CryptoDetailPage />
              </ProtectedRoute>
            } 
          />
          {/* Redirect authenticated users from root to dashboard */}
          <Route 
            path="*" 
            element={<Navigate to={isAuthenticated ? "/dashboard" : "/"} replace />} 
          />
        </Routes>
        
        {!isAuthenticated && <Footer />}
      </div>
      
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            borderRadius: '12px',
          },
        }}
      />
    </div>
  )
}

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthContextProvider>
  )
}

export default App
