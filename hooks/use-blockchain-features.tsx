"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"

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
  toggleFeature: (feature: string) => {},
  resetFeatures: () => {},
})

// Provider component
export const BlockchainFeaturesProvider = ({ children }: { children: React.ReactNode }) => {
  const [features, setFeatures] = useState(DEFAULT_FEATURES)

  // Load features from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      const savedFeatures = localStorage.getItem("blockchain_features")
      if (savedFeatures) {
        setFeatures(JSON.parse(savedFeatures))
      }
    } catch (error) {
      console.error("Error loading blockchain features:", error)
    }
  }, [])

  // Save features to localStorage when they change
  useEffect(() => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem("blockchain_features", JSON.stringify(features))
    } catch (error) {
      console.error("Error saving blockchain features:", error)
    }
  }, [features])

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
export const useBlockchainFeatures = () => {
  return useContext(BlockchainFeaturesContext)
}

