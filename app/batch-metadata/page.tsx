"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { QrCode, Search, Download, Copy, Check } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function BatchMetadataPage() {
  const { toast } = useToast()
  const [batchId, setBatchId] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [metadata, setMetadata] = useState<any>(null)
  const [copied, setCopied] = useState(false)

  const handleSearch = () => {
    if (!batchId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a batch ID",
        variant: "destructive",
      })
      return
    }

    setIsSearching(true)

    // Simulate search process
    setTimeout(() => {
      setIsSearching(false)

      // Simulate metadata result based on batch ID
      if (batchId === "1042" || batchId === "1043" || batchId === "1041") {
        const metadataResult = {
          id: Number.parseInt(batchId),
          name:
            batchId === "1042" ? "Ethiopia Sidama" : batchId === "1043" ? "Ethiopia Yirgacheffe" : "Guatemala Antigua",
          origin: {
            country: batchId === "1042" || batchId === "1043" ? "Ethiopia" : "Guatemala",
            region: batchId === "1042" ? "Sidama" : batchId === "1043" ? "Yirgacheffe" : "Antigua",
            farm: batchId === "1042" || batchId === "1043" ? "Abebe Bekele Cooperative" : "San Miguel Cooperative",
          },
          altitude: batchId === "1042" || batchId === "1043" ? "1,900-2,200 meters" : "1,500-1,700 meters",
          process: batchId === "1042" || batchId === "1043" ? "Washed" : "Natural",
          roastProfile: "Medium",
          roastDate: "2025-01-15",
          certifications: ["Organic", "Fair Trade", "Rainforest Alliance"],
          cupping_notes: ["Blueberry", "Chocolate", "Citrus"],
          batchSize: batchId === "1042" ? 90 : batchId === "1043" ? 120 : 60,
          ipfsHash: "QmX7bVbHLSxFqNcGYbZdvP1y4xNjhHR5QFtY9Eo5ZtKNt3",
          tokenUri: `https://ipfs.io/ipfs/QmX7bVbHLSxFqNcGYbZdvP1y4xNjhHR5QFtY9Eo5ZtKNt3/${batchId}`,
          contractAddress: "0x1234567890abcdef1234567890abcdef12345678",
          blockchain: "Polygon",
          createdAt: "2025-02-15",
          updatedAt: "2025-02-15",
        }

        setMetadata(metadataResult)

        toast({
          title: "Metadata Found",
          description: `Metadata for Batch #${batchId} has been retrieved.`,
        })
      } else {
        setMetadata(null)

        toast({
          title: "Metadata Not Found",
          description: `No metadata found for Batch #${batchId}.`,
          variant: "destructive",
        })
      }
    }, 2000)
  }

  const copyMetadata = () => {
    if (metadata) {
      navigator.clipboard.writeText(JSON.stringify(metadata, null, 2))
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)

      toast({
        title: "Metadata Copied",
        description: "Batch metadata has been copied to clipboard.",
      })
    }
  }

  const downloadMetadata = () => {
    if (metadata) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(metadata, null, 2))
      const downloadAnchorNode = document.createElement("a")
      downloadAnchorNode.setAttribute("href", dataStr)
      downloadAnchorNode.setAttribute("download", `batch-${metadata.id}-metadata.json`)
      document.body.appendChild(downloadAnchorNode)
      downloadAnchorNode.click()
      downloadAnchorNode.remove()

      toast({
        title: "Metadata Downloaded",
        description: `Batch #${metadata.id} metadata has been downloaded.`,
      })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Batch Metadata</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Search Batch Metadata</CardTitle>
          <CardDescription>Enter a batch ID to retrieve its metadata</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter batch ID (e.g. 1042)"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              className="max-w-md"
            />
            <Button
              onClick={handleSearch}
              disabled={isSearching}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none"
            >
              {isSearching ? (
                <>
                  <QrCode className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Search
                </>
              )}
            </Button>
          </div>

          {metadata && (
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  Batch #{metadata.id} - {metadata.name}
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={copyMetadata}
                    className="border-purple-600 text-purple-600 hover:bg-purple-100 hover:text-purple-700"
                  >
                    {copied ? (
                      <>
                        <Check className="mr-2 h-4 w-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="mr-2 h-4 w-4" />
                        Copy JSON
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={downloadMetadata}
                    className="border-purple-600 text-purple-600 hover:bg-purple-100 hover:text-purple-700"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>

              <Tabs defaultValue="formatted">
                <TabsList>
                  <TabsTrigger value="formatted">Formatted</TabsTrigger>
                  <TabsTrigger value="json">JSON</TabsTrigger>
                  <TabsTrigger value="blockchain">Blockchain Info</TabsTrigger>
                </TabsList>

                <TabsContent value="formatted" className="mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-4">Batch Information</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Batch ID:</span>
                          <span className="font-medium">#{metadata.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Name:</span>
                          <span className="font-medium">{metadata.name}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Country:</span>
                          <span className="font-medium">{metadata.origin.country}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Region:</span>
                          <span className="font-medium">{metadata.origin.region}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Farm/Cooperative:</span>
                          <span className="font-medium">{metadata.origin.farm}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Altitude:</span>
                          <span className="font-medium">{metadata.altitude}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Process:</span>
                          <span className="font-medium">{metadata.process}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium mb-4">Additional Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Roast Profile:</span>
                          <span className="font-medium">{metadata.roastProfile}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Roast Date:</span>
                          <span className="font-medium">{metadata.roastDate}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Batch Size:</span>
                          <span className="font-medium">{metadata.batchSize} kg</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Certifications:</span>
                          <span className="font-medium">{metadata.certifications.join(", ")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Cupping Notes:</span>
                          <span className="font-medium">{metadata.cupping_notes.join(", ")}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Created:</span>
                          <span className="font-medium">{metadata.createdAt}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Last Updated:</span>
                          <span className="font-medium">{metadata.updatedAt}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="json" className="mt-6">
                  <div className="bg-slate-100 dark:bg-slate-800 rounded-md p-4 overflow-auto max-h-96">
                    <pre className="text-xs">{JSON.stringify(metadata, null, 2)}</pre>
                  </div>
                </TabsContent>

                <TabsContent value="blockchain" className="mt-6">
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">IPFS Hash:</span>
                        <span className="font-mono text-xs">{metadata.ipfsHash}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Token URI:</span>
                        <span className="font-mono text-xs">{metadata.tokenUri}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Contract Address:</span>
                        <span className="font-mono text-xs">{metadata.contractAddress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Blockchain:</span>
                        <span className="font-medium">{metadata.blockchain}</span>
                      </div>
                    </div>

                    <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                      <QrCode className="h-4 w-4 text-blue-600" />
                      <AlertTitle>Blockchain Verification</AlertTitle>
                      <AlertDescription>
                        <p className="mb-2">
                          This metadata is permanently stored on IPFS and referenced on the {metadata.blockchain}{" "}
                          blockchain.
                        </p>
                        <p className="text-sm">
                          You can verify this data by checking the contract at{" "}
                          <a
                            href={`https://polygonscan.com/address/${metadata.contractAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {metadata.contractAddress.substring(0, 8)}...
                            {metadata.contractAddress.substring(metadata.contractAddress.length - 6)}
                          </a>
                        </p>
                      </AlertDescription>
                    </Alert>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>About Batch Metadata</CardTitle>
            <CardDescription>Understanding the metadata structure</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">
                Each coffee batch has associated metadata that contains detailed information about the coffee's origin,
                processing, and certifications. This metadata is stored on IPFS and referenced on the blockchain.
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Metadata is stored in JSON format for machine readability</li>
                <li>The IPFS hash ensures the metadata cannot be altered</li>
                <li>The blockchain reference provides a timestamp and proof of existence</li>
                <li>Metadata includes all relevant information for traceability and transparency</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Viewed Metadata</CardTitle>
            <CardDescription>Your recently viewed batch metadata</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Batch #1042 - Ethiopia Sidama</span>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Batch #1043 - Ethiopia Yirgacheffe</span>
                </div>
                <span className="text-sm text-muted-foreground">5 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <QrCode className="h-4 w-4 text-blue-600" />
                  <span className="font-medium">Batch #1041 - Guatemala Antigua</span>
                </div>
                <span className="text-sm text-muted-foreground">12 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

