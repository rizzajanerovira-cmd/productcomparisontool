"use client"

import Link from "next/link"
import { ArrowRight, X } from "lucide-react"

import { ProductMedia } from "@/components/product-media"
import { useComparison } from "@/components/providers/comparison-provider"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CompareBar() {
  const {
    canCompare,
    clearComparison,
    compareCount,
    maxCompareItems,
    removeProduct,
    selectedProducts,
  } = useComparison()

  if (!selectedProducts.length) {
    return null
  }

  return (
    <div className="sticky bottom-4 z-30 mt-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-[2rem] border border-black/5 bg-white/95 p-4 shadow-[0_24px_70px_-34px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/90 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-slate-950 dark:text-slate-100">
                {compareCount} of {maxCompareItems} gadgets selected
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Choose at least 2 products to unlock side-by-side comparison.
              </p>
            </div>
            <Button
              variant="ghost"
              className="rounded-full text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/8 dark:hover:text-slate-100"
              onClick={clearComparison}
            >
              Clear
            </Button>
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1">
            {selectedProducts.map((product) => (
              <div
                key={product.id}
                className="flex min-w-[240px] items-center gap-3 rounded-2xl border border-black/5 bg-slate-50/80 p-3 dark:border-white/10 dark:bg-white/5"
              >
                <div className="w-20 shrink-0">
                  <ProductMedia
                    category={product.category}
                    label={product.imageLabel}
                    imageUrl={product.imageUrl}
                    compact
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {product.name}
                  </p>
                  <p className="truncate text-xs text-slate-500 dark:text-slate-400">
                    {product.bestFor}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="rounded-full text-slate-500 hover:bg-slate-200 dark:text-slate-400 dark:hover:bg-white/10"
                  onClick={() => removeProduct(product.id)}
                  aria-label={`Remove ${product.name}`}
                >
                  <X className="size-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/compare"
          aria-disabled={!canCompare}
          className={cn(
            buttonVariants({ size: "lg" }),
            "rounded-full px-5 text-white",
            canCompare
              ? "bg-slate-900 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
              : "pointer-events-none bg-slate-300 text-white dark:bg-slate-700 dark:text-slate-300"
          )}
        >
          Open Comparison
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </div>
  )
}
