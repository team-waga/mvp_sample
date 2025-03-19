"use client"

import { useState, useCallback, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Package, Search, Clock, CheckCircle2, XCircle, Plus } from "lucide-react"
import Link from "next/link"
import { useWallet } from "@/hooks/use-wallet"
import { useBlockchainFeatures } from "@/hooks/use-blockchain-features"
import { getConsumerRedemptions, getRedemptionDetails } from "@/lib/blockchain/contracts"
import { cn, web3ButtonStyles } from "@/lib/utils"

// Dummy data for redemption requests
const mockRedemptionRequests = [
  {
    id: 1,
    batchId: 1041,
    batchName: "Guatemala Antigua",
    quantity: 10,
    requestDate: "2025-02-15",
    status: "pending",
    requester: "Coffee Shop A",
  },
  {
    id: 2,
    batchId: 1039,
    batchName: "Colombia Huila",
    quantity: 5,
    requestDate: "2025-02-10",
    status: "approved",
    requester: "Coffee Shop B",
  },
  {
    id: 3,
    batchId: 1038,
    batchName: "Kenya AA",
    quantity: 15,
    requestDate: "2025-02-05",
    status: "completed",
    requester: "Coffee Shop C",
  },
  {
    id: 4,
    batchId: 1042,
    batchName: "Ethiopia Sidama",
    quantity: 8,
    requestDate: "2025-02-01",
    status: "rejected",
    requester: "Coffee Shop D",
  },
]

export default function RedemptionPage() {
  const { toast } = useToast()
  const { address, isConnected, provider } = useWallet()
  const { features } = useBlockchainFeatures()

  const [tokenId, setTokenId] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<null | {
    verified: boolean
    token: {
      id: string
      batchId: number
      batchName: string
      quantity: number
      owner: string
    }
  }>(null)
  const [redemptionRequests, setRedemptionRequests] = useState(mockRedemptionRequests)
  const [isLoadingBlockchainData, setIsLoadingBlockchainData] = useState(false)

  // Load blockchain redemption data if enabled
  useEffect(() => {
    if (features.ENABLE_REDEMPTION && isConnected && provider && address) {
      fetchBlockchainRedemptions()
    }
  }, [features.ENABLE_REDEMPTION, isConnected, provider, address])

  // Fetch redemption data from blockchain
  const fetchBlockchainRedemptions = async () => {
    setIsLoadingBlockchainData(true)
    try {
      // Get redemption IDs for the connected user
      const redemptionIds = await getConsumerRedemptions(address, provider)

      if (redemptionIds.length > 0) {
        // Get details for each redemption
        const redemptionDetails = await Promise.all(redemptionIds.map((id) => getRedemptionDetails(id, provider)))

        // Map blockchain data to UI format
        const blockchainRedemptions = redemptionDetails
          .filter((details) => details !== null)
          .map((details) => ({
            id: details.redemptionId,
            batchId: details.batchId,
            batchName: `Batch #${details.batchId}`, // We would need a way to get batch names
            quantity: details.quantity,
            requestDate: new Date(details.requestDate * 1000).toISOString().split("T")[0],
            status: details.status.toLowerCase(),
            requester: details.consumer,
          }))

        // Merge with existing redemption requests
        // This preserves the UI while adding blockchain data
        setRedemptionRequests([...blockchainRedemptions, ...mockRedemptionRequests])
      }
    } catch (error) {
      console.error("Error fetching blockchain redemptions:", error)
      // Fallback to mock data is already handled
    } finally {
      setIsLoadingBlockchainData(false)
    }
  }

  // Memoize the verification handler to prevent unnecessary recreations
  const handleVerify = useCallback(() => {
    if (!tokenId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a token ID",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)

    // Check if blockchain verification is enabled
    if (features.ENABLE_REDEMPTION && isConnected && provider) {
      // In a real implementation, we would verify the token on the blockchain
      // For now, we'll simulate it with a timeout
      setTimeout(async () => {
        setIsVerifying(false)

        // Simulate verification result based on token ID
        if (tokenId === "1042-001" || tokenId === "1041-001") {
          setVerificationResult({
            verified: true,
            token: {
              id: tokenId,
              batchId: tokenId.startsWith("1042") ? 1042 : 1041,
              batchName: tokenId.startsWith("1042") ? "Ethiopia Sidama" : "Guatemala Antigua",
              quantity: 1,
              owner: address || "0x1234...5678",
            },
          })

          toast({
            title: "Verification Successful",
            description: `Token ${tokenId} has been verified on the blockchain.`,
          })
        } else {
          setVerificationResult({
            verified: false,
            token: {
              id: tokenId,
              batchId: 0,
              batchName: "Unknown",
              quantity: 0,
              owner: "Unknown",
            },
          })

          toast({
            title: "Verification Failed",
            description: `Token ${tokenId} could not be verified on the blockchain.`,
            variant: "destructive",
          })
        }
      }, 2000)
    } else {
      // Fallback to mock verification
      setTimeout(() => {
        setIsVerifying(false)

        // Simulate verification result based on token ID
        if (tokenId === "1042-001" || tokenId === "1041-001") {
          setVerificationResult({
            verified: true,
            token: {
              id: tokenId,
              batchId: tokenId.startsWith("1042") ? 1042 : 1041,
              batchName: tokenId.startsWith("1042") ? "Ethiopia Sidama" : "Guatemala Antigua",
              quantity: 1,
              owner: "0x1234...5678",
            },
          })

          toast({
            title: "Verification Successful",
            description: `Token ${tokenId} has been verified on the blockchain.`,
          })
        } else {
          setVerificationResult({
            verified: false,
            token: {
              id: tokenId,
              batchId: 0,
              batchName: "Unknown",
              quantity: 0,
              owner: "Unknown",
            },
          })

          toast({
            title: "Verification Failed",
            description: `Token ${tokenId} could not be verified on the blockchain.`,
            variant: "destructive",
          })
        }
      }, 2000)
    }
  }, [tokenId, toast, features.ENABLE_REDEMPTION, isConnected, provider, address])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Token Redemption</h1>
        <Button asChild className={cn(web3ButtonStyles("primary"))}>
          <Link href="/redemption/new">
            <Plus className="mr-2 h-4 w-4" />
            New Redemption Request
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{redemptionRequests.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {redemptionRequests.filter((req) => req.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Redemptions</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {redemptionRequests.filter((req) => req.status === "completed").length}
            </div>
            <p className="text-xs text-muted-foreground">Successfully redeemed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verify Token</CardTitle>
          <CardDescription>Enter a token ID to verify its authenticity before redemption</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter token ID (e.g. 1042-001)"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={handleVerify} disabled={isVerifying} className={cn(web3ButtonStyles("primary"))}>
              {isVerifying ? (
                <>
                  <Package className="mr-2 h-4 w-4 animate-spin" />
                  Verifying...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Verify
                </>
              )}
            </Button>
          </div>

          {verificationResult && (
            <div className="mt-8">
              <Card
                className={
                  verificationResult.verified
                    ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                    : "bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800"
                }
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    {verificationResult.verified ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <CardTitle>{verificationResult.verified ? "Token Verified" : "Verification Failed"}</CardTitle>
                  </div>
                  <CardDescription>
                    {verificationResult.verified
                      ? `Token ${verificationResult.token.id} has been verified on the blockchain.`
                      : `Token ${tokenId} could not be verified on the blockchain.`}
                  </CardDescription>
                </CardHeader>
                {verificationResult.verified && (
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Token ID:</span>
                            <span className="font-medium">{verificationResult.token.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Batch ID:</span>
                            <span className="font-medium">#{verificationResult.token.batchId}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Batch Name:</span>
                            <span className="font-medium">{verificationResult.token.batchName}</span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Quantity:</span>
                            <span className="font-medium">{verificationResult.token.quantity} kg</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Owner:</span>
                            <span className="font-medium">{verificationResult.token.owner}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Status:</span>
                            <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                              Valid
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end">
                        <Button asChild className={cn(web3ButtonStyles("primary"))}>
                          <Link href="/redemption/new">Create Redemption Request</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Redemption Requests</CardTitle>
          <CardDescription>Manage token redemption requests</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingBlockchainData && (
            <div className="flex items-center justify-center py-4">
              <Package className="h-6 w-6 animate-spin mr-2" />
              <span>Loading blockchain redemption data...</span>
            </div>
          )}

          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">All Requests</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {redemptionRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">#{request.id}</TableCell>
                      <TableCell>
                        <Link href={`/batches/${request.batchId}`} className="hover:underline">
                          #{request.batchId} - {request.batchName}
                        </Link>
                      </TableCell>
                      <TableCell>{request.quantity} kg</TableCell>
                      <TableCell>{request.requester}</TableCell>
                      <TableCell>{request.requestDate}</TableCell>
                      <TableCell>
                        {request.status === "pending" && (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            Pending
                          </Badge>
                        )}
                        {request.status === "approved" && (
                          <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                            Approved
                          </Badge>
                        )}
                        {request.status === "completed" && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                            Completed
                          </Badge>
                        )}
                        {request.status === "rejected" && (
                          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                            Rejected
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild className={cn(web3ButtonStyles("secondary"))}>
                            <Link href={`/redemption/${request.id}`}>View</Link>
                          </Button>
                          {request.status === "pending" && (
                            <Button size="sm" className={cn(web3ButtonStyles("primary"))}>
                              Approve
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="pending" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {redemptionRequests
                    .filter((request) => request.status === "pending")
                    .map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">#{request.id}</TableCell>
                        <TableCell>
                          <Link href={`/batches/${request.batchId}`} className="hover:underline">
                            #{request.batchId} - {request.batchName}
                          </Link>
                        </TableCell>
                        <TableCell>{request.quantity} kg</TableCell>
                        <TableCell>{request.requester}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" asChild className={cn(web3ButtonStyles("secondary"))}>
                              <Link href={`/redemption/${request.id}`}>View</Link>
                            </Button>
                            <Button size="sm" className={cn(web3ButtonStyles("primary"))}>
                              Approve
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="approved" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {redemptionRequests
                    .filter((request) => request.status === "approved")
                    .map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">#{request.id}</TableCell>
                        <TableCell>
                          <Link href={`/batches/${request.batchId}`} className="hover:underline">
                            #{request.batchId} - {request.batchName}
                          </Link>
                        </TableCell>
                        <TableCell>{request.quantity} kg</TableCell>
                        <TableCell>{request.requester}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" asChild className={cn(web3ButtonStyles("secondary"))}>
                              <Link href={`/redemption/${request.id}`}>View</Link>
                            </Button>
                            <Button size="sm" className={cn(web3ButtonStyles("primary"))}>
                              Mark Completed
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="completed" className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Batch</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Requester</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {redemptionRequests
                    .filter((request) => request.status === "completed")
                    .map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">#{request.id}</TableCell>
                        <TableCell>
                          <Link href={`/batches/${request.batchId}`} className="hover:underline">
                            #{request.batchId} - {request.batchName}
                          </Link>
                        </TableCell>
                        <TableCell>{request.quantity} kg</TableCell>
                        <TableCell>{request.requester}</TableCell>
                        <TableCell>{request.requestDate}</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" asChild className={cn(web3ButtonStyles("secondary"))}>
                            <Link href={`/redemption/${request.id}`}>View</Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

