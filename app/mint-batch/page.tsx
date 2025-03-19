"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useSearchParams } from "next/navigation"
import { ShieldCheck, Check, AlertTriangle, Loader2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { cn, web3ButtonStyles } from "@/lib/utils"

export default function MintBatchPage() {
  const { toast } = useToast()
  const searchParams = useSearchParams()

  const [batchId, setBatchId] = useState("")
  const [isMinting, setIsMinting] = useState(false)
  const [mintingComplete, setMintingComplete] = useState(false)
  const [mintingError, setMintingError] = useState<string | null>(null)
  const [transactionHash, setTransactionHash] = useState<string | null>(null)
  const [batchDetails, setBatchDetails] = useState<any>(null)
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "verified" | "failed">("pending")

  useEffect(() => {
    // Check if batchId is provided in URL
    const batchIdParam = searchParams.get("batchId")
    if (batchIdParam) {
      setBatchId(batchIdParam)
      verifyBatch(batchIdParam)
    }
  }, [searchParams])

  const verifyBatch = (id: string) => {
    // Simulate batch verification
    setTimeout(() => {
      if (id === "1042" || id === "1043" || id === "1044" || id === "1045") {
        setVerificationStatus("verified")
        setBatchDetails({
          id: Number.parseInt(id),
          name:
            id === "1042"
              ? "Ethiopia Sidama"
              : id === "1043"
                ? "Ethiopia Yirgacheffe"
                : id === "1044"
                  ? "Costa Rica Tarrazu"
                  : "Rwanda Nyungwe",
          origin: id === "1042" || id === "1043" ? "Ethiopia" : id === "1044" ? "Costa Rica" : "Rwanda",
          quantity: id === "1042" ? 90 : id === "1043" ? 120 : id === "1044" ? 75 : 100,
          createdAt: "2025-02-15",
          ipfsHash: "QmX7bVbHLSxFqNcGYbZdvP1y4xNjhHR5QFtY9Eo5ZtKNt3",
        })
      } else {
        setVerificationStatus("failed")
        setMintingError("Batch not found or not ready for minting")
      }
    }, 1500)
  }

  const handleVerify = () => {
    if (!batchId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a batch ID",
        variant: "destructive",
      })
      return
    }

    setVerificationStatus("pending")
    setBatchDetails(null)
    setMintingComplete(false)
    setMintingError(null)
    setTransactionHash(null)

    verifyBatch(batchId)
  }

  const handleMint = () => {
    if (verificationStatus !== "verified") {
      toast({
        title: "Error",
        description: "Batch must be verified before minting",
        variant: "destructive",
      })
      return
    }

    setIsMinting(true)
    setMintingError(null)

    // Simulate minting process
    setTimeout(() => {
      setIsMinting(false)

      if (Math.random() > 0.1) {
        // 90% success rate for demo
        setMintingComplete(true)
        setTransactionHash("0x" + Math.random().toString(16).substring(2, 42))

        toast({
          title: "Minting Successful",
          description: `Batch #${batchId} has been minted successfully.`,
        })
      } else {
        setMintingError("Transaction failed. Please try again.")

        toast({
          title: "Minting Failed",
          description: "Transaction failed. Please try again.",
          variant: "destructive",
        })
      }
    }, 3000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Mint Batch Tokens</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verify & Mint Batch</CardTitle>
          <CardDescription>Enter a batch ID to verify and mint tokens for a coffee batch</CardDescription>
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
              onClick={handleVerify}
              disabled={verificationStatus === "pending"}
              className={cn(web3ButtonStyles("secondary"))}
            >
              {verificationStatus === "pending" ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Verify
                </>
              )}
            </Button>
          </div>

          {verificationStatus === "verified" && batchDetails && (
            <div className="mt-8 space-y-6">
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <Check className="h-4 w-4 text-green-600" />
                <AlertTitle>Batch Verified</AlertTitle>
                <AlertDescription>
                  Batch #{batchDetails.id} - {batchDetails.name} has been verified and is ready for minting.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Batch Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Batch ID:</span>
                      <span className="font-medium">#{batchDetails.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Name:</span>
                      <span className="font-medium">{batchDetails.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Origin:</span>
                      <span className="font-medium">{batchDetails.origin}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Quantity:</span>
                      <span className="font-medium">{batchDetails.quantity} kg</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Created:</span>
                      <span className="font-medium">{batchDetails.createdAt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">IPFS Hash:</span>
                      <span className="font-medium truncate max-w-[200px]">{batchDetails.ipfsHash}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Minting Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Token Standard:</span>
                      <span className="font-medium">ERC-1155</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Tokens to Mint:</span>
                      <span className="font-medium">{batchDetails.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Network:</span>
                      <Badge variant="outline">Polygon</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Gas Estimate:</span>
                      <span className="font-medium">~0.001 MATIC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Status:</span>
                      {mintingComplete ? (
                        <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                          Minted
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                          Ready to Mint
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {mintingError && (
                <Alert variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Minting Failed</AlertTitle>
                  <AlertDescription>{mintingError}</AlertDescription>
                </Alert>
              )}

              {mintingComplete && transactionHash && (
                <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <Check className="h-4 w-4 text-blue-600" />
                  <AlertTitle>Minting Complete</AlertTitle>
                  <AlertDescription>
                    <p className="mb-2">
                      Batch #{batchDetails.id} - {batchDetails.name} has been minted successfully.
                    </p>
                    <p className="text-sm">
                      Transaction Hash: <span className="font-mono text-xs">{transactionHash}</span>
                    </p>
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <Link href={`/batches/${batchDetails.id}`}>View Batch Details</Link>
                </Button>
                <Button
                  onClick={handleMint}
                  disabled={isMinting || mintingComplete}
                  className={cn(web3ButtonStyles("primary"))}
                >
                  {isMinting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Minting...
                    </>
                  ) : mintingComplete ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Minted
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="mr-2 h-4 w-4" />
                      Mint Tokens
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}

          {verificationStatus === "failed" && (
            <Alert variant="destructive" className="mt-8">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Verification Failed</AlertTitle>
              <AlertDescription>
                {mintingError || "Batch not found or not ready for minting. Please check the batch ID and try again."}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>About Minting</CardTitle>
            <CardDescription>Understanding the token minting process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">
                Minting creates digital tokens representing <strong>250g or 500g roasted coffee bags</strong> from a
                batch, enabling ownership tracking and trading on the blockchain.
              </p>

              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>
                  <strong>Layer 2 Blockchain</strong> – Low fees, fast transactions while maintaining security
                </li>
                <li>
                  <strong>IPFS Metadata</strong> – Immutable coffee details stored securely off-chain
                </li>
                <li>
                  <strong>Transferable</strong> – Tokens can be traded between accounts
                </li>
                <li>
                  <strong>Redeemable</strong> – Exchange tokens for physical coffee bags
                </li>
                <li>
                  <strong>Transparent</strong> – All transactions recorded on-chain for full traceability
                </li>
              </ul>

              <p className="text-sm">
                This system brings transparency and efficiency to coffee trading while ensuring authenticity from farm
                to cup.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Minted Batches</CardTitle>
            <CardDescription>Batches minted in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Batch #1041 - Guatemala Antigua</span>
                </div>
                <span className="text-sm text-muted-foreground">3 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Batch #1039 - Colombia Huila</span>
                </div>
                <span className="text-sm text-muted-foreground">12 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Batch #1038 - Kenya AA</span>
                </div>
                <span className="text-sm text-muted-foreground">18 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

