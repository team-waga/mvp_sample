"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Wallet, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

declare global {
  interface Window {
    ethereum?: any
  }
}

export function WalletConnect() {
  const { toast } = useToast()
  const [account, setAccount] = useState<string | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [chainId, setChainId] = useState<string | null>(null)
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false)

  useEffect(() => {
    // Check if MetaMask is installed
    if (typeof window !== "undefined") {
      setIsMetaMaskInstalled(!!window.ethereum)

      // Check if already connected
      if (window.ethereum) {
        window.ethereum
          .request({ method: "eth_accounts" })
          .then((accounts: string[]) => {
            if (accounts.length > 0) {
              setAccount(accounts[0])
              getChainId()
            }
          })
          .catch(console.error)

        // Listen for account changes
        window.ethereum.on("accountsChanged", (accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0])
          } else {
            setAccount(null)
          }
        })

        // Listen for chain changes
        window.ethereum.on("chainChanged", (chainId: string) => {
          setChainId(chainId)
        })
      }
    }

    return () => {
      // Clean up listeners
      if (window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged")
        window.ethereum.removeAllListeners("chainChanged")
      }
    }
  }, [])

  const getChainId = async () => {
    if (window.ethereum) {
      try {
        const chainId = await window.ethereum.request({ method: "eth_chainId" })
        setChainId(chainId)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask not installed",
        description: "Please install MetaMask to connect your wallet",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })
      setAccount(accounts[0])
      getChainId()

      toast({
        title: "Wallet Connected",
        description: "Your wallet has been connected successfully",
      })
    } catch (error: any) {
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  const switchToPolygon = async () => {
    if (!window.ethereum) return

    const polygonChainId = "0x89" // Polygon Mainnet

    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: polygonChainId }],
      })
    } catch (error: any) {
      // This error code indicates that the chain has not been added to MetaMask
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: polygonChainId,
                chainName: "Polygon Mainnet",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: ["https://polygon-rpc.com/"],
                blockExplorerUrls: ["https://polygonscan.com/"],
              },
            ],
          })
        } catch (addError) {
          console.error(addError)
        }
      }
      console.error(error)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
  }

  const getNetworkName = () => {
    if (!chainId) return "Unknown Network"

    switch (chainId) {
      case "0x1":
        return "Ethereum"
      case "0x89":
        return "Polygon"
      case "0x13881":
        return "Mumbai Testnet"
      default:
        return "Unknown Network"
    }
  }

  if (!isMetaMaskInstalled) {
    return (
      <Button
        variant="outline"
        onClick={() => window.open("https://metamask.io/download/", "_blank")}
        className="border-indigo-500 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950 dark:text-indigo-400 dark:border-indigo-800 text-sm"
        size="sm"
      >
        <Wallet className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline">Install MetaMask</span>
      </Button>
    )
  }

  if (!account) {
    return (
      <Button
        onClick={connectWallet}
        disabled={isConnecting}
        className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white border-none text-sm"
        size="sm"
      >
        {isConnecting ? (
          <>
            <Wallet className="mr-2 h-4 w-4 animate-spin" />
            <span className="hidden sm:inline">Connecting...</span>
          </>
        ) : (
          <>
            <Wallet className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Connect Wallet</span>
          </>
        )}
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-dashed bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-indigo-200 dark:border-indigo-800 hover:border-indigo-300 dark:hover:border-indigo-700 text-sm"
        >
          <div className="flex items-center">
            <div className={`w-2 h-2 rounded-full mr-2 ${chainId === "0x89" ? "bg-green-500" : "bg-yellow-500"}`} />
            <span className="mr-2 hidden sm:inline">{formatAddress(account)}</span>
            <span className="mr-2 sm:hidden">Wallet</span>
            <ChevronDown className="h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <span>Connected Wallet</span>
            <span className="text-xs text-muted-foreground">{getNetworkName()}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigator.clipboard.writeText(account)}>Copy Address</DropdownMenuItem>
        {chainId !== "0x89" && <DropdownMenuItem onClick={switchToPolygon}>Switch to Polygon</DropdownMenuItem>}
        <DropdownMenuItem onClick={disconnectWallet}>Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

