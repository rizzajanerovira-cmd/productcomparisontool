"use client"

import { Trophy, X } from "lucide-react"

import { ProductMedia } from "@/components/product-media"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { formatCurrency, formatRating } from "@/lib/formatters"
import type { Product } from "@/lib/types"

type CompareRow = {
  key: string
  label: string
  getValue: (product: Product) => string
  getMetric?: (product: Product) => number
  better?: "higher" | "lower"
}

const rows: CompareRow[] = [
  {
    key: "price",
    label: "Price",
    getValue: (product: Product) => formatCurrency(product.price),
    getMetric: (product: Product) => product.price,
    better: "lower" as const,
  },
  {
    key: "rating",
    label: "Rating",
    getValue: (product: Product) => `${formatRating(product.rating)} / 5`,
    getMetric: (product: Product) => product.rating,
    better: "higher" as const,
  },
  {
    key: "processor",
    label: "Processor",
    getValue: (product: Product) => product.processor,
  },
  {
    key: "ram",
    label: "RAM",
    getValue: (product: Product) => product.ram,
    getMetric: (product: Product) => product.ramGb,
    better: "higher" as const,
  },
  {
    key: "storage",
    label: "Storage",
    getValue: (product: Product) => product.storage,
    getMetric: (product: Product) => product.storageGb,
    better: "higher" as const,
  },
  {
    key: "display",
    label: "Display",
    getValue: (product: Product) => product.display,
  },
  {
    key: "battery",
    label: "Battery",
    getValue: (product: Product) => product.battery,
    getMetric: (product: Product) => product.batteryScore,
    better: "higher" as const,
  },
  {
    key: "performance",
    label: "Performance",
    getValue: (product: Product) => product.performance,
    getMetric: (product: Product) => product.performanceScore,
    better: "higher" as const,
  },
  {
    key: "benchmark",
    label: "Benchmark",
    getValue: (product: Product) => product.benchmark,
    getMetric: (product: Product) => product.benchmarkScore,
    better: "higher" as const,
  },
  {
    key: "camera",
    label: "Camera",
    getValue: (product: Product) => product.camera,
  },
  {
    key: "weight",
    label: "Weight",
    getValue: (product: Product) => product.weight,
    getMetric: (product: Product) => product.weightGrams,
    better: "lower" as const,
  },
  {
    key: "warranty",
    label: "Warranty",
    getValue: (product: Product) => product.warranty,
    getMetric: (product: Product) => product.warrantyMonths,
    better: "higher" as const,
  },
]

export function ComparisonTable({
  products,
  onRemove,
}: {
  products: Product[]
  onRemove: (productId: string) => void
}) {
  const highlightMap = rows.reduce<Record<string, number | null>>((acc, row) => {
    if (!row.getMetric) {
      acc[row.key] = null
      return acc
    }

    const metrics = products
      .map((product) => row.getMetric?.(product) ?? null)
      .filter((value): value is number => typeof value === "number" && value > 0)

    if (!metrics.length) {
      acc[row.key] = null
      return acc
    }

    acc[row.key] =
      row.better === "lower"
        ? Math.min(...metrics)
        : Math.max(...metrics)

    return acc
  }, {})

  return (
    <div className="space-y-5">
      <div className="grid gap-4 lg:hidden">
        {products.map((product) => (
          <div
            key={product.id}
            className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.4)]"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <Badge className="rounded-full bg-slate-900 text-white">
                  {product.bestFor}
                </Badge>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-slate-950">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-slate-500">{product.category}</p>
              </div>
              <Button
                variant="outline"
                size="icon-sm"
                className="rounded-full border-slate-200"
                onClick={() => onRemove(product.id)}
              >
                <X className="size-4" />
              </Button>
            </div>
            <div className="mt-4">
              <ProductMedia
                category={product.category}
                label={product.imageLabel}
                imageUrl={product.imageUrl}
                compact
              />
            </div>
            <div className="mt-4 space-y-3">
              {rows.map((row) => (
                <div
                  key={`${product.id}-${row.key}`}
                  className="rounded-2xl border border-black/5 bg-slate-50/70 p-3"
                >
                  <p className="text-[11px] font-medium tracking-wide text-slate-500 uppercase">
                    {row.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900">
                    {row.getValue(product)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-[0_24px_70px_-36px_rgba(15,23,42,0.4)]">
          <Table className="table-fixed min-w-[1040px]">
            <TableHeader>
              <TableRow className="border-black/5 bg-slate-50/80 hover:bg-slate-50/80">
                <TableHead className="sticky left-0 z-10 w-52 bg-slate-50/95 px-5 py-4 text-slate-500 backdrop-blur">
                  Spec
                </TableHead>
                {products.map((product) => (
                  <TableHead
                    key={product.id}
                    className="w-[22%] min-w-[220px] border-l border-black/5 px-5 py-4 align-top"
                  >
                    <div className="space-y-4">
                      <ProductMedia
                        category={product.category}
                        label={product.imageLabel}
                        imageUrl={product.imageUrl}
                        compact
                      />
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="text-sm font-semibold whitespace-normal text-slate-950">
                              {product.name}
                            </p>
                            <p className="mt-1 text-xs font-medium text-slate-500">
                              {product.category}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="icon-sm"
                            className="rounded-full border-slate-200"
                            onClick={() => onRemove(product.id)}
                            aria-label={`Remove ${product.name}`}
                          >
                            <X className="size-4" />
                          </Button>
                        </div>
                        <Badge className="rounded-full bg-slate-900 text-white">
                          {product.bestFor}
                        </Badge>
                      </div>
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.key} className="border-black/5 hover:bg-slate-50/60">
                  <TableCell className="sticky left-0 z-10 bg-white px-5 py-4 align-top text-sm font-semibold text-slate-700">
                    {row.label}
                  </TableCell>
                  {products.map((product) => {
                    const metric = row.getMetric?.(product)
                    const highlight = highlightMap[row.key]
                    const isWinner =
                      highlight !== null &&
                      metric !== undefined &&
                      metric === highlight &&
                      metric > 0

                    return (
                      <TableCell
                        key={`${row.key}-${product.id}`}
                        className="border-l border-black/5 px-5 py-4 align-top"
                      >
                        <div
                          className={
                            isWinner
                              ? "rounded-2xl border border-emerald-200 bg-emerald-50/80 p-3"
                              : "rounded-2xl border border-transparent p-3"
                          }
                        >
                          <div className="flex items-start gap-2">
                            {isWinner ? (
                              <Trophy className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                            ) : null}
                            <span className="text-sm leading-6 whitespace-normal text-slate-700">
                              {row.getValue(product)}
                            </span>
                          </div>
                        </div>
                      </TableCell>
                    )
                  })}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
