"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
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
import { Check, AlertTriangle, Clock, ArrowLeft, Coffee, Leaf } from "lucide-react"
import Link from "next/link"

export default function RequestNewBatchPage() {
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
  const [certifications, setCertifications] = useState<string[]>(["Organic"])

  // Replacement batch info
  const [isReplacingBatch, setIsReplacingBatch] = useState(false)
  const [replaceBatchId, setReplaceBatchId] = useState<string | null>(null)
  const [replaceBatchDetails, setReplaceBatchDetails] = useState<any>(null)

  // Batch size recommendation values
  const minimumBatchSize = 50
  const optimalBatchSize = 150
  const maximumBatchSize = 300

  useEffect(() => {
    // Check if we're replacing a batch - only run this once when the component mounts
    const replaceId = searchParams.get("replaceId")
    if (replaceId && !isReplacingBatch) {
      setIsReplacingBatch(true)
      setReplaceBatchId(replaceId)

      // Fetch batch details (simulated)
      const suggestedSize = searchParams.get("suggestedSize") || "100"
      setBatchSize(suggestedSize)

      // Simulate fetching batch details
      const batchDetails = {
        id: replaceId,
        name: replaceId === "1042" ? "Ethiopia Sidama" : replaceId === "1041" ? "Guatemala Antigua" : "Unknown Batch",
        currentQuantity: replaceId === "1042" ? 15 : replaceId === "1041" ? 8 : 0,
        avgMonthlyUsage: replaceId === "1042" ? 25 : replaceId === "1041" ? 20 : 0,
      }
      setReplaceBatchDetails(batchDetails)

      // Set region based on the batch being replaced
      if (replaceId === "1042") {
        setRegion("Sidama")
      } else if (replaceId === "1041") {
        setOrigin("Guatemala")
        setRegion("Antigua")
      }
    }

    // Check if we're coming from an inventory alert - only show toast once
    const source = searchParams.get("source")
    if (source === "inventory_alert") {
      toast({
        title: "Inventory Alert",
        description: "Creating a new batch request based on low inventory or expiring batches.",
      })
    }
    // Only run this effect once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Memoize the toggleCertification function to prevent unnecessary re-renders
  const toggleCertification = useCallback((cert: string) => {
    setCertifications((prev) => (prev.includes(cert) ? prev.filter((c) => c !== cert) : [...prev, cert]))
  }, [])

  // Memoize the calculateEfficiency function
  const calculateEfficiency = useCallback(
    (size: number) => {
      // Simple efficiency calculation - higher for sizes closer to optimal
      if (size < minimumBatchSize) return 60
      if (size > maximumBatchSize) return 70

      // Peak efficiency at optimal size
      const distance = Math.abs(size - optimalBatchSize)
      const maxDistance = Math.max(optimalBatchSize - minimumBatchSize, maximumBatchSize - optimalBatchSize)
      return 100 - Math.floor((distance / maxDistance) * 30)
    },
    [minimumBatchSize, optimalBatchSize, maximumBatchSize],
  )

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
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">
          {isReplacingBatch ? `Request Replacement Batch for #${replaceBatchId}` : "Request New Batch"}
        </h1>
      </div>

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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <div>
                    <p className="text-sm text-muted-foreground">Certifications:</p>
                    <p className="font-medium">{certifications.join(", ")}</p>
                  </div>
                </div>
              </div>

              {notes && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Additional Notes</h3>
                  <p className="whitespace-pre-line">{notes}</p>
                </div>
              )}

              <div className="flex flex-wrap justify-end gap-2">
                <Button variant="outline" asChild>
                  <Link href="/dashboard">View Dashboard</Link>
                </Button>
                <Button asChild>
                  <Link href="/inventory">View Inventory</Link>
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
                  <Select value={origin} onValueChange={setOrigin}>
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
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="process">Process *</Label>
                  <Select value={process} onValueChange={setProcess}>
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
                  <Select value={roastProfile} onValueChange={setRoastProfile}>
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
                  <Label>Certifications</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant={certifications.includes("Organic") ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCertification("Organic")}
                      className="justify-start"
                    >
                      <Leaf className="mr-2 h-4 w-4" />
                      Organic
                    </Button>
                    <Button
                      type="button"
                      variant={certifications.includes("Fair Trade") ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCertification("Fair Trade")}
                      className="justify-start"
                    >
                      <Leaf className="mr-2 h-4 w-4" />
                      Fair Trade
                    </Button>
                    <Button
                      type="button"
                      variant={certifications.includes("Rainforest Alliance") ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCertification("Rainforest Alliance")}
                      className="justify-start"
                    >
                      <Leaf className="mr-2 h-4 w-4" />
                      Rainforest Alliance
                    </Button>
                    <Button
                      type="button"
                      variant={certifications.includes("Direct Trade") ? "default" : "outline"}
                      size="sm"
                      onClick={() => toggleCertification("Direct Trade")}
                      className="justify-start"
                    >
                      <Leaf className="mr-2 h-4 w-4" />
                      Direct Trade
                    </Button>
                  </div>
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
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
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
                        type="button"
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
                <CardTitle>Coffee Origin Information</CardTitle>
                <CardDescription>Details about your selected coffee origin</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {origin === "Ethiopia" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Coffee className="h-5 w-5 text-amber-600" />
                      <h3 className="font-medium">Ethiopian Coffee</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Ethiopian coffee is known for its bright, fruity flavors with floral notes. The birthplace of
                      coffee, Ethiopia produces some of the world's most distinctive and prized coffees.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Key Regions</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>
                          • <strong>Sidama:</strong> Berry-forward with citrus notes
                        </li>
                        <li>
                          • <strong>Yirgacheffe:</strong> Floral, tea-like with citrus
                        </li>
                        <li>
                          • <strong>Guji:</strong> Bright acidity with stone fruit notes
                        </li>
                        <li>
                          • <strong>Limu:</strong> Balanced with wine and spice notes
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {origin === "Guatemala" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Coffee className="h-5 w-5 text-amber-600" />
                      <h3 className="font-medium">Guatemalan Coffee</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Guatemalan coffee is celebrated for its complex flavor profile with chocolate notes, balanced
                      acidity, and full body. The diverse microclimates create distinct regional characteristics.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Key Regions</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>
                          • <strong>Antigua:</strong> Chocolate, spice with balanced acidity
                        </li>
                        <li>
                          • <strong>Huehuetenango:</strong> Bright, fruity with wine notes
                        </li>
                        <li>
                          • <strong>Atitlán:</strong> Full-bodied with chocolate and caramel
                        </li>
                        <li>
                          • <strong>Cobán:</strong> Smoky, spicy with medium body
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {origin === "Colombia" && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Coffee className="h-5 w-5 text-amber-600" />
                      <h3 className="font-medium">Colombian Coffee</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Colombian coffee is known for its rich, balanced flavor with caramel sweetness and medium acidity.
                      Colombia's diverse growing regions produce a wide range of flavor profiles.
                    </p>
                    <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-md">
                      <h4 className="text-sm font-medium mb-1">Key Regions</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>
                          • <strong>Huila:</strong> Sweet with fruit notes and juicy body
                        </li>
                        <li>
                          • <strong>Nariño:</strong> Bright acidity with citrus notes
                        </li>
                        <li>
                          • <strong>Cauca:</strong> Balanced with chocolate and caramel
                        </li>
                        <li>
                          • <strong>Tolima:</strong> Sweet with notes of tropical fruit
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {origin !== "Ethiopia" && origin !== "Guatemala" && origin !== "Colombia" && (
                  <div className="flex flex-col items-center justify-center py-6">
                    <Coffee className="h-12 w-12 text-muted-foreground opacity-20 mb-3" />
                    <p className="text-sm text-muted-foreground">Select an origin to see detailed information</p>
                  </div>
                )}

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

