import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Coffee, ShieldCheck, Database, Package, BarChart3, Leaf, QrCode } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">About WAGA Coffee Traceability</h1>
        <p className="text-xl text-muted-foreground mb-6">
          A blockchain-based traceability and tokenization system for Ethiopian coffee
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/dashboard">
              Enter Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/home">Back to Home</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="phase1" className="mb-12">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="phase1" className="text-base py-3 whitespace-normal text-center h-auto">
            Phase 1: Retail Traceability
          </TabsTrigger>
          <TabsTrigger value="phase2" className="text-base py-3 whitespace-normal text-center h-auto">
            Phase 2: Wholesale Tokenization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="phase1" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Phase 1: Retail Coffee Traceability Model</CardTitle>
              <CardDescription>
                Focused on consumer traceability & QR code-based verification for roasted coffee bags
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Technical Objective</h3>
                <p className="text-muted-foreground">
                  To deploy QR code-based traceability for retail consumer grade roasted coffee bags, ensuring that
                  consumers can verify their coffee's origin, quality, and certifications via the blockchain. We can
                  also include in the metadata a mechanism (farmer/cooperative wallet address) that enables consumers to
                  tip the farmer/cooperative.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Key Technical Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Coffee className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">ERC-1155 Tokenization (Batch-Based)</h4>
                      <p className="text-sm text-muted-foreground">
                        Working with batches of roasted coffee bags (e.g., each batch of roasted coffee bags = 100 x
                        250g units) allows us to mint a set of 100 unique (by token id) ERC1155 tokens for each batch.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Database className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">IPFS Metadata Storage</h4>
                      <p className="text-sm text-muted-foreground">
                        Each token's metadata (e.g., origin, roast level, farmer details, processing method, etc.) is
                        stored on IPFS.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <QrCode className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">QR Code Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        Each coffee bag has a QR code that links to the IPFS-stored metadata, enabling consumers to
                        scan, verify product history, and potentially tip a farmer/cooperative/processor.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Chainlink Functions for Proof of Reserve (PoR)</h4>
                      <p className="text-sm text-muted-foreground">
                        In lieu of a much more sophisticated Oracle based POR mechanism, in combination with an
                        off-chain API end-point, ChainLink Functions can be used to ensure that the number of coffee
                        bags in inventory matches tokenized representations.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Redemption Mechanism</h4>
                      <p className="text-sm text-muted-foreground">
                        On a marketplace, we can enable customers/retailers to purchase coffeeBagTokens and redeem them
                        for physical delivery.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Vendor-Managed Inventory (VMI)</h4>
                      <p className="text-sm text-muted-foreground">
                        This is in essence a digital inventory system where vendors and resellers hold coffee bag tokens
                        before ordering shipments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Smart Contract Implementation Overview</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Feature
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Implementation
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Token Standard</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">ERC-1155 (Batch-Based Tokenization)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Metadata Storage</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">IPFS (Immutable JSON Storage)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Proof of Reserve (PoR)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          ✅ Chainlink Functions (Verify Coffee Bag Inventory)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Price Feed Integration</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          ❌ Not Required (Retail price set dynamically)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Redemption Mechanism</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Consumers redeem coffee bag tokens for physical delivery
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Scalability</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Enables Vendor-Managed Inventory (VMI) for retailers
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Development Milestones (Q1-Q2 2025)</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li className="text-muted-foreground">
                    Develop & deploy ERC-1155 smart contracts for coffee bag tracking
                  </li>
                  <li className="text-muted-foreground">
                    Integrate IPFS for metadata storage (farmer, roast profile, processing details)
                  </li>
                  <li className="text-muted-foreground">Develop QR code generation & scanning interface</li>
                  <li className="text-muted-foreground">
                    Implement Chainlink Functions for Proof of Reserve verification
                  </li>
                  <li className="text-muted-foreground">
                    Launch vendor-managed inventory (VMI) system for digital coffee tracking
                  </li>
                  <li className="text-muted-foreground">Enable consumers to redeem tokens for coffee bag delivery</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phase2" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Phase 2: Wholesale Export Tokenization Model</CardTitle>
              <CardDescription>
                Focused on ERC-1155 tokenization of bulk coffee batches for trade finance & DeFi lending
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Technical Objective</h3>
                <p className="text-muted-foreground">
                  This phase seeks to enable bulk coffee trade & DeFi financing via ERC-1155 tokenization of coffee
                  batches for export markets. The workflow (metadata collection, tokenization, and redemption process)
                  is the same as for phase 1.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Key Technical Components</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <Coffee className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">ERC-1155 Tokenization (Batch-Based)</h4>
                      <p className="text-sm text-muted-foreground">
                        Tokenize bulk green and roasted coffee batches for trade.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Database className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">IPFS Metadata Storage</h4>
                      <p className="text-sm text-muted-foreground">
                        This is similar to Phase 1, but shall be expanded for detailed batch-level traceability.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Chainlink Oracles for Proof of Reserve (PoR)</h4>
                      <p className="text-sm text-muted-foreground">
                        To ensure bulk inventory verification for tokenized coffee.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BarChart3 className="h-5 w-5 text-purple-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Chainlink Price Feed Integration</h4>
                      <p className="text-sm text-muted-foreground">
                        To enable real-time valuation of tokenized coffee for suppliers, buyers & lenders.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Leaf className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">DeFi Trade Finance</h4>
                      <p className="text-sm text-muted-foreground">
                        To enable farmers/cooperatives, buyers & exporters to use collateralized coffee tokens or proof
                        their credit worthiness (zkProofs) for short-term on-chain loans.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Package className="h-5 w-5 text-red-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Redemption Model</h4>
                      <p className="text-sm text-muted-foreground">
                        To enable institutional buyers to redeem coffee tokens for large shipments.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Smart Contract Implementation Overview</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className="bg-gray-50 dark:bg-gray-800">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Feature
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                        >
                          Implementation
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Token Standard</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">ERC-1155 (Batch-Based Tokenization)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Metadata Storage</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">IPFS (Batch-Level Traceability)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Proof of Reserve (PoR)</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          ✅ Chainlink Oracles (Bulk Inventory Verification)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Price Feed Integration</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          ✅ Required (Chainlink Real-Time Coffee Price)
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Redemption Mechanism</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Buyers redeem trade tokens for bulk shipments
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Scalability</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          Supports DeFi-Based Trade Finance & Liquidity Pools
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Development Milestones (Q3-Q4 2025)</h3>
                <ul className="space-y-2 list-disc pl-5">
                  <li className="text-muted-foreground">Extend ERC-1155 tokenization for bulk coffee batches</li>
                  <li className="text-muted-foreground">Deploy Chainlink PoR Oracles for inventory verification</li>
                  <li className="text-muted-foreground">
                    Integrate Chainlink Price Feed for real-time coffee valuation
                  </li>
                  <li className="text-muted-foreground">
                    Implement smart contracts for DeFi trade finance & lending pools
                  </li>
                  <li className="text-muted-foreground">
                    Develop redemption system for large-scale tokenized coffee shipments
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Key Differences Between Phase 1 & Phase 2</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Feature
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Phase 1: Retail Coffee Traceability
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                >
                  Phase 2: Bulk Coffee Tokenization
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Use Case</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Consumer traceability for roasted coffee bags</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Bulk coffee trade & financing</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Token Type</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">ERC-1155 for coffee bag batches</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">ERC-1155 for bulk coffee batches</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Metadata Storage</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">IPFS (QR Code linked to metadata)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">IPFS (batch-level traceability)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Proof of Reserve (PoR)</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">✅ Chainlink Functions</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">✅ Chainlink Oracles</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Price Feed</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">❌ Not Required</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">✅ Required (Chainlink Price Feed)</td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Redemption Model</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Consumers redeem coffee bag tokens</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">Buyers redeem trade tokens for shipments</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Explore the Platform?</h2>
        <p className="text-lg mb-6 max-w-2xl mx-auto">
          Enter the dashboard to see our coffee traceability system in action.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/dashboard">
              Enter Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/home">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

