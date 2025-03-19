import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Coffee, Plus, ShieldCheck, Package } from "lucide-react"

// Dummy data for batches
const batches = [
  {
    id: 1045,
    name: "Rwanda Nyungwe",
    origin: "Rwanda",
    createdAt: "2025-02-20",
    status: "ready_to_mint",
    quantity: 100,
  },
  {
    id: 1044,
    name: "Costa Rica Tarrazu",
    origin: "Costa Rica",
    createdAt: "2025-02-15",
    status: "ready_to_mint",
    quantity: 75,
  },
  {
    id: 1043,
    name: "Ethiopia Yirgacheffe",
    origin: "Ethiopia",
    createdAt: "2025-02-10",
    status: "ready_to_mint",
    quantity: 120,
  },
  {
    id: 1042,
    name: "Ethiopia Sidama",
    origin: "Ethiopia",
    createdAt: "2025-01-25",
    status: "minted",
    quantity: 90,
  },
  {
    id: 1041,
    name: "Guatemala Antigua",
    origin: "Guatemala",
    createdAt: "2025-01-20",
    status: "minted",
    quantity: 60,
  },
  {
    id: 1039,
    name: "Colombia Huila",
    origin: "Colombia",
    createdAt: "2025-01-10",
    status: "minted",
    quantity: 45,
  },
]

export default function BatchesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Coffee Batches</h1>
        <Button
          asChild
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none"
        >
          <Link href="/create-new-batch">
            <Plus className="mr-2 h-4 w-4" />
            Create New Batch
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Batches</CardTitle>
            <Coffee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{batches.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ready to Mint</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {batches.filter((batch) => batch.status === "ready_to_mint").length}
            </div>
            <p className="text-xs text-muted-foreground">Batches ready for minting</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Minted Batches</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{batches.filter((batch) => batch.status === "minted").length}</div>
            <p className="text-xs text-muted-foreground">Batches with minted tokens</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Batches</CardTitle>
          <CardDescription>Manage your coffee batches</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Batch ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Origin</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {batches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-medium">#{batch.id}</TableCell>
                  <TableCell>
                    <Link href={`/batches/${batch.id}`} className="hover:underline">
                      {batch.name}
                    </Link>
                  </TableCell>
                  <TableCell>{batch.origin}</TableCell>
                  <TableCell>{batch.createdAt}</TableCell>
                  <TableCell>{batch.quantity} kg</TableCell>
                  <TableCell>
                    {batch.status === "ready_to_mint" ? (
                      <Badge variant="outline" className="bg-blue-100 text-blue-800 hover:bg-blue-100">
                        Ready to Mint
                      </Badge>
                    ) : batch.status === "minted" ? (
                      <Badge variant="outline" className="bg-green-100 text-green-800 hover:bg-green-100">
                        Minted
                      </Badge>
                    ) : (
                      <Badge variant="outline">{batch.status}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="border-purple-600 text-purple-600 hover:bg-purple-100 hover:text-purple-700"
                      >
                        <Link href={`/batches/${batch.id}`}>View</Link>
                      </Button>
                      {batch.status === "ready_to_mint" && (
                        <Button
                          size="sm"
                          asChild
                          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-none"
                        >
                          <Link href={`/mint-batch?batchId=${batch.id}`}>Mint</Link>
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
    </div>
  )
}

