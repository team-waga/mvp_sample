"use client"

import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import Link from "next/link"
import { cn, web3ButtonStyles } from "@/lib/utils"

interface MarketplaceItemProps {
  item: {
    id: string
    name: string
    origin: string
    region: string
    process: string
    roastProfile: string
    price: number
    rating: number
    description: string
    availableQuantity: number
    availableUntil: string
    harvestDate: string
    image?: string
    tags: string[]
  }
  featured?: boolean
}

export function MarketplaceItemCard({ item, featured = false }: MarketplaceItemProps) {
  const isLowStock = item.availableQuantity < 100

  return (
    <Card className="overflow-hidden flex flex-col h-full">
      <div className="aspect-video relative">
        <img
          src={item.image || "/placeholder.svg?height=200&width=400"}
          alt={item.name}
          className="object-cover w-full h-full"
        />
        {featured && <Badge className="absolute top-2 right-2 bg-amber-500 hover:bg-amber-600">Featured</Badge>}
      </div>

      <CardContent className="pt-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-medium text-lg">{item.name}</h3>
          <span className="font-bold">${item.price.toFixed(2)}/kg</span>
        </div>

        <div className="flex items-center gap-1 mb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < Math.floor(item.rating) ? "fill-amber-400 text-amber-400" : "text-gray-300"}`}
            />
          ))}
          <span className="text-xs ml-1">{item.rating.toFixed(1)}</span>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          <Badge variant="secondary" className="text-xs">
            {item.origin}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {item.process}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {item.roastProfile}
          </Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{item.description}</p>

        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Available: {item.availableQuantity} kg</span>
          {isLowStock && <span className="text-amber-600 font-medium">Low Stock</span>}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button asChild className="w-full" className={cn("w-full", web3ButtonStyles("primary"))}>
          <Link href={`/marketplace/${item.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

export type MarketplaceItem = {
  id: string
  name: string
  origin: string
  region: string
  process: string
  roastProfile: string
  price: number
  rating: number
  description: string
  availableQuantity: number
  availableUntil: string
  harvestDate: string
  image?: string
  tags: string[]
}

