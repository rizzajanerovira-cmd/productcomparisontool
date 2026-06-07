"use client"

import { Eye, Plus, Star } from "lucide-react"

import { ProductMedia } from "@/components/product-media"
import { useComparison } from "@/components/providers/comparison-provider"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCurrency, formatRating } from "@/lib/formatters"
import type { Product } from "@/lib/types"

export function ProductCard({
  product,
  onOpenDetails,
}: {
  product: Product
  onOpenDetails: (product: Product) => void
}) {
  const { addProduct, hasProduct, compareCount, maxCompareItems } = useComparison()
  const isSelected = hasProduct(product.id)
  const isLimitReached = compareCount >= maxCompareItems && !isSelected

  return (
    <Card className="overflow-hidden rounded-[1.75rem] border border-black/5 bg-white/90 shadow-[0_18px_50px_-28px_rgba(15,23,42,0.35)] dark:border-white/10 dark:bg-white/6">
      <CardContent className="px-4 pt-4">
        <ProductMedia
          category={product.category}
          label={product.imageLabel}
          imageUrl={product.imageUrl}
        />
      </CardContent>
      <CardHeader className="space-y-3 px-4">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className="rounded-full text-slate-600 dark:text-slate-300">
            {product.category}
          </Badge>
          <Badge className="rounded-full bg-slate-900 text-white">
            {product.bestFor}
          </Badge>
        </div>
        <div className="space-y-2">
          <CardTitle className="min-h-[3.5rem] text-lg font-semibold tracking-tight text-slate-950 dark:text-slate-100">
            {product.name}
          </CardTitle>
          <p className="min-h-[3.75rem] text-sm leading-6 text-slate-600 dark:text-slate-300">
            {product.summary}
          </p>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-100">
              {formatCurrency(product.price)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Estimated retail price</p>
          </div>
          <div className="rounded-2xl bg-amber-50 px-3 py-2 text-right dark:bg-amber-400/10">
            <p className="flex items-center justify-end gap-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
              <Star className="size-4 fill-amber-400 text-amber-400" />
              {formatRating(product.rating)}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">{product.reviewCount} reviews</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <SpecPill label="Processor" value={product.processor} />
          <SpecPill label="Battery" value={product.battery} />
          <SpecPill label="Display" value={product.display} />
          <SpecPill label="Storage" value={product.storage} />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 border-t border-black/5 bg-slate-50/70 px-4 py-4 dark:border-white/10 dark:bg-white/5 sm:flex-row">
        <Button
          onClick={() => addProduct(product)}
          disabled={isLimitReached}
          className="w-full rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
        >
          <Plus className="size-4" />
          {isSelected ? "Added to Compare" : "Add to Compare"}
        </Button>
        <Button
          variant="outline"
          className="w-full rounded-full border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
          onClick={() => onOpenDetails(product)}
        >
          <Eye className="size-4" />
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

function SpecPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-black/5 bg-slate-50/90 p-3 dark:border-white/10 dark:bg-white/5">
      <p className="text-[11px] font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">{value}</p>
    </div>
  )
}
