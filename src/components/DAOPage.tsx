import React, { useState } from 'react'
import { Users, Vote, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, Plus, Eye, ThumbsUp, ThumbsDown, Calendar, DollarSign, Target, Award, Gavel, Lock, ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

interface Proposal {
  id: string
  title: string
  description: string
  type: 'governance' | 'treasury' | 'technical' | 'community'
  status: 'active' | 'passed' | 'rejected' | 'pending'
  votesFor: number
  votesAgainst: number
  totalVotes: number
  quorum: number
  endDate: string
  proposer: string
  requestedAmount?: number
  category: string
}

interface DAOStats {
  totalMembers: number
  activeProposals: number
  treasuryBalance: number
  governanceToken: string
  votingPower: number
}

export const DAOPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'proposals' | 'treasury' | 'governance' | 'members'>('proposals')
  const [showCreateProposal, setShowCreateProposal] = useState(false)
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null)
  
  // Mock user membership status - in real app, this would come from user context/API
  const [userMembership, setUserMembership] = useState<'none' | 'basic' | 'premium' | 'elite'>('none')

  const daoStats: DAOStats = {
    totalMembers: 12847,
    activeProposals: 8,
    treasuryBalance: 2450000,
    governanceToken: 'CVAULT',
    votingPower: userMembership === 'none' ? 0 : userMembership === 'basic' ? 1250 : userMembership === 'premium' ? 3750 : 6250
  }

  const proposals: Proposal[] = [
    {
      id: '1',
      title: 'Implement Cross-Chain Bridge Integration',
      description: 'Proposal to integrate cross-chain bridge functionality to support Ethereum, Binance Smart Chain, and Polygon networks for seamless asset transfers.',
      type: 'technical',
      status: 'active',
      votesFor: 8420,
      votesAgainst: 1230,
      totalVotes: 9650,
      quorum: 15000,
      endDate: '2024-02-15',
      proposer: '0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4',
      requestedAmount: 150000,
      category: 'Development'
    },
    {
      id: '2',
      title: 'Community Rewards Program Enhancement',
      description: 'Expand the community rewards program to include staking rewards, referral bonuses, and educational content incentives.',
      type: 'community',
      status: 'active',
      votesFor: 6890,
      votesAgainst: 2340,
      totalVotes: 9230,
      quorum: 12000,
      endDate: '2024-02-12',
      proposer: '0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063',
      requestedAmount: 75000,
      category: 'Community'
    },
    {
      id: '3',
      title: 'Treasury Diversification Strategy',
      description: 'Diversify treasury holdings by allocating 30% to stablecoins, 40% to blue-chip cryptocurrencies, and 30% to DeFi protocols.',
      type: 'treasury',
      status: 'passed',
      votesFor: 15420,
      votesAgainst: 3240,
      totalVotes: 18660,
      quorum: 15000,
      endDate: '2024-01-28',
      proposer: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      category: 'Treasury'
    },
    {
      id: '4',
      title: 'Governance Token Burn Mechanism',
      description: 'Implement a quarterly token burn mechanism using 10% of platform fees to reduce total supply and increase token value.',
      type: 'governance',
      status: 'active',
      votesFor: 4560,
      votesAgainst: 8920,
      totalVotes: 13480,
      quorum: 15000,
      endDate: '2024-02-20',
      proposer: '0xA0b86a33E6441e8e5c3F27f9c5c3F27f9c5c3F27',
      category: 'Tokenomics'
    },
    {
      id: '5',
      title: 'Mobile App Development Initiative',
      description: 'Develop native mobile applications for iOS and Android with full trading and portfolio management capabilities.',
      type: 'technical',
      status: 'pending',
      votesFor: 0,
      votesAgainst: 0,
      totalVotes: 0,
      quorum: 15000,
      endDate: '2024-02-25',
      proposer: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
      requestedAmount: 200000,
      category: 'Development'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-blue-600 bg-blue-100'
      case 'passed': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'governance': return <Gavel className="h-4 w-4" />
      case 'treasury': return <DollarSign className="h-4 w-4" />
      case 'technical': return <Target className="h-4 w-4" />
      case 'community': return <Users className="h-4 w-4" />
      default: return <AlertCircle className="h-4 w-4" />
    }
  }

  const calculateVotePercentage = (votes: number, total: number) => {
    return total > 0 ? (votes / total) * 100 : 0
  }

  const getMembershipBadge = (membership: string) => {
    switch (membership) {
      case 'basic': return { color: 'bg-blue-100 text-blue-800', label: 'Basic Member' }
      case 'premium': return { color: 'bg-purple-100 text-purple-800', label: 'Premium Member' }
      case 'elite': return { color: 'bg-yellow-100 text-yellow-800', label: 'Elite Member' }
      default: return { color: 'bg-gray-100 text-gray-800', label: 'Non-Member' }
    }
  }

  const canCreateProposal = () => {
    return userMembership === 'premium' || userMembership === 'elite'
  }

  const canVote = () => {
    return userMembership !== 'none'
  }

  // Non-Member Access Restriction Component for sensitive areas only
  const NonMemberRestriction = ({ action }: { action: string }) => (
    <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-8 text-center">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <Lock className="h-8 w-8 text-white" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">DAO Membership Required</h3>
      <p className="text-gray-600 mb-6">
        You need to be a DAO member to {action}. Join our decentralized governance community today!
      </p>
      <Link
        to="/marketplace"
        className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
      >
        <ShoppingBag className="h-5 w-5" />
        <span>Get DAO Membership</span>
      </Link>
    </div>
  )

  const CreateProposalModal = () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Create New Proposal</h2>
            <button
              onClick={() => setShowCreateProposal(false)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <XCircle className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Proposal Title</label>
            <input
              type="text"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter proposal title..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Proposal Type</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="governance">Governance</option>
              <option value="treasury">Treasury</option>
              <option value="technical">Technical</option>
              <option value="community">Community</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              rows={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Provide detailed description of your proposal..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Requested Amount (Optional)</label>
            <input
              type="number"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter amount in USD..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Voting Duration</label>
            <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <option value="7">7 Days</option>
              <option value="14">14 Days</option>
              <option value="21">21 Days</option>
              <option value="30">30 Days</option>
            </select>
          </div>
          
          <div className="flex space-x-4 pt-4">
            <button
              onClick={() => setShowCreateProposal(false)}
              className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setShowCreateProposal(false)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all"
            >
              Submit Proposal
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const ProposalDetailModal = ({ proposal }: { proposal: Proposal }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-xl">
                {getTypeIcon(proposal.type)}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{proposal.title}</h2>
                <div className="flex items-center space-x-4 mt-1">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                    {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                  </span>
                  <span className="text-sm text-gray-500">#{proposal.id}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setSelectedProposal(null)}
              className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
            >
              <XCircle className="h-6 w-6 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{proposal.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Voting Results</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-green-600">For</span>
                      <span className="text-sm font-medium text-gray-900">
                        {proposal.votesFor.toLocaleString()} ({calculateVotePercentage(proposal.votesFor, proposal.totalVotes).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-green-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${calculateVotePercentage(proposal.votesFor, proposal.totalVotes)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-red-600">Against</span>
                      <span className="text-sm font-medium text-gray-900">
                        {proposal.votesAgainst.toLocaleString()} ({calculateVotePercentage(proposal.votesAgainst, proposal.totalVotes).toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-red-500 h-3 rounded-full transition-all duration-300"
                        style={{ width: `${calculateVotePercentage(proposal.votesAgainst, proposal.totalVotes)}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-600">Quorum Progress</span>
                      <span className="text-sm font-medium text-gray-900">
                        {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min((proposal.totalVotes / proposal.quorum) * 100, 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {proposal.status === 'active' && canVote() && (
                <div className="flex space-x-4">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                    <ThumbsUp className="h-5 w-5" />
                    <span>Vote For</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">
                    <ThumbsDown className="h-5 w-5" />
                    <span>Vote Against</span>
                  </button>
                </div>
              )}

              {proposal.status === 'active' && !canVote() && (
                <div className="bg-gray-50 rounded-xl p-4 text-center">
                  <Lock className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-3">DAO membership required to vote</p>
                  <Link
                    to="/marketplace"
                    className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    <span>Get Membership</span>
                  </Link>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Proposal Details</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Proposer:</span>
                    <span className="text-gray-900 font-mono text-xs">
                      {proposal.proposer.slice(0, 6)}...{proposal.proposer.slice(-4)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <span className="text-gray-900">{proposal.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">End Date:</span>
                    <span className="text-gray-900">{proposal.endDate}</span>
                  </div>
                  {proposal.requestedAmount && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Requested:</span>
                      <span className="text-gray-900">${proposal.requestedAmount.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Your Voting Power</h4>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{daoStats.votingPower.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">{daoStats.governanceToken} Tokens</div>
                  <div className="mt-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getMembershipBadge(userMembership).color}`}>
                      {getMembershipBadge(userMembership).label}
                    </span>
                  </div>
                  {userMembership === 'none' && (
                    <div className="mt-3">
                      <Link
                        to="/marketplace"
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg text-xs font-medium hover:from-blue-600 hover:to-purple-700 transition-all"
                      >
                        <ShoppingBag className="h-3 w-3" />
                        <span>Join DAO</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">DAO Governance</h1>
              <p className="text-gray-600">Participate in decentralized decision-making for the CryptoVault ecosystem</p>
              <div className="mt-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getMembershipBadge(userMembership).color}`}>
                  {getMembershipBadge(userMembership).label}
                </span>
                {userMembership === 'none' && (
                  <span className="ml-2 text-sm text-gray-500">• View-only access</span>
                )}
              </div>
            </div>
            {canCreateProposal() ? (
              <button
                onClick={() => setShowCreateProposal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl"
              >
                <Plus className="h-5 w-5" />
                <span>Create Proposal</span>
              </button>
            ) : (
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">
                  {userMembership === 'none' ? 'Membership required to create proposals' : 'Premium/Elite membership required'}
                </div>
                <Link
                  to="/marketplace"
                  className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all text-sm"
                >
                  <ShoppingBag className="h-4 w-4" />
                  <span>{userMembership === 'none' ? 'Get Membership' : 'Upgrade Membership'}</span>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* DAO Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Members</p>
                <p className="text-2xl font-bold text-gray-900">{daoStats.totalMembers.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl">
                <Users className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Proposals</p>
                <p className="text-2xl font-bold text-gray-900">{daoStats.activeProposals}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl">
                <Vote className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Treasury Balance</p>
                <p className="text-2xl font-bold text-gray-900">${daoStats.treasuryBalance.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Your Voting Power</p>
                <p className="text-2xl font-bold text-gray-900">{daoStats.votingPower.toLocaleString()}</p>
                {userMembership === 'none' && (
                  <p className="text-xs text-gray-500 mt-1">Membership required</p>
                )}
              </div>
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl">
                <Award className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'proposals', label: 'Proposals', icon: Vote },
                { id: 'treasury', label: 'Treasury', icon: DollarSign },
                { id: 'governance', label: 'Governance', icon: Gavel },
                { id: 'members', label: 'Members', icon: Users }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'proposals' && (
          <div className="space-y-6">
            {/* Non-members can now see all proposals */}
            {proposals.map((proposal) => (
              <div key={proposal.id} className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="p-2 bg-blue-100 rounded-xl">
                          {getTypeIcon(proposal.type)}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{proposal.title}</h3>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(proposal.status)}`}>
                              {proposal.status.charAt(0).toUpperCase() + proposal.status.slice(1)}
                            </span>
                            <span className="text-sm text-gray-500">#{proposal.id}</span>
                            <span className="text-sm text-gray-500">{proposal.category}</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-gray-700 mb-4 line-clamp-2">{proposal.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">For</span>
                            <span className="text-xs text-gray-900">{proposal.votesFor.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${calculateVotePercentage(proposal.votesFor, proposal.totalVotes)}%` }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">Against</span>
                            <span className="text-xs text-gray-900">{proposal.votesAgainst.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-red-500 h-2 rounded-full"
                              style={{ width: `${calculateVotePercentage(proposal.votesAgainst, proposal.totalVotes)}%` }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-600">Quorum</span>
                            <span className="text-xs text-gray-900">
                              {proposal.totalVotes.toLocaleString()} / {proposal.quorum.toLocaleString()}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-500 h-2 rounded-full"
                              style={{ width: `${Math.min((proposal.totalVotes / proposal.quorum) * 100, 100)}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>Ends {proposal.endDate}</span>
                          </div>
                          {proposal.requestedAmount && (
                            <div className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>${proposal.requestedAmount.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setSelectedProposal(proposal)}
                            className="flex items-center space-x-1 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                            <span>View Details</span>
                          </button>
                          {proposal.status === 'active' && canVote() && (
                            <>
                              <button className="flex items-center space-x-1 px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors">
                                <ThumbsUp className="h-4 w-4" />
                                <span>For</span>
                              </button>
                              <button className="flex items-center space-x-1 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors">
                                <ThumbsDown className="h-4 w-4" />
                                <span>Against</span>
                              </button>
                            </>
                          )}
                          {proposal.status === 'active' && !canVote() && (
                            <div className="flex items-center space-x-2">
                              <div className="flex items-center space-x-1 px-4 py-2 bg-gray-100 text-gray-500 rounded-xl cursor-not-allowed">
                                <Lock className="h-4 w-4" />
                                <span>Voting Locked</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'treasury' && (
          <>
            {!canVote() ? (
              <NonMemberRestriction action="access detailed treasury information" />
            ) : (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Treasury Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Total Balance</h3>
                    <p className="text-3xl font-bold">${daoStats.treasuryBalance.toLocaleString()}</p>
                    <p className="text-blue-100 text-sm mt-2">Across all assets</p>
                  </div>
                  <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-xl p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Monthly Inflow</h3>
                    <p className="text-3xl font-bold">$125,000</p>
                    <p className="text-green-100 text-sm mt-2">Platform fees & rewards</p>
                  </div>
                  <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Allocated Funds</h3>
                    <p className="text-3xl font-bold">$450,000</p>
                    <p className="text-purple-100 text-sm mt-2">Active proposals</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'governance' && (
          <>
            {!canVote() ? (
              <NonMemberRestriction action="access governance settings" />
            ) : (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Governance Settings</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Voting Parameters</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Minimum Quorum:</span>
                          <span className="text-gray-900">15,000 votes</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Proposal Threshold:</span>
                          <span className="text-gray-900">1,000 tokens</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Voting Period:</span>
                          <span className="text-gray-900">7-30 days</span>
                        </div>
                      </div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Token Distribution</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Total Supply:</span>
                          <span className="text-gray-900">100M CVAULT</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Circulating:</span>
                          <span className="text-gray-900">75M CVAULT</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Your Balance:</span>
                          <span className="text-gray-900">{daoStats.votingPower.toLocaleString()} CVAULT</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {activeTab === 'members' && (
          <>
            {!canVote() ? (
              <NonMemberRestriction action="access member information" />
            ) : (
              <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6">DAO Members</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Total Members</h3>
                    <p className="text-3xl font-bold">{daoStats.totalMembers.toLocaleString()}</p>
                    <p className="text-indigo-100 text-sm mt-2">Active governance participants</p>
                  </div>
                  <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Active Voters</h3>
                    <p className="text-3xl font-bold">8,420</p>
                    <p className="text-teal-100 text-sm mt-2">Last 30 days</p>
                  </div>
                  <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-xl p-6 text-white">
                    <h3 className="text-lg font-semibold mb-2">Proposal Creators</h3>
                    <p className="text-3xl font-bold">156</p>
                    <p className="text-orange-100 text-sm mt-2">Community contributors</p>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modals */}
      {showCreateProposal && <CreateProposalModal />}
      {selectedProposal && <ProposalDetailModal proposal={selectedProposal} />}
    </div>
  )
}

export default DAOPage
