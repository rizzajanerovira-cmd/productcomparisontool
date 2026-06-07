import Link from "next/link"
import { ArrowRight, SearchX } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function EmptyState({
  title,
  description,
  actionLabel,
  actionHref,
}: {
  title: string
  description: string
  actionLabel: string
  actionHref: string
}) {
  return (
    <div className="rounded-[2rem] border border-dashed border-slate-200 bg-white/80 px-6 py-14 text-center shadow-[0_18px_40px_-32px_rgba(15,23,42,0.4)] dark:border-white/12 dark:bg-white/6">
      <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-600 dark:bg-white/8 dark:text-slate-200">
        <SearchX className="size-7" />
      </div>
      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-slate-950 dark:text-slate-100">
        {title}
      </h3>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
        {description}
      </p>
      <Link
        href={actionHref}
        className={cn(
          buttonVariants({ size: "lg" }),
          "mt-6 inline-flex rounded-full bg-slate-900 px-5 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-950 dark:hover:bg-slate-200"
        )}
      >
        {actionLabel}
        <ArrowRight className="size-4" />
      </Link>
    </div>
  )
}
