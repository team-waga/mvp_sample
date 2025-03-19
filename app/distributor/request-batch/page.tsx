"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter, useSearchParams } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Check, AlertTriangle, Clock, ArrowLeft, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { getMarketplaceItem } from "@/lib/marketplace-data"
import { cn, web3ButtonStyles } from "@/lib/utils"

export default function RequestBatchPage() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [requestSubmitted, setRequestSubmitted] = useState(false)
  const [requestId, setRequestId] = useState<number | null>(null)

  // Form state
  const [origin, setOrigin] = useState("Ethiopia")
  const [region, setRegion] = useState("")
  const [process, setProcess] = useState("Washed")
  const [roastProfile, setRoastProfile] = useState("Medium")
  const [urgency, setUrgency] = useState("normal")
  const [notes, setNotes] = useState("")
  const [batchSize, setBatchSize] = useState("100")

  // Replacement batch info
  const [isReplacingBatch, setIsReplacingBatch] = useState(false)
  const [replaceBatchId, setReplaceBatchId] = useState<string | null>(null)
  const [replaceBatchDetails, setReplaceBatchDetails] = useState<any>(null)

  // Marketplace batch info
  const [isMarketplaceBatch, setIsMarketplaceBatch] = useState(false)
  const [marketplaceItem, setMarketplaceItem] = useState<any>(null)

  // Batch size recommendation values
  const minimumBatchSize = 50
  const optimalBatchSize = 150
  const maximumBatchSize = 300

  const initializedRef = useRef(false)

  useEffect(() => {
    // Only run this effect once
    if (initializedRef.current) return
    initializedRef.current = true

    // Check if we're requesting from marketplace
    const marketplaceId = searchParams.get("marketplaceId")
    if (marketplaceId) {
      const item = getMarketplaceItem(marketplaceId)
      if (item) {
        setIsMarketplaceBatch(true)
        setMarketplaceItem(item)

        // Pre-fill form with marketplace item details
        setOrigin(item.origin)
        setRegion(item.region)
        setProcess(item.process)
        setRoastProfile(item.roastProfile)
        setBatchSize(Math.min(item.availableQuantity, optimalBatchSize).toString())
        setNotes(`Marketplace batch:  optimalBatchSize).toString())
        setNotes(\`Marketplace batch:
${item.id} - ${item.name}

Origin: ${item.origin}
Region: ${item.region}
Process: ${item.process}
Roast Profile: ${item.roastProfile}`)
      }
    }

    // Check if we're replacing a batch
    const replaceId = searchParams.get("replaceId")
    if (replaceId) {
      setReplaceBatchId(replaceId)
      setIsReplacingBatch(true)

      // Fetch batch details (simulated)
      const suggestedSize = searchParams.get("suggestedSize") || "100"
      setBatchSize(suggestedSize)

      // Simulate fetching batch details
      setReplaceBatchDetails({
        id: replaceId,
        name: replaceId === "1042" ? "Ethiopia Sidama" : replaceId === "1041" ? "Guatemala Antigua" : "Unknown Batch",
        currentQuantity: replaceId === "1042" ? 15 : replaceId === "1041" ? 8 : 0,
        avgMonthlyUsage: replaceId === "1042" ? 25 : replaceId === "1041" ? 20 : 0,
      })

      // Set region based on the batch being replaced
      if (replaceId === "1042") {
        setRegion("Sidama")
      } else if (replaceId === "1041") {
        setOrigin("Guatemala")
        setRegion("Antigua")
      }
    }

    // Check if we're coming from an inventory alert
    const source = searchParams.get("source")
    if (source === "inventory_alert") {
      toast({
        title: "Inventory Alert",
        description: "Creating a new batch request based on low inventory or expiring batches.",
      })
    }
  }, [searchParams, toast, optimalBatchSize])

  const calculateEfficiency = (size: number) => {
    // Simple efficiency calculation - higher for sizes closer to optimal
    if (size < minimumBatchSize) return 60
    if (size > maximumBatchSize) return 70

    // Peak efficiency at optimal size
    const distance = Math.abs(size - optimalBatchSize)
    const maxDistance = Math.max(optimalBatchSize - minimumBatchSize, maximumBatchSize - optimalBatchSize)
    return 100 - Math.floor((distance / maxDistance) * 30)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!origin || !region || !process || !roastProfile || !urgency) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate request submission
    setTimeout(() => {
      setIsSubmitting(false)

      // Generate a random request ID
      const newRequestId = Math.floor(Math.random() * 1000) + 1000
      setRequestId(newRequestId)
      setRequestSubmitted(true)

      toast({
        title: "Batch request submitted",
        description: `Your batch request #${newRequestId} has been submitted successfully.`,
      })
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/distributor/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">
          {isMarketplaceBatch
            ? `Request Marketplace Batch`
            : isReplacingBatch
              ? `Request Replacement Batch for #${replaceBatchId}`
              : "Request New Batch"}
        </h1>
      </div>

      {isMarketplaceBatch && marketplaceItem && (
        <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <ShoppingCart className="h-4 w-4 text-green-600" />
          <AlertTitle>Marketplace Batch Selected</AlertTitle>
          <AlertDescription>
            <p>
              You are requesting the marketplace batch: <strong>{marketplaceItem.name}</strong>
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Available quantity: {marketplaceItem.availableQuantity} kg | Price: ${marketplaceItem.price.toFixed(2)}/kg
            </p>
          </AlertDescription>
        </Alert>
      )}

      {isReplacingBatch && replaceBatchDetails && (
        <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertTitle>Replacing Low Inventory Batch</AlertTitle>
          <AlertDescription>
            <p>
              You are requesting a replacement for Batch #{replaceBatchId} - {replaceBatchDetails.name}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Current inventory: {replaceBatchDetails.currentQuantity} kg | Average monthly usage:{" "}
              {replaceBatchDetails.avgMonthlyUsage} kg
            </p>
          </AlertDescription>
        </Alert>
      )}

      {requestSubmitted && requestId ? (
        <Card>
          <CardHeader>
            <CardTitle>Batch Request Submitted</CardTitle>
            <CardDescription>Your request has been submitted successfully</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 mb-6">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your batch request has been submitted successfully. You will receive updates on its status.
              </AlertDescription>
            </Alert>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Request Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Request ID:</p>
                    <p className="font-medium">#{requestId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status:</p>
                    <p className="font-medium">Pending Review</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Batch Size:</p>
                    <p className="font-medium">{batchSize} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Urgency:</p>
                    <p className="font-medium">
                      {urgency === "urgent"
                        ? "Urgent (1-2 weeks)"
                        : urgency === "normal"
                          ? "Normal (2-4 weeks)"
                          : "Low (4+ weeks)"}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Batch Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Origin:</p>
                    <p className="font-medium">{origin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Region:</p>
                    <p className="font-medium">{region}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Process:</p>
                    <p className="font-medium">{process}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Roast Profile:</p>
                    <p className="font-medium">{roastProfile}</p>
                  </div>
                </div>
              </div>

              {notes && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Additional Notes</h3>
                  <p className="whitespace-pre-line">{notes}</p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild className={cn(web3ButtonStyles("secondary"))}>
                  <Link href="/distributor/dashboard">View Dashboard</Link>
                </Button>
                <Button asChild className={cn(web3ButtonStyles("primary"))}>
                  <Link href="/distributor/inventory">View Inventory</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch Information</CardTitle>
              <CardDescription>Specify the details for the batch you want to request</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin *</Label>
                  <Select value={origin} onValueChange={setOrigin} disabled={isMarketplaceBatch}>
                    <SelectTrigger id="origin">
                      <SelectValue placeholder="Select origin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ethiopia">Ethiopia</SelectItem>
                      <SelectItem value="Guatemala">Guatemala</SelectItem>
                      <SelectItem value="Colombia">Colombia</SelectItem>
                      <SelectItem value="Kenya">Kenya</SelectItem>
                      <SelectItem value="Rwanda">Rwanda</SelectItem>
                      <SelectItem value="Costa Rica">Costa Rica</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Region *</Label>
                  <Input
                    id="region"
                    placeholder="e.g. Sidama, Yirgacheffe"
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    required
                    disabled={isMarketplaceBatch}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="process">Process *</Label>
                  <Select value={process} onValueChange={setProcess} disabled={isMarketplaceBatch}>
                    <SelectTrigger id="process">
                      <SelectValue placeholder="Select process" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Washed">Washed</SelectItem>
                      <SelectItem value="Natural">Natural</SelectItem>
                      <SelectItem value="Honey">Honey</SelectItem>
                      <SelectItem value="Anaerobic">Anaerobic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roastProfile">Roast Profile *</Label>
                  <Select value={roastProfile} onValueChange={setRoastProfile} disabled={isMarketplaceBatch}>
                    <SelectTrigger id="roastProfile">
                      <SelectValue placeholder="Select roast profile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Light">Light</SelectItem>
                      <SelectItem value="Medium-Light">Medium-Light</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Medium-Dark">Medium-Dark</SelectItem>
                      <SelectItem value="Dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Request Urgency *</Label>
                  <Select value={urgency} onValueChange={setUrgency}>
                    <SelectTrigger id="urgency">
                      <SelectValue placeholder="Select urgency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="urgent">Urgent (1-2 weeks)</SelectItem>
                      <SelectItem value="normal">Normal (2-4 weeks)</SelectItem>
                      <SelectItem value="low">Low (4+ weeks)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special requirements or notes for your batch request"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>

                <CardFooter className="px-0 pt-4">
                  <Button type="submit" className={cn("w-full", web3ButtonStyles("primary"))} disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Batch Request"}
                  </Button>
                </CardFooter>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Batch Size Recommendation</CardTitle>
                <CardDescription>Specify the size of the batch you need</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="batchSize">Batch Size (kg)</Label>
                    <div className="flex gap-2">
                      <Input
                        id="batchSize"
                        type="number"
                        value={batchSize}
                        onChange={(e) => setBatchSize(e.target.value)}
                        min={minimumBatchSize}
                        max={isMarketplaceBatch ? marketplaceItem?.availableQuantity : maximumBatchSize}
                        required
                      />
                      <span className="flex items-center text-sm font-medium">kg</span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Specify the size of the batch you need based on your distribution requirements.
                      {isMarketplaceBatch && marketplaceItem && (
                        <span className="text-amber-600">
                          {" "}
                          Maximum available: {marketplaceItem.availableQuantity} kg
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Minimum viable batch:</span>
                      <span className="font-medium">{minimumBatchSize} kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Optimal batch size:</span>
                      <span className="font-medium">{optimalBatchSize} kg</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Maximum efficient batch:</span>
                      <span className="font-medium">
                        {isMarketplaceBatch
                          ? Math.min(marketplaceItem?.availableQuantity || maximumBatchSize, maximumBatchSize)
                          : maximumBatchSize}{" "}
                        kg
                      </span>
                    </div>

                    <Slider
                      value={[Number.parseInt(batchSize) || minimumBatchSize]}
                      min={minimumBatchSize}
                      max={
                        isMarketplaceBatch
                          ? Math.min(marketplaceItem?.availableQuantity || maximumBatchSize, maximumBatchSize)
                          : maximumBatchSize
                      }
                      step={5}
                      onValueChange={(value) => setBatchSize(value[0].toString())}
                      className="py-4"
                    />

                    <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">
                      <p className="text-sm">
                        <span className="font-medium">Cost efficiency:</span>{" "}
                        {calculateEfficiency(Number.parseInt(batchSize) || minimumBatchSize)}%
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Larger batches typically have better economies of scale.
                      </p>
                    </div>
                  </div>

                  {isMarketplaceBatch && marketplaceItem && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                      <p className="text-sm font-medium mb-1">Marketplace Batch Details</p>
                      <p className="text-sm">Price: ${marketplaceItem.price.toFixed(2)}/kg</p>
                      <p className="text-sm">
                        Total cost: ${(marketplaceItem.price * Number.parseInt(batchSize || "0")).toFixed(2)}
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto mt-1"
                        onClick={() =>
                          setBatchSize(Math.min(marketplaceItem.availableQuantity, optimalBatchSize).toString())
                        }
                      >
                        Use recommended size
                      </Button>
                    </div>
                  )}

                  {isReplacingBatch && replaceBatchDetails && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-md">
                      <p className="text-sm font-medium mb-1">Replacement Recommendation</p>
                      <p className="text-sm">
                        Based on the average monthly usage of {replaceBatchDetails.avgMonthlyUsage} kg, we recommend a
                        batch size of at least {replaceBatchDetails.avgMonthlyUsage * 3} kg (3-month supply).
                      </p>
                      <Button
                        variant="link"
                        className="p-0 h-auto mt-1"
                        onClick={() => setBatchSize((replaceBatchDetails.avgMonthlyUsage * 3).toString())}
                      >
                        Use recommended size
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Request Information</CardTitle>
                <CardDescription>Information about the batch request process</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Request Process</h3>
                  <p className="text-sm text-muted-foreground">
                    Your batch request will be reviewed by our production team. You will receive a notification when
                    your request is processed.
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Typical processing times: Urgent (1-2 weeks), Normal (2-4 weeks), Low (4+ weeks)
                  </p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Batch Request Process</h3>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Submit your batch request with detailed specifications</li>
                    <li>Production team reviews and approves the request</li>
                    <li>Batch is created according to your specifications</li>
                    <li>You receive a notification when the batch is ready</li>
                    <li>Batch is available for minting and distribution</li>
                  </ol>
                </div>

                <div className="flex items-center gap-2 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-md">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <p className="text-sm">
                    <span className="font-medium">Current estimated processing time: </span>
                    {urgency === "urgent" ? "1-2 weeks" : urgency === "normal" ? "2-4 weeks" : "4+ weeks"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

