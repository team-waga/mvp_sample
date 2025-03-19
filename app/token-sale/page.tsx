"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import {
  ArrowRight,
  Check,
  ChevronRight,
  Coffee,
  Coins,
  Copy,
  Download,
  DollarSign,
  FileText,
  LineChart,
  Loader2,
  Wallet,
  Users,
} from "lucide-react"
import Image from "next/image"
import { connectWallet, formatAddress } from "@/lib/blockchain/wallet"
import { buyWAGATokens, getTokenShopRate } from "@/lib/blockchain/contracts"
import { ethers } from "ethers"
import { WalletConnect } from "@/components/wallet-connect"

export default function TokenSalePage() {
  const [amount, setAmount] = useState<string>("")
  const [walletAddress, setWalletAddress] = useState<string>("")
  const [isConnected, setIsConnected] = useState<boolean>(false)
  const [isConnecting, setIsConnecting] = useState<boolean>(false)
  const [isPurchasing, setIsPurchasing] = useState<boolean>(false)
  const [ethPrice, setEthPrice] = useState<number>(0)
  const [tokenRate, setTokenRate] = useState<number>(30000) // Default rate: 30,000 WGTN per ETH
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  // Token addresses
  const tokenAddress = "0xdFEdAe46dcAAB625Cf8e07167E4c06665539755B"
  const tokenShopAddress = "0x5F6086C9B45B1C9772017f6F877B9D7A2eE96ba3"

  // Get ETH price and token rate on component mount
  useEffect(() => {
    // Fetch ETH price from an API
    const fetchEthPrice = async () => {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
        const data = await response.json()
        if (data && data.ethereum && data.ethereum.usd) {
          setEthPrice(data.ethereum.usd)
        } else {
          setEthPrice(3000) // Fallback price
        }
      } catch (error) {
        console.error("Error fetching ETH price:", error)
        setEthPrice(3000) // Fallback price
      }
    }

    // Check if wallet is already connected
    const checkWalletConnection = async () => {
      if (typeof window !== "undefined" && window.ethereum && window.ethereum.selectedAddress) {
        setWalletAddress(window.ethereum.selectedAddress)
        setIsConnected(true)

        // Get token rate
        try {
          const rate = await getTokenShopRate(null)
          setTokenRate(Number(rate))
        } catch (error) {
          console.error("Error getting token rate:", error)
        }
      }
    }

    fetchEthPrice()
    checkWalletConnection()

    // Initialize token rate
    getTokenShopRate(null)
      .then((rate) => {
        setTokenRate(Number(rate))
      })
      .catch((error) => {
        console.error("Error getting initial token rate:", error)
      })

    // Listen for account changes
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0])
          setIsConnected(true)
        } else {
          setWalletAddress("")
          setIsConnected(false)
        }
      })
    }

    return () => {
      // Clean up event listeners
      if (typeof window !== "undefined" && window.ethereum) {
        window.ethereum.removeAllListeners("accountsChanged")
      }
    }
  }, [])

  // Calculate token amount based on ETH amount and rate
  const calculateTokenAmount = useCallback(
    (ethAmount: string) => {
      if (!ethAmount || isNaN(Number(ethAmount)) || tokenRate === 0) return "0"
      const tokens = Number(ethAmount) * tokenRate
      return tokens.toLocaleString(undefined, { maximumFractionDigits: 0 })
    },
    [tokenRate],
  )

  // Connect wallet
  const handleConnectWallet = async () => {
    if (typeof window === "undefined" || !window.ethereum) {
      toast({
        title: "MetaMask Not Installed",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive",
      })
      return
    }

    setIsConnecting(true)
    try {
      // Connect wallet
      const { address } = await connectWallet()
      setWalletAddress(address)
      setIsConnected(true)

      toast({
        title: "Wallet Connected",
        description: "Your wallet has been connected successfully.",
      })
    } catch (error) {
      console.error("Error connecting wallet:", error)
      toast({
        title: "Connection Failed",
        description: error.message || "Failed to connect wallet. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsConnecting(false)
    }
  }

  // Purchase tokens
  const purchaseTokens = async () => {
    if (!amount || Number(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount of ETH.",
        variant: "destructive",
      })
      return
    }

    setIsPurchasing(true)
    try {
      // Connect to wallet if not already connected
      if (!isConnected) {
        await handleConnectWallet()
      }

      // Get signer
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()

      // Buy tokens (simulated in test environment)
      const result = await buyWAGATokens(amount, signer)

      toast({
        title: "Purchase Successful",
        description: `You have successfully purchased ${calculateTokenAmount(amount)} WGTN tokens.`,
      })

      // Reset amount
      setAmount("")
    } catch (error) {
      console.error("Error purchasing tokens:", error)
      toast({
        title: "Purchase Failed",
        description: error.message || "Failed to purchase tokens. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsPurchasing(false)
    }
  }

  // Copy token address to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(tokenAddress)
    setCopied(true)
    toast({
      title: "Address Copied",
      description: "Token address copied to clipboard.",
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <div className="relative w-full h-[250px] rounded-2xl overflow-hidden mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-purple-900/90 z-10"></div>
        <Image src="/placeholder.svg?height=400&width=1200" alt="WAGA Token" fill className="object-cover" />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-center p-6">
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-indigo-200">
            Utility Token Sale
          </h1>
          <p className="text-lg text-gray-200 max-w-2xl mb-4">Empower, Transform, & Grow With Us</p>
          <div className="flex gap-4">
            <Button
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-6 py-2"
              onClick={() => document.getElementById("buy-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              Buy Tokens
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-300 hover:bg-purple-900/30 px-6 py-2"
              onClick={() => document.getElementById("about-section")?.scrollIntoView({ behavior: "smooth" })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <Card className="bg-slate-900 border-purple-800/40 hover:border-purple-600/40 transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="p-3 bg-purple-900/50 rounded-full w-fit mb-2">
              <LineChart className="h-6 w-6 text-purple-400" />
            </div>
            <CardTitle>Staking Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Stake WGTN tokens to earn a share in the platform's earnings and access exclusive features in the WAGA
              ecosystem.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-purple-800/40 hover:border-purple-600/40 transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="p-3 bg-purple-900/50 rounded-full w-fit mb-2">
              <DollarSign className="h-6 w-6 text-purple-400" />
            </div>
            <CardTitle>Discounts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Token holders enjoy exclusive discounts when purchasing WAGA coffee products, enhancing value for loyal
              customers.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-purple-800/40 hover:border-purple-600/40 transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="p-3 bg-purple-900/50 rounded-full w-fit mb-2">
              <Users className="h-6 w-6 text-purple-400" />
            </div>
            <CardTitle>Academy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Gain access to role-based training and employment opportunities throughout the WAGA ecosystem.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-purple-800/40 hover:border-purple-600/40 transition-all duration-300">
          <CardHeader className="pb-2">
            <div className="p-3 bg-purple-900/50 rounded-full w-fit mb-2">
              <Coffee className="h-6 w-6 text-purple-400" />
            </div>
            <CardTitle>Capability Building</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400">
              Contribute directly to smallholder coffee farmer capability building programs, supporting sustainable
              coffee production.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Token Sale Section */}
      <div id="buy-section" className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <Card className="bg-slate-900 border-purple-800/40 md:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Coins className="h-5 w-5 text-purple-500" />
              Token Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Token Name</span>
                <span className="font-medium">WAGA Token (WGTN)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Total Supply</span>
                <span className="font-medium">1,000,000,000 WGTN</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Token Standard</span>
                <span className="font-medium">ERC-20</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Token Price</span>
                <span className="font-medium">$0.10 USD</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Exchange Rate</span>
                <span className="font-medium">{tokenRate} WGTN per ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Min Purchase</span>
                <span className="font-medium">0.01 ETH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">ETH Price (Est.)</span>
                <span className="font-medium">${ethPrice.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Network</span>
                <span className="font-medium text-purple-300">zkSync Era Mainnet</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Contract</span>
                <a
                  href={`https://explorer.zksync.io/address/${tokenShopAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300 underline text-sm"
                >
                  View on Explorer
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-purple-800/40 md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wallet className="h-5 w-5 text-purple-500" />
              Purchase WGTN Tokens
            </CardTitle>
            <CardDescription>Connect your wallet and purchase WGTN tokens with ETH</CardDescription>
          </CardHeader>
          <CardContent>
            {!isConnected ? (
              <div className="flex flex-col items-center justify-center py-8">
                <Wallet className="h-16 w-16 text-purple-500 mb-4" />
                <p className="text-gray-400 mb-4 text-center">Connect your wallet to purchase WGTN tokens</p>
                <WalletConnect variant="primary" />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-slate-800 rounded-lg mb-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Connected Wallet</span>
                    <span className="font-medium text-purple-300">{formatAddress(walletAddress)}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="amount" className="text-sm font-medium text-gray-400">
                    Amount (ETH)
                  </label>
                  <div className="flex gap-2">
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="bg-slate-800 border-slate-700"
                    />
                    <Button
                      onClick={purchaseTokens}
                      disabled={isPurchasing || !amount}
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 min-w-[120px]"
                    >
                      {isPurchasing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Buy Tokens"
                      )}
                    </Button>
                  </div>
                </div>

                <div className="p-4 bg-slate-800 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-400">You Pay</span>
                    <span className="font-medium">
                      {amount ? `${amount} ETH (≈ $${(Number(amount) * ethPrice).toLocaleString()})` : "0.0 ETH"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">You Receive</span>
                    <span className="font-medium text-purple-400">
                      {amount ? `${calculateTokenAmount(amount)} WGTN` : "0 WGTN"}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-amber-900/20 border border-amber-700/30 rounded-lg">
                  <p className="text-amber-300 text-sm">
                    <strong>Note:</strong> Please ensure you have sufficient ETH on zkSync Era mainnet before attempting
                    to purchase tokens. Gas fees on zkSync Era are significantly lower than on Ethereum mainnet.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* How to Buy Guide */}
      <Card className="bg-slate-900 border-purple-800/40 mb-12">
        <CardHeader>
          <CardTitle>How to Buy WGTN Tokens</CardTitle>
          <CardDescription>Follow these steps to purchase and add WGTN tokens to your MetaMask wallet</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-900/50 rounded-full">
                    <span className="font-bold text-xl text-purple-400">1</span>
                  </div>
                  <h3 className="font-semibold text-lg">Bridge ETH to zkSync Era</h3>
                </div>
                <p className="text-gray-400">
                  First, bridge your ETH to zkSync Era mainnet using the{" "}
                  <a
                    href="https://portal.zksync.io/bridge/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-300 underline"
                  >
                    official zkSync bridge
                  </a>
                  . Connect your wallet on the bridge page, select the amount of ETH to bridge, and follow the prompts
                  to complete the transaction.
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-900/50 rounded-full">
                    <span className="font-bold text-xl text-purple-400">2</span>
                  </div>
                  <h3 className="font-semibold text-lg">Connect Your Wallet</h3>
                </div>
                <p className="text-gray-400">
                  Click the "Connect Wallet" button above and approve the connection request in your MetaMask wallet.
                  Make sure you're connected to the zkSync Era mainnet network in your wallet.
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-900/50 rounded-full">
                    <span className="font-bold text-xl text-purple-400">3</span>
                  </div>
                  <h3 className="font-semibold text-lg">Enter ETH Amount</h3>
                </div>
                <p className="text-gray-400">
                  Enter the amount of ETH you want to spend. The equivalent amount of WGTN tokens will be calculated
                  automatically. Make sure you have sufficient bridged ETH in your zkSync Era wallet.
                </p>
              </div>

              <div className="bg-slate-800 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-900/50 rounded-full">
                    <span className="font-bold text-xl text-purple-400">4</span>
                  </div>
                  <h3 className="font-semibold text-lg">Confirm Purchase</h3>
                </div>
                <p className="text-gray-400">
                  Click "Buy Tokens" and confirm the transaction in your MetaMask wallet. Once processed, the tokens
                  will be sent to your wallet on the zkSync Era network.
                </p>
              </div>
            </div>

            <div className="bg-slate-800 p-6 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-900/50 rounded-full">
                  <span className="font-bold text-xl text-purple-400">5</span>
                </div>
                <h3 className="font-semibold text-lg">Add WGTN to MetaMask</h3>
              </div>
              <p className="text-gray-400 mb-4">
                To see your WGTN tokens in MetaMask, you need to add the token to your wallet:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-gray-400 ml-4 mb-4">
                <li>Open MetaMask and make sure you're on the zkSync Era mainnet network</li>
                <li>Click on "Assets" tab</li>
                <li>Scroll down and click "Import tokens"</li>
                <li>Select "Custom Token" and paste the WGTN token address</li>
                <li>The token symbol (WGTN) and decimals (18) should auto-fill</li>
                <li>Click "Add Custom Token" and then "Import Tokens"</li>
              </ol>
              <div className="flex items-center gap-2 p-3 bg-slate-700 rounded-lg">
                <span className="text-gray-300">Token Address:</span>
                <code className="text-purple-300 flex-1 font-mono text-sm">{tokenAddress}</code>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  className="h-8 w-8 text-gray-400 hover:text-white hover:bg-slate-600"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Whitepaper Section */}
      <div id="about-section" className="mb-12">
        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
          WAGA Token Whitepaper
        </h2>
        <Card className="bg-slate-900 border-purple-800/40 hover:border-purple-600/40 transition-all duration-300">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-900/50 rounded-full">
                <FileText className="h-8 w-8 text-purple-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-1">WAGA Token Whitepaper</h3>
                <p className="text-gray-400">
                  Learn more about the WAGA Token ecosystem, tokenomics, and technical details
                </p>
              </div>
            </div>
            <Button
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 min-w-[200px]"
              onClick={() => window.open("/whitepaper.pdf", "_blank")}
            >
              Download Whitepaper
              <Download className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Tokenomics Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
          Tokenomics
        </h2>
        <Card className="bg-slate-900 border-purple-800/40">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-[300px] w-full">
                <Image
                  src="/placeholder.svg?height=300&width=400"
                  alt="WGTN Tokenomics Chart"
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Token Allocation</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                      <span>Community Rewards & Staking</span>
                    </div>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                      <span>Public Token Sale</span>
                    </div>
                    <span className="font-medium">30%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <span>Private Token Sale</span>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                      <span>Founding Team & Advisors</span>
                    </div>
                    <span className="font-medium">5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-teal-500"></div>
                      <span>Development Team Personnel</span>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Development Fund</span>
                    </div>
                    <span className="font-medium">5%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-lime-500"></div>
                      <span>Community Engagement Fund</span>
                    </div>
                    <span className="font-medium">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Roadmap Section */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
          Development Roadmap
        </h2>
        <div className="space-y-8">
          <div className="relative pl-8 pb-8 border-l-2 border-purple-800">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-purple-600"></div>
            <div className="mb-2">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-purple-900/50 text-purple-300 mb-2">
                Q1-Q2 2025
              </span>
              <h3 className="text-xl font-semibold">Phase 1: Retail Traceability Model</h3>
            </div>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Develop & deploy ERC-1155 smart contracts for coffee bag tracking</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Integrate IPFS for metadata storage (farmer, roast profile, processing details)</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Develop QR code generation & scanning interface</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Implement Chainlink Functions for Proof of Reserve verification</span>
              </div>
            </div>
          </div>

          <div className="relative pl-8 pb-8 border-l-2 border-purple-800">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-purple-600"></div>
            <div className="mb-2">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-purple-900/50 text-purple-300 mb-2">
                Q2-Q4 2025
              </span>
              <h3 className="text-xl font-semibold">Phase 2: Pilot & Feedback</h3>
            </div>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Launch pilot study with coffee producers and processors in Ethiopia</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Integrate DeFi functionalities for liquidity pools and collateralized lending</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Implement community-driven campaigns to boost awareness and adoption</span>
              </div>
            </div>
          </div>

          <div className="relative pl-8 pb-8 border-l-2 border-purple-800">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-purple-600"></div>
            <div className="mb-2">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-purple-900/50 text-purple-300 mb-2">
                Q3-Q4 2025
              </span>
              <h3 className="text-xl font-semibold">Phase 3: Wholesale Export Model</h3>
            </div>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Extend ERC-1155 tokenization for bulk coffee batches</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Deploy Chainlink PoR Oracles for inventory verification</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Integrate Chainlink Price Feed for real-time coffee valuation</span>
              </div>
            </div>
          </div>

          <div className="relative pl-8">
            <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-purple-600"></div>
            <div className="mb-2">
              <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-purple-900/50 text-purple-300 mb-2">
                Q1-Q2 2026
              </span>
              <h3 className="text-xl font-semibold">Phase 4: Global Scaling</h3>
            </div>
            <div className="space-y-3 text-gray-300">
              <div className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Full-scale platform deployment and onboarding of global users</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Secure global partnerships with coffee industry stakeholders</span>
              </div>
              <div className="flex items-start gap-2">
                <ArrowRight className="h-5 w-5 text-purple-500 shrink-0 mt-0.5" />
                <span>Establish blockchain coffee standard for global adoption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

