"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  Coffee,
  Home,
  Package,
  QrCode,
  Settings,
  Store,
  Users,
  Warehouse,
  ShieldCheck,
  RefreshCw,
  Wallet,
  Info,
  Coins,
  ChevronDown,
  ChevronRight,
  Beaker,
  Globe,
  ExternalLink,
  FileText,
  MessageCircle,
  Twitter,
  Linkedin,
  MessageSquare,
  BookOpen,
  ArrowUpRight,
  Sparkles,
} from "lucide-react"
import { useState, useEffect } from "react"
import { getNetworkName, getCurrentChainId } from "../lib/blockchain/wallet"

export function Sidebar() {
  const pathname = usePathname()
  const [isProofOfConceptOpen, setIsProofOfConceptOpen] = useState(false)
  const [networkName, setNetworkName] = useState("Not Connected")

  useEffect(() => {
    const updateNetwork = async () => {
      try {
        const chainId = await getCurrentChainId()
        if (chainId) {
          setNetworkName(getNetworkName(chainId))
        } else {
          setNetworkName("Not Connected")
        }
      } catch (error) {
        console.error("Error getting network:", error)
        setNetworkName("Error")
      }
    }

    updateNetwork()

    // Listen for chain changes
    if (typeof window !== "undefined" && window.ethereum) {
      window.ethereum.on("chainChanged", updateNetwork)

      return () => {
        window.ethereum.removeListener("chainChanged", updateNetwork)
      }
    }
  }, [])

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-slate-900 via-purple-950 to-slate-900 border-r border-r-purple-900/20">
      <div className="p-6">
        <Link href="/dashboard">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-purple-400" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-300">
              WAGA Protocol
            </span>
          </div>
        </Link>
      </div>
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
        <Link
          href="/home"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
            pathname === "/home" ? "bg-purple-900/40 text-white" : "text-slate-300 hover:text-white"
          }`}
        >
          <Home className="h-5 w-5 text-amber-500" />
          <span>Home</span>
        </Link>

        <Link
          href="/home/about"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
            pathname === "/home/about" ? "bg-purple-900/40 text-white" : "text-slate-300 hover:text-white"
          }`}
        >
          <Info className="h-5 w-5 text-green-500" />
          <span>About</span>
        </Link>

        {/* Proof of Concept Dropdown */}
        <div className="space-y-1">
          <button
            onClick={() => setIsProofOfConceptOpen(!isProofOfConceptOpen)}
            className={`w-full flex items-center justify-between gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 text-slate-300 hover:text-white`}
          >
            <div className="flex items-center gap-3">
              <Beaker className="h-5 w-5 text-purple-500" />
              <span>Proof of Concept</span>
            </div>
            {isProofOfConceptOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>

          {isProofOfConceptOpen && (
            <div className="pl-4 space-y-1">
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
                  pathname === "/dashboard" ? "bg-purple-900/40 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                <BarChart3 className="h-5 w-5 text-sky-500" />
                <span>Dashboard</span>
              </Link>

              <Link
                href="/marketplace"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
                  pathname === "/marketplace" || pathname.startsWith("/marketplace/")
                    ? "bg-purple-900/40 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Store className="h-5 w-5 text-emerald-600" />
                <span>Marketplace</span>
              </Link>

              <Link
                href="/batches"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
                  pathname === "/batches" || pathname.startsWith("/batches/")
                    ? "bg-purple-900/40 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Coffee className="h-5 w-5 text-violet-500" />
                <span>Batches</span>
              </Link>

              <Link
                href="/inventory"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
                  pathname === "/inventory" ? "bg-purple-900/40 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                <Warehouse className="h-5 w-5 text-pink-700" />
                <span>Inventory</span>
              </Link>

              <Link
                href="/verification"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
                  pathname === "/verification" ? "bg-purple-900/40 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                <ShieldCheck className="h-5 w-5 text-orange-500" />
                <span>Verification</span>
              </Link>

              <Link
                href="/mint-batch"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
                  pathname === "/mint-batch" ? "bg-purple-900/40 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                <RefreshCw className="h-5 w-5 text-emerald-500" />
                <span>Mint Tokens</span>
              </Link>

              <Link
                href="/redemption"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
                  pathname === "/redemption" || pathname.startsWith("/redemption/")
                    ? "bg-purple-900/40 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Package className="h-5 w-5 text-green-700" />
                <span>Redemption</span>
              </Link>

              <Link
                href="/batch-metadata"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
                  pathname === "/batch-metadata" ? "bg-purple-900/40 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                <QrCode className="h-5 w-5 text-blue-600" />
                <span>Batch Metadata</span>
              </Link>

              <Link
                href="/qr-generator"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
                  pathname === "/qr-generator" ? "bg-purple-900/40 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                <QrCode className="h-5 w-5 text-purple-600" />
                <span>QR Generator</span>
              </Link>

              <Link
                href="/distributor/register"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
                  pathname === "/distributor/register"
                    ? "bg-purple-900/40 text-white"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                <Wallet className="h-5 w-5 text-amber-500" />
                <span>Distributor Registration</span>
              </Link>

              <Link
                href="/users"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
                  pathname === "/users" ? "bg-purple-900/40 text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                <Users className="h-5 w-5 text-yellow-500" />
                <span>Users</span>
              </Link>
            </div>
          )}
        </div>

        <Link
          href="/token-sale"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
            pathname === "/token-sale" ? "bg-purple-900/40 text-white" : "text-slate-300 hover:text-white"
          }`}
        >
          <Coins className="h-5 w-5 text-yellow-500" />
          <span>Token Sale</span>
        </Link>

        <Link
          href="/settings"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all duration-200 hover:bg-purple-900/30 ${
            pathname === "/settings" ? "bg-purple-900/40 text-white" : "text-slate-300 hover:text-white"
          }`}
        >
          <Settings className="h-5 w-5 text-gray-500" />
          <span>Settings</span>
        </Link>
      </nav>

      {/* Quick Actions Panel - Replacing Network Status */}
      <div className="px-6 pt-4">
        <div className="rounded-lg bg-gradient-to-r from-purple-900/40 to-indigo-900/40 p-4 border border-purple-700/30">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-4 w-4 text-amber-400" />
            <h3 className="text-sm font-medium text-white">Phase 1 Presale</h3>
          </div>

          <div className="mb-3 bg-purple-900/30 rounded-md p-2 border border-purple-700/30">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-300">Current Price:</span>
              <span className="text-xs font-medium text-amber-300">$0.10 USD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-slate-300">Next Phase:</span>
              <span className="text-xs font-medium text-green-400">$0.15 USD</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <Link href="/token-sale">
              <button className="w-full py-1.5 px-2 text-xs font-medium rounded-md bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-500 hover:to-amber-600 text-white flex items-center justify-center gap-1">
                <Coins className="h-3 w-3" />
                Buy WGTN
              </button>
            </Link>
            <a href="https://portal.zksync.io/bridge/" target="_blank" rel="noopener noreferrer">
              <button className="w-full py-1.5 px-2 text-xs font-medium rounded-md bg-gradient-to-r from-purple-700 to-indigo-700 hover:from-purple-600 hover:to-indigo-600 text-white flex items-center justify-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                Bridge ETH
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Quick Links */}
      <div className="px-6 pt-3">
        <div className="rounded-lg bg-purple-900/20 p-3 border border-purple-700/20">
          <div className="flex items-center gap-2 mb-2">
            <Globe className="h-4 w-4 text-purple-400" />
            <h3 className="text-xs font-medium text-slate-300">Quick Links</h3>
          </div>

          <div className="space-y-2">
            <a
              href="https://docs.waga.coffee"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-slate-300 hover:text-amber-300 transition-colors"
            >
              <FileText className="h-3 w-3" />
              <span>Documentation</span>
              <ExternalLink className="h-3 w-3 ml-auto" />
            </a>

            <a
              href="https://community.waga.coffee"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs text-slate-300 hover:text-amber-300 transition-colors"
            >
              <MessageCircle className="h-3 w-3" />
              <span>Community</span>
              <ExternalLink className="h-3 w-3 ml-auto" />
            </a>
          </div>
        </div>
      </div>

      {/* Bringing Coffee On-Chain Message */}
      <div className="p-6 pt-3">
        <div className="rounded-lg bg-purple-900/30 p-4 border border-purple-700/20 text-center">
          <p className="text-sm font-medium text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-purple-400">
            Bringing Coffee On-Chain
          </p>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="px-6 pb-6 pt-2">
        <div className="flex justify-center items-center gap-4">
          <a
            href="https://t.me/wagatoken"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-400 transition-colors"
            aria-label="Telegram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-send"
            >
              <path d="m22 2-7 20-4-9-9-4Z" />
              <path d="M22 2 11 13" />
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/company/waga-token-official/?viewAsMember=true"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-blue-600 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>

          <a
            href="https://x.com/Wagatoken"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-sky-500 transition-colors"
            aria-label="Twitter"
          >
            <Twitter size={20} />
          </a>

          <a
            href="https://discord.gg/wagacoffee"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-indigo-500 transition-colors"
            aria-label="Discord"
          >
            <MessageSquare size={20} />
          </a>

          <a
            href="https://medium.com/@wagacoffee"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-400 hover:text-green-500 transition-colors"
            aria-label="Medium"
          >
            <BookOpen size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}

