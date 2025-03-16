"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Coffee, ArrowLeft, Check, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

export default function RequestBatchPage() {
  const { toast } = useToast()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [requestId, setRequestId] = useState<number | null>(null)
  const [batchSize, setBatchSize] = useState("100")
  const [origin, setOrigin] = useState("ethiopia")
  const [region, setRegion] = useState("")
  const [process, setProcess] = useState("washed")
  const [roastProfile, setRoastProfile] = useState("medium")
  const [urgency, setUrgency] = useState("normal")
  const [notes, setNotes] = useState("")

  // Batch size recommendation values
  const minimumBatchSize = 50
  const optimalBatchSize = 150
  const maximumBatchSize = 300

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

    // Validate form data
    if (!origin || !region || !process || !roastProfile) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Simulate submission process
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)

      // Generate a random request ID between 1000 and 9999
      const newRequestId = Math.floor(Math.random() * 9000) + 1000
      setRequestId(newRequestId)
      setSubmitted(true)

      toast({
        title: "Batch Request Submitted",
        description: `Your batch request #${newRequestId} has been submitted successfully.`,
      })
    }, 2000)
  }

  // Pre-calculate this value to avoid recalculations during render
  const efficiency = calculateEfficiency(Number.parseInt(batchSize) || minimumBatchSize)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Request a New Batch</h1>
      </div>

      {submitted && requestId ? (
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
                Your batch request has been submitted successfully. You will receive a notification when your request is
                processed.
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
                    <p className="font-medium">Pending</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Origin:</p>
                    <p className="font-medium">
                      {origin === "ethiopia"
                        ? "Ethiopia"
                        : origin === "guatemala"
                          ? "Guatemala"
                          : origin === "colombia"
                            ? "Colombia"
                            : origin === "costa_rica"
                              ? "Costa Rica"
                              : origin}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Region:</p>
                    <p className="font-medium">{region}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity:</p>
                    <p className="font-medium">{batchSize} kg</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Processing Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Process:</p>
                    <p className="font-medium">
                      {process === "washed"
                        ? "Washed"
                        : process === "natural"
                          ? "Natural"
                          : process === "honey"
                            ? "Honey"
                            : process}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Roast Profile:</p>
                    <p className="font-medium">
                      {roastProfile === "light"
                        ? "Light"
                        : roastProfile === "medium"
                          ? "Medium"
                          : roastProfile === "dark"
                            ? "Dark"
                            : roastProfile}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Urgency:</p>
                    <p className="font-medium">
                      {urgency === "urgent"
                        ? "Urgent"
                        : urgency === "normal"
                          ? "Normal"
                          : urgency === "low"
                            ? "Low"
                            : urgency}
                    </p>
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
                <Button variant="outline" asChild>
                  <Link href="/dashboard">Return to Dashboard</Link>
                </Button>
                <Button asChild>
                  <Link href="/batches">View All Batches</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Batch Information</CardTitle>
                <CardDescription>Specify the details for the batch you want to request</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin *</Label>
                  <Select value={origin} onValueChange={setOrigin} required>
                    <SelectTrigger id="origin">
                      <SelectValue placeholder="Select origin country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethiopia">Ethiopia</SelectItem>
                      <SelectItem value="guatemala">Guatemala</SelectItem>
                      <SelectItem value="colombia">Colombia</SelectItem>
                      <SelectItem value="costa_rica">Costa Rica</SelectItem>
                      <SelectItem value="kenya">Kenya</SelectItem>
                      <SelectItem value="rwanda">Rwanda</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Region *</Label>
                  <Input
                    id="region"
                    placeholder={
                      origin === "ethiopia"
                        ? "e.g. Sidama, Yirgacheffe"
                        : origin === "guatemala"
                          ? "e.g. Antigua, Huehuetenango"
                          : "e.g. Region name"
                    }
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="process">Process *</Label>
                  <Select value={process} onValueChange={setProcess} required>
                    <SelectTrigger id="process">
                      <SelectValue placeholder="Select process method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="washed">Washed</SelectItem>
                      <SelectItem value="natural">Natural</SelectItem>
                      <SelectItem value="honey">Honey</SelectItem>
                      <SelectItem value="anaerobic">Anaerobic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roastProfile">Roast Profile *</Label>
                  <Select value={roastProfile} onValueChange={setRoastProfile} required>
                    <SelectTrigger id="roastProfile">
                      <SelectValue placeholder="Select roast profile" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urgency">Request Urgency *</Label>
                  <Select value={urgency} onValueChange={setUrgency} required>
                    <SelectTrigger id="urgency">
                      <SelectValue placeholder="Select urgency level" />
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
                          <span className="font-medium">Cost efficiency:</span> {efficiency}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Larger batches typically have better economies of scale.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Request Information</CardTitle>
                  <CardDescription>Information about the batch request process</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <AlertTitle>Request Process</AlertTitle>
                    <AlertDescription>
                      <p className="mb-2">
                        Your batch request will be reviewed by our production team. You will receive a notification when
                        your request is processed.
                      </p>
                      <p className="text-sm">
                        Typical processing times: Urgent (1-2 weeks), Normal (2-4 weeks), Low (4+ weeks)
                      </p>
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Coffee className="h-5 w-5 text-green-600" />
                      <h3 className="font-medium">Batch Request Process</h3>
                    </div>
                    <ol className="list-decimal pl-5 space-y-1 text-sm text-muted-foreground">
                      <li>Submit your batch request with detailed specifications</li>
                      <li>Production team reviews and approves the request</li>
                      <li>Batch is created according to your specifications</li>
                      <li>You receive a notification when the batch is ready</li>
                      <li>Batch is available for minting and distribution</li>
                    </ol>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Coffee className="mr-2 h-4 w-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Coffee className="mr-2 h-4 w-4" />
                          Submit Batch Request
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

