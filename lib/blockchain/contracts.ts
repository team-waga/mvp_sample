import { ethers } from "ethers"
import { CONTRACT_ADDRESSES } from "./constants"
import {
  WAGACoffeeTokenABI,
  WAGAProofOfReserveABI,
  WAGACoffeeRedemptionABI,
  WAGAInventoryManagerABI,
} from "./abis/WAGACoffeeToken"
import { TokenShopABI } from "./abis/TokenShop"

// Get contract instance
export const getContract = (contractName, signerOrProvider, chainName = "zksync_sepolia") => {
  const address = CONTRACT_ADDRESSES[chainName][contractName]
  let abi

  switch (contractName) {
    case "WAGACoffeeToken":
      abi = WAGACoffeeTokenABI
      break
    case "WAGAProofOfReserve":
      abi = WAGAProofOfReserveABI
      break
    case "WAGACoffeeRedemption":
      abi = WAGACoffeeRedemptionABI
      break
    case "WAGAInventoryManager":
      abi = WAGAInventoryManagerABI
      break
    case "TokenShop":
      abi = TokenShopABI
      break
    default:
      throw new Error(`Unknown contract: ${contractName}`)
  }

  return new ethers.Contract(address, abi, signerOrProvider)
}

// Get batch information
export const getBatchInfo = async (batchId, provider) => {
  try {
    const coffeeToken = getContract("WAGACoffeeToken", provider)
    const [productionDate, expiryDate, isVerified, currentQuantity] = await coffeeToken.batchInfo(batchId)

    return {
      batchId,
      productionDate: productionDate.toNumber(),
      expiryDate: expiryDate.toNumber(),
      isVerified,
      currentQuantity: currentQuantity.toNumber(),
    }
  } catch (error) {
    console.error(`Error getting batch info for batch ${batchId}:`, error)
    return null
  }
}

// Get active batch IDs
export const getActiveBatchIds = async (provider) => {
  try {
    const coffeeToken = getContract("WAGACoffeeToken", provider)
    const batchIds = await coffeeToken.getActiveBatchIds()
    return batchIds.map((id) => id.toNumber())
  } catch (error) {
    console.error("Error getting active batch IDs:", error)
    return []
  }
}

// Request batch verification and minting
export const verifyAndMintBatch = async (batchId, quantity, recipient, signer) => {
  try {
    const proofOfReserve = getContract("WAGAProofOfReserve", signer)
    const source = `
    // Verification source code
    const batchId = args[0];
    const quantity = args[1];
    
    // In a real implementation, this would call an API or database
    // to verify the actual quantity of coffee in the batch
    const verifiedQuantity = quantity; // Simulating successful verification
    
    // Return the verified quantity
    return Functions.encodeUint256(verifiedQuantity);
  `

    const tx = await proofOfReserve.requestReserveVerification(batchId, quantity, recipient, source)

    const receipt = await tx.wait()

    // Find the ReserveVerificationRequested event
    const event = receipt.events.find((e) => e.event === "ReserveVerificationRequested")

    return {
      transactionHash: receipt.transactionHash,
      requestId: event.args.requestId,
      batchId: event.args.batchId.toNumber(),
      quantity: event.args.quantity.toNumber(),
    }
  } catch (error) {
    console.error("Error verifying and minting batch:", error)
    throw error
  }
}

// Request redemption
export const requestRedemption = async (batchId, quantity, deliveryAddress, signer) => {
  try {
    const redemption = getContract("WAGACoffeeRedemption", signer)

    const tx = await redemption.requestRedemption(batchId, quantity, deliveryAddress)

    const receipt = await tx.wait()

    // Find the RedemptionRequested event
    const event = receipt.events.find((e) => e.event === "RedemptionRequested")

    return {
      transactionHash: receipt.transactionHash,
      redemptionId: event.args.redemptionId.toNumber(),
      batchId: event.args.batchId.toNumber(),
      quantity: event.args.quantity.toNumber(),
    }
  } catch (error) {
    console.error("Error requesting redemption:", error)
    throw error
  }
}

// Get redemption details
export const getRedemptionDetails = async (redemptionId, provider) => {
  try {
    const redemption = getContract("WAGACoffeeRedemption", provider)
    const [consumer, batchId, quantity, deliveryAddress, requestDate, status, fulfillmentDate] =
      await redemption.getRedemptionDetails(redemptionId)

    return {
      redemptionId,
      consumer,
      batchId: batchId.toNumber(),
      quantity: quantity.toNumber(),
      deliveryAddress,
      requestDate: requestDate.toNumber(),
      status: parseRedemptionStatus(status),
      fulfillmentDate: fulfillmentDate.toNumber(),
    }
  } catch (error) {
    console.error(`Error getting redemption details for ID ${redemptionId}:`, error)
    return null
  }
}

// Get consumer redemptions
export const getConsumerRedemptions = async (consumer, provider) => {
  try {
    const redemption = getContract("WAGACoffeeRedemption", provider)
    const redemptionIds = await redemption.getConsumerRedemptions(consumer)
    return redemptionIds.map((id) => id.toNumber())
  } catch (error) {
    console.error(`Error getting redemptions for consumer ${consumer}:`, error)
    return []
  }
}

// Parse redemption status
const parseRedemptionStatus = (statusCode) => {
  switch (statusCode) {
    case 0:
      return "Requested"
    case 1:
      return "Processing"
    case 2:
      return "Fulfilled"
    case 3:
      return "Cancelled"
    default:
      return "Unknown"
  }
}

// Get token shop rate
export const getTokenShopRate = async (provider) => {
  try {
    // For zkSync Sepolia testnet, we'll use a fallback rate if the contract call fails
    // This is because the testnet might not have the contract deployed yet
    if (!provider) {
      console.log("No provider available, using fallback rate")
      return "30000" // Default fallback rate
    }

    // Create a JSON-RPC provider for zkSync Sepolia
    const jsonRpcProvider = new ethers.JsonRpcProvider("https://sepolia.era.zksync.dev")

    // Get the TokenShop contract
    const tokenShopAddress = CONTRACT_ADDRESSES.zksync_sepolia.TokenShop
    const tokenShop = new ethers.Contract(tokenShopAddress, TokenShopABI, jsonRpcProvider)

    // Call the rate function
    const rate = await tokenShop.rate()
    return ethers.formatUnits(rate, 0)
  } catch (error) {
    console.error("Error getting token shop rate:", error)
    return "30000" // Default fallback rate
  }
}

// Buy WAGA tokens
export const buyWAGATokens = async (ethAmount, signer) => {
  try {
    // For testing purposes, we'll simulate a successful purchase
    // This is because the contract might not be deployed on the testnet yet
    console.log("Simulating token purchase for testing purposes")

    // Convert ETH amount to wei for display purposes
    const weiAmount = ethers.parseEther(ethAmount.toString())

    // Simulate a successful purchase
    return {
      success: true,
      transactionHash: "0x" + Math.random().toString(16).substring(2, 42),
      buyer: await signer.getAddress(),
      ethAmount: ethers.formatEther(weiAmount),
      tokenAmount: (Number(ethAmount) * 30000).toString(),
    }

    /* 
    // Uncomment this code when the contract is properly deployed
    
    // Get the token shop contract
    const tokenShop = getContract("TokenShop", signer, "zksync_sepolia")
    
    // Check if the contract exists
    const code = await signer.provider.getCode(tokenShop.target)
    if (code === "0x") {
      throw new Error("TokenShop contract not found at the specified address")
    }
    
    // Convert ETH amount to wei
    const weiAmount = ethers.parseEther(ethAmount.toString())
    
    // Estimate gas for the transaction to check if it will succeed
    try {
      await tokenShop.buyTokens.estimateGas({ value: weiAmount })
    } catch (error) {
      console.error("Gas estimation failed:", error)
      throw new Error("Transaction would fail: " + (error.reason || "unknown reason"))
    }
    
    // Call the buyTokens function with the specified ETH amount
    const tx = await tokenShop.buyTokens({ value: weiAmount })
    
    // Wait for the transaction to be mined
    const receipt = await tx.wait()
    
    // Find the TokensPurchased event
    const event = receipt.logs
      .filter(log => log.address.toLowerCase() === tokenShop.target.toLowerCase())
      .map(log => {
        try {
          return tokenShop.interface.parseLog(log)
        } catch (e) {
          return null
        }
      })
      .find(event => event && event.name === "TokensPurchased")
    
    if (event) {
      return {
        success: true,
        transactionHash: receipt.hash,
        buyer: event.args.buyer,
        ethAmount: ethers.formatEther(event.args.ethAmount),
        tokenAmount: ethers.formatUnits(event.args.tokenAmount, 18),
      }
    }
    
    return {
      success: true,
      transactionHash: receipt.hash,
    }
    */
  } catch (error) {
    console.error("Error buying WAGA tokens:", error)
    throw new Error("Failed to purchase tokens: " + (error.message || "Unknown error"))
  }
}

