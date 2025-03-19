"use client"

import { Button } from "@/components/ui/button"
import { Wallet, Loader2 } from "lucide-react"
import { useState } from "react"
import { connectWallet, formatAddress } from "@/lib/blockchain/wallet"

export function WalletConnect({
  variant = "default",
  className,
}: { variant?: "default" | "primary" | "secondary"; className?: string }) {
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [account, setAccount] = useState("")

  const handleConnect = async () => {
    if (isConnected) {
      setAccount("")
      setIsConnected(false)
      return
    }

    setIsConnecting(true)
    try {
      const { address } = await connectWallet()
      setAccount(address)
      setIsConnected(true)
    } catch (error) {
      console.error("Error connecting wallet:", error)
      alert("Failed to connect wallet. Please try again.")
    } finally {
      setIsConnecting(false)
    }
  }

  // Determine button class based on variant
  const getButtonClass = () => {
    switch (variant) {
      case "primary":
        return "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
      case "secondary":
        return "bg-secondary text-secondary-foreground hover:bg-secondary/90"
      default:
        return "bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white"
    }
  }

  return (
    <Button className={`${getButtonClass()} ${className || ""}`} onClick={handleConnect} disabled={isConnecting}>
      {isConnecting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Connecting...
        </>
      ) : isConnected ? (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          {formatAddress(account)}
        </>
      ) : (
        <>
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </>
      )}
    </Button>
  )
}

