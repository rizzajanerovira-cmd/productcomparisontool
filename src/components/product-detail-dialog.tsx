"use client"

import {
  CircleCheck,
  CircleX,
  ShieldCheck,
  Star,
  Weight,
  Zap,
} from "lucide-react"

import { ProductMedia } from "@/components/product-media"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { formatCurrency, formatRating } from "@/lib/formatters"
import type { Product } from "@/lib/types"

const detailItems = [
  { key: "processor", label: "Processor" },
  { key: "ram", label: "RAM" },
  { key: "storage", label: "Storage" },
  { key: "display", label: "Display" },
  { key: "battery", label: "Battery" },
  { key: "benchmark", label: "Benchmark" },
  { key: "camera", label: "Camera" },
  { key: "weight", label: "Weight" },
  { key: "warranty", label: "Warranty" },
] as const

export function ProductDetailDialog({
  product,
  open,
  onOpenChange,
}: {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}) {
  if (!product) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto rounded-[2rem] border border-black/5 bg-white p-0 shadow-2xl dark:border-white/10 dark:bg-slate-950 sm:max-w-4xl">
        <div className="grid gap-0 lg:grid-cols-[1.05fr_1.25fr]">
          <div className="border-b border-black/5 bg-[linear-gradient(180deg,rgba(248,250,252,0.98),rgba(241,245,249,0.76))] p-6 dark:border-white/10 dark:bg-[linear-gradient(180deg,rgba(15,23,42,0.96),rgba(10,18,32,0.92))] lg:border-r lg:border-b-0 lg:p-8">
            <ProductMedia
              category={product.category}
              label={product.imageLabel}
              imageUrl={product.imageUrl}
            />
            <div className="mt-6 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="rounded-full bg-slate-900 text-white">
                  {product.bestFor}
                </Badge>
                <Badge variant="outline" className="rounded-full text-slate-600 dark:text-slate-300">
                  {product.category}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-100">
                  {product.name}
                </h3>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {product.summary}
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-white/6">
                  <p className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                    Price
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                    {formatCurrency(product.price)}
                  </p>
                </div>
                <div className="rounded-2xl border border-black/5 bg-white p-4 dark:border-white/10 dark:bg-white/6">
                  <p className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                    Rating
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                    <Star className="size-5 fill-amber-400 text-amber-400" />
                    {formatRating(product.rating)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 lg:p-8">
            <DialogHeader className="space-y-2">
              <DialogTitle className="text-2xl font-semibold text-slate-950 dark:text-slate-100">
                Full product snapshot
              </DialogTitle>
              <DialogDescription className="text-sm leading-6 text-slate-600 dark:text-slate-300">
                Built to be backend-ready later, with structured specs, value
                callouts, and buyer-friendly notes.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {detailItems.map((item) => (
                <div
                  key={item.key}
                  className="rounded-2xl border border-black/5 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <p className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                    {product[item.key]}
                  </p>
                </div>
              ))}
            </div>

            <Separator className="my-6 bg-black/6" />

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CircleCheck className="size-5 text-emerald-600" />
                  <h4 className="font-semibold text-slate-950 dark:text-slate-100">Pros</h4>
                </div>
                <ul className="space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {product.pros.map((pro) => (
                    <li key={pro} className="rounded-2xl bg-emerald-50 px-3 py-2 dark:bg-emerald-400/10">
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <CircleX className="size-5 text-rose-500" />
                  <h4 className="font-semibold text-slate-950 dark:text-slate-100">Cons</h4>
                </div>
                <ul className="space-y-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {product.cons.map((con) => (
                    <li key={con} className="rounded-2xl bg-rose-50 px-3 py-2 dark:bg-rose-400/10">
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <Separator className="my-6 bg-black/6" />

            <div className="grid gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-black/5 p-4 dark:border-white/10 dark:bg-white/4">
                <Zap className="size-5 text-cyan-700" />
                <p className="mt-3 text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                  Performance
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {product.performance}
                </p>
              </div>
              <div className="rounded-2xl border border-black/5 p-4 dark:border-white/10 dark:bg-white/4">
                <Weight className="size-5 text-cyan-700" />
                <p className="mt-3 text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                  Weight
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {product.weight}
                </p>
              </div>
              <div className="rounded-2xl border border-black/5 p-4 dark:border-white/10 dark:bg-white/4">
                <ShieldCheck className="size-5 text-cyan-700" />
                <p className="mt-3 text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                  Warranty
                </p>
                <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-100">
                  {product.warranty}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
