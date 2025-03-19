"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { X, Filter, SlidersHorizontal } from "lucide-react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet"

interface MarketplaceFiltersProps {
  onFilterChange: (filters: any) => void
}

export function MarketplaceFilters({ onFilterChange }: MarketplaceFiltersProps) {
  const [search, setSearch] = useState("")
  const [origin, setOrigin] = useState<string>("")
  const [process, setProcess] = useState<string>("")
  const [roastProfile, setRoastProfile] = useState<string>("")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50])
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [minRating, setMinRating] = useState<number>(0)
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(true)

  const origins = ["Ethiopia", "Guatemala", "Colombia", "Kenya", "Rwanda", "Costa Rica"]
  const processes = ["Washed", "Natural", "Honey", "Anaerobic"]
  const roastProfiles = ["Light", "Medium-Light", "Medium", "Medium-Dark", "Dark"]
  const tags = ["Organic", "Fair Trade", "Single Origin", "Specialty", "Rare", "Limited Edition", "Award Winning"]

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
  }

  const applyFilters = () => {
    onFilterChange({
      search,
      origin,
      process,
      roastProfile,
      priceRange,
      tags: selectedTags,
      minRating,
      showOnlyAvailable,
    })
  }

  const resetFilters = () => {
    setSearch("")
    setOrigin("")
    setProcess("")
    setRoastProfile("")
    setPriceRange([0, 50])
    setSelectedTags([])
    setMinRating(0)
    setShowOnlyAvailable(true)

    onFilterChange({
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

  const activeFilterCount = [
    origin,
    process,
    roastProfile,
    ...selectedTags,
    minRating > 0 ? "rating" : "",
    !showOnlyAvailable ? "availability" : "",
    priceRange[0] > 0 || priceRange[1] < 50 ? "price" : "",
  ].filter(Boolean).length

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Input
            placeholder="Search coffee batches..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-8"
          />
          {search && (
            <Button variant="ghost" size="icon" className="absolute right-0 top-0 h-full" onClick={() => setSearch("")}>
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="hidden md:flex gap-2">
          <Select value={origin} onValueChange={setOrigin}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Origin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Origin</SelectItem>
              {origins.map((o) => (
                <SelectItem key={o} value={o}>
                  {o}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={process} onValueChange={setProcess}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Process" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Process</SelectItem>
              {processes.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={roastProfile} onValueChange={setRoastProfile}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Roast" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Roast</SelectItem>
              {roastProfiles.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={applyFilters}>
            <Filter className="h-4 w-4 mr-2" />
            Apply
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="relative">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="overflow-y-auto">
              <SheetHeader>
                <SheetTitle>Filter Coffee Batches</SheetTitle>
                <SheetDescription>Refine your search to find the perfect coffee batch</SheetDescription>
              </SheetHeader>

              <div className="py-4 space-y-6">
                <Accordion type="single" collapsible defaultValue="origin" className="w-full">
                  <AccordionItem value="origin">
                    <AccordionTrigger>Origin</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2">
                        {origins.map((o) => (
                          <Button
                            key={o}
                            variant={origin === o ? "default" : "outline"}
                            size="sm"
                            onClick={() => setOrigin(origin === o ? "" : o)}
                            className="justify-start"
                          >
                            {o}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="process">
                    <AccordionTrigger>Process</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2">
                        {processes.map((p) => (
                          <Button
                            key={p}
                            variant={process === p ? "default" : "outline"}
                            size="sm"
                            onClick={() => setProcess(process === p ? "" : p)}
                            className="justify-start"
                          >
                            {p}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="roast">
                    <AccordionTrigger>Roast Profile</AccordionTrigger>
                    <AccordionContent>
                      <div className="grid grid-cols-2 gap-2">
                        {roastProfiles.map((r) => (
                          <Button
                            key={r}
                            variant={roastProfile === r ? "default" : "outline"}
                            size="sm"
                            onClick={() => setRoastProfile(roastProfile === r ? "" : r)}
                            className="justify-start"
                          >
                            {r}
                          </Button>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="price">
                    <AccordionTrigger>Price Range ($/kg)</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 px-1">
                        <Slider
                          value={priceRange}
                          min={0}
                          max={50}
                          step={1}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                        />
                        <div className="flex justify-between">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="tags">
                    <AccordionTrigger>Tags</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {tags.map((tag) => (
                          <div key={tag} className="flex items-center space-x-2">
                            <Checkbox
                              id={`tag-${tag}`}
                              checked={selectedTags.includes(tag)}
                              onCheckedChange={() => handleTagToggle(tag)}
                            />
                            <Label htmlFor={`tag-${tag}`}>{tag}</Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="rating">
                    <AccordionTrigger>Minimum Rating</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-4 px-1">
                        <Slider
                          value={[minRating]}
                          min={0}
                          max={5}
                          step={0.5}
                          onValueChange={(value) => setMinRating(value[0])}
                        />
                        <div className="flex justify-between">
                          <span>{minRating} stars and above</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="availability">
                    <AccordionTrigger>Availability</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="show-available"
                          checked={showOnlyAvailable}
                          onCheckedChange={(checked) => setShowOnlyAvailable(checked as boolean)}
                        />
                        <Label htmlFor="show-available">Show only available batches</Label>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <SheetFooter className="flex-row gap-3 sm:space-x-0">
                <Button variant="outline" onClick={resetFilters} className="flex-1">
                  Reset Filters
                </Button>
                <SheetClose asChild>
                  <Button onClick={applyFilters} className="flex-1">
                    Apply Filters
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {origin && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              Origin: {origin}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setOrigin("")}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {process && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              Process: {process}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setProcess("")}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {roastProfile && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              Roast: {roastProfile}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setRoastProfile("")}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex gap-1 items-center">
              {tag}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => handleTagToggle(tag)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}

          {minRating > 0 && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              {minRating}+ Stars
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setMinRating(0)}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {!showOnlyAvailable && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              Include Unavailable
              <Button
                variant="ghost"
                size="icon"
                className="h-4 w-4 p-0 ml-1"
                onClick={() => setShowOnlyAvailable(true)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          {(priceRange[0] > 0 || priceRange[1] < 50) && (
            <Badge variant="secondary" className="flex gap-1 items-center">
              ${priceRange[0]} - ${priceRange[1]}
              <Button variant="ghost" size="icon" className="h-4 w-4 p-0 ml-1" onClick={() => setPriceRange([0, 50])}>
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}

          <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={resetFilters}>
            Clear All
          </Button>
        </div>
      )}
    </div>
  )
}

