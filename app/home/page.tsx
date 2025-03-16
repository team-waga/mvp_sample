import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Coffee, ShieldCheck, QrCode, Package, ArrowRight, Database, Leaf } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col gap-8 pb-20 w-full max-w-full mx-auto">
      {/* Hero Section with animated gradient background */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 p-6 sm:p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-amber-500/20 animate-gradient"></div>

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 text-white drop-shadow-md">WAGA Protocol</h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-amber-100 max-w-2xl mx-auto">
            Bringing Coffee Onchain with Tokenization & Blockchain-Based Traceability
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-amber-800 hover:bg-amber-100 hover:text-amber-900 shadow-lg w-full sm:w-auto"
            >
              <Link href="/dashboard">
                Enter Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20 w-full sm:w-auto"
            >
              <Link href="/home/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="text-center mb-2">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-green-600">
          Our Coffee is On-Chain
        </h2>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          Transparent, secure, and immutable tracking from farm to cup
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Feature 1 */}
        <Card className="group overflow-hidden bg-gradient-to-br from-white to-amber-50 dark:from-slate-900 dark:to-slate-800 border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-4 sm:p-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Coffee className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">ERC-1155 Tokenization</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Digital tokens representing coffee batches with ownership tracked on the blockchain
            </p>
          </CardContent>
        </Card>

        {/* Feature 2 */}
        <Card className="group overflow-hidden bg-gradient-to-br from-white to-blue-50 dark:from-slate-900 dark:to-slate-800 border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-4 sm:p-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Database className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">IPFS Metadata Storage</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Immutable and decentralized storage of coffee origin, processing, and certification data
            </p>
          </CardContent>
        </Card>

        {/* Feature 3 */}
        <Card className="group overflow-hidden bg-gradient-to-br from-white to-purple-50 dark:from-slate-900 dark:to-slate-800 border-none shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
          <CardContent className="p-4 sm:p-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center mb-4 sm:mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300">
              <QrCode className="h-6 w-6 sm:h-7 sm:w-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold mb-2">QR Code Verification</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              Scan to instantly verify authenticity and trace coffee journey from farm to cup
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Implementation Overview */}
      <div className="mt-6 sm:mt-10">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-6 sm:p-8 md:p-10 shadow-xl">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-5"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-white">Technical Implementation</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Proof of Reserve</h3>
                    <p className="text-sm text-slate-300">
                      Chainlink Functions verify inventory matches tokenized assets
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Package className="h-5 w-5 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Redemption System</h3>
                    <p className="text-sm text-slate-300">Token holders can redeem for physical coffee delivery</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <Leaf className="h-5 w-5 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">DeFi Integration</h3>
                    <p className="text-sm text-slate-300">Future support for trade finance and lending pools</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>

              <div className="relative bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-white">Development Roadmap</h3>
                <div className="space-y-4">
                  <div className="relative pl-8 pb-4 border-l-2 border-green-500">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-green-500"></div>
                    <h4 className="font-medium text-white">Phase 1: Retail Traceability</h4>
                    <p className="text-sm text-slate-300">QR code verification for consumer coffee bags</p>
                  </div>

                  <div className="relative pl-8 border-l-2 border-amber-500">
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-amber-500"></div>
                    <h4 className="font-medium text-white">Phase 2: Wholesale Tokenization</h4>
                    <p className="text-sm text-slate-300">Bulk coffee trade & DeFi financing solutions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-8 sm:mt-10 text-center">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-500 to-green-600 p-6 sm:p-8 md:p-12 shadow-xl">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-10"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Explore?</h2>
          <p className="text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto text-white/80">
            Experience the future of coffee traceability with our interactive dashboard
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-amber-800 hover:bg-amber-100 hover:text-amber-900 shadow-lg w-full sm:w-auto"
          >
            <Link href="/dashboard">
              Enter Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

