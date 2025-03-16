"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { BarChart3, AlertTriangle, Clock, Package, Coffee } from "lucide-react"
import Link from "next/link"
import { Overview } from "@/components/overview"

// Dummy data for distributor inventory
const inventoryData = {
  batches: [
    {
      id: 1045,
      name: "Rwanda Nyungwe",
      currentQuantity: 100,
      expiryDate: "2026-02-15",
      daysUntilExpiry: 360,
      avgMonthlyUsage: 10,
      status: "active",
    },
    {
      id: 1044,
      name: "Costa Rica Tarrazu",
      currentQuantity: 75,
      expiryDate: "2026-02-10",
      daysUntilExpiry: 355,
      avgMonthlyUsage: 8,
      status: "active",
    },
    {
      id: 1043,
      name: "Ethiopia Yirgacheffe",
      currentQuantity: 120,
      expiryDate: "2026-02-05",
      daysUntilExpiry: 350,
      avgMonthlyUsage: 12,
      status: "active",
    },
    {
      id: 1042,
      name: "Ethiopia Sidama",
      currentQuantity: 15,
      expiryDate: "2025-03-20",
      daysUntilExpiry: 30,
      avgMonthlyUsage: 25,
      status: "low",
    },
    {
      id: 1041,
      name: "Guatemala Antigua",
      currentQuantity: 8,
      expiryDate: "2026-01-15",
      daysUntilExpiry: 330,
      avgMonthlyUsage: 20,
      status: "low",
    },
    {
      id: 1039,
      name: "Colombia Huila",
      currentQuantity: 45,
      expiryDate: "2025-03-25",
      daysUntilExpiry: 35,
      avgMonthlyUsage: 15,
      status: "expiring_soon",
    },
  ],
  requests: [
    {
      id: 101,
      batchName: "Ethiopia Sidama",
      requestDate: "2025-02-18",
      quantity: 75,
      status: "pending",
    },
    {
      id: 102,
      batchName: "Kenya AA",
      requestDate: "2025-02-15",
      quantity: 90,
      status: "approved",
    },
    {
      id: 103,
      batchName: "Colombia Huila",
      requestDate: "2025-02-10",
      quantity: 60,
      status: "completed",
    },
  ],
}

export default function DistributorInventoryPage() {
  const { toast } = useToast()
  const [isRequesting, setIsRequesting] = useState(false)

  const handleRequestBatch = (batchId: number, batchName: string) => {
    setIsRequesting(true)
    const timer = setTimeout(() => {
      setIsRequesting(false)
      toast({
        title: "Batch Request Initiated",
        description: `Your request for a new batch of ${batchName} has been initiated.`,
      })
    }, 1500)

    // Return cleanup function to prevent memory leaks
    return () => clearTimeout(timer)
  }

  // Filter batches by different criteria
  const lowInventoryBatches = inventoryData.batches.filter((batch) => batch.status === "low")
  const expiringBatches = inventoryData.batches.filter((batch) => batch.status === "expiring_soon")

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Distributor Inventory</h1>
        <Button asChild>
          <Link href="/distributor/request-batch">Request New Batch</Link>
        </Button>
      </div>

      {/* Actionable alert for low inventory or expiring batches */}
      {(lowInventoryBatches.length > 0 || expiringBatches.length > 0) && (
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="flex items-center gap-4 p-6">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div className="flex-1">
              <h3 className="font-medium mb-1">Inventory Alert</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {lowInventoryBatches.length > 0 &&
                  `${lowInventoryBatches.length} batches are running low on inventory. `}
                {expiringBatches.length > 0 && `${expiringBatches.length} batches are expiring soon. `}
                Consider requesting new batches to maintain inventory levels.
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <Link href="/distributor/request-batch?source=inventory_alert">Request New Batch</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Inventory</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventoryData.batches.reduce((sum, batch) => sum + batch.currentQuantity, 0)} kg
            </div>
            <p className="text-xs text-muted-foreground">Across {inventoryData.batches.length} active batches</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Inventory</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowInventoryBatches.length}</div>
            <p className="text-xs text-muted-foreground">Batches with low inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiringBatches.length}</div>
            <p className="text-xs text-muted-foreground">Batches expiring within 60 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventoryData.requests.filter((req) => req.status === "pending").length}
            </div>
            <p className="text-xs text-muted-foreground">Batch requests awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Overview</CardTitle>
          <CardDescription>Coffee inventory levels over time</CardDescription>
        </CardHeader>
        <CardContent className="pl-2">
          <Overview />
        </CardContent>
      </Card>

      <Tabs defaultValue="inventory">
        <TabsList>
          <TabsTrigger value="inventory">Current Inventory</TabsTrigger>
          <TabsTrigger value="requests">Batch Requests</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4 mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Current Quantity</TableHead>
                <TableHead>Monthly Usage</TableHead>
                <TableHead>Expiry</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.batches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-medium">#{batch.id}</TableCell>
                  <TableCell>
                    <Link href={`/batches/${batch.id}`} className="hover:underline">
                      {batch.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {batch.currentQuantity} kg
                    {batch.status === "low" && (
                      <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Low
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{batch.avgMonthlyUsage} kg/month</TableCell>
                  <TableCell>
                    {batch.status === "expiring_soon" ? (
                      <span className="text-red-600">{batch.daysUntilExpiry} days</span>
                    ) : (
                      <span>{batch.daysUntilExpiry} days</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {batch.status === "active" ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Active
                      </Badge>
                    ) : batch.status === "low" ? (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Low Inventory
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                        Expiring Soon
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRequestBatch(batch.id, batch.name)}
                        disabled={isRequesting}
                      >
                        {isRequesting ? "Requesting..." : "Request More"}
                      </Button>
                      {(batch.status === "low" || batch.status === "expiring_soon") && (
                        <Button size="sm" asChild>
                          <Link
                            href={`/distributor/request-batch?replaceId=${batch.id}&suggestedSize=${batch.avgMonthlyUsage * 3}`}
                          >
                            Replace
                          </Link>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="requests" className="space-y-4 mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Batch Name</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Request Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">#{request.id}</TableCell>
                  <TableCell>{request.batchName}</TableCell>
                  <TableCell>{request.quantity} kg</TableCell>
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
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch Request Recommendations</CardTitle>
              <CardDescription>Based on current inventory levels and usage patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {lowInventoryBatches.length > 0 || expiringBatches.length > 0 ? (
                  <>
                    <p className="text-sm">
                      Based on your current inventory levels and usage patterns, we recommend requesting new batches for
                      the following:
                    </p>

                    <div className="space-y-4">
                      {lowInventoryBatches.map((batch) => {
                        const monthsRemaining = batch.currentQuantity / batch.avgMonthlyUsage
                        const recommendedSize = batch.avgMonthlyUsage * 3

                        return (
                          <Card key={batch.id} className="bg-slate-50 dark:bg-slate-800">
                            <CardHeader className="pb-2">
                              <div className="flex justify-between">
                                <CardTitle className="text-base">
                                  #{batch.id} - {batch.name}
                                </CardTitle>
                                <Badge variant={monthsRemaining < 1 ? "destructive" : "outline"}>
                                  {monthsRemaining.toFixed(1)} months remaining
                                </Badge>
                              </div>
                            </CardHeader>
                            <CardContent>
                              <div className="space-y-4">
                                <div className="grid grid-cols-3 gap-4">
                                  <div>
                                    <p className="text-sm font-medium">Current Inventory</p>
                                    <p className="text-sm">{batch.currentQuantity} kg</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Monthly Usage</p>
                                    <p className="text-sm">{batch.avgMonthlyUsage} kg/month</p>
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium">Recommended Size</p>
                                    <p className="text-sm">{recommendedSize} kg (3 months)</p>
                                  </div>
                                </div>

                                <div className="flex justify-end">
                                  <Button asChild>
                                    <Link
                                      href={`/distributor/request-batch?replaceId=${batch.id}&suggestedSize=${recommendedSize}`}
                                    >
                                      Request Replacement Batch
                                    </Link>
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        )
                      })}

                      {expiringBatches.map((batch) => (
                        <Card key={batch.id} className="bg-slate-50 dark:bg-slate-800">
                          <CardHeader className="pb-2">
                            <div className="flex justify-between">
                              <CardTitle className="text-base">
                                #{batch.id} - {batch.name}
                              </CardTitle>
                              <Badge variant="destructive">Expires in {batch.daysUntilExpiry} days</Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              <div className="grid grid-cols-3 gap-4">
                                <div>
                                  <p className="text-sm font-medium">Current Inventory</p>
                                  <p className="text-sm">{batch.currentQuantity} kg</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Monthly Usage</p>
                                  <p className="text-sm">{batch.avgMonthlyUsage} kg/month</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Recommended Size</p>
                                  <p className="text-sm">{batch.avgMonthlyUsage * 3} kg (3 months)</p>
                                </div>
                              </div>

                              <div className="flex justify-end">
                                <Button asChild>
                                  <Link
                                    href={`/distributor/request-batch?replaceId=${batch.id}&suggestedSize=${
                                      batch.avgMonthlyUsage * 3
                                    }`}
                                  >
                                    Request Replacement Batch
                                  </Link>
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <Coffee className="h-12 w-12 text-green-500 mb-4" />
                    <p className="text-lg font-medium">No Batch Recommendations</p>
                    <p className="text-sm text-muted-foreground">All batches have sufficient inventory levels.</p>
                  </div>
                )}

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Batch Request Guidelines</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Request new batches when inventory falls below 2 months of usage</li>
                    <li>Optimal batch size is typically 3-6 months of average usage</li>
                    <li>Consider seasonal variations in demand when determining batch size</li>
                    <li>For batches approaching expiry, request replacement batches 1-2 months before expiry</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

