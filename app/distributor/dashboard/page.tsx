"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, CheckCircle2, AlertTriangle, BarChart3, ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"
import { MarketplaceItemCard } from "@/components/marketplace-item-card"
import { getFeaturedItems } from "@/lib/marketplace-data"
import { cn, web3ButtonStyles } from "@/lib/utils"

// Sample data for batch requests
const batchRequests = [
  {
    id: 1,
    origin: "Ethiopia",
    region: "Sidama",
    process: "Washed",
    roastProfile: "Medium",
    quantity: 100,
    requestDate: "2025-02-20",
    status: "pending",
    urgency: "normal",
  },
  {
    id: 2,
    origin: "Guatemala",
    region: "Antigua",
    process: "Natural",
    roastProfile: "Medium-Dark",
    quantity: 150,
    requestDate: "2025-02-15",
    status: "approved",
    urgency: "urgent",
  },
  {
    id: 3,
    origin: "Colombia",
    region: "Huila",
    process: "Washed",
    roastProfile: "Medium",
    quantity: 75,
    requestDate: "2025-02-10",
    status: "completed",
    urgency: "normal",
  },
  {
    id: 4,
    origin: "Ethiopia",
    region: "Yirgacheffe",
    process: "Washed",
    roastProfile: "Light",
    quantity: 120,
    requestDate: "2025-02-05",
    status: "rejected",
    urgency: "low",
  },
]

// Sample data for inventory
const inventoryItems = [
  {
    id: 1042,
    name: "Ethiopia Sidama",
    currentQuantity: 15,
    initialQuantity: 90,
    expiryDate: "2025-03-20",
    daysUntilExpiry: 30,
    avgMonthlyUsage: 25,
    status: "low",
  },
  {
    id: 1043,
    name: "Ethiopia Yirgacheffe",
    currentQuantity: 120,
    initialQuantity: 120,
    expiryDate: "2026-02-05",
    daysUntilExpiry: 350,
    avgMonthlyUsage: 12,
    status: "good",
  },
  {
    id: 1041,
    name: "Guatemala Antigua",
    currentQuantity: 8,
    initialQuantity: 60,
    expiryDate: "2026-01-15",
    daysUntilExpiry: 330,
    avgMonthlyUsage: 20,
    status: "low",
  },
  {
    id: 1039,
    name: "Colombia Huila",
    currentQuantity: 45,
    initialQuantity: 45,
    expiryDate: "2025-03-25",
    daysUntilExpiry: 35,
    avgMonthlyUsage: 15,
    status: "expiring",
  },
]

export default function DistributorDashboardPage() {
  // Filter inventory items by status
  const lowInventoryItems = inventoryItems.filter((item) => item.status === "low")
  const expiringItems = inventoryItems.filter((item) => item.status === "expiring")

  // Count requests by status
  const pendingRequests = batchRequests.filter((req) => req.status === "pending").length
  const approvedRequests = batchRequests.filter((req) => req.status === "approved").length
  const completedRequests = batchRequests.filter((req) => req.status === "completed").length

  // Get featured marketplace items
  const featuredItems = getFeaturedItems(2)

  useEffect(() => {
    // Any state updates that need to happen after render should go here
  }, [])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Distributor Dashboard</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild className={cn(web3ButtonStyles("secondary"))}>
            <Link href="/marketplace">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Browse Marketplace
            </Link>
          </Button>
          <Button asChild className={cn(web3ButtonStyles("primary"))}>
            <Link href="/distributor/request-batch">Request New Batch</Link>
          </Button>
        </div>
      </div>

      {(lowInventoryItems.length > 0 || expiringItems.length > 0) && (
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="flex items-center gap-4 p-6">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div className="flex-1">
              <h3 className="font-medium mb-1">Inventory Alert</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {lowInventoryItems.length > 0 && `${lowInventoryItems.length} batches are running low on inventory. `}
                {expiringItems.length > 0 && `${expiringItems.length} batches are expiring soon. `}
                Consider requesting new batches to maintain inventory levels.
              </p>
              <div className="flex gap-3">
                <Button asChild className={cn(web3ButtonStyles("primary"))}>
                  <Link href="/distributor/request-batch?source=inventory_alert">Request New Batch</Link>
                </Button>
                <Button variant="outline" asChild className={cn(web3ButtonStyles("secondary"))}>
                  <Link href="/distributor/inventory">View Inventory</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {featuredItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Featured Marketplace Batches</CardTitle>
            <CardDescription>Premium coffee batches available for immediate request</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredItems.map((item) => (
                <MarketplaceItemCard key={item.id} item={item} featured={true} />
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" asChild className={cn(web3ButtonStyles("secondary"))}>
                <Link href="/marketplace">View All Marketplace Batches</Link>
              </Button>
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
              {inventoryItems.reduce((sum, item) => sum + item.currentQuantity, 0)} kg
            </div>
            <p className="text-xs text-muted-foreground">Across {inventoryItems.length} active batches</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved Requests</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedRequests}</div>
            <p className="text-xs text-muted-foreground">In production</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Inventory</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowInventoryItems.length}</div>
            <p className="text-xs text-muted-foreground">Batches with low inventory</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="requests">
        <TabsList>
          <TabsTrigger value="requests">Batch Requests</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Overview</TabsTrigger>
        </TabsList>

        <TabsContent value="requests" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch Requests</CardTitle>
              <CardDescription>Track your batch requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Origin</TableHead>
                    <TableHead>Region</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Request Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {batchRequests.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">#{request.id}</TableCell>
                      <TableCell>{request.origin}</TableCell>
                      <TableCell>{request.region}</TableCell>
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
                        {request.status === "rejected" && (
                          <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                            Rejected
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/distributor/request/${request.id}`}>View</Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Overview</CardTitle>
              <CardDescription>Current inventory status</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Batch ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Current Quantity</TableHead>
                    <TableHead>Monthly Usage</TableHead>
                    <TableHead>Expiry Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventoryItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">#{item.id}</TableCell>
                      <TableCell>
                        <Link href={`/batches/${item.id}`} className="hover:underline">
                          {item.name}
                        </Link>
                      </TableCell>
                      <TableCell>
                        {item.currentQuantity} kg
                        {item.status === "low" && (
                          <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            Low
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{item.avgMonthlyUsage} kg/month</TableCell>
                      <TableCell>
                        {item.status === "expiring" ? (
                          <span className="text-red-600">
                            {item.expiryDate} ({item.daysUntilExpiry} days)
                          </span>
                        ) : (
                          <span>{item.expiryDate}</span>
                        )}
                      </TableCell>
                      <TableCell>
                        {item.status === "good" && (
                          <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                            Good
                          </Badge>
                        )}
                        {item.status === "low" && (
                          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            Low
                          </Badge>
                        )}
                        {item.status === "expiring" && (
                          <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                            Expiring Soon
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/batches/${item.id}`}>View</Link>
                          </Button>
                          {(item.status === "low" || item.status === "expiring") && (
                            <Button size="sm" asChild className={cn(web3ButtonStyles("primary"))}>
                              <Link
                                href={`/distributor/request-batch?replaceId=${item.id}&suggestedSize=${item.avgMonthlyUsage * 3}`}
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

