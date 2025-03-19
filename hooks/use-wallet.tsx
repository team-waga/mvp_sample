"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { connectWallet, switchChain, getNetworkName, isMetaMaskInstalled } from "@/lib/blockchain/wallet"
import { useBlockchainFeatures } from "@/hooks/use-blockchain-features"

// Create context for wallet state
const WalletContext = createContext({
  account: "",
  chainId: 0,
  isConnected: false,
  isConnecting: false,
  connectWallet: async () => ({ success: false }),
  disconnectWallet: () => {},
  switchNetwork: async (chainId: number) => false,
  networkName: "",
  isMetaMaskAvailable: false,
})

// Provider component
export const WalletProvider = ({ children }: { children: React.ReactNode }) => {
  const [account, setAccount] = useState("")
  const [chainId, setChainId] = useState(0)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [networkName, setNetworkName] = useState("")
  const [isMetaMaskAvailable, setIsMetaMaskAvailable] = useState(false)
  const { features } = useBlockchainFeatures()

  // Check if MetaMask is available
  useEffect(() => {
    setIsMetaMaskAvailable(isMetaMaskInstalled())
  }, [])

  // Check if wallet is already connected on mount
  useEffect(() => {
    const checkWalletConnection = async () => {
      if (isMetaMaskInstalled() && window.ethereum.selectedAddress) {
        const address = window.ethereum.selectedAddress
        const chainIdHex = await window.ethereum.request({ method: "eth_chainId" })
        const chainId = Number.parseInt(chainIdHex, 16)

        setAccount(address)
        setChainId(chainId)
        setIsConnected(true)
        setNetworkName(getNetworkName(chainId))
      }
    }

    checkWalletConnection()
  }, [])

  // Connect wallet function
  const connect = useCallback(async () => {
    if (!features.ENABLE_WALLET_CONNECT) {
      return { success: false, error: new Error("Wallet connection is disabled") }
    }

    if (!isMetaMaskInstalled()) {
      return { success: false, error: new Error("MetaMask is not installed") }
    }

    setIsConnecting(true)
    try {
      const { address, chainId } = await connectWallet()

      setAccount(address)
      setChainId(chainId)
      setIsConnected(true)
      setNetworkName(getNetworkName(chainId))

      return { success: true, address }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      return {
        success: false,
        error: error instanceof Error ? error : new Error("Failed to connect wallet"),
      }
    } finally {
      setIsConnecting(false)
    }
  }, [features.ENABLE_WALLET_CONNECT])

  // Disconnect wallet function
  const disconnect = useCallback(() => {
    setAccount("")
    setChainId(0)
    setIsConnected(false)
    setNetworkName("")
  }, [])

  // Switch network function
  const switchNetwork = useCallback(async (targetChainId: number) => {
    try {
      const newChainId = await switchChain(targetChainId)
      setChainId(newChainId)
      setNetworkName(getNetworkName(newChainId))
      return true
    } catch (error) {
      console.error("Error switching network:", error)
      return false
    }
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.ethereum) return

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        disconnect()
      } else if (accounts[0] !== account) {
        setAccount(accounts[0])
        setIsConnected(true)
      }
    }

    const handleChainChanged = (chainIdHex: string) => {
      const newChainId = Number.parseInt(chainIdHex, 16)
      setChainId(newChainId)
      setNetworkName(getNetworkName(newChainId))
    }

    const handleDisconnect = () => {
      disconnect()
    }

    window.ethereum.on("accountsChanged", handleAccountsChanged)
    window.ethereum.on("chainChanged", handleChainChanged)
    window.ethereum.on("disconnect", handleDisconnect)

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
        window.ethereum.removeListener("disconnect", handleDisconnect)
      }
    }
  }, [account, disconnect])

  return (
    <WalletContext.Provider
      value={{
        account,
        chainId,
        isConnected,
        isConnecting,
        connectWallet: connect,
        disconnectWallet: disconnect,
        switchNetwork,
        networkName,
        isMetaMaskAvailable,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

// Hook to use wallet state
export const useWallet = () => {
  return useContext(WalletContext)
}

