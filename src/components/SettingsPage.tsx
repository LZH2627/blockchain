import React, { useState } from 'react'
import { Settings, User, Shield, Wallet, Key, Bell, Globe, Smartphone, Eye, EyeOff, Copy, Check, ExternalLink, RefreshCw, AlertTriangle, CheckCircle, XCircle, Zap, Lock, Unlock, TrendingUp, DollarSign, PieChart, BarChart3, Activity, Clock, ArrowUpRight, ArrowDownLeft, Plus, Minus } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

export const SettingsPage: React.FC = () => {
  const { user, updateDaoMembership } = useAuth()
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'defi' | 'notifications' | 'privacy'>('profile')
  const [showPrivateKey, setShowPrivateKey] = useState(false)
  const [copiedAddress, setCopiedAddress] = useState('')
  const [defiEnabled, setDefiEnabled] = useState(true)
  const [autoStaking, setAutoStaking] = useState(true)
  const [yieldFarming, setYieldFarming] = useState(false)
  const [liquidityMining, setLiquidityMining] = useState(true)
  const [riskLevel, setRiskLevel] = useState<'conservative' | 'moderate' | 'aggressive'>('moderate')

  // Mock DeFi data
  const defiStats = {
    totalValueLocked: 45678.90,
    totalEarnings: 2345.67,
    activePositions: 8,
    stakingRewards: 1234.56,
    yieldFarmingRewards: 567.89,
    liquidityRewards: 543.22,
    portfolioGrowth: 12.5
  }

  const stakingPools = [
    {
      id: 1,
      name: 'ETH 2.0 Staking',
      apy: 4.2,
      staked: 12.5,
      rewards: 0.525,
      status: 'active',
      lockPeriod: 'Flexible',
      risk: 'Low'
    },
    {
      id: 2,
      name: 'USDC Lending',
      apy: 8.7,
      staked: 5000,
      rewards: 435,
      status: 'active',
      lockPeriod: '30 days',
      risk: 'Low'
    },
    {
      id: 3,
      name: 'BTC-ETH LP',
      apy: 15.3,
      staked: 8.2,
      rewards: 1.254,
      status: 'active',
      lockPeriod: '90 days',
      risk: 'Medium'
    },
    {
      id: 4,
      name: 'DeFi Index Fund',
      apy: 22.1,
      staked: 2500,
      rewards: 552.5,
      status: 'pending',
      lockPeriod: '180 days',
      risk: 'High'
    }
  ]

  const walletAddresses = [
    {
      name: 'Primary Wallet',
      address: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      balance: 15.67,
      type: 'ETH',
      verified: true
    },
    {
      name: 'DeFi Vault',
      address: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      balance: 25000,
      type: 'USDC',
      verified: true
    },
    {
      name: 'Yield Farming',
      address: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
      balance: 2.34,
      type: 'WBTC',
      verified: false
    }
  ]

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopiedAddress(type)
    setTimeout(() => setCopiedAddress(''), 2000)
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'text-green-600 bg-green-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'high': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'paused': return 'text-red-600 bg-red-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'defi', label: 'DeFi Management', icon: TrendingUp },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Privacy', icon: Eye }
  ]

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Settings className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
              <p className="text-gray-600">Manage your profile and DeFi preferences</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Profile Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-center space-x-6">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                        <User className="h-10 w-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
                          Change Avatar
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          defaultValue={user?.name || ''}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          defaultValue={user?.email || ''}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                          <option>United States</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                          <option>Germany</option>
                          <option>France</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about yourself..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="flex justify-end">
                      <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all">
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h2>
                  
                  <div className="space-y-6">
                    {/* Wallet Addresses */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Connected Wallets</h3>
                      <div className="space-y-4">
                        {walletAddresses.map((wallet, index) => (
                          <div key={index} className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-2">
                                  <h4 className="font-medium text-gray-900">{wallet.name}</h4>
                                  {wallet.verified && (
                                    <CheckCircle className="h-4 w-4 text-green-600" />
                                  )}
                                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                                    {wallet.type}
                                  </span>
                                </div>
                                <div className="font-mono text-sm text-gray-600 mb-1">
                                  {wallet.address}
                                </div>
                                <div className="text-sm text-gray-500">
                                  Balance: {wallet.balance} {wallet.type}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => copyToClipboard(wallet.address, wallet.name)}
                                  className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                  {copiedAddress === wallet.name ? (
                                    <Check className="h-4 w-4 text-green-600" />
                                  ) : (
                                    <Copy className="h-4 w-4 text-gray-600" />
                                  )}
                                </button>
                                <button className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
                                  <ExternalLink className="h-4 w-4 text-gray-600" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Private Key Management */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Private Key Management</h3>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                        <div className="flex items-start space-x-3">
                          <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                          <div className="flex-1">
                            <h4 className="font-medium text-yellow-800 mb-2">Security Warning</h4>
                            <p className="text-sm text-yellow-700 mb-4">
                              Never share your private keys. Store them securely and consider using hardware wallets for large amounts.
                            </p>
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => setShowPrivateKey(!showPrivateKey)}
                                className="flex items-center space-x-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
                              >
                                {showPrivateKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                <span>{showPrivateKey ? 'Hide' : 'Show'} Private Key</span>
                              </button>
                              <button className="px-4 py-2 border border-yellow-600 text-yellow-600 rounded-lg hover:bg-yellow-50 transition-colors">
                                Export Backup
                              </button>
                            </div>
                            {showPrivateKey && (
                              <div className="mt-4 p-3 bg-gray-900 rounded-lg">
                                <code className="text-green-400 text-sm font-mono">
                                  0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef
                                </code>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Two-Factor Authentication */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Two-Factor Authentication</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <Smartphone className="h-5 w-5 text-gray-600" />
                            <div>
                              <div className="font-medium text-gray-900">Authenticator App</div>
                              <div className="text-sm text-gray-600">Use Google Authenticator or similar</div>
                            </div>
                          </div>
                          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                            Enable
                          </button>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <Key className="h-5 w-5 text-gray-600" />
                            <div>
                              <div className="font-medium text-gray-900">Hardware Security Key</div>
                              <div className="text-sm text-gray-600">YubiKey or similar device</div>
                            </div>
                          </div>
                          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                            Setup
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* DeFi Management Tab */}
              {activeTab === 'defi' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">DeFi Management</h2>
                  
                  {/* DeFi Overview */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <DollarSign className="h-6 w-6" />
                        <TrendingUp className="h-4 w-4" />
                      </div>
                      <div className="text-2xl font-bold">${defiStats.totalValueLocked.toLocaleString()}</div>
                      <div className="text-sm opacity-90">Total Value Locked</div>
                    </div>
                    <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-6 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <TrendingUp className="h-6 w-6" />
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                      <div className="text-2xl font-bold">${defiStats.totalEarnings.toLocaleString()}</div>
                      <div className="text-sm opacity-90">Total Earnings</div>
                    </div>
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-6 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <PieChart className="h-6 w-6" />
                        <Activity className="h-4 w-4" />
                      </div>
                      <div className="text-2xl font-bold">{defiStats.activePositions}</div>
                      <div className="text-sm opacity-90">Active Positions</div>
                    </div>
                    <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-6 text-white">
                      <div className="flex items-center justify-between mb-2">
                        <BarChart3 className="h-6 w-6" />
                        <ArrowUpRight className="h-4 w-4" />
                      </div>
                      <div className="text-2xl font-bold">+{defiStats.portfolioGrowth}%</div>
                      <div className="text-sm opacity-90">Portfolio Growth</div>
                    </div>
                  </div>

                  {/* DeFi Settings */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">DeFi Automation</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${defiEnabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                              {defiEnabled ? <Unlock className="h-5 w-5 text-green-600" /> : <Lock className="h-5 w-5 text-gray-600" />}
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">DeFi Protocol Access</div>
                              <div className="text-sm text-gray-600">Enable interaction with DeFi protocols</div>
                            </div>
                          </div>
                          <button
                            onClick={() => setDefiEnabled(!defiEnabled)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              defiEnabled ? 'bg-green-600' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              defiEnabled ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${autoStaking ? 'bg-blue-100' : 'bg-gray-100'}`}>
                              <Zap className={`h-5 w-5 ${autoStaking ? 'text-blue-600' : 'text-gray-600'}`} />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Auto-Staking</div>
                              <div className="text-sm text-gray-600">Automatically stake eligible tokens</div>
                            </div>
                          </div>
                          <button
                            onClick={() => setAutoStaking(!autoStaking)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              autoStaking ? 'bg-blue-600' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              autoStaking ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${yieldFarming ? 'bg-purple-100' : 'bg-gray-100'}`}>
                              <TrendingUp className={`h-5 w-5 ${yieldFarming ? 'text-purple-600' : 'text-gray-600'}`} />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Yield Farming</div>
                              <div className="text-sm text-gray-600">Participate in yield farming opportunities</div>
                            </div>
                          </div>
                          <button
                            onClick={() => setYieldFarming(!yieldFarming)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              yieldFarming ? 'bg-purple-600' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              yieldFarming ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className={`p-2 rounded-lg ${liquidityMining ? 'bg-cyan-100' : 'bg-gray-100'}`}>
                              <Activity className={`h-5 w-5 ${liquidityMining ? 'text-cyan-600' : 'text-gray-600'}`} />
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">Liquidity Mining</div>
                              <div className="text-sm text-gray-600">Provide liquidity for rewards</div>
                            </div>
                          </div>
                          <button
                            onClick={() => setLiquidityMining(!liquidityMining)}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              liquidityMining ? 'bg-cyan-600' : 'bg-gray-300'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              liquidityMining ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Risk Management */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Risk Management</h3>
                      <div className="bg-gray-50 rounded-xl p-6">
                        <div className="mb-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Risk Tolerance</label>
                          <div className="grid grid-cols-3 gap-3">
                            {['conservative', 'moderate', 'aggressive'].map((level) => (
                              <button
                                key={level}
                                onClick={() => setRiskLevel(level as any)}
                                className={`p-3 rounded-xl text-center transition-colors ${
                                  riskLevel === level
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-white text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                <div className="font-medium capitalize">{level}</div>
                                <div className="text-xs opacity-75">
                                  {level === 'conservative' && '1-5% APY'}
                                  {level === 'moderate' && '5-15% APY'}
                                  {level === 'aggressive' && '15%+ APY'}
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Max Position Size (%)</label>
                            <input
                              type="range"
                              min="1"
                              max="50"
                              defaultValue="25"
                              className="w-full"
                            />
                            <div className="text-sm text-gray-600 mt-1">25% of portfolio</div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Stop Loss (%)</label>
                            <input
                              type="range"
                              min="5"
                              max="50"
                              defaultValue="20"
                              className="w-full"
                            />
                            <div className="text-sm text-gray-600 mt-1">20% loss limit</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Active Positions */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Active DeFi Positions</h3>
                      <div className="space-y-4">
                        {stakingPools.map((pool) => (
                          <div key={pool.id} className="bg-gray-50 rounded-xl p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                                  <TrendingUp className="h-5 w-5 text-white" />
                                </div>
                                <div>
                                  <h4 className="font-medium text-gray-900">{pool.name}</h4>
                                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                                    <span>{pool.apy}% APY</span>
                                    <span>•</span>
                                    <span className={`px-2 py-1 rounded-full text-xs ${getRiskColor(pool.risk)}`}>
                                      {pool.risk} Risk
                                    </span>
                                    <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(pool.status)}`}>
                                      {pool.status}
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="font-medium text-gray-900">{pool.staked} {pool.name.includes('USDC') ? 'USDC' : 'ETH'}</div>
                                <div className="text-sm text-green-600">+{pool.rewards} rewards</div>
                              </div>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>Lock Period: {pool.lockPeriod}</span>
                              <div className="flex items-center space-x-2">
                                <button className="p-1 hover:bg-gray-200 rounded">
                                  <Plus className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:bg-gray-200 rounded">
                                  <Minus className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:bg-gray-200 rounded">
                                  <RefreshCw className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Trading Notifications</h3>
                      <div className="space-y-4">
                        {[
                          { title: 'Price Alerts', desc: 'Get notified when prices hit your targets' },
                          { title: 'Trade Confirmations', desc: 'Receive confirmations for all trades' },
                          { title: 'Portfolio Updates', desc: 'Daily portfolio performance summaries' },
                          { title: 'Market News', desc: 'Important market news and updates' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <div className="font-medium text-gray-900">{item.title}</div>
                              <div className="text-sm text-gray-600">{item.desc}</div>
                            </div>
                            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">DeFi Notifications</h3>
                      <div className="space-y-4">
                        {[
                          { title: 'Staking Rewards', desc: 'When you earn staking rewards' },
                          { title: 'Yield Farming', desc: 'Updates on farming positions' },
                          { title: 'Liquidity Changes', desc: 'Changes in liquidity pool positions' },
                          { title: 'Risk Alerts', desc: 'When positions exceed risk thresholds' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <div className="font-medium text-gray-900">{item.title}</div>
                              <div className="text-sm text-gray-600">{item.desc}</div>
                            </div>
                            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600">
                              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="p-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Privacy Settings</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Privacy</h3>
                      <div className="space-y-4">
                        {[
                          { title: 'Portfolio Visibility', desc: 'Make your portfolio public on leaderboards' },
                          { title: 'Trading Activity', desc: 'Share your trading activity with others' },
                          { title: 'Analytics Tracking', desc: 'Allow anonymous usage analytics' },
                          { title: 'Marketing Communications', desc: 'Receive promotional emails and updates' }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                            <div>
                              <div className="font-medium text-gray-900">{item.title}</div>
                              <div className="text-sm text-gray-600">{item.desc}</div>
                            </div>
                            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-300">
                              <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-1" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Data Management</h3>
                      <div className="space-y-4">
                        <button className="w-full p-4 text-left bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors">
                          <div className="font-medium text-blue-900">Download My Data</div>
                          <div className="text-sm text-blue-700">Get a copy of all your data</div>
                        </button>
                        <button className="w-full p-4 text-left bg-red-50 border border-red-200 rounded-xl hover:bg-red-100 transition-colors">
                          <div className="font-medium text-red-900">Delete Account</div>
                          <div className="text-sm text-red-700">Permanently delete your account and data</div>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SettingsPage
