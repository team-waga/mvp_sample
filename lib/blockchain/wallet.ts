// Check if MetaMask is installed
export const isMetaMaskInstalled = () => {
  return typeof window !== "undefined" && typeof window.ethereum !== "undefined"
}

// Connect to wallet
export const connectWallet = async () => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed")
  }

  try {
    // Request account access
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" })

    // Get the connected address
    const address = accounts[0]

    // Get the chain ID
    const chainIdHex = await window.ethereum.request({ method: "eth_chainId" })
    const chainId = Number.parseInt(chainIdHex, 16)

    return {
      address,
      chainId,
    }
  } catch (error) {
    console.error("Error connecting to wallet:", error)
    throw error
  }
}

// Format address for display
export const formatAddress = (address) => {
  if (!address) return ""
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`
}

// Get network name from chain ID
export const getNetworkName = (chainId) => {
  if (!chainId) return "Unknown Network"

  switch (chainId) {
    case 1:
      return "Ethereum"
    case 137:
      return "Polygon"
    case 324:
      return "zkSync Era"
    case 300:
      return "zkSync Sepolia"
    default:
      return "Unknown Network"
  }
}

// Switch to a specific chain
export const switchChain = async (targetChainId) => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed")
  }

  try {
    // Try to switch to the chain
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: `0x${targetChainId.toString(16)}` }],
    })

    return targetChainId
  } catch (error) {
    console.error("Error switching chain:", error)
    throw error
  }
}

// Get current chain ID
export const getCurrentChainId = async () => {
  if (!isMetaMaskInstalled()) {
    throw new Error("MetaMask is not installed")
  }

  try {
    const chainIdHex = await window.ethereum.request({ method: "eth_chainId" })
    return Number.parseInt(chainIdHex, 16)
  } catch (error) {
    console.error("Error getting chain ID:", error)
    return null
  }
}

