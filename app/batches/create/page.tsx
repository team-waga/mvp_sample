"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Slider } from "@/components/ui/slider"
import { format } from "date-fns"
import { CalendarIcon, Upload, Copy, Check, AlertTriangle } from "lucide-react"
import { cn, web3ButtonStyles } from "@/lib/utils"
import { useRouter, useSearchParams } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CreateBatchPage() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isUploading, setIsUploading] = useState(false)
  const [productionDate, setProductionDate] = useState<Date>()
  const [expiryDate, setExpiryDate] = useState<Date>()
  const [createdBatchId, setCreatedBatchId] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)

  // New state for batch size
  const [batchSize, setBatchSize] = useState("100")
  const [isReplacingBatch, setIsReplacingBatch] = useState(false)
  const [replaceBatchId, setReplaceBatchId] = useState<string | null>(null)
  const [replaceBatchDetails, setReplaceBatchDetails] = useState<any>(null)

  // Batch size recommendation values
  const minimumBatchSize = 50
  const optimalBatchSize = 150
  const maximumBatchSize = 300

  useEffect(() => {
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
    }

    // Check if we're coming from an inventory alert
    const source = searchParams.get("source")
    if (source === "inventory_alert") {
      toast({
        title: "Inventory Alert",
        description: "Creating a new batch based on low inventory or expiring batches.",
      })
    }
  }, [searchParams, toast])

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

    // Simulate uploading to IPFS
    setIsUploading(true)
    setTimeout(() => {
      setIsUploading(false)

      // Generate a random batch ID between 1000 and 2000
      const newBatchId = Math.floor(Math.random() * 1000) + 1000
      setCreatedBatchId(newBatchId)

      toast({
        title: "Batch created successfully",
        description: `Batch #${newBatchId} has been created and is ready for minting.`,
      })
    }, 2000)
  }

  const copyBatchId = () => {
    if (createdBatchId) {
      navigator.clipboard.writeText(createdBatchId.toString())
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)

      toast({
        title: "Batch ID copied",
        description: `Batch ID #${createdBatchId} has been copied to clipboard.`,
      })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">
        {isReplacingBatch ? `Create Replacement Batch for #${replaceBatchId}` : "Create New Ethiopian Coffee Batch"}
      </h1>

      {isReplacingBatch && replaceBatchDetails && (
        <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <AlertTriangle className="h-4 w-4 text-blue-600" />
          <AlertTitle>Replacing Low Inventory Batch</AlertTitle>
          <AlertDescription>
            <p>
              You are creating a replacement for Batch #{replaceBatchId} - {replaceBatchDetails.name}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Current inventory: {replaceBatchDetails.currentQuantity} kg | Average monthly usage:{" "}
              {replaceBatchDetails.avgMonthlyUsage} kg
            </p>
          </AlertDescription>
        </Alert>
      )}

      {createdBatchId && (
        <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <Check className="h-4 w-4 text-green-600" />
          <AlertTitle>Batch Created Successfully!</AlertTitle>
          <AlertDescription className="flex flex-col gap-2">
            <p>
              Your new batch has been created with ID: <span className="font-mono font-bold">#{createdBatchId}</span>
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={copyBatchId} className={cn(web3ButtonStyles("secondary"))}>
                {copied ? "Copied!" : "Copy Batch ID"}
                {copied ? <Check className="ml-2 h-4 w-4" /> : <Copy className="ml-2 h-4 w-4" />}
              </Button>
              <Button
                size="sm"
                onClick={() => router.push(`/mint-batch?batchId=${createdBatchId}`)}
                className={cn(web3ButtonStyles("primary"))}
              >
                Verify & Mint This Batch
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Batch Information</CardTitle>
            <CardDescription>Enter the details for the new coffee batch</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Batch Name</Label>
                <Input
                  id="name"
                  placeholder="e.g. Sidama, Ethiopia"
                  defaultValue={isReplacingBatch && replaceBatchDetails ? replaceBatchDetails.name : ""}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <Input id="origin" placeholder="e.g. Sidama, Ethiopia" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="farmer">Farmer/Cooperative</Label>
                <Input id="farmer" placeholder="e.g. Abebe Bekele Cooperative" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="altitude">Altitude</Label>
                <Input id="altitude" placeholder="e.g. 1,900-2,200 meters" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="process">Process</Label>
                <Input id="process" placeholder="e.g. Washed" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="roastProfile">Roast Profile</Label>
                <Input id="roastProfile" placeholder="e.g. Medium" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Production Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !productionDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {productionDate ? format(productionDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={productionDate} onSelect={setProductionDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label>Expiry Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !expiryDate && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {expiryDate ? format(expiryDate, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={expiryDate} onSelect={setExpiryDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="certifications">Certifications</Label>
                <Input id="certifications" placeholder="e.g. Organic, Fair Trade, Rainforest Alliance" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cuppingNotes">Cupping Notes</Label>
                <Input id="cuppingNotes" placeholder="e.g. Blueberry, Chocolate, Citrus" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Detailed description of the coffee batch" rows={4} />
              </div>

              <CardFooter className="px-0 pt-4">
                <Button
                  type="submit"
                  className={cn("w-full", web3ButtonStyles("primary"))}
                  disabled={isUploading || createdBatchId !== null}
                >
                  {isUploading ? (
                    <>
                      <Upload className="mr-2 h-4 w-4 animate-spin" />
                      Uploading to IPFS...
                    </>
                  ) : createdBatchId ? (
                    "Batch Created"
                  ) : (
                    "Create Batch"
                  )}
                </Button>
              </CardFooter>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-6">
          {/* New: Batch Size Recommendation Card */}
          <Card>
            <CardHeader>
              <CardTitle>Batch Size Recommendation</CardTitle>
              <CardDescription>Specify the size of the batch based on your needs</CardDescription>
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
                      max={maximumBatchSize}
                      required
                    />
                    <span className="flex items-center text-sm font-medium">kg</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Specify the size of the batch you need based on your distribution requirements.
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
                    <span className="font-medium">{maximumBatchSize} kg</span>
                  </div>

                  <Slider
                    value={[Number.parseInt(batchSize) || minimumBatchSize]}
                    min={minimumBatchSize}
                    max={maximumBatchSize}
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
              <CardTitle>Batch Image & Metadata</CardTitle>
              <CardDescription>Upload an image and additional metadata for the batch</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground mb-1">Drag and drop an image, or click to browse</p>
                <p className="text-xs text-muted-foreground">PNG, JPG or WEBP, max 5MB</p>
                <Button variant="outline" className={cn("mt-4", web3ButtonStyles("secondary"))}>
                  Upload Image
                </Button>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalMetadata">Additional Metadata</Label>
                <Textarea
                  id="additionalMetadata"
                  placeholder="Enter any additional metadata in JSON format"
                  rows={10}
                  defaultValue={`{
  "name": "Ethiopian Coffee Batch",
  "origin": {
    "country": "Ethiopia",
    "region": "Sidama",
    "farm": "Abebe Bekele Cooperative"
  },
  "altitude": "1,900-2,200 meters",
  "process": "Washed",
  "roastProfile": "Medium",
  "roastDate": "2025-02-20",
  "certifications": ["Organic", "Fair Trade", "Rainforest Alliance"],
  "cupping_notes": ["Blueberry", "Chocolate", "Citrus"],
  "batchSize": ${batchSize}
}`}
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

