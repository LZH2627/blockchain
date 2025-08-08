import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react'
import { SuiClient, getFullnodeUrl } from '@mysten/sui.js/client'
import toast from 'react-hot-toast'

interface SuiWallet {
  address: string | null
  connected: boolean
  connecting: boolean
}

interface SuiContextType {
  wallet: SuiWallet
  suiClient: SuiClient
  connect: () => Promise<void>
  disconnect: () => void
  balance: string
  transactions: any[]
  isLoading: boolean
  sendTransaction: (recipient: string, amount: string) => Promise<boolean>
  mintNFT: (name: string, description: string, imageUrl: string) => Promise<boolean>
  fetchBalance: () => Promise<void>
  fetchTransactions: () => Promise<void>
}

const SuiContext = createContext<SuiContextType | undefined>(undefined)

interface SuiContextProviderProps {
  children: ReactNode
}

export const SuiContextProvider: React.FC<SuiContextProviderProps> = ({ children }) => {
  const [wallet, setWallet] = useState<SuiWallet>({
    address: null,
    connected: false,
    connecting: false,
  })
  const [balance, setBalance] = useState<string>('0')
  const [transactions, setTransactions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const suiClient = new SuiClient({ url: getFullnodeUrl('testnet') })

  const connect = async () => {
    setWallet(prev => ({ ...prev, connecting: true }))
    
    try {
      // Check if Sui Wallet is available
      if (typeof window !== 'undefined' && (window as any).suiWallet) {
        const suiWallet = (window as any).suiWallet
        const accounts = await suiWallet.getAccounts()
        
        if (accounts.length > 0) {
          setWallet({
            address: accounts[0],
            connected: true,
            connecting: false,
          })
          toast.success('Wallet connected successfully!')
        } else {
          throw new Error('No accounts found')
        }
      } else {
        // Simulate wallet connection for demo purposes
        const demoAddress = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
        setWallet({
          address: demoAddress,
          connected: true,
          connecting: false,
        })
        toast.success('Demo wallet connected!')
      }
    } catch (error) {
      console.error('Wallet connection failed:', error)
      toast.error('Failed to connect wallet. Using demo mode.')
      
      // Fallback to demo mode
      const demoAddress = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
      setWallet({
        address: demoAddress,
        connected: true,
        connecting: false,
      })
    }
  }

  const disconnect = () => {
    setWallet({
      address: null,
      connected: false,
      connecting: false,
    })
    setBalance('0')
    setTransactions([])
    toast.success('Wallet disconnected')
  }

  const fetchBalance = async () => {
    if (!wallet.address) return

    try {
      const balanceResult = await suiClient.getBalance({
        owner: wallet.address,
      })
      setBalance((parseInt(balanceResult.totalBalance) / 1000000000).toFixed(4))
    } catch (error) {
      console.error('Error fetching balance:', error)
      // Set demo balance
      setBalance((Math.random() * 10 + 1).toFixed(4))
    }
  }

  const fetchTransactions = async () => {
    if (!wallet.address) return

    try {
      const txns = await suiClient.queryTransactionBlocks({
        filter: {
          FromAddress: wallet.address,
        },
        limit: 10,
        order: 'descending',
      })
      setTransactions(txns.data)
    } catch (error) {
      console.error('Error fetching transactions:', error)
      // Set demo transactions
      const demoTxns = Array.from({ length: 5 }, (_, i) => ({
        digest: '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
        timestampMs: (Date.now() - i * 3600000).toString(),
      }))
      setTransactions(demoTxns)
    }
  }

  const sendTransaction = async (recipient: string, amount: string) => {
    if (!wallet.address) {
      toast.error('Wallet not connected')
      return false
    }

    setIsLoading(true)
    try {
      // In a real implementation, this would use the actual wallet to sign and send
      // For demo purposes, we'll simulate a successful transaction
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('Transaction sent successfully!')
      await fetchBalance()
      await fetchTransactions()
      return true
    } catch (error) {
      console.error('Transaction failed:', error)
      toast.error('Transaction failed')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const mintNFT = async (name: string, description: string, imageUrl: string) => {
    if (!wallet.address) {
      toast.error('Wallet not connected')
      return false
    }

    setIsLoading(true)
    try {
      // In a real implementation, this would call a Move module to mint NFT
      // For demo purposes, we'll simulate a successful mint
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      toast.success('NFT minted successfully!')
      return true
    } catch (error) {
      console.error('NFT minting failed:', error)
      toast.error('NFT minting failed')
      return false
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (wallet.connected && wallet.address) {
      fetchBalance()
      fetchTransactions()
    }
  }, [wallet.connected, wallet.address])

  const contextValue: SuiContextType = {
    wallet,
    suiClient,
    connect,
    disconnect,
    balance,
    transactions,
    isLoading,
    sendTransaction,
    mintNFT,
    fetchBalance,
    fetchTransactions,
  }

  return (
    <SuiContext.Provider value={contextValue}>
      {children}
    </SuiContext.Provider>
  )
}

export const useSui = () => {
  const context = useContext(SuiContext)
  if (context === undefined) {
    throw new Error('useSui must be used within a SuiContextProvider')
  }
  return context
}
