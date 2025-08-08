import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthContextProvider, useAuth } from './contexts/AuthContext'
import Header from './components/Header'
import Home from './components/Home'
import SignIn from './components/SignIn'
import Dashboard from './components/Dashboard'
import MarketplacePage from './components/MarketplacePage'
import TradePage from './components/TradePage'
import CryptoDetailPage from './components/CryptoDetailPage'
import NewsPage from './components/NewsPage'
import Footer from './components/Footer'

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
