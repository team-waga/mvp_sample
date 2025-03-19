"use client"

import type React from "react"

import { createContext, useContext, useState, type ReactNode } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletProvider as UseWalletProvider } from "@/hooks/use-wallet"
import { BlockchainFeaturesProvider as UseBlockchainFeaturesProvider } from "@/hooks/use-blockchain-features"

// Default feature flags
const DEFAULT_FEATURES = {
  ENABLE_WALLET_CONNECT: true,
  ENABLE_MINTING: true,
  ENABLE_REDEMPTION: true,
  ENABLE_MARKETPLACE: true,
  ENABLE_DISTRIBUTOR_REGISTRATION: true,
}

// Create context for feature flags
const BlockchainFeaturesContext = createContext({
  features: DEFAULT_FEATURES,
  toggleFeature: (_feature: string) => {},
  resetFeatures: () => {},
})

// Provider component
export function BlockchainFeaturesProvider({ children }: { children: ReactNode }) {
  const [features, setFeatures] = useState(DEFAULT_FEATURES)

  // Toggle a feature flag
  const toggleFeature = (feature: string) => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }))
  }

  // Reset all features to default
  const resetFeatures = () => {
    setFeatures(DEFAULT_FEATURES)
  }

  return (
    <BlockchainFeaturesContext.Provider value={{ features, toggleFeature, resetFeatures }}>
      {children}
    </BlockchainFeaturesContext.Provider>
  )
}

// Hook to use feature flags
export function useBlockchainFeatures() {
  return useContext(BlockchainFeaturesContext)
}

// Simplified WalletProvider
export function WalletProvider({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <UseBlockchainFeaturesProvider>
        <UseWalletProvider>{children}</UseWalletProvider>
      </UseBlockchainFeaturesProvider>
    </ThemeProvider>
  )
}

