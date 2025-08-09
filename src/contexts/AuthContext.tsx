import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  email: string
  name?: string
  daoMembership?: 'none' | 'basic' | 'premium' | 'elite'
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  loading: boolean
  updateDaoMembership: (membership: 'none' | 'basic' | 'premium' | 'elite') => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider')
  }
  return context
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth state
    const storedAuth = localStorage.getItem('auth')
    const storedUser = localStorage.getItem('user')
    
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true)
      setUser(JSON.parse(storedUser))
    }
    
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const mockUser: User = {
      id: '1',
      email,
      name: email.split('@')[0],
      daoMembership: 'none' // Default to no membership
    }
    
    setUser(mockUser)
    setIsAuthenticated(true)
    
    // Store auth state
    localStorage.setItem('auth', 'true')
    localStorage.setItem('user', JSON.stringify(mockUser))
    
    setLoading(false)
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem('auth')
    localStorage.removeItem('user')
  }

  const updateDaoMembership = (membership: 'none' | 'basic' | 'premium' | 'elite') => {
    if (user) {
      const updatedUser = { ...user, daoMembership: membership }
      setUser(updatedUser)
      localStorage.setItem('user', JSON.stringify(updatedUser))
    }
  }

  const value: AuthContextType = {
    isAuthenticated,
    user,
    login,
    logout,
    loading,
    updateDaoMembership
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
