import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Zap, Menu, X, User, LogOut, Settings, Wallet, ShoppingBag, TrendingUp, Newspaper, Receipt } from 'lucide-react'

interface HeaderProps {
  isAuthenticated: boolean
  user: any
  onLogout: () => void
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    onLogout()
    setIsProfileOpen(false)
    navigate('/')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen)
  }

  const closeMenus = () => {
    setIsMenuOpen(false)
    setIsProfileOpen(false)
  }

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenus}>
            <Zap className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">CryptoBolt</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              onClick={closeMenus}
            >
              Home
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  to="/portfolio" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                  onClick={closeMenus}
                >
                  <Wallet className="h-4 w-4" />
                  <span>Portfolio</span>
                </Link>
                <Link 
                  to="/marketplace" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                  onClick={closeMenus}
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>Marketplace</span>
                </Link>
                <Link 
                  to="/trading" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                  onClick={closeMenus}
                >
                  <TrendingUp className="h-4 w-4" />
                  <span>Trading</span>
                </Link>
                <Link 
                  to="/news" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                  onClick={closeMenus}
                >
                  <Newspaper className="h-4 w-4" />
                  <span>News</span>
                </Link>
                <Link 
                  to="/transactions" 
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1"
                  onClick={closeMenus}
                >
                  <Receipt className="h-4 w-4" />
                  <span>Transactions</span>
                </Link>
              </>
            )}
          </nav>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>{user?.name || user?.email || 'User'}</span>
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={closeMenus}
                    >
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={closeMenus}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  onClick={closeMenus}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 p-2 rounded-md transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="flex flex-col space-y-2">
              <Link
                to="/"
                className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors"
                onClick={closeMenus}
              >
                Home
              </Link>
              
              {isAuthenticated ? (
                <>
                  <Link
                    to="/portfolio"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2"
                    onClick={closeMenus}
                  >
                    <Wallet className="h-5 w-5" />
                    <span>Portfolio</span>
                  </Link>
                  <Link
                    to="/marketplace"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2"
                    onClick={closeMenus}
                  >
                    <ShoppingBag className="h-5 w-5" />
                    <span>Marketplace</span>
                  </Link>
                  <Link
                    to="/trading"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2"
                    onClick={closeMenus}
                  >
                    <TrendingUp className="h-5 w-5" />
                    <span>Trading</span>
                  </Link>
                  <Link
                    to="/news"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2"
                    onClick={closeMenus}
                  >
                    <Newspaper className="h-5 w-5" />
                    <span>News</span>
                  </Link>
                  <Link
                    to="/transactions"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2"
                    onClick={closeMenus}
                  >
                    <Receipt className="h-5 w-5" />
                    <span>Transactions</span>
                  </Link>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <Link
                      to="/settings"
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2"
                      onClick={closeMenus}
                    >
                      <Settings className="h-5 w-5" />
                      <span>Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors flex items-center space-x-2 w-full text-left"
                    >
                      <LogOut className="h-5 w-5" />
                      <span>Logout</span>
                    </Link>
                  </div>
                </>
              ) : (
                <div className="border-t border-gray-200 pt-2 mt-2 space-y-2">
                  <Link
                    to="/login"
                    className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium transition-colors block"
                    onClick={closeMenus}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-blue-600 text-white hover:bg-blue-700 px-3 py-2 rounded-md text-base font-medium transition-colors block text-center"
                    onClick={closeMenus}
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
