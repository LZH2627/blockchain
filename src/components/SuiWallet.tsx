import React, { useState } from 'react'
import { useSui } from '../contexts/SuiContext'
import { Wallet, Send, Coins, Image, Copy, ExternalLink } from 'lucide-react'
import toast from 'react-hot-toast'

const SuiWallet = () => {
  const { 
    wallet,
    balance, 
    transactions, 
    isLoading, 
    connect,
    disconnect,
    sendTransaction, 
    mintNFT 
  } = useSui()

  const [activeTab, setActiveTab] = useState<'wallet' | 'send' | 'nft'>('wallet')
  const [sendForm, setSendForm] = useState({ recipient: '', amount: '' })
  const [nftForm, setNftForm] = useState({ name: '', description: '', imageUrl: '' })

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address)
      toast.success('Address copied to clipboard!')
    }
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await sendTransaction(sendForm.recipient, sendForm.amount)
    if (success) {
      setSendForm({ recipient: '', amount: '' })
    }
  }

  const handleMintNFT = async (e: React.FormEvent) => {
    e.preventDefault()
    const success = await mintNFT(nftForm.name, nftForm.description, nftForm.imageUrl)
    if (success) {
      setNftForm({ name: '', description: '', imageUrl: '' })
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!wallet.connected) {
    return (
      <div className="p-8 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg text-center">
        <Wallet className="h-16 w-16 mx-auto mb-4 text-blue-500" />
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Connect Your Sui Wallet</h3>
        <p className="text-gray-600 mb-6">
          Connect your Sui wallet to start using blockchain features
        </p>
        <button
          onClick={connect}
          disabled={wallet.connecting}
          className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50"
        >
          {wallet.connecting ? 'Connecting...' : 'Connect Wallet'}
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Wallet Info */}
      <div className="p-6 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="font-semibold text-gray-800">Wallet Connected</span>
          </div>
          <button
            onClick={disconnect}
            className="text-sm text-red-600 hover:text-red-700 font-medium"
          >
            Disconnect
          </button>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Address:</span>
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm">{formatAddress(wallet.address || '')}</span>
              <button onClick={copyAddress} className="p-1 hover:bg-white/20 rounded">
                <Copy className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-gray-600">Balance:</span>
            <span className="font-semibold text-lg">{balance} SUI</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 p-1 rounded-xl backdrop-blur-md bg-white/20 border border-white/30">
        {[
          { id: 'wallet', label: 'Transactions', icon: Wallet },
          { id: 'send', label: 'Send', icon: Send },
          { id: 'nft', label: 'Mint NFT', icon: Image },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-300 ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-white/20'
            }`}
          >
            <tab.icon className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-6 rounded-2xl backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
        {activeTab === 'wallet' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Recent Transactions</h3>
            {transactions.length === 0 ? (
              <p className="text-gray-600 text-center py-8">No transactions found</p>
            ) : (
              <div className="space-y-3">
                {transactions.slice(0, 5).map((tx, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-white/20 border border-white/30">
                    <div>
                      <div className="font-mono text-sm text-gray-800">
                        {formatAddress(tx.digest)}
                      </div>
                      <div className="text-xs text-gray-600">
                        {new Date(parseInt(tx.timestampMs)).toLocaleString()}
                      </div>
                    </div>
                    <a
                      href={`https://suiexplorer.com/txblock/${tx.digest}?network=testnet`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <ExternalLink className="h-4 w-4 text-gray-600" />
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'send' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Send SUI</h3>
            <form onSubmit={handleSend} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Recipient Address
                </label>
                <input
                  type="text"
                  value={sendForm.recipient}
                  onChange={(e) => setSendForm({ ...sendForm, recipient: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-white/20 border border-white/30 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0x..."
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Amount (SUI)
                </label>
                <input
                  type="number"
                  step="0.001"
                  value={sendForm.amount}
                  onChange={(e) => setSendForm({ ...sendForm, amount: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-white/20 border border-white/30 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="0.1"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50"
              >
                {isLoading ? 'Sending...' : 'Send Transaction'}
              </button>
            </form>
          </div>
        )}

        {activeTab === 'nft' && (
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Mint NFT</h3>
            <form onSubmit={handleMintNFT} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NFT Name
                </label>
                <input
                  type="text"
                  value={nftForm.name}
                  onChange={(e) => setNftForm({ ...nftForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-white/20 border border-white/30 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="My Awesome NFT"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  value={nftForm.description}
                  onChange={(e) => setNftForm({ ...nftForm, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-white/20 border border-white/30 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="A unique digital collectible..."
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="url"
                  value={nftForm.imageUrl}
                  onChange={(e) => setNftForm({ ...nftForm, imageUrl: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg backdrop-blur-md bg-white/20 border border-white/30 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/image.png"
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg disabled:opacity-50"
              >
                {isLoading ? 'Minting...' : 'Mint NFT'}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default SuiWallet
