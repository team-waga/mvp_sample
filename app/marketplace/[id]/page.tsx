"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getMarketplaceItem, getRecommendedItems } from "@/lib/marketplace-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketplaceItemCard } from "@/components/marketplace-item-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Star, ArrowLeft, ShoppingCart, Calendar, Clock, Coffee, Leaf, Award, Scale } from "lucide-react"
import Link from "next/link"
import { cn, web3ButtonStyles } from "@/lib/utils"

export default function MarketplaceItemPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [item, setItem] = useState<any>(null)
  const [recommendedItems, setRecommendedItems] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchItem = () => {
      const fetchedItem = getMarketplaceItem(params.id)
      if (fetchedItem) {
        setItem(fetchedItem)
        setRecommendedItems(getRecommendedItems(params.id, 3))
      } else {
        // Item not found, redirect to marketplace
        router.push("/marketplace")
      }
      setLoading(false)
    }

    fetchItem()
  }, [params.id, router])

  if (loading) {
    return <div>Loading...</div>
  }

  if (!item) {
    return null
  }

  const daysUntilExpiry = Math.ceil(
    (new Date(item.availableUntil).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  const isLowStock = item.availableQuantity < 100
  const isExpiringSoon = daysUntilExpiry < 30

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/marketplace">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{item.name}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <div className="aspect-video relative rounded-t-lg overflow-hidden">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="object-cover w-full h-full" />
              {item.featured && (
                <Badge className="absolute top-4 right-4 bg-amber-500 hover:bg-amber-600">Featured</Badge>
              )}
            </div>

            <CardContent className="pt-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="secondary">{item.origin}</Badge>
                <Badge variant="secondary">{item.region}</Badge>
                <Badge variant="secondary">{item.process}</Badge>
                <Badge variant="secondary">{item.roastProfile}</Badge>
                {item.tags.map((tag: string) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(item.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm ml-2">{item.rating.toFixed(1)} rating</span>
              </div>

              <p className="text-lg mb-6">{item.description}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <Coffee className="h-5 w-5 text-amber-500 mb-1" />
                  <span className="text-xs text-muted-foreground">Process</span>
                  <span className="font-medium">{item.process}</span>
                </div>

                <div className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <Leaf className="h-5 w-5 text-green-500 mb-1" />
                  <span className="text-xs text-muted-foreground">Harvest Date</span>
                  <span className="font-medium">{new Date(item.harvestDate).toLocaleDateString()}</span>
                </div>

                <div className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <Award className="h-5 w-5 text-blue-500 mb-1" />
                  <span className="text-xs text-muted-foreground">Roast Profile</span>
                  <span className="font-medium">{item.roastProfile}</span>
                </div>

                <div className="flex flex-col items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <Scale className="h-5 w-5 text-purple-500 mb-1" />
                  <span className="text-xs text-muted-foreground">Available</span>
                  <span className={`font-medium ${isLowStock ? "text-amber-600" : ""}`}>
                    {item.availableQuantity} kg
                  </span>
                </div>
              </div>

              <Tabs defaultValue="details">
                <TabsList>
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="shipping">Shipping</TabsTrigger>
                  <TabsTrigger value="quality">Quality</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-4 pt-4">
                  <div>
                    <h3 className="font-medium mb-2">Origin Information</h3>
                    <p className="text-sm text-muted-foreground">
                      This coffee comes from the {item.region} region of {item.origin}, known for its
                      {item.origin === "Ethiopia"
                        ? " ancient coffee traditions and diverse heirloom varieties."
                        : item.origin === "Colombia"
                          ? " rich volcanic soil and ideal growing conditions."
                          : item.origin === "Guatemala"
                            ? " high altitude farms and complex cup profiles."
                            : item.origin === "Kenya"
                              ? " bright, vibrant coffees with distinctive acidity."
                              : item.origin === "Rwanda"
                                ? " carefully processed coffees with exceptional clarity."
                                : " excellent growing conditions and skilled producers."}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Processing Method</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.process === "Washed"
                        ? "Washed processing removes all fruit from the coffee seed before drying, resulting in a clean, bright cup that highlights the inherent characteristics of the coffee."
                        : item.process === "Natural"
                          ? "Natural processing allows the coffee cherry to dry completely around the seed, imparting sweet, fruity flavors and a heavier body to the coffee."
                          : item.process === "Honey"
                            ? "Honey processing removes the skin but leaves some fruit mucilage on the seed during drying, creating a balanced cup with some fruity sweetness and good acidity."
                            : item.process === "Anaerobic"
                              ? "Anaerobic processing ferments the coffee in an oxygen-free environment, creating unique flavor profiles with enhanced complexity and often wine-like characteristics."
                              : "This coffee undergoes a specialized processing method that enhances its unique characteristics and flavor profile."}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Roast Profile</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.roastProfile === "Light"
                        ? "Light roasting preserves the coffee's original characteristics, highlighting bright acidity and complex flavor notes unique to its origin."
                        : item.roastProfile === "Medium-Light"
                          ? "Medium-light roasting balances the coffee's inherent characteristics with some developed sweetness, offering both brightness and body."
                          : item.roastProfile === "Medium"
                            ? "Medium roasting creates a balanced cup with moderate acidity, good body, and enhanced sweetness while maintaining origin characteristics."
                            : item.roastProfile === "Medium-Dark"
                              ? "Medium-dark roasting develops rich, sweet flavors with chocolate and caramel notes while reducing acidity and increasing body."
                              : item.roastProfile === "Dark"
                                ? "Dark roasting creates bold, rich flavors with prominent bittersweet notes, low acidity, and a full body."
                                : "This coffee is roasted to highlight its best characteristics and create a balanced, flavorful cup."}
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="shipping" className="space-y-4 pt-4">
                  <div>
                    <h3 className="font-medium mb-2">Shipping Information</h3>
                    <p className="text-sm text-muted-foreground">
                      All marketplace batches are shipped in climate-controlled containers to preserve freshness.
                      Shipping costs are calculated based on volume and destination.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Packaging</h3>
                    <p className="text-sm text-muted-foreground">
                      Coffee is shipped in sealed, valve-equipped bags to maintain freshness. Larger orders are packed
                      in GrainPro or similar protective packaging.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Delivery Timeline</h3>
                    <p className="text-sm text-muted-foreground">
                      Standard delivery takes 7-14 business days from order confirmation. Expedited shipping options are
                      available for urgent requests.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="quality" className="space-y-4 pt-4">
                  <div>
                    <h3 className="font-medium mb-2">Quality Control</h3>
                    <p className="text-sm text-muted-foreground">
                      Every batch is cupped multiple times throughout the production process. Final quality scores are
                      determined by a panel of certified Q-graders.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Certifications</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.tags.includes("Organic") ? "This coffee is certified organic. " : ""}
                      {item.tags.includes("Fair Trade") ? "This coffee is Fair Trade certified. " : ""}
                      All WAGA Coffee batches are verified on the blockchain for complete traceability.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Storage Recommendations</h3>
                    <p className="text-sm text-muted-foreground">
                      For optimal freshness, store in a cool, dry place away from direct sunlight. Ideal storage
                      temperature is 20-25°C (68-77°F) with relative humidity below 60%.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {recommendedItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>You Might Also Like</CardTitle>
                <CardDescription>Similar coffee batches available in our marketplace</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recommendedItems.map((recItem) => (
                    <MarketplaceItemCard key={recItem.id} item={recItem} />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Request This Batch</CardTitle>
              <CardDescription>Available for distribution</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">${item.price.toFixed(2)}/kg</span>
                <Badge
                  variant={isLowStock ? "outline" : "secondary"}
                  className={isLowStock ? "text-amber-600 border-amber-200" : ""}
                >
                  {isLowStock ? "Low Stock" : "In Stock"}
                </Badge>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Available Quantity:</span>
                  <span className="font-medium">{item.availableQuantity} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Minimum Order:</span>
                  <span className="font-medium">50 kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Maximum Order:</span>
                  <span className="font-medium">{Math.min(item.availableQuantity, 500)} kg</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Harvested: {new Date(item.harvestDate).toLocaleDateString()}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>
                  {isExpiringSoon ? (
                    <span className="text-amber-600">Available for {daysUntilExpiry} more days</span>
                  ) : (
                    `Available until ${new Date(item.availableUntil).toLocaleDateString()}`
                  )}
                </span>
              </div>

              {isExpiringSoon && (
                <Alert
                  variant="warning"
                  className="bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800"
                >
                  <AlertTitle>Limited Time Availability</AlertTitle>
                  <AlertDescription>
                    This batch will only be available for {daysUntilExpiry} more days. Request soon to secure your
                    order.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
            <CardFooter className="flex-col space-y-2">
              <Button className={cn("w-full", web3ButtonStyles("primary"))} asChild>
                <Link href={`/distributor/request-batch?marketplaceId=${item.id}`}>
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Request This Batch
                </Link>
              </Button>

              <Button variant="outline" className={cn("w-full", web3ButtonStyles("secondary"))} asChild>
                <Link href="/marketplace">Browse More Batches</Link>
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Batch Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Origin:</span>
                  <span className="font-medium">{item.origin}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Region:</span>
                  <span className="font-medium">{item.region}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Process:</span>
                  <span className="font-medium">{item.process}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Roast Profile:</span>
                  <span className="font-medium">{item.roastProfile}</span>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-2">Flavor Profile</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

