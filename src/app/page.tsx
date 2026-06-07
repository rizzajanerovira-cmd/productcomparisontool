import Link from "next/link"
import {
  ArrowRight,
  Camera,
  Headphones,
  Laptop,
  Monitor,
  ShieldCheck,
  Smartphone,
  Tablets,
  Watch,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { formatCurrency } from "@/lib/formatters"
import { products } from "@/lib/mock-data"
import { cn } from "@/lib/utils"

const highlights = [
  {
    title: "Compare with confidence",
    description:
      "Bring up to 4 gadgets into one focused view and spot differences fast.",
    icon: ShieldCheck,
  },
  {
    title: "Designed for clean decision-making",
    description:
      "Minimal cards, thoughtful spacing, and buyer-friendly spec groupings keep the UI readable.",
    icon: Laptop,
  },
  {
    title: "Backend-ready structure",
    description:
      "All catalog data is modeled cleanly so this UI can connect to real APIs later without a rewrite.",
    icon: Monitor,
  },
]

const categoryIcons = [
  { label: "Smartphones", icon: Smartphone },
  { label: "Laptops", icon: Laptop },
  { label: "Tablets", icon: Tablets },
  { label: "Smartwatches", icon: Watch },
  { label: "Audio", icon: Headphones },
  { label: "Cameras", icon: Camera },
]

const featuredProducts = products.filter((product) => product.featured).slice(0, 3)

export default function Home() {
  return (
    <main className="flex-1">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(103,232,249,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.16),transparent_32%),linear-gradient(180deg,rgba(248,250,252,0.92),rgba(255,255,255,0.98))] dark:bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_35%),radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_32%),linear-gradient(180deg,rgba(7,17,31,0.94),rgba(12,23,40,0.98))]" />
        <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-24">
          <div className="max-w-3xl">
            <Badge className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold tracking-[0.18em] text-slate-700 uppercase shadow-sm dark:bg-white/10 dark:text-slate-200">
              CHOOSETECH helps you compare smarter before you buy
            </Badge>
            <h1 className="mt-6 text-5xl font-semibold tracking-tight text-slate-950 dark:text-slate-50 sm:text-6xl">
              Compare gadgets side by side without the clutter.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300">
              Browse phones, laptops, tablets, audio, cameras, consoles, and
              displays in one clean workspace. Add products, open detailed
              specs, and surface better-value picks instantly.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/browse"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full bg-slate-900 px-6 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
                )}
              >
                Compare Gadgets
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/compare"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-full border-slate-200 bg-white px-6 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100"
                )}
              >
                View Comparison Area
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.title}
                  className="rounded-[1.75rem] border border-black/5 bg-white/80 p-5 shadow-[0_18px_40px_-32px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-white/6"
                >
                  <div className="flex size-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
                    <item.icon className="size-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold tracking-tight text-slate-950 dark:text-slate-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-black/5 bg-white/88 p-5 shadow-[0_30px_90px_-46px_rgba(15,23,42,0.45)] backdrop-blur-sm dark:border-white/10 dark:bg-white/6 sm:p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              {categoryIcons.map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.5rem] border border-black/5 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/5"
                >
                  <div className="flex size-10 items-center justify-center rounded-2xl bg-white text-slate-700 shadow-sm dark:bg-white/10 dark:text-slate-100">
                    <item.icon className="size-5" />
                  </div>
                  <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Clear specs, value cues, and mobile-friendly comparison.
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 rounded-[1.75rem] border border-black/5 bg-[linear-gradient(135deg,rgba(15,23,42,0.98),rgba(15,118,110,0.92))] p-5 text-white">
              <p className="text-sm font-medium text-white/80">
                Realistic mock catalog
              </p>
              <div className="mt-3 grid grid-cols-3 gap-3">
                <Metric label="Products" value="36+" />
                <Metric label="Categories" value="8" />
                <Metric label="Compare limit" value="4" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-slate-500 uppercase dark:text-slate-400">
              Featured picks
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-slate-50">
              A few strong starting points
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-300">
            These cards preview the kind of structured product data the browsing
            and comparison views use throughout the app.
          </p>
        </div>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-[1.75rem] border border-black/5 bg-white p-5 shadow-[0_20px_45px_-32px_rgba(15,23,42,0.45)] dark:border-white/10 dark:bg-white/6"
            >
              <div className="flex items-center justify-between gap-4">
                <Badge variant="outline" className="rounded-full text-slate-600">
                  {product.category}
                </Badge>
                <Badge className="rounded-full bg-slate-900 text-white">
                  {product.bestFor}
                </Badge>
              </div>
              <h3 className="mt-5 text-xl font-semibold tracking-tight text-slate-950 dark:text-slate-100">
                {product.name}
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                {product.summary}
              </p>
              <div className="mt-6 flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-medium tracking-wide text-slate-500 uppercase dark:text-slate-400">
                    Price
                  </p>
                  <p className="mt-1 text-2xl font-semibold text-slate-950 dark:text-slate-100">
                    {formatCurrency(product.price)}
                  </p>
                </div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  {product.display}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-white/8 p-3">
      <p className="text-xs font-medium tracking-wide text-white/70 uppercase">
        {label}
      </p>
      <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
    </div>
  )
}
