"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { ArrowRight } from "lucide-react"

import { CompareBar } from "@/components/compare-bar"
import { EmptyState } from "@/components/empty-state"
import { FilterToolbar } from "@/components/filter-toolbar"
import { ProductCard } from "@/components/product-card"
import { ProductDetailDialog } from "@/components/product-detail-dialog"
import { useComparison } from "@/components/providers/comparison-provider"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { products } from "@/lib/mock-data"
import type { Category, Product, SortOption } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function BrowsePage() {
  const { canCompare, compareCount } = useComparison()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState<Category | "all">("all")
  const [sortBy, setSortBy] = useState<SortOption>("featured")
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase()

    return [...products]
      .filter((product) => {
        const matchesCategory =
          category === "all" || product.category === category

        if (!matchesCategory) {
          return false
        }

        if (!normalizedSearch) {
          return true
        }

        const haystack = [
          product.name,
          product.category,
          product.processor,
          product.bestFor,
          product.summary,
          ...product.tags,
        ]
          .join(" ")
          .toLowerCase()

        return haystack.includes(normalizedSearch)
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price":
            return a.price - b.price
          case "rating":
            return b.rating - a.rating
          case "battery":
            return b.batteryScore - a.batteryScore
          case "performance":
            return b.performanceScore - a.performanceScore
          case "featured":
          default:
            return Number(b.featured) - Number(a.featured) || b.rating - a.rating
        }
      })
  }, [category, search, sortBy])

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <Badge className="rounded-full bg-white/85 text-slate-700 shadow-sm">
            Product browsing
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Find the right gadget, then compare it side by side.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Search across the catalog, filter by category, and sort by the
            criteria people actually use to decide: price, rating, battery, and
            performance.
          </p>
        </div>
        <Link
          href="/compare"
          aria-disabled={!canCompare}
          className={cn(
            buttonVariants({ size: "lg" }),
            "rounded-full px-5 text-white",
            canCompare
              ? "bg-slate-900 hover:bg-slate-800"
              : "pointer-events-none bg-slate-300 text-white"
          )}
        >
          Compare {compareCount} selected
          <ArrowRight className="size-4" />
        </Link>
      </section>

      <div className="mt-8">
        <FilterToolbar
          search={search}
          onSearchChange={setSearch}
          category={category}
          onCategoryChange={setCategory}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-900">{filteredProducts.length}</span>{" "}
          matching products
        </p>
        <p className="text-sm text-slate-500">
          Compare up to <span className="font-semibold text-slate-900">4</span> at a time
        </p>
      </div>

      <section className="mt-6">
        {filteredProducts.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenDetails={setActiveProduct}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No gadgets match that search"
            description="Try a broader keyword, switch categories, or reset sorting to featured. The filters and search are working together, so one narrow term can trim the list quickly."
            actionLabel="Browse all gadgets"
            actionHref="/browse"
          />
        )}
      </section>

      <CompareBar />

      <ProductDetailDialog
        product={activeProduct}
        open={Boolean(activeProduct)}
        onOpenChange={(open) => {
          if (!open) {
            setActiveProduct(null)
          }
        }}
      />
    </main>
  )
}
