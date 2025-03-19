"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Package, ArrowLeft, Check } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import Link from "next/link"
import { cn, web3ButtonStyles } from "@/lib/utils"

export default function NewRedemptionPage() {
  const { toast } = useToast()
  const [tokenId, setTokenId] = useState("")
  const [quantity, setQuantity] = useState("1")
  const [requesterName, setRequesterName] = useState("")
  const [requesterEmail, setRequesterEmail] = useState("")
  const [shippingAddress, setShippingAddress] = useState("")
  const [notes, setNotes] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [requestId, setRequestId] = useState<number | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!tokenId.trim() || !requesterName.trim() || !requesterEmail.trim() || !shippingAddress.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate submission process
    setTimeout(() => {
      setIsSubmitting(false)

      // Generate a random request ID between 100 and 999
      const newRequestId = Math.floor(Math.random() * 900) + 100
      setRequestId(newRequestId)
      setSubmitted(true)

      toast({
        title: "Redemption Request Submitted",
        description: `Your redemption request #${newRequestId} has been submitted successfully.`,
      })
    }, 2000)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/redemption">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">New Redemption Request</h1>
      </div>

      {submitted && requestId ? (
        <Card>
          <CardHeader>
            <CardTitle>Redemption Request Submitted</CardTitle>
            <CardDescription>Your request has been submitted successfully</CardDescription>
          </CardHeader>
          <CardContent>
            <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 mb-6">
              <Check className="h-4 w-4 text-green-600" />
              <AlertTitle>Success!</AlertTitle>
              <AlertDescription>
                Your redemption request has been submitted successfully. You will receive a confirmation email shortly.
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
                    <p className="text-sm text-muted-foreground">Token ID:</p>
                    <p className="font-medium">{tokenId}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Quantity:</p>
                    <p className="font-medium">{quantity} kg</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status:</p>
                    <p className="font-medium">Pending</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Requester Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Name:</p>
                    <p className="font-medium">{requesterName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email:</p>
                    <p className="font-medium">{requesterEmail}</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
                <p className="whitespace-pre-line">{shippingAddress}</p>
              </div>

              {notes && (
                <div>
                  <h3 className="text-lg font-medium mb-2">Additional Notes</h3>
                  <p className="whitespace-pre-line">{notes}</p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button variant="outline" asChild>
                  <Link href="/redemption">View All Requests</Link>
                </Button>
                <Button asChild className={cn(web3ButtonStyles("primary"))}>
                  <Link href={`/redemption/${requestId}`}>View Request Details</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Token Information</CardTitle>
                <CardDescription>Enter the token details you want to redeem</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="tokenId">Token ID *</Label>
                  <Input
                    id="tokenId"
                    placeholder="e.g. 1042-001"
                    value={tokenId}
                    onChange={(e) => setTokenId(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the ID of the token you want to redeem. You can find this in your wallet or token certificate.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity (kg) *</Label>
                  <Input
                    id="quantity"
                    type="number"
                    min="1"
                    max="100"
                    placeholder="e.g. 1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Enter the quantity of coffee you want to redeem in kilograms.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Requester Information</CardTitle>
                <CardDescription>Enter your contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="requesterName">Name *</Label>
                  <Input
                    id="requesterName"
                    placeholder="e.g. John Doe"
                    value={requesterName}
                    onChange={(e) => setRequesterName(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requesterEmail">Email *</Label>
                  <Input
                    id="requesterEmail"
                    type="email"
                    placeholder="e.g. john.doe@example.com"
                    value={requesterEmail}
                    onChange={(e) => setRequesterEmail(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter the address where you want to receive the coffee</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="shippingAddress">Shipping Address *</Label>
                  <Textarea
                    id="shippingAddress"
                    placeholder="e.g. 123 Main St, Apt 4B, New York, NY 10001, USA"
                    rows={4}
                    value={shippingAddress}
                    onChange={(e) => setShippingAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Any special instructions or notes for your redemption request"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-2">
              <Button variant="outline" type="button" asChild>
                <Link href="/redemption">Cancel</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting} className={cn(web3ButtonStyles("primary"))}>
                {isSubmitting ? (
                  <>
                    <Package className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Package className="mr-2 h-4 w-4" />
                    Submit Redemption Request
                  </>
                )}
              </Button>
            </div>
          </div>
        </form>
      )}
    </div>
  )
}

