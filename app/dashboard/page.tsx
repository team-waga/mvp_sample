import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Overview } from "@/components/overview"
import { RecentActivity } from "@/components/recent-activity"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Coffee, Package, QrCode, RefreshCw, ShieldCheck, AlertTriangle } from "lucide-react"

// Dummy data for low inventory and expiring batches
const lowInventoryBatches = [
  { id: 1042, name: "Ethiopia Sidama", currentQuantity: 15, avgMonthlyUsage: 25 },
  { id: 1041, name: "Guatemala Antigua", currentQuantity: 8, avgMonthlyUsage: 20 },
]

const expiringBatches = [
  { id: 1042, name: "Ethiopia Sidama", expiryDate: "2025-03-20", daysUntilExpiry: 30 },
  { id: 1039, name: "Colombia Huila", expiryDate: "2025-03-25", daysUntilExpiry: 35 },
]

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 w-full mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">WAGA Coffee Dashboard</h1>
        <Button asChild size="sm" className="w-full sm:w-auto">
          <Link href="/create-new-batch">Create New Batch</Link>
        </Button>
      </div>

      {/* New: Actionable alerts for distributors */}
      {(lowInventoryBatches.length > 0 || expiringBatches.length > 0) && (
        <Card className="bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800">
          <CardContent className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6">
            <AlertTriangle className="h-8 w-8 text-yellow-500" />
            <div className="flex-1">
              <h3 className="font-medium mb-1">Inventory Alert</h3>
              <p className="text-sm text-muted-foreground mb-3">
                {lowInventoryBatches.length} batches are running low on inventory and {expiringBatches.length} batches
                are expiring soon.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild size="sm" className="w-full sm:w-auto">
                  <Link href="/distributor/request-batch?source=inventory_alert">Request New Batch</Link>
                </Button>
                <Button variant="outline" asChild size="sm" className="w-full sm:w-auto">
                  <Link href="/distributor/inventory">View Inventory</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">18 created, 6 expired</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready to Mint</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">Ready for minting</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Minted</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Minted tokens</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Redemptions</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">No requests yet</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Inventory Overview</CardTitle>
            <CardDescription>Coffee inventory levels over time</CardDescription>
          </CardHeader>
          <CardContent className="pl-0 sm:pl-2">
            <div className="h-[300px] sm:h-[350px]">
              <Overview />
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest transactions and events</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Expiring Soon</CardTitle>
            <CardDescription>Batches expiring in the next 30 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="text-sm">Batch #1042 - Sidama</span>
                <span className="text-red-500 text-sm">3 days</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm">Batch #1039 - Yirgacheffe</span>
                <span className="text-orange-500 text-sm">12 days</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm">Batch #1036 - Guji</span>
                <span className="text-yellow-500 text-sm">28 days</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common operations</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-2">
              <Link href="/create-new-batch" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Coffee className="mr-2 h-4 w-4" />
                  Create New Batch
                </Button>
              </Link>
              <Link href="/distributor/request-batch" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Coffee className="mr-2 h-4 w-4" />
                  Request New Batch
                </Button>
              </Link>
              <Link href="/mint-batch" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <ShieldCheck className="mr-2 h-4 w-4" />
                  Verify & Mint Batch
                </Button>
              </Link>
              <Link href="/redemption/new" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <Package className="mr-2 h-4 w-4" />
                  Redeem Tokens
                </Button>
              </Link>
              <Link href="/batch-metadata" className="w-full">
                <Button variant="outline" className="w-full justify-start">
                  <QrCode className="mr-2 h-4 w-4" />
                  View Batch Metadata
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Ethiopian Coffee Regions</CardTitle>
            <CardDescription>Featured growing regions</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span className="text-sm">Sidama</span>
                <span className="text-muted-foreground text-sm">Southern Ethiopia</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm">Yirgacheffe</span>
                <span className="text-muted-foreground text-sm">Gedeo Zone</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm">Guji</span>
                <span className="text-muted-foreground text-sm">Oromia Region</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm">Limu</span>
                <span className="text-muted-foreground text-sm">Western Ethiopia</span>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-sm">Harrar</span>
                <span className="text-muted-foreground text-sm">Eastern Highlands</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

