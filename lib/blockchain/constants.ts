// Supported chains configuration
export const SUPPORTED_CHAINS = {
  ethereum: {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://mainnet.infura.io/v3/"],
    blockExplorerUrls: ["https://etherscan.io"],
  },
  polygon: {
    chainId: "0x89",
    chainName: "Polygon Mainnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://polygon-rpc.com/"],
    blockExplorerUrls: ["https://polygonscan.com/"],
  },
  mumbai: {
    chainId: "0x13881",
    chainName: "Mumbai Testnet",
    nativeCurrency: {
      name: "MATIC",
      symbol: "MATIC",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
  },
  zksync_sepolia: {
    chainId: "0x144",
    chainName: "zkSync Sepolia Testnet",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    rpcUrls: ["https://sepolia.era.zksync.dev"],
    blockExplorerUrls: ["https://sepolia.explorer.zksync.io/"],
  },
}

// Default chain to use
export const DEFAULT_CHAIN = "zksync_sepolia"

// Contract addresses
export const CONTRACT_ADDRESSES = {
  polygon: {
    WAGACoffeeToken: "0x...", // Replace with actual contract address
    WAGACoffeeNFT: "0x...", // Replace with actual contract address
    WAGACoffeeMarketplace: "0x...", // Replace with actual contract address
    TokenShop: "0x5F6086C9B45B1C9772017f6F877B9D7A2eE96ba3",
    WAGAToken: "0xdFEdAe46dcAAB625Cf8e07167E4c06665539755B",
  },
  mumbai: {
    WAGACoffeeToken: "0x...", // Replace with actual contract address
    WAGACoffeeNFT: "0x...", // Replace with actual contract address
    WAGACoffeeMarketplace: "0x...", // Replace with actual contract address
    TokenShop: "0x5F6086C9B45B1C9772017f6F877B9D7A2eE96ba3",
    WAGAToken: "0xdFEdAe46dcAAB625Cf8e07167E4c06665539755B",
  },
  zksync_sepolia: {
    WAGACoffeeToken: "0x...", // Replace with actual contract address
    WAGACoffeeNFT: "0x...", // Replace with actual contract address
    WAGACoffeeMarketplace: "0x...", // Replace with actual contract address
    TokenShop: "0x5F6086C9B45B1C9772017f6F877B9D7A2eE96ba3",
    WAGAToken: "0xdFEdAe46dcAAB625Cf8e07167E4c06665539755B",
  },
}

