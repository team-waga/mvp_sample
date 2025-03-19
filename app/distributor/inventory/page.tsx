"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { BarChart3, AlertTriangle, Search, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cn, web3ButtonStyles } from "@/lib/utils"

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
    lastUpdated: "2025-02-15",
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
    lastUpdated: "2025-02-10",
  },
  {
    id: 1044,
    name: "Costa Rica Tarrazu",
    currentQuantity: 75,
    initialQuantity: 75,
    expiryDate: "2026-02-10",
    daysUntilExpiry: 355,
    avgMonthlyUsage: 8,
    status: "good",
    lastUpdated: "2025-02-15",
  },
  {
    id: 1045,
    name: "Rwanda Nyungwe",
    currentQuantity: 100,
    initialQuantity: 100,
    expiryDate: "2026-02-15",
    daysUntilExpiry: 360,
    avgMonthlyUsage: 10,
    status: "good",
    lastUpdated: "2025-02-20",
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
    lastUpdated: "2025-01-20",
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
    lastUpdated: "2025-01-10",
  },
]

export default function DistributorInventoryPage() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  // Filter inventory items based on search query
  const filteredItems = inventoryItems.filter(
    (item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.id.toString().includes(searchQuery),
  )

  // Count items by status
  const lowInventoryItems = inventoryItems.filter((item) => item.status === "low")
  const expiringItems = inventoryItems.filter((item) => item.status === "expiring")
  const goodItems = inventoryItems.filter((item) => item.status === "good")

  const handleUpdateInventory = (itemId: number) => {
    // Prevent multiple clicks
    if (isUpdating) return

    setIsUpdating(true)

    // Simulate inventory update
    setTimeout(() => {
      setIsUpdating(false)

      toast({
        title: "Inventory Updated",
        description: `Inventory for Batch #${itemId} has been updated.`,
      })
    }, 1500)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/distributor/dashboard">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Distributor Inventory</h1>
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
              {inventoryItems.reduce((sum, item) => sum + item.currentQuantity, 0)} kg
            </div>
            <p className="text-xs text-muted-foreground">Across {inventoryItems.length} active batches</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Inventory</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{lowInventoryItems.length}</div>
            <p className="text-xs text-muted-foreground">Batches with low inventory</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{expiringItems.length}</div>
            <p className="text-xs text-muted-foreground">Batches expiring within 60 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Healthy Inventory</CardTitle>
            <BarChart3 className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{goodItems.length}</div>
            <p className="text-xs text-muted-foreground">Batches with good inventory levels</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory Management</CardTitle>
          <CardDescription>Manage your coffee inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search batches..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button asChild className={cn(web3ButtonStyles("primary"))}>
              <Link href="/distributor/request-batch">Request New Batch</Link>
            </Button>
          </div>

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
              {filteredItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">#{item.id}</TableCell>
                  <TableCell>
                    <Link href={`/batches/${item.id}`} className="hover:underline">
                      {item.name}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {item.currentQuantity} kg
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-1.5 mt-1">
                      <div
                        className={`h-1.5 rounded-full ${
                          item.status === "low"
                            ? "bg-yellow-500"
                            : item.status === "expiring"
                              ? "bg-orange-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${Math.min(100, (item.currentQuantity / item.initialQuantity) * 100)}%` }}
                      ></div>
                    </div>
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateInventory(item.id)}
                        disabled={isUpdating}
                      >
                        {isUpdating ? "Updating..." : "Update"}
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

      <Card>
        <CardHeader>
          <CardTitle>Inventory Recommendations</CardTitle>
          <CardDescription>Based on current inventory levels and usage patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {lowInventoryItems.length > 0 || expiringItems.length > 0 ? (
              <>
                <p className="text-sm">
                  Based on current inventory levels and usage patterns, we recommend requesting new batches for the
                  following:
                </p>

                <div className="space-y-4">
                  {lowInventoryItems.map((item) => {
                    const monthsRemaining = item.currentQuantity / item.avgMonthlyUsage
                    const recommendedSize = item.avgMonthlyUsage * 3

                    return (
                      <Card key={item.id} className="bg-slate-50 dark:bg-slate-800">
                        <CardHeader className="pb-2">
                          <div className="flex justify-between">
                            <CardTitle className="text-base">
                              #{item.id} - {item.name}
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
                                <p className="text-sm">{item.currentQuantity} kg</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Monthly Usage</p>
                                <p className="text-sm">{item.avgMonthlyUsage} kg/month</p>
                              </div>
                              <div>
                                <p className="text-sm font-medium">Recommended Size</p>
                                <p className="text-sm">{recommendedSize} kg (3 months)</p>
                              </div>
                            </div>

                            <div className="flex justify-end">
                              <Button asChild className={cn(web3ButtonStyles("primary"))}>
                                <Link
                                  href={`/distributor/request-batch?replaceId=${item.id}&suggestedSize=${recommendedSize}`}
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

                  {expiringItems.map((item) => (
                    <Card key={item.id} className="bg-slate-50 dark:bg-slate-800">
                      <CardHeader className="pb-2">
                        <div className="flex justify-between">
                          <CardTitle className="text-base">
                            #{item.id} - {item.name}
                          </CardTitle>
                          <Badge variant="outline" className="bg-orange-100 text-orange-800">
                            Expires in {item.daysUntilExpiry} days
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-3 gap-4">
                            <div>
                              <p className="text-sm font-medium">Current Inventory</p>
                              <p className="text-sm">{item.currentQuantity} kg</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Monthly Usage</p>
                              <p className="text-sm">{item.avgMonthlyUsage} kg/month</p>
                            </div>
                            <div>
                              <p className="text-sm font-medium">Recommended Size</p>
                              <p className="text-sm">{item.avgMonthlyUsage * 3} kg (3 months)</p>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <Button asChild className={cn(web3ButtonStyles("primary"))}>
                              <Link
                                href={`/distributor/request-batch?replaceId=${item.id}&suggestedSize=${item.avgMonthlyUsage * 3}`}
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
                <BarChart3 className="h-12 w-12 text-green-500 mb-4" />
                <p className="text-lg font-medium">No Inventory Recommendations</p>
                <p className="text-sm text-muted-foreground">All batches have sufficient inventory levels.</p>
              </div>
            )}

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
              <h3 className="font-medium mb-2">Inventory Management Guidelines</h3>
              <ul className="space-y-2 text-sm">
                <li>Request new batches when inventory falls below 2 months of usage</li>
                <li>Optimal batch size is typically 3-6 months of average usage</li>
                <li>Consider seasonal variations in demand when determining batch size</li>
                <li>For batches approaching expiry, create replacement batches 1-2 months before expiry</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

