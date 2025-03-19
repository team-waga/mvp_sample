import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Coffee, ShieldCheck, Database, Package, BarChart3, Leaf, QrCode } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-10 pb-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-600 via-green-700 to-green-900 p-8 md:p-12">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 via-transparent to-green-500/20 animate-gradient"></div>

        <div className="relative z-10 max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white drop-shadow-md">About WAGA Coffee</h1>
          <p className="text-xl mb-8 text-green-100 max-w-2xl">
            A blockchain-based traceability and tokenization system for Ethiopian coffee
          </p>
          <div className="flex flex-wrap gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-800 hover:bg-green-100 hover:text-green-900 shadow-lg"
            >
              <Link href="/dashboard">
                Enter Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              <Link href="/home">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <Tabs defaultValue="phase1" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="phase1" className="text-base py-3 whitespace-normal text-center h-auto">
            Phase 1: Retail Traceability
          </TabsTrigger>
          <TabsTrigger value="phase2" className="text-base py-3 whitespace-normal text-center h-auto">
            Phase 2: Wholesale Tokenization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="phase1" className="space-y-8">
          <Card className="overflow-hidden bg-gradient-to-br from-white to-amber-50 dark:from-slate-900 dark:to-slate-800 border-none shadow-xl">
            <CardContent className="p-8">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-lg">
                    <Coffee className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Retail Coffee Traceability</h2>
                    <p className="text-muted-foreground">Consumer-focused QR verification for roasted coffee bags</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-3">Technical Objective</h3>
                  <p className="text-muted-foreground">
                    Deploy QR code-based traceability for retail coffee bags, enabling consumers to verify origin,
                    quality, and certifications via blockchain, with optional farmer tipping.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Coffee className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="font-medium">ERC-1155 Tokenization</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Batch-based tokens representing individual coffee bags with unique identifiers
                    </p>
                  </div>

                  <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="font-medium">IPFS Metadata Storage</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Immutable storage of origin, roast level, farmer details, and processing methods
                    </p>
                  </div>

                  <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <QrCode className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h4 className="font-medium">QR Code Integration</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Scannable codes linking to blockchain-verified metadata for each coffee bag
                    </p>
                  </div>

                  <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h4 className="font-medium">Proof of Reserve</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Chainlink Functions verify that inventory matches tokenized representations
                    </p>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 rounded-xl p-6 border border-amber-100 dark:border-amber-800">
                  <h3 className="text-xl font-medium mb-3">Development Milestones</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-700 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-200">1</span>
                      </div>
                      <p className="text-sm">Deploy ERC-1155 smart contracts for coffee bag tracking</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-700 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-200">2</span>
                      </div>
                      <p className="text-sm">Integrate IPFS for immutable metadata storage</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-700 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-200">3</span>
                      </div>
                      <p className="text-sm">Develop QR code generation & scanning interface</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-amber-200 dark:bg-amber-700 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-amber-700 dark:text-amber-200">4</span>
                      </div>
                      <p className="text-sm">Enable token redemption for physical coffee delivery</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phase2" className="space-y-8">
          <Card className="overflow-hidden bg-gradient-to-br from-white to-green-50 dark:from-slate-900 dark:to-slate-800 border-none shadow-xl">
            <CardContent className="p-8">
              <div className="max-w-3xl mx-auto">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg">
                    <Package className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold">Wholesale Export Tokenization</h2>
                    <p className="text-muted-foreground">Bulk coffee trade & DeFi financing solutions</p>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-xl font-medium mb-3">Technical Objective</h3>
                  <p className="text-muted-foreground">
                    Enable bulk coffee trade & DeFi financing via ERC-1155 tokenization of coffee batches for export
                    markets, building on Phase 1's infrastructure.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Coffee className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <h4 className="font-medium">Bulk Coffee Tokenization</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Tokenized representation of wholesale green and roasted coffee batches
                    </p>
                  </div>

                  <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                        <ShieldCheck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <h4 className="font-medium">Advanced Proof of Reserve</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Chainlink Oracles for bulk inventory verification and authentication
                    </p>
                  </div>

                  <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <BarChart3 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <h4 className="font-medium">Price Feed Integration</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Real-time coffee price data for accurate valuation of tokenized assets
                    </p>
                  </div>

                  <div className="bg-white/50 dark:bg-slate-800/50 rounded-xl p-5 shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Leaf className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h4 className="font-medium">DeFi Trade Finance</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Collateralized lending and financing solutions for coffee producers
                    </p>
                  </div>
                </div>

                <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6 border border-green-100 dark:border-green-800">
                  <h3 className="text-xl font-medium mb-3">Development Milestones</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-200 dark:bg-green-700 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-green-700 dark:text-green-200">1</span>
                      </div>
                      <p className="text-sm">Extend tokenization for bulk coffee batches</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-200 dark:bg-green-700 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-green-700 dark:text-green-200">2</span>
                      </div>
                      <p className="text-sm">Deploy Chainlink Oracles for inventory verification</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-200 dark:bg-green-700 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-green-700 dark:text-green-200">3</span>
                      </div>
                      <p className="text-sm">Implement DeFi trade finance & lending pools</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-green-200 dark:bg-green-700 flex items-center justify-center mt-0.5">
                        <span className="text-xs font-bold text-green-700 dark:text-green-200">4</span>
                      </div>
                      <p className="text-sm">Develop bulk redemption system for large shipments</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Key Differences Section */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 md:p-10 shadow-xl">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-5"></div>
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">Phase Comparison</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
              <h3 className="text-lg font-medium text-white mb-3">Retail Traceability</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
                    <Coffee className="h-3 w-3 text-amber-400" />
                  </div>
                  <span className="text-sm">Consumer-focused coffee bags</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
                    <QrCode className="h-3 w-3 text-amber-400" />
                  </div>
                  <span className="text-sm">QR code verification system</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5">
                    <ShieldCheck className="h-3 w-3 text-amber-400" />
                  </div>
                  <span className="text-sm">Chainlink Functions for PoR</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
              <h3 className="text-lg font-medium text-white mb-3">Wholesale Tokenization</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <Package className="h-3 w-3 text-green-400" />
                  </div>
                  <span className="text-sm">Bulk coffee trade & financing</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <BarChart3 className="h-3 w-3 text-green-400" />
                  </div>
                  <span className="text-sm">Price feed integration</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                    <Leaf className="h-3 w-3 text-green-400" />
                  </div>
                  <span className="text-sm">DeFi lending capabilities</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10">
              <h3 className="text-lg font-medium text-white mb-3">Shared Features</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                    <Database className="h-3 w-3 text-blue-400" />
                  </div>
                  <span className="text-sm">ERC-1155 token standard</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                    <Database className="h-3 w-3 text-blue-400" />
                  </div>
                  <span className="text-sm">IPFS metadata storage</span>
                </li>
                <li className="flex items-start gap-2 text-slate-300">
                  <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                    <Package className="h-3 w-3 text-blue-400" />
                  </div>
                  <span className="text-sm">Token redemption system</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mt-10 text-center">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-green-600 to-amber-500 p-8 md:p-12 shadow-xl">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=200&width=200')] opacity-10"></div>
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Ready to Explore?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto text-white/80">
            Experience the future of coffee traceability with our interactive dashboard
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-green-800 hover:bg-green-100 hover:text-green-900 shadow-lg"
            >
              <Link href="/dashboard">
                Enter Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/20">
              <Link href="/home">Back to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

