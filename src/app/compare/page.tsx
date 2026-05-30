"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { ComparisonTable } from "@/components/comparison-table"
import { EmptyState } from "@/components/empty-state"
import { ProductDetailDialog } from "@/components/product-detail-dialog"
import { useComparison } from "@/components/providers/comparison-provider"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import type { Product } from "@/lib/types"
import { cn } from "@/lib/utils"

export default function ComparePage() {
  const { clearComparison, compareCount, removeProduct, selectedProducts } =
    useComparison()
  const [activeProduct, setActiveProduct] = useState<Product | null>(null)

  if (!selectedProducts.length) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-12 sm:px-6 lg:px-8">
        <EmptyState
          title="Your comparison canvas is empty"
          description="Start by adding gadgets from the browse page. Once you select at least two products, the table view will surface differences in price, battery, performance, and other key specs right away."
          actionLabel="Browse gadgets"
          actionHref="/browse"
        />
      </main>
    )
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-10 sm:px-6 lg:px-8">
      <section className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <Badge className="rounded-full border-yellow-200 bg-yellow-100 text-yellow-900 shadow-sm">
            Comparison view
          </Badge>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
            Review the differences before you buy.
          </h1>
          <p className="mt-4 text-base leading-7 text-slate-600">
            Compare up to four selected products with aligned columns, clear
            value highlighting, and responsive fallbacks for smaller screens.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/browse"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "rounded-full border-slate-200 bg-white px-5 text-slate-700"
            )}
          >
            <ArrowLeft className="size-4" />
            Add more gadgets
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full border-slate-200 bg-white px-5 text-slate-700"
            onClick={clearComparison}
          >
            Clear Comparison
          </Button>
        </div>
      </section>

      <div className="mt-8 rounded-[2rem] border border-black/5 bg-white/90 p-5 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.42)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-950">
              {compareCount} product{compareCount > 1 ? "s" : ""} selected
            </p>
            <p className="text-sm text-slate-600">
              Lower prices and lighter weights are highlighted as better values.
              Higher ratings, battery scores, benchmark scores, performance, RAM, storage, and
              warranty coverage are also called out.
            </p>
          </div>
          <Link
            href="/browse"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full bg-yellow-400 px-5 text-yellow-950 hover:bg-yellow-300"
            )}
          >
            Keep browsing
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>

      <section className="mt-8">
        <ComparisonTable
          products={selectedProducts}
          onRemove={(productId) => removeProduct(productId)}
        />
      </section>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {selectedProducts.map((product) => (
          <button
            key={product.id}
            type="button"
            onClick={() => setActiveProduct(product)}
            className="rounded-[1.5rem] border border-black/5 bg-white px-5 py-4 text-left shadow-[0_18px_45px_-34px_rgba(15,23,42,0.4)] transition-transform hover:-translate-y-0.5"
          >
            <p className="text-sm font-semibold text-slate-950">{product.name}</p>
            <p className="mt-1 text-sm text-slate-500">{product.bestFor}</p>
            <p className="mt-4 text-sm font-medium text-yellow-700">
              Open full product details
            </p>
          </button>
        ))}
      </div>

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
