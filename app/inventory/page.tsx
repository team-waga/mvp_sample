"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { BarChart3, RefreshCw, AlertTriangle, Clock, CheckCircle2, XCircle } from "lucide-react"
import Link from "next/link"
import { Overview } from "@/components/overview"

// Dummy data for inventory
const inventoryData = {
  batches: [
    {
      id: 1045,
      name: "Rwanda Nyungwe",
      currentQuantity: 100,
      lastAuditDate: "2025-02-20",
      status: "verified",
      expiryDate: "2026-02-15",
      daysUntilExpiry: 360,
      avgMonthlyUsage: 10,
    },
    {
      id: 1044,
      name: "Costa Rica Tarrazu",
      currentQuantity: 75,
      lastAuditDate: "2025-02-15",
      status: "verified",
      expiryDate: "2026-02-10",
      daysUntilExpiry: 355,
      avgMonthlyUsage: 8,
    },
    {
      id: 1043,
      name: "Ethiopia Yirgacheffe",
      currentQuantity: 120,
      lastAuditDate: "2025-02-10",
      status: "verified",
      expiryDate: "2026-02-05",
      daysUntilExpiry: 350,
      avgMonthlyUsage: 12,
    },
    {
      id: 1042,
      name: "Ethiopia Sidama",
      currentQuantity: 15,
      lastAuditDate: "2025-01-25",
      status: "verified",
      expiryDate: "2025-03-20",
      daysUntilExpiry: 30,
      avgMonthlyUsage: 25,
    },
    {
      id: 1041,
      name: "Guatemala Antigua",
      currentQuantity: 8,
      lastAuditDate: "2025-01-20",
      status: "verified",
      expiryDate: "2026-01-15",
      daysUntilExpiry: 330,
      avgMonthlyUsage: 20,
    },
    {
      id: 1039,
      name: "Colombia Huila",
      currentQuantity: 45,
      lastAuditDate: "2025-01-10",
      status: "verified",
      expiryDate: "2025-03-25",
      daysUntilExpiry: 35,
      avgMonthlyUsage: 15,
    },
    {
      id: 1038,
      name: "Kenya AA",
      currentQuantity: 5,
      lastAuditDate: "2024-12-25",
      status: "needs_audit",
      expiryDate: "2025-12-20",
      daysUntilExpiry: 300,
      avgMonthlyUsage: 30,
    },
  ],
  alerts: [
    {
      id: 1,
      type: "expiry",
      batchId: 1042,
      batchName: "Ethiopia Sidama",
      message: "Batch expires in 30 days",
      severity: "high",
    },
    {
      id: 2,
      type: "expiry",
      batchId: 1039,
      batchName: "Colombia Huila",
      message: "Batch expires in 35 days",
      severity: "high",
    },
    {
      id: 3,
      type: "low_inventory",
      batchId: 1038,
      batchName: "Kenya AA",
      message: "Low inventory (5 kg remaining)",
      severity: "medium",
    },
    {
      id: 4,
      type: "low_inventory",
      batchId: 1041,
      batchName: "Guatemala Antigua",
      message: "Low inventory (8 kg remaining)",
      severity: "medium",
    },
    {
      id: 5,
      type: "audit_needed",
      batchId: 1038,
      batchName: "Kenya AA",
      message: "Audit needed (last audit > 60 days ago)",
      severity: "low",
    },
  ],
  auditHistory: [
    {
      id: 1,
      batchId: 1045,
      batchName: "Rwanda Nyungwe",
      date: "2025-02-20",
      expectedQuantity: 100,
      actualQuantity: 100,
      result: "match",
    },
    {
      id: 2,
      batchId: 1044,
      batchName: "Costa Rica Tarrazu",
      date: "2025-02-15",
      expectedQuantity: 75,
      actualQuantity: 75,
      result: "match",
    },
    {
      id: 3,
      batchId: 1043,
      batchName: "Ethiopia Yirgacheffe",
      date: "2025-02-10",
      expectedQuantity: 120,
      actualQuantity: 120,
      result: "match",
    },
    {
      id: 4,
      batchId: 1042,
      batchName: "Ethiopia Sidama",
      date: "2025-01-25",
      expectedQuantity: 20,
      actualQuantity: 15,
      result: "discrepancy",
    },
    {
      id: 5,
      batchId: 1041,
      batchName: "Guatemala Antigua",
      date: "2025-01-20",
      expectedQuantity: 10,
      actualQuantity: 8,
      result: "discrepancy",
    },
  ],
}

export default function InventoryPage() {
  const { toast } = useToast()
  const [isAuditing, setIsAuditing] = useState(false)

  const handleAudit = (batchId: number) => {
    setIsAuditing(true)
    const timer = setTimeout(() => {
      setIsAuditing(false)
      toast({
        title: "Audit requested",
        description: `Inventory audit for Batch #${batchId} has been requested.`,
      })
    }, 2000)

    // Return cleanup function to prevent memory leaks
    return () => clearTimeout(timer)
  }

  // Filter batches by different criteria - do this outside of render to avoid recalculations
  const lowInventoryBatches = inventoryData.batches.filter(
    (batch) => batch.currentQuantity <= 10 || batch.currentQuantity / batch.avgMonthlyUsage < 2,
  )

  const expiringBatches = inventoryData.batches.filter((batch) => batch.daysUntilExpiry <= 60)

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Inventory Management</h1>
        <div className="flex gap-2">
          <Button variant="outline" asChild>
            <Link href="/distributor/inventory">Distributor View</Link>
          </Button>
          <Button>Run Automated Checks</Button>
        </div>
      </div>

      {/* New: Actionable alert for low inventory or expiring batches */}
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
                Distributors should be notified to request new batch creation.
              </p>
              <div className="flex gap-3">
                <Button asChild>
                  <Link href="/distributor/request-batch?source=inventory_alert">Request New Batch</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/distributor/inventory">View Distributor Dashboard</Link>
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
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventoryData.alerts.filter((alert) => alert.type === "expiry").length}
            </div>
            <p className="text-xs text-muted-foreground">Batches expiring within 60 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Inventory</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventoryData.alerts.filter((alert) => alert.type === "low_inventory").length}
            </div>
            <p className="text-xs text-muted-foreground">Batches with low inventory</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Needs Audit</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {inventoryData.batches.filter((batch) => batch.status === "needs_audit").length}
            </div>
            <p className="text-xs text-muted-foreground">Batches requiring inventory audit</p>
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
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="audit-history">Audit History</TabsTrigger>
          <TabsTrigger value="batch-recommendations">Batch Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="inventory" className="space-y-4 mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Current Quantity</TableHead>
                <TableHead>Monthly Usage</TableHead>
                <TableHead>Last Audit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expiry</TableHead>
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
                    {batch.currentQuantity <= 10 && (
                      <Badge variant="outline" className="ml-2 bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Low
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>{batch.avgMonthlyUsage} kg/month</TableCell>
                  <TableCell>{batch.lastAuditDate}</TableCell>
                  <TableCell>
                    {batch.status === "verified" ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Verified
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                        Needs Audit
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {batch.daysUntilExpiry <= 60 ? (
                      <span className="text-red-600">{batch.daysUntilExpiry} days</span>
                    ) : (
                      <span>{batch.daysUntilExpiry} days</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={() => handleAudit(batch.id)} disabled={isAuditing}>
                        {isAuditing ? "Requesting..." : "Audit"}
                      </Button>
                      {(batch.currentQuantity <= 10 || batch.daysUntilExpiry <= 60) && (
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

        <TabsContent value="alerts" className="space-y-4 mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Message</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.alerts.map((alert) => (
                <TableRow key={alert.id}>
                  <TableCell>
                    {alert.type === "expiry" && (
                      <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                        Expiry
                      </Badge>
                    )}
                    {alert.type === "low_inventory" && (
                      <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                        Low Inventory
                      </Badge>
                    )}
                    {alert.type === "audit_needed" && (
                      <Badge variant="outline" className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                        Audit Needed
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <Link href={`/batches/${alert.batchId}`} className="hover:underline">
                      #{alert.batchId} - {alert.batchName}
                    </Link>
                  </TableCell>
                  <TableCell>{alert.message}</TableCell>
                  <TableCell>
                    {alert.severity === "high" && <Badge variant="destructive">High</Badge>}
                    {alert.severity === "medium" && <Badge variant="default">Medium</Badge>}
                    {alert.severity === "low" && <Badge variant="outline">Low</Badge>}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAudit(alert.batchId)}
                        disabled={isAuditing}
                      >
                        Audit
                      </Button>
                      <Button size="sm" asChild>
                        <Link href={`/distributor/request-batch?replaceId=${alert.batchId}`}>Replace</Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="audit-history" className="space-y-4 mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Batch</TableHead>
                <TableHead>Expected</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventoryData.auditHistory.map((audit) => (
                <TableRow key={audit.id}>
                  <TableCell>{audit.date}</TableCell>
                  <TableCell>
                    <Link href={`/batches/${audit.batchId}`} className="hover:underline">
                      #{audit.batchId} - {audit.batchName}
                    </Link>
                  </TableCell>
                  <TableCell>{audit.expectedQuantity} kg</TableCell>
                  <TableCell>{audit.actualQuantity} kg</TableCell>
                  <TableCell>
                    {audit.result === "match" ? (
                      <div className="flex items-center">
                        <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                        <span className="text-green-600">Match</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <XCircle className="h-4 w-4 text-red-500 mr-1" />
                        <span className="text-red-600">Discrepancy</span>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        {/* New: Batch Recommendations Tab */}
        <TabsContent value="batch-recommendations" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Batch Creation Recommendations</CardTitle>
              <CardDescription>Based on current inventory levels and usage patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {lowInventoryBatches.length > 0 ? (
                  <>
                    <p className="text-sm">
                      Based on current inventory levels and usage patterns, we recommend creating new batches for the
                      following:
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
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12">
                    <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
                    <p className="text-lg font-medium">No Batch Recommendations</p>
                    <p className="text-sm text-muted-foreground">All batches have sufficient inventory levels.</p>
                  </div>
                )}

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Batch Creation Guidelines</h3>
                  <ul className="space-y-2 text-sm">
                    <li>Create new batches when inventory falls below 2 months of usage</li>
                    <li>Optimal batch size is typically 3-6 months of average usage</li>
                    <li>Consider seasonal variations in demand when determining batch size</li>
                    <li>For batches approaching expiry, create replacement batches 1-2 months before expiry</li>
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

