"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { ShieldCheck, Search, CheckCircle2, XCircle } from "lucide-react"

export default function VerificationPage() {
  const { toast } = useToast()
  const [batchId, setBatchId] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const [verificationResult, setVerificationResult] = useState<null | {
    verified: boolean
    batch: {
      id: number
      name: string
      origin: string
      farmer: string
      altitude: string
      process: string
      roastProfile: string
      productionDate: string
      expiryDate: string
      certifications: string[]
    }
  }>(null)

  const handleVerify = () => {
    if (!batchId.trim()) {
      toast({
        title: "Error",
        description: "Please enter a batch ID",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)

    // Simulate verification process
    setTimeout(() => {
      setIsVerifying(false)

      // Simulate verification result based on batch ID
      if (batchId === "1042" || batchId === "1041" || batchId === "1043") {
        setVerificationResult({
          verified: true,
          batch: {
            id: Number.parseInt(batchId),
            name:
              batchId === "1042"
                ? "Ethiopia Sidama"
                : batchId === "1041"
                  ? "Guatemala Antigua"
                  : "Ethiopia Yirgacheffe",
            origin: batchId === "1042" || batchId === "1043" ? "Sidama, Ethiopia" : "Antigua, Guatemala",
            farmer: batchId === "1042" || batchId === "1043" ? "Abebe Bekele Cooperative" : "San Miguel Cooperative",
            altitude: batchId === "1042" || batchId === "1043" ? "1,900-2,200 meters" : "1,500-1,700 meters",
            process: batchId === "1042" || batchId === "1043" ? "Washed" : "Natural",
            roastProfile: "Medium",
            productionDate: "2025-01-15",
            expiryDate: "2026-01-15",
            certifications: ["Organic", "Fair Trade", "Rainforest Alliance"],
          },
        })

        toast({
          title: "Verification Successful",
          description: `Batch #${batchId} has been verified on the blockchain.`,
        })
      } else {
        setVerificationResult({
          verified: false,
          batch: {
            id: Number.parseInt(batchId || "0"),
            name: "Unknown",
            origin: "Unknown",
            farmer: "Unknown",
            altitude: "Unknown",
            process: "Unknown",
            roastProfile: "Unknown",
            productionDate: "Unknown",
            expiryDate: "Unknown",
            certifications: [],
          },
        })

        toast({
          title: "Verification Failed",
          description: `Batch #${batchId} could not be verified on the blockchain.`,
          variant: "destructive",
        })
      }
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Batch Verification</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Verify Coffee Batch</CardTitle>
          <CardDescription>Enter a batch ID to verify its authenticity on the blockchain</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter batch ID (e.g. 1042)"
              value={batchId}
              onChange={(e) => setBatchId(e.target.value)}
              className="max-w-md"
            />
            <Button onClick={handleVerify} disabled={isVerifying}>
              {isVerifying ? (
                <>
                  <ShieldCheck className="mr-2 h-4 w-4 animate-spin" />
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
                    <CardTitle>{verificationResult.verified ? "Batch Verified" : "Verification Failed"}</CardTitle>
                  </div>
                  <CardDescription>
                    {verificationResult.verified
                      ? `Batch #${verificationResult.batch.id} has been verified on the blockchain.`
                      : `Batch #${batchId} could not be verified on the blockchain.`}
                  </CardDescription>
                </CardHeader>
                {verificationResult.verified && (
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-medium mb-2">Batch Information</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Batch ID:</span>
                            <span className="font-medium">#{verificationResult.batch.id}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Name:</span>
                            <span className="font-medium">{verificationResult.batch.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Origin:</span>
                            <span className="font-medium">{verificationResult.batch.origin}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Farmer/Cooperative:</span>
                            <span className="font-medium">{verificationResult.batch.farmer}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Altitude:</span>
                            <span className="font-medium">{verificationResult.batch.altitude}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Processing Details</h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Process:</span>
                            <span className="font-medium">{verificationResult.batch.process}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Roast Profile:</span>
                            <span className="font-medium">{verificationResult.batch.roastProfile}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Production Date:</span>
                            <span className="font-medium">{verificationResult.batch.productionDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Expiry Date:</span>
                            <span className="font-medium">{verificationResult.batch.expiryDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Certifications:</span>
                            <span className="font-medium">{verificationResult.batch.certifications.join(", ")}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button asChild>
                        <a href={`/batches/${verificationResult.batch.id}`}>View Full Details</a>
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>How Verification Works</CardTitle>
            <CardDescription>Current blockchain verification process</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">
                Each coffee batch is registered on the blockchain with a unique identifier. The current verification
                process checks:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Existence of the batch on the blockchain</li>
                <li>Integrity of the batch metadata</li>
              </ul>
              <p className="text-sm">
                When a batch is verified, you can confirm that the coffee batch exists and its data has not been
                tampered with.
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>Future Plans</CardTitle>
            <CardDescription>Upcoming verification enhancements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm">As this platform evolves, we plan to enhance the verification process with:</p>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>Chain of custody tracking throughout the supply chain</li>
                <li>Certification validity verification</li>
                <li>Advanced traceability from farm to cup</li>
                <li>Integration with third-party certification authorities</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Verified Batches</CardTitle>
            <CardDescription>Batches verified in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Batch #1043 - Ethiopia Yirgacheffe</span>
                </div>
                <span className="text-sm text-muted-foreground">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Batch #1042 - Ethiopia Sidama</span>
                </div>
                <span className="text-sm text-muted-foreground">5 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-600" />
                  <span className="font-medium">Batch #1041 - Guatemala Antigua</span>
                </div>
                <span className="text-sm text-muted-foreground">12 hours ago</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <span className="font-medium">Batch #9999 - Unknown</span>
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

