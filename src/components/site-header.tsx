"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Scale, Search, Sparkles } from "lucide-react"

import { useComparison } from "@/components/providers/comparison-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/browse", label: "Browse" },
  { href: "/compare", label: "Compare" },
]

export function SiteHeader() {
  const pathname = usePathname()
  const { compareCount } = useComparison()

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 bg-white/80 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/75">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f172a,#0f766e)] text-white shadow-sm">
            <Scale className="size-5" />
          </div>
          <div>
            <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-100">
              Gadget Compare
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Compare before you commit
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-950"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/8 dark:hover:text-slate-100"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/browse"
            className={cn(
              buttonVariants({ variant: "outline", size: "default" }),
              "hidden rounded-full border-slate-200 bg-white text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-100 sm:inline-flex"
            )}
          >
            <Search className="size-4" />
            Explore
          </Link>
          <Link
            href="/compare"
            className={cn(
              buttonVariants({ size: "default" }),
              "rounded-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
            )}
          >
            <Sparkles className="size-4" />
            Compare
            <Badge
              variant="secondary"
              className="ml-1 rounded-full bg-white/16 px-1.5 text-[11px] text-white"
            >
              {compareCount}
            </Badge>
          </Link>
        </div>
      </div>
    </header>
  )
}
