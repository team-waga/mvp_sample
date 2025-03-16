"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Coffee, ShieldCheck, Package, QrCode, BarChart3, RefreshCw } from "lucide-react"
import { notFound } from "next/navigation"

// Sample batch data (in a real app, this would come from an API or database)
const batchesData = {
  "1045": {
    id: 1045,
    name: "Rwanda Nyungwe",
    origin: "Rwanda",
    region: "Nyungwe",
    farm: "Nyungwe Cooperative",
    altitude: "1,800-2,100 meters",
    process: "Washed",
    roastProfile: "Medium",
    createdAt: "2025-02-20",
    status: "ready_to_mint",
    quantity: 100,
    certifications: ["Organic", "Fair Trade", "Rainforest Alliance"],
    cupping_notes: ["Blackberry", "Chocolate", "Citrus"],
    expiryDate: "2026-02-15",
    ipfsHash: "QmX7bVbHLSxFqNcGYbZdvP1y4xNjhHR5QFtY9Eo5ZtKNt3",
  },
  "1044": {
    id: 1044,
    name: "Costa Rica Tarrazu",
    origin: "Costa Rica",
    region: "Tarrazu",
    farm: "Tarrazu Cooperative",
    altitude: "1,600-1,900 meters",
    process: "Washed",
    roastProfile: "Medium-Light",
    createdAt: "2025-02-15",
    status: "ready_to_mint",
    quantity: 75,
    certifications: ["Organic", "Fair Trade"],
    cupping_notes: ["Caramel", "Apple", "Honey"],
    expiryDate: "2026-02-10",
    ipfsHash: "QmX7bVbHLSxFqNcGYbZdvP1y4xNjhHR5QFtY9Eo5ZtKNt3",
  },
  "1043": {
    id: 1043,
    name: "Ethiopia Yirgacheffe",
    origin: "Ethiopia",
    region: "Yirgacheffe",
    farm: "Abebe Bekele Cooperative",
    altitude: "1,900-2,200 meters",
    process: "Washed",
    roastProfile: "Light",
    createdAt: "2025-02-10",
    status: "ready_to_mint",
    quantity: 120,
    certifications: ["Organic", "Fair Trade", "Rainforest Alliance"],
    cupping_notes: ["Blueberry", "Floral", "Citrus"],
    expiryDate: "2026-02-05",
    ipfsHash: "QmX7bVbHLSxFqNcGYbZdvP1y4xNjhHR5QFtY9Eo5ZtKNt3",
  },
  "1042": {
    id: 1042,
    name: "Ethiopia Sidama",
    origin: "Ethiopia",
    region: "Sidama",
    farm: "Abebe Bekele Cooperative",
    altitude: "1,900-2,200 meters",
    process: "Washed",
    roastProfile: "Medium",
    createdAt: "2025-01-25",
    status: "minted",
    quantity: 90,
    certifications: ["Organic", "Fair Trade", "Rainforest Alliance"],
    cupping_notes: ["Blueberry", "Chocolate", "Citrus"],
    expiryDate: "2025-03-20",
    ipfsHash: "QmX7bVbHLSxFqNcGYbZdvP1y4xNjhHR5QFtY9Eo5ZtKNt3",
    tokenId: "1042-001",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
  },
  "1041": {
    id: 1041,
    name: "Guatemala Antigua",
    origin: "Guatemala",
    region: "Antigua",
    farm: "San Miguel Cooperative",
    altitude: "1,500-1,700 meters",
    process: "Natural",
    roastProfile: "Medium-Dark",
    createdAt: "2025-01-20",
    status: "minted",
    quantity: 60,
    certifications: ["Organic", "Fair Trade"],
    cupping_notes: ["Chocolate", "Caramel", "Nutty"],
    expiryDate: "2026-01-15",
    ipfsHash: "QmX7bVbHLSxFqNcGYbZdvP1y4xNjhHR5QFtY9Eo5ZtKNt3",
    tokenId: "1041-001",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
  },
  "1039": {
    id: 1039,
    name: "Colombia Huila",
    origin: "Colombia",
    region: "Huila",
    farm: "Huila Cooperative",
    altitude: "1,700-1,900 meters",
    process: "Washed",
    roastProfile: "Medium",
    createdAt: "2025-01-10",
    status: "minted",
    quantity: 45,
    certifications: ["Organic", "Fair Trade"],
    cupping_notes: ["Caramel", "Red Fruit", "Chocolate"],
    expiryDate: "2025-03-25",
    ipfsHash: "QmX7bVbHLSxFqNcGYbZdvP1y4xNjhHR5QFtY9Eo5ZtKNt3",
    tokenId: "1039-001",
    contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
  },
}

export default function BatchDetailPage() {
  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()
  const [batch, setBatch] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)

    // Get the batch ID from the URL
    const batchId = params.id as string

    // Check if the batchId is "create" - this would be a routing error
    if (batchId === "create") {
      // Don't redirect, just return early to avoid any processing
      setLoading(false)
      return
    }

    // Simulate fetching batch data
    setTimeout(() => {
      if (batchesData[batchId]) {
        setBatch(batchesData[batchId])
      } else {
        // Use Next.js notFound() function to show the not-found page
        notFound()
      }
      setLoading(false)
    }, 500)
  }, [params.id, router, toast])

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/batches">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Batch Details</h1>
        </div>
        <div className="flex items-center justify-center h-64">
          <Coffee className="h-8 w-8 animate-pulse text-muted-foreground" />
        </div>
      </div>
    )
  }

  if (!batch) {
    // This should not happen since we're using notFound() above
    return notFound()
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/batches">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">
          Batch #{batch.id} - {batch.name}
        </h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {batch.status === "ready_to_mint" ? (
            <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
              Ready to Mint
            </Badge>
          ) : batch.status === "minted" ? (
            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
              Minted
            </Badge>
          ) : (
            <Badge variant="outline">{batch.status}</Badge>
          )}
          <span className="text-sm text-muted-foreground">Created on {batch.createdAt}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/qr-generator?type=batch&value=${batch.id}`}>
              <QrCode className="mr-2 h-4 w-4" />
              Generate QR Code
            </Link>
          </Button>
          {batch.status === "ready_to_mint" && (
            <Button asChild>
              <Link href={`/mint-batch?batchId=${batch.id}`}>
                <ShieldCheck className="mr-2 h-4 w-4" />
                Mint Batch
              </Link>
            </Button>
          )}
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Batch Details</TabsTrigger>
          <TabsTrigger value="metadata">Metadata</TabsTrigger>
          {batch.status === "minted" && <TabsTrigger value="tokens">Tokens</TabsTrigger>}
        </TabsList>

        <TabsContent value="details" className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Batch Information</CardTitle>
                <CardDescription>Details about this coffee batch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Origin:</p>
                      <p className="font-medium">{batch.origin}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Region:</p>
                      <p className="font-medium">{batch.region}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Farm/Cooperative:</p>
                      <p className="font-medium">{batch.farm}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Altitude:</p>
                      <p className="font-medium">{batch.altitude}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Process:</p>
                      <p className="font-medium">{batch.process}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Roast Profile:</p>
                      <p className="font-medium">{batch.roastProfile}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Certifications:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {batch.certifications.map((cert: string) => (
                        <Badge key={cert} variant="outline">
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground">Cupping Notes:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {batch.cupping_notes.map((note: string) => (
                        <Badge key={note} variant="outline" className="bg-amber-50 text-amber-800 hover:bg-amber-50">
                          {note}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory & Status</CardTitle>
                <CardDescription>Current inventory and batch status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Quantity:</p>
                      <p className="font-medium">{batch.quantity} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Status:</p>
                      <p className="font-medium">
                        {batch.status === "ready_to_mint"
                          ? "Ready to Mint"
                          : batch.status === "minted"
                            ? "Minted"
                            : batch.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Created Date:</p>
                      <p className="font-medium">{batch.createdAt}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Expiry Date:</p>
                      <p className="font-medium">{batch.expiryDate}</p>
                    </div>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      <h3 className="font-medium">Inventory Status</h3>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Current Inventory:</span>
                        <span className="font-medium">{batch.quantity} kg</span>
                      </div>
                      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${Math.min(100, (batch.quantity / 150) * 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {batch.quantity < 20
                          ? "Low inventory. Consider creating a new batch."
                          : batch.quantity < 50
                            ? "Moderate inventory levels."
                            : "Healthy inventory levels."}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {batch.status === "ready_to_mint" && (
            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <CardHeader>
                <CardTitle>Ready to Mint</CardTitle>
                <CardDescription>This batch is verified and ready for minting</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  This batch has been verified and is ready to be minted as tokens on the blockchain. Minting will
                  create digital tokens representing this coffee batch, enabling transparent tracking and trading.
                </p>
                <Button asChild>
                  <Link href={`/mint-batch?batchId=${batch.id}`}>
                    <ShieldCheck className="mr-2 h-4 w-4" />
                    Mint Batch
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {batch.status === "minted" && (
            <Card className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
              <CardHeader>
                <CardTitle>Minted Batch</CardTitle>
                <CardDescription>This batch has been minted on the blockchain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    This batch has been minted as tokens on the blockchain. The tokens can be transferred, traded, or
                    redeemed for physical coffee.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Token ID:</p>
                      <p className="font-medium">{batch.tokenId}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Contract Address:</p>
                      <p className="font-mono text-xs">{batch.contractAddress}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" asChild>
                      <Link href={`/batch-metadata?batchId=${batch.id}`}>
                        <QrCode className="mr-2 h-4 w-4" />
                        View Metadata
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/redemption/new?tokenId=${batch.tokenId}`}>
                        <Package className="mr-2 h-4 w-4" />
                        Redeem Tokens
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="metadata" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch Metadata</CardTitle>
              <CardDescription>Detailed metadata stored on IPFS</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-slate-50 dark:bg-slate-800 rounded-md p-4 overflow-auto max-h-96">
                <pre className="text-xs">
                  {JSON.stringify(
                    {
                      id: batch.id,
                      name: batch.name,
                      origin: {
                        country: batch.origin,
                        region: batch.region,
                        farm: batch.farm,
                      },
                      altitude: batch.altitude,
                      process: batch.process,
                      roastProfile: batch.roastProfile,
                      roastDate: batch.createdAt,
                      certifications: batch.certifications,
                      cupping_notes: batch.cupping_notes,
                      batchSize: batch.quantity,
                      ipfsHash: batch.ipfsHash,
                      ...(batch.status === "minted" && {
                        tokenUri: `https://ipfs.io/ipfs/${batch.ipfsHash}/${batch.id}`,
                        contractAddress: batch.contractAddress,
                        blockchain: "Polygon",
                      }),
                      createdAt: batch.createdAt,
                      updatedAt: batch.createdAt,
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>
              <div className="flex justify-end mt-4">
                <Button variant="outline" asChild>
                  <Link href={`/batch-metadata?batchId=${batch.id}`}>
                    <QrCode className="mr-2 h-4 w-4" />
                    View Full Metadata
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {batch.status === "minted" && (
          <TabsContent value="tokens" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Minted Tokens</CardTitle>
                <CardDescription>Tokens minted for this batch</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <RefreshCw className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium">Token Information</h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Token ID:</p>
                        <p className="font-medium">{batch.tokenId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Token Standard:</p>
                        <p className="font-medium">ERC-1155</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Contract Address:</p>
                        <p className="font-mono text-xs">{batch.contractAddress}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Blockchain:</p>
                        <p className="font-medium">Polygon</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Supply:</p>
                        <p className="font-medium">{batch.quantity}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Token URI:</p>
                        <p className="font-mono text-xs truncate">
                          https://ipfs.io/ipfs/{batch.ipfsHash}/{batch.id}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" asChild>
                      <Link href={`/redemption/new?tokenId=${batch.tokenId}`}>
                        <Package className="mr-2 h-4 w-4" />
                        Redeem Tokens
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <a
                        href={`https://polygonscan.com/token/${batch.contractAddress}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        View on Polygonscan
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  )
}

