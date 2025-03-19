"use client"

import { useState, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { useParams, useRouter } from "next/navigation"
import { Package, ArrowLeft, Check, Truck, CheckCircle2, XCircle, QrCode } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn, web3ButtonStyles } from "@/lib/utils"

// Dummy data for redemption requests
const redemptionRequests = [
  {
    id: 1,
    batchId: 1041,
    batchName: "Guatemala Antigua",
    tokenId: "1041-001",
    quantity: 10,
    requestDate: "2025-02-15",
    status: "pending",
    requester: {
      name: "Coffee Shop A",
      email: "info@coffeeshopa.com",
      phone: "+1 (555) 123-4567",
    },
    shipping: {
      address: "123 Main St, Suite 101\nNew York, NY 10001\nUSA",
      method: "Standard Shipping",
      trackingNumber: null,
      estimatedDelivery: null,
    },
    notes: "Please include a copy of the certificate of authenticity.",
    timeline: [
      {
        status: "requested",
        date: "2025-02-15",
        note: "Redemption request submitted",
      },
    ],
  },
  {
    id: 2,
    batchId: 1039,
    batchName: "Colombia Huila",
    tokenId: "1039-002",
    quantity: 5,
    requestDate: "2025-02-10",
    status: "approved",
    requester: {
      name: "Coffee Shop B",
      email: "orders@coffeeshopb.com",
      phone: "+1 (555) 234-5678",
    },
    shipping: {
      address: "456 Oak Ave\nSan Francisco, CA 94102\nUSA",
      method: "Express Shipping",
      trackingNumber: "EX123456789US",
      estimatedDelivery: "2025-02-20",
    },
    notes: "Please package in smaller boxes if possible.",
    timeline: [
      {
        status: "requested",
        date: "2025-02-10",
        note: "Redemption request submitted",
      },
      {
        status: "approved",
        date: "2025-02-12",
        note: "Request approved by admin",
      },
      {
        status: "processing",
        date: "2025-02-14",
        note: "Order is being processed for shipping",
      },
    ],
  },
  {
    id: 3,
    batchId: 1038,
    batchName: "Kenya AA",
    tokenId: "1038-003",
    quantity: 15,
    requestDate: "2025-02-05",
    status: "completed",
    requester: {
      name: "Coffee Shop C",
      email: "hello@coffeeshopc.com",
      phone: "+1 (555) 345-6789",
    },
    shipping: {
      address: "789 Pine St\nChicago, IL 60601\nUSA",
      method: "Express Shipping",
      trackingNumber: "EX987654321US",
      estimatedDelivery: "2025-02-10",
      deliveredDate: "2025-02-09",
    },
    notes: "",
    timeline: [
      {
        status: "requested",
        date: "2025-02-05",
        note: "Redemption request submitted",
      },
      {
        status: "approved",
        date: "2025-02-06",
        note: "Request approved by admin",
      },
      {
        status: "processing",
        date: "2025-02-07",
        note: "Order is being processed for shipping",
      },
      {
        status: "shipped",
        date: "2025-02-08",
        note: "Order has been shipped via Express Shipping",
      },
      {
        status: "delivered",
        date: "2025-02-09",
        note: "Order has been delivered",
      },
      {
        status: "completed",
        date: "2025-02-10",
        note: "Redemption process completed",
      },
    ],
  },
  {
    id: 4,
    batchId: 1042,
    batchName: "Ethiopia Sidama",
    tokenId: "1042-004",
    quantity: 8,
    requestDate: "2025-02-01",
    status: "rejected",
    requester: {
      name: "Coffee Shop D",
      email: "contact@coffeeshopd.com",
      phone: "+1 (555) 456-7890",
    },
    shipping: {
      address: "321 Elm St\nAustin, TX 78701\nUSA",
      method: "Standard Shipping",
      trackingNumber: null,
      estimatedDelivery: null,
    },
    notes: "Need delivery before February 15th if possible.",
    timeline: [
      {
        status: "requested",
        date: "2025-02-01",
        note: "Redemption request submitted",
      },
      {
        status: "rejected",
        date: "2025-02-03",
        note: "Request rejected due to invalid token",
      },
    ],
  },
]

export default function RedemptionDetailsPage() {
  const { toast } = useToast()
  const params = useParams()
  const router = useRouter()
  const [request, setRequest] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  // Fetch redemption request details
  useEffect(() => {
    setLoading(true)

    const timer = setTimeout(() => {
      if (!params.id) {
        toast({
          title: "Error",
          description: "Invalid request ID",
          variant: "destructive",
        })
        router.push("/redemption")
        return
      }

      const id = Number.parseInt(params.id as string)
      const foundRequest = redemptionRequests.find((req) => req.id === id)

      if (foundRequest) {
        setRequest(foundRequest)
      } else {
        toast({
          title: "Error",
          description: "Redemption request not found",
          variant: "destructive",
        })
        router.push("/redemption")
      }

      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [params.id, router, toast])

  // Handle status update
  const handleUpdateStatus = useCallback(
    (newStatus: string) => {
      if (!request || updating) return

      setUpdating(true)

      // Simulate updating status
      const updateTimer = setTimeout(() => {
        const now = new Date()
        const dateStr = now.toISOString().split("T")[0]

        let note = ""
        const updatedRequest = { ...request }
        updatedRequest.status = newStatus

        switch (newStatus) {
          case "approved":
            note = "Request approved by admin"
            break
          case "processing":
            note = "Order is being processed for shipping"
            break
          case "shipped":
            note = `Order has been shipped via ${request.shipping.method}`
            updatedRequest.shipping.trackingNumber = "EX" + Math.floor(Math.random() * 1000000000) + "US"
            const deliveryDate = new Date(now)
            deliveryDate.setDate(deliveryDate.getDate() + 5)
            updatedRequest.shipping.estimatedDelivery = deliveryDate.toISOString().split("T")[0]
            break
          case "delivered":
            note = "Order has been delivered"
            updatedRequest.shipping.deliveredDate = dateStr
            break
          case "completed":
            note = "Redemption process completed"
            break
          case "rejected":
            note = "Request rejected by admin"
            break
          default:
            note = `Status updated to ${newStatus}`
        }

        updatedRequest.timeline.push({
          status: newStatus,
          date: dateStr,
          note,
        })

        setRequest(updatedRequest)
        setUpdating(false)

        toast({
          title: "Status Updated",
          description: `Redemption request status has been updated to ${newStatus}.`,
        })
      }, 1500)

      return () => clearTimeout(updateTimer)
    },
    [request, updating, toast],
  )

  if (loading) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/redemption">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Redemption Request Details</h1>
        </div>

        <div className="flex items-center justify-center h-64">
          <Package className="h-8 w-8 animate-pulse text-muted-foreground" />
        </div>
      </div>
    )
  }

  if (!request) {
    return (
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/redemption">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Redemption Request Details</h1>
        </div>

        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>Redemption request not found</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/redemption">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Redemption Request #{request.id}</h1>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Badge
            className={
              request.status === "pending"
                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                : request.status === "approved"
                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                  : request.status === "processing"
                    ? "bg-purple-100 text-purple-800 hover:bg-purple-100"
                    : request.status === "shipped"
                      ? "bg-indigo-100 text-indigo-800 hover:bg-indigo-100"
                      : request.status === "delivered"
                        ? "bg-teal-100 text-teal-800 hover:bg-teal-100"
                        : request.status === "completed"
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : "bg-red-100 text-red-800 hover:bg-red-100"
            }
          >
            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
          </Badge>
          <span className="text-sm text-muted-foreground">Requested on {request.requestDate}</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href={`/qr-generator?type=redemption&value=${request.id}`}>
              <QrCode className="mr-2 h-4 w-4" />
              Generate QR Code
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href={`/batches/${request.batchId}`}>View Batch</Link>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Request Details</TabsTrigger>
          <TabsTrigger value="shipping">Shipping & Delivery</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Information</CardTitle>
              <CardDescription>Details about this redemption request</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Batch & Token Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Batch ID:</span>
                      <span className="font-medium">#{request.batchId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Batch Name:</span>
                      <span className="font-medium">{request.batchName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Token ID:</span>
                      <span className="font-medium">{request.tokenId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Quantity:</span>
                      <span className="font-medium">{request.quantity} kg</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Requester Information</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Name:</span>
                      <span className="font-medium">{request.requester.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Email:</span>
                      <span className="font-medium">{request.requester.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Phone:</span>
                      <span className="font-medium">{request.requester.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              {request.notes && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium mb-2">Additional Notes</h3>
                  <p className="text-sm whitespace-pre-line">{request.notes}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {request.status === "pending" && (
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => handleUpdateStatus("rejected")} disabled={updating}>
                <XCircle className="mr-2 h-4 w-4" />
                Reject Request
              </Button>
              <Button
                onClick={() => handleUpdateStatus("approved")}
                disabled={updating}
                className={cn(web3ButtonStyles("primary"))}
              >
                {updating ? (
                  <>
                    <Package className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Approve Request
                  </>
                )}
              </Button>
            </div>
          )}

          {request.status === "approved" && (
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => handleUpdateStatus("processing")}
                disabled={updating}
                className={cn(web3ButtonStyles("primary"))}
              >
                {updating ? (
                  <>
                    <Package className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Package className="mr-2 h-4 w-4" />
                    Start Processing
                  </>
                )}
              </Button>
            </div>
          )}

          {request.status === "processing" && (
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => handleUpdateStatus("shipped")}
                disabled={updating}
                className={cn(web3ButtonStyles("primary"))}
              >
                {updating ? (
                  <>
                    <Package className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Truck className="mr-2 h-4 w-4" />
                    Mark as Shipped
                  </>
                )}
              </Button>
            </div>
          )}

          {request.status === "shipped" && (
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => handleUpdateStatus("delivered")}
                disabled={updating}
                className={cn(web3ButtonStyles("primary"))}
              >
                {updating ? (
                  <>
                    <Package className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-4 w-4" />
                    Mark as Delivered
                  </>
                )}
              </Button>
            </div>
          )}

          {request.status === "delivered" && (
            <div className="flex justify-end gap-2">
              <Button
                onClick={() => handleUpdateStatus("completed")}
                disabled={updating}
                className={cn(web3ButtonStyles("primary"))}
              >
                {updating ? (
                  <>
                    <Package className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Complete Redemption
                  </>
                )}
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="shipping" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Shipping & Delivery Information</CardTitle>
              <CardDescription>Details about shipping and delivery for this redemption request</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Shipping Address</h3>
                  <p className="whitespace-pre-line">{request.shipping.address}</p>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Shipping Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Shipping Method:</span>
                      <span className="font-medium">{request.shipping.method}</span>
                    </div>

                    {request.shipping.trackingNumber && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Tracking Number:</span>
                        <span className="font-medium">{request.shipping.trackingNumber}</span>
                      </div>
                    )}

                    {request.shipping.estimatedDelivery && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Estimated Delivery:</span>
                        <span className="font-medium">{request.shipping.estimatedDelivery}</span>
                      </div>
                    )}

                    {request.shipping.deliveredDate && (
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Delivered On:</span>
                        <span className="font-medium">{request.shipping.deliveredDate}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {request.status === "shipped" && request.shipping.trackingNumber && (
                <div className="mt-6">
                  <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                    <Truck className="h-4 w-4 text-blue-600" />
                    <AlertTitle>Shipment In Transit</AlertTitle>
                    <AlertDescription>
                      <p className="mb-2">
                        This shipment is currently in transit and is expected to be delivered by{" "}
                        {request.shipping.estimatedDelivery}.
                      </p>
                      <p className="text-sm">
                        You can track this shipment using the tracking number: {request.shipping.trackingNumber}
                      </p>
                    </AlertDescription>
                  </Alert>
                </div>
              )}

              {request.status === "delivered" && (
                <div className="mt-6">
                  <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                    <Check className="h-4 w-4 text-green-600" />
                    <AlertTitle>Shipment Delivered</AlertTitle>
                    <AlertDescription>
                      <p>This shipment was delivered on {request.shipping.deliveredDate}.</p>
                    </AlertDescription>
                  </Alert>
                </div>
              )}
            </CardContent>
          </Card>

          {(request.status === "approved" || request.status === "processing") && (
            <Card>
              <CardHeader>
                <CardTitle>Shipping Instructions</CardTitle>
                <CardDescription>Instructions for shipping this order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>Please follow these instructions when preparing this order for shipping:</p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Ensure the coffee is properly packaged to maintain freshness</li>
                    <li>Include a copy of the batch certificate with the shipment</li>
                    <li>Use appropriate packaging to prevent damage during transit</li>
                    <li>Include the redemption request ID on the shipping label</li>
                    <li>Update the tracking information in the system once shipped</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="timeline" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Request Timeline</CardTitle>
              <CardDescription>History of events for this redemption request</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {request.timeline.map((event, index) => (
                  <div key={index} className="relative pl-6">
                    {index < request.timeline.length - 1 && (
                      <div className="absolute left-2 top-2 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700" />
                    )}
                    <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                      {event.status === "requested" && <Package className="h-2 w-2" />}
                      {event.status === "approved" && <Check className="h-2 w-2" />}
                      {event.status === "processing" && <Package className="h-2 w-2" />}
                      {event.status === "shipped" && <Truck className="h-2 w-2" />}
                      {event.status === "delivered" && <Check className="h-2 w-2" />}
                      {event.status === "completed" && <CheckCircle2 className="h-2 w-2" />}
                      {event.status === "rejected" && <XCircle className="h-2 w-2" />}
                    </div>
                    <div className="mb-4">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{event.status.charAt(0).toUpperCase() + event.status.slice(1)}</h3>
                        <span className="text-sm text-muted-foreground">{event.date}</span>
                      </div>
                      <p className="text-sm mt-1">{event.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

