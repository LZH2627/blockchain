import React, { useState } from 'react'
import { Users, TrendingUp, DollarSign, FileText, Bell, Settings, Calendar, BarChart3, PieChart, Activity, Clock, CheckCircle, AlertCircle, Star, Award, Target, Briefcase } from 'lucide-react'

export const ContractorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview')

  const contractorStats = {
    totalContracts: 24,
    activeContracts: 8,
    completedContracts: 16,
    totalEarnings: 125000,
    monthlyEarnings: 18500,
    averageRating: 4.8,
    responseTime: '2.3 hours',
    completionRate: 96
  }

  const recentContracts = [
    {
      id: '1',
      title: 'Smart Contract Audit - DeFi Protocol',
      client: 'CryptoVault Inc.',
      value: 15000,
      status: 'active',
      deadline: '2024-02-15',
      progress: 65
    },
    {
      id: '2',
      title: 'Token Migration Contract',
      client: 'BlockChain Solutions',
      value: 8500,
      status: 'completed',
      deadline: '2024-01-20',
      progress: 100
    },
    {
      id: '3',
      title: 'NFT Marketplace Development',
      client: 'Digital Arts Co.',
      value: 22000,
      status: 'pending',
      deadline: '2024-03-01',
      progress: 0
    },
    {
      id: '4',
      title: 'Yield Farming Protocol',
      client: 'DeFi Innovations',
      value: 12000,
      status: 'active',
      deadline: '2024-02-28',
      progress: 30
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-blue-600 bg-blue-100'
      case 'completed':
        return 'text-green-600 bg-green-100'
      case 'pending':
        return 'text-yellow-600 bg-yellow-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Activity className="h-4 w-4" />
      case 'completed':
        return <CheckCircle className="h-4 w-4" />
      case 'pending':
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-600">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Smart Contractor Dashboard</h1>
              <p className="text-gray-600">Manage your blockchain development contracts and earnings</p>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Contracts</p>
                <p className="text-3xl font-bold text-gray-900">{contractorStats.totalContracts}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+3 this month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Contracts</p>
                <p className="text-3xl font-bold text-gray-900">{contractorStats.activeContracts}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Activity className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-blue-600 font-medium">2 due this week</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900">${contractorStats.totalEarnings.toLocaleString()}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-600 font-medium">+${contractorStats.monthlyEarnings.toLocaleString()} this month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-3xl font-bold text-gray-900">{contractorStats.averageRating}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-xl">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-yellow-600 font-medium">Based on 24 reviews</span>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
              <Target className="h-5 w-5 text-purple-600" />
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-medium">{contractorStats.completionRate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${contractorStats.completionRate}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-medium">{contractorStats.responseTime}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full w-4/5"></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Earnings</h3>
              <TrendingUp className="h-5 w-5 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">
              ${contractorStats.monthlyEarnings.toLocaleString()}
            </div>
            <div className="text-sm text-green-600 font-medium">
              +23% from last month
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recognition</h3>
              <Award className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm text-gray-600">Top Rated Contractor</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-gray-600">Verified Expert</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-purple-500" />
                <span className="text-sm text-gray-600">Smart Contract Specialist</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Contracts */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Recent Contracts</h2>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                View All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Contract</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Client</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Value</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Progress</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Deadline</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{contract.title}</h3>
                        <p className="text-sm text-gray-500">ID: {contract.id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{contract.client}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900">
                        ${contract.value.toLocaleString()}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center space-x-1 px-3 py-1 text-sm font-medium rounded-full capitalize ${getStatusColor(contract.status)}`}>
                        {getStatusIcon(contract.status)}
                        <span>{contract.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full" 
                            style={{ width: `${contract.progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600">{contract.progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-gray-900">{contract.deadline}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button className="bg-gradient-to-r from-purple-500 to-pink-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left">
            <FileText className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Create New Proposal</h3>
            <p className="text-purple-100">Submit a proposal for new contracts</p>
          </button>

          <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left">
            <Calendar className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">Schedule Meeting</h3>
            <p className="text-blue-100">Book a consultation with clients</p>
          </button>

          <button className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-left">
            <BarChart3 className="h-8 w-8 mb-3" />
            <h3 className="text-lg font-semibold mb-2">View Analytics</h3>
            <p className="text-green-100">Track your performance metrics</p>
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContractorDashboard
