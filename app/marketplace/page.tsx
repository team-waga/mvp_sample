"use client"

import { useState } from "react"
import { MarketplaceFilters } from "@/components/marketplace-filters"
import { MarketplaceItemCard } from "@/components/marketplace-item-card"
import { filterMarketplaceItems } from "@/lib/marketplace-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coffee, Leaf, Award, Dices } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn, web3ButtonStyles } from "@/lib/utils"

export default function MarketplacePage() {
  const [filters, setFilters] = useState({
    search: "",
    origin: "",
    process: "",
    roastProfile: "",
    priceRange: [0, 50],
    tags: [],
    minRating: 0,
    showOnlyAvailable: true,
  })

  const [activeTab, setActiveTab] = useState("all")

  const filteredItems = filterMarketplaceItems(filters)

  const featuredItems = filteredItems.filter((item) => item.featured)
  const ethiopianItems = filteredItems.filter((item) => item.origin === "Ethiopia")
  const specialtyItems = filteredItems.filter((item) => item.tags.includes("Specialty"))

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Coffee Marketplace</h1>
          <p className="text-muted-foreground">Browse and request premium coffee batches for your distribution needs</p>
        </div>
        <Button asChild className={cn(web3ButtonStyles("primary"))}>
          <Link href="/distributor/request-batch">Request Custom Batch</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Coffee className="h-5 w-5 mr-2 text-amber-500" />
              Premium Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Curated batches from the world's finest coffee-growing regions
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Leaf className="h-5 w-5 mr-2 text-green-500" />
              Sustainable Sourcing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Ethically sourced and environmentally responsible coffee</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Award className="h-5 w-5 mr-2 text-blue-500" />
              Quality Guaranteed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Every batch is cupped and scored by certified Q-graders</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Dices className="h-5 w-5 mr-2 text-purple-500" />
              Batch Transparency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Complete traceability from farm to roaster to you</p>
          </CardContent>
        </Card>
      </div>

      <MarketplaceFilters onFilterChange={setFilters} />

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="all">All Batches ({filteredItems.length})</TabsTrigger>
          <TabsTrigger value="featured">Featured ({featuredItems.length})</TabsTrigger>
          <TabsTrigger value="ethiopian">Ethiopian ({ethiopianItems.length})</TabsTrigger>
          <TabsTrigger value="specialty">Specialty ({specialtyItems.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredItems.map((item) => (
                <MarketplaceItemCard key={item.id} item={item} featured={item.featured} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No matching batches found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your filters to see more results</p>
              <Button
                variant="outline"
                onClick={() =>
                  setFilters({
                    search: "",
                    origin: "",
                    process: "",
                    roastProfile: "",
                    priceRange: [0, 50],
                    tags: [],
                    minRating: 0,
                    showOnlyAvailable: true,
                  })
                }
                className={cn(web3ButtonStyles("secondary"))}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="mt-6">
          {featuredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {featuredItems.map((item) => (
                <MarketplaceItemCard key={item.id} item={item} featured={true} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No featured batches match your filters</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see featured batches</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="ethiopian" className="mt-6">
          {ethiopianItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {ethiopianItems.map((item) => (
                <MarketplaceItemCard key={item.id} item={item} featured={item.featured} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No Ethiopian batches match your filters</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see Ethiopian batches</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="specialty" className="mt-6">
          {specialtyItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {specialtyItems.map((item) => (
                <MarketplaceItemCard key={item.id} item={item} featured={item.featured} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No specialty batches match your filters</h3>
              <p className="text-muted-foreground">Try adjusting your filters to see specialty batches</p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

