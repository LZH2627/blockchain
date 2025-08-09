import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Zap, Menu, X, User, LogOut, Settings, Wallet, ShoppingBag, TrendingUp, Newspaper, Receipt, Users } from 'lucide-react'
import { AuthContextProvider, useAuth } from './contexts/AuthContext'
import { Home } from './components/Home'
import { SignIn } from './components/SignIn'
import { Dashboard } from './components/Dashboard'
import { MarketplacePage } from './components/MarketplacePage'
import { PaymentPage } from './components/PaymentPage'
import { TradePage } from './components/TradePage'
import { CryptoDetailPage } from './components/CryptoDetailPage'
import { NewsPage } from './components/NewsPage'
import { TransactionsPage } from './components/TransactionsPage'
import { DAOPage } from './components/DAOPage'
import { WalletPage } from './components/WalletPage'
import { SettingsPage } from './components/SettingsPage'
import { Footer } from './components/Footer'

// Header Component
const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
    setIsProfileOpen(false)
  }

  return (
    <header className="relative z-20 backdrop-blur-md bg-white/10 border-b border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to={isAuthenticated ? "/dashboard" : "/"} className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-gradient-to-r from-primary to-primary-dark">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
              CryptoBolt
            </span>
          </Link>

          {/* Desktop Navigation */}
          {isAuthenticated ? (
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/dashboard"
                className="text-gray-700 hover:text-primary font-medium transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/marketplace"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium transition-colors"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Marketplace</span>
              </Link>
              <Link
                to="/wallet"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium transition-colors"
              >
                <Wallet className="h-4 w-4" />
                <span>Wallet</span>
              </Link>
              <Link
                to="/trade"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium transition-colors"
              >
                <TrendingUp className="h-4 w-4" />
                <span>Trade</span>
              </Link>
              <Link
                to="/news"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium transition-colors"
              >
                <Newspaper className="h-4 w-4" />
                <span>News</span>
              </Link>
              <Link
                to="/dao"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium transition-colors"
              >
                <Users className="h-4 w-4" />
                <span>DAO</span>
              </Link>
              <Link
                to="/transactions"
                className="flex items-center space-x-1 text-gray-700 hover:text-primary font-medium transition-colors"
              >
                <Receipt className="h-4 w-4" />
                <span>Transactions</span>
              </Link>
            </nav>
          ) : (
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-700 hover:text-primary font-medium transition-colors">
                Features
              </a>
              <a href="#contact" className="text-gray-700 hover:text-primary font-medium transition-colors">
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
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{user?.name || user?.email}</span>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-xl backdrop-blur-md bg-white/90 border border-white/30 shadow-lg py-2">
                    <Link
                      to="/settings"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-white/50 transition-colors"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                    <Link
                      to="/wallet"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-white/50 transition-colors"
                    >
                      <Wallet className="h-4 w-4" />
                      <span>NFT Wallet</span>
                    </Link>
                    <Link
                      to="/transactions"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-left text-gray-700 hover:bg-white/50 transition-colors"
                    >
                      <Receipt className="h-4 w-4" />
                      <span>Transactions</span>
                    </Link>
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
                className="px-6 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl"
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
                  className="block text-gray-700 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/marketplace"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Marketplace</span>
                </Link>
                <Link
                  to="/wallet"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Wallet className="h-4 w-4" />
                  <span>Wallet</span>
                </Link>
                <Link
                  to="/trade"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Trade</span>
                </Link>
                <Link
                  to="/news"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Newspaper className="h-4 w-4" />
                  <span>News</span>
                </Link>
                <Link
                  to="/dao"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Users className="h-4 w-4" />
                  <span>DAO</span>
                </Link>
                <Link
                  to="/transactions"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Receipt className="h-4 w-4" />
                  <span>Transactions</span>
                </Link>
                <Link
                  to="/settings"
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </Link>
                <hr className="border-white/30" />
                <div className="flex items-center space-x-2 py-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-dark flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-gray-700 font-medium">{user?.name || user?.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <a href="#features" className="block text-gray-700 hover:text-primary font-medium transition-colors">
                  Features
                </a>
                <a href="#contact" className="block text-gray-700 hover:text-primary font-medium transition-colors">
                  Contact
                </a>
                <Link
                  to="/signin"
                  className="block px-6 py-2 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-medium hover:from-primary-dark hover:to-primary transition-all duration-300 shadow-lg hover:shadow-xl text-center"
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
  )
}

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? <>{children}</> : <Navigate to="/signin" />
}

// Main App Component
const App: React.FC = () => {
  return (
    <AuthContextProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signin" element={<SignIn />} />
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
                path="/payment"
                element={
                  <ProtectedRoute>
                    <PaymentPage />
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
                path="/crypto/:id"
                element={
                  <ProtectedRoute>
                    <CryptoDetailPage />
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
                path="/transactions"
                element={
                  <ProtectedRoute>
                    <TransactionsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dao"
                element={
                  <ProtectedRoute>
                    <DAOPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/wallet"
                element={
                  <ProtectedRoute>
                    <WalletPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <SettingsPage />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" />
        </div>
      </Router>
    </AuthContextProvider>
  )
}

export default App
