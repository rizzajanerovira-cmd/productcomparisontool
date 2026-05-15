import Image from "next/image"
import {
  Camera,
  Gamepad2,
  Headphones,
  Laptop,
  Monitor,
  Smartphone,
  Tablet,
  Watch,
} from "lucide-react"

import type { Category } from "@/lib/types"
import { cn } from "@/lib/utils"

const iconMap: Record<Category, typeof Smartphone> = {
  Smartphones: Smartphone,
  Laptops: Laptop,
  Tablets: Tablet,
  Smartwatches: Watch,
  Earbuds: Headphones,
  Cameras: Camera,
  "Gaming Consoles": Gamepad2,
  "TVs/Monitors": Monitor,
}

const accentMap: Record<Category, string> = {
  Smartphones: "from-cyan-500/20 via-white to-sky-200/60",
  Laptops: "from-slate-300/40 via-white to-stone-200/60",
  Tablets: "from-emerald-300/30 via-white to-cyan-100/60",
  Smartwatches: "from-orange-200/50 via-white to-amber-100/70",
  Earbuds: "from-rose-200/40 via-white to-fuchsia-100/60",
  Cameras: "from-zinc-300/40 via-white to-slate-200/60",
  "Gaming Consoles": "from-violet-200/40 via-white to-sky-100/60",
  "TVs/Monitors": "from-blue-200/40 via-white to-cyan-100/60",
}

export function ProductMedia({
  category,
  label,
  imageUrl,
  compact = false,
}: {
  category: Category
  label: string
  imageUrl?: string
  compact?: boolean
}) {
  const Icon = iconMap[category]

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.95),rgba(244,244,245,0.82))] shadow-sm",
        compact ? "h-32" : "h-44"
      )}
    >
      <div
        className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-95",
          accentMap[category]
        )}
      />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.03),transparent_45%,rgba(15,118,110,0.06))]" />
      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-center justify-between">
          <div className="rounded-2xl bg-white/80 p-3 text-slate-700 shadow-sm">
            <Icon className={compact ? "size-5" : "size-6"} />
          </div>
          <span className="rounded-full bg-white/70 px-3 py-1 text-[11px] font-medium tracking-wide text-slate-600 uppercase">
            {category}
          </span>
        </div>
        {imageUrl ? (
          <div className="absolute inset-x-4 bottom-4 top-16 flex items-end justify-center">
            <Image
              src={imageUrl}
              alt={label}
              width={420}
              height={320}
              unoptimized
              className={cn(
                "max-w-full object-contain drop-shadow-[0_18px_24px_rgba(15,23,42,0.18)]",
                compact ? "max-h-20" : "max-h-28"
              )}
            />
          </div>
        ) : (
          <MockProductVisual category={category} compact={compact} />
        )}
        <p
          className={cn(
            "max-w-[12rem] text-sm font-medium text-slate-600",
            imageUrl ? "relative z-10 rounded-full bg-white/78 px-3 py-1.5 backdrop-blur-sm" : ""
          )}
        >
          {label}
        </p>
      </div>
    </div>
  )
}

function MockProductVisual({
  category,
  compact,
}: {
  category: Category
  compact: boolean
}) {
  const frameClass = compact ? "scale-[0.88]" : "scale-100"

  if (category === "Smartphones") {
    return (
      <div className={cn("absolute inset-x-5 bottom-4 top-16 flex items-end justify-center", frameClass)}>
        <div className="relative h-24 w-16 rounded-[1.4rem] border border-slate-300/70 bg-[linear-gradient(180deg,#f8fafc,#cbd5e1)] shadow-[0_16px_20px_rgba(15,23,42,0.12)]">
          <div className="absolute left-1/2 top-2 h-1 w-8 -translate-x-1/2 rounded-full bg-slate-300" />
          <div className="absolute inset-[5px] rounded-[1rem] bg-[radial-gradient(circle_at_top,#eff6ff,#dbeafe_46%,#cbd5e1)]" />
          <div className="absolute right-2 top-2 size-3 rounded-full border border-white/70 bg-slate-200 shadow-sm" />
        </div>
      </div>
    )
  }

  if (category === "Laptops") {
    return (
      <div className={cn("absolute inset-x-5 bottom-4 top-16 flex items-end justify-center", frameClass)}>
        <div className="relative">
          <div className="h-16 w-28 rounded-t-[1rem] rounded-b-sm border border-slate-300/70 bg-[linear-gradient(180deg,#f8fafc,#dbeafe)] shadow-[0_16px_20px_rgba(15,23,42,0.12)]" />
          <div className="absolute inset-[6px] rounded-[0.7rem] bg-[radial-gradient(circle_at_top,#ecfeff,#bae6fd_52%,#cbd5e1)]" />
          <div className="mx-auto h-2 w-36 rounded-b-full bg-[linear-gradient(180deg,#cbd5e1,#94a3b8)]" />
        </div>
      </div>
    )
  }

  if (category === "Tablets") {
    return (
      <div className={cn("absolute inset-x-5 bottom-4 top-16 flex items-end justify-center", frameClass)}>
        <div className="relative h-20 w-28 rounded-[1.3rem] border border-slate-300/70 bg-[linear-gradient(180deg,#f8fafc,#dbeafe)] shadow-[0_16px_20px_rgba(15,23,42,0.12)]">
          <div className="absolute inset-[6px] rounded-[1rem] bg-[radial-gradient(circle_at_top,#ecfeff,#bfdbfe_50%,#cbd5e1)]" />
          <div className="absolute right-2 top-1/2 size-1.5 -translate-y-1/2 rounded-full bg-slate-300" />
        </div>
      </div>
    )
  }

  if (category === "Smartwatches") {
    return (
      <div className={cn("absolute inset-x-5 bottom-4 top-16 flex items-end justify-center", frameClass)}>
        <div className="relative flex items-center justify-center">
          <div className="h-20 w-5 rounded-full bg-slate-300/90" />
          <div className="absolute size-16 rounded-[1.6rem] border border-slate-300/70 bg-[radial-gradient(circle_at_top,#fef3c7,#fde68a_38%,#f8fafc)] shadow-[0_16px_20px_rgba(15,23,42,0.12)]">
            <div className="absolute inset-[6px] rounded-[1.15rem] bg-[radial-gradient(circle_at_top,#fff7ed,#fde68a_42%,#e2e8f0)]" />
          </div>
        </div>
      </div>
    )
  }

  if (category === "Earbuds") {
    return (
      <div className={cn("absolute inset-x-5 bottom-4 top-16 flex items-end justify-center", frameClass)}>
        <div className="relative h-20 w-24 rounded-[1.6rem] bg-[linear-gradient(180deg,#fff1f2,#fecdd3)] shadow-[0_16px_20px_rgba(15,23,42,0.12)]">
          <div className="absolute left-5 top-6 h-8 w-5 rounded-full bg-white shadow-sm" />
          <div className="absolute right-5 top-6 h-8 w-5 rounded-full bg-white shadow-sm" />
          <div className="absolute left-6 top-11 h-4 w-3 rounded-full bg-slate-100" />
          <div className="absolute right-6 top-11 h-4 w-3 rounded-full bg-slate-100" />
        </div>
      </div>
    )
  }

  if (category === "Cameras") {
    return (
      <div className={cn("absolute inset-x-5 bottom-4 top-16 flex items-end justify-center", frameClass)}>
        <div className="relative h-16 w-28 rounded-[1.2rem] bg-[linear-gradient(180deg,#334155,#0f172a)] shadow-[0_18px_24px_rgba(15,23,42,0.2)]">
          <div className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-[6px] border-slate-400 bg-slate-900" />
          <div className="absolute right-4 top-4 size-3 rounded-full bg-slate-300" />
          <div className="absolute left-5 top-3 h-3 w-6 rounded-full bg-slate-500" />
        </div>
      </div>
    )
  }

  if (category === "Gaming Consoles") {
    return (
      <div className={cn("absolute inset-x-5 bottom-4 top-16 flex items-end justify-center", frameClass)}>
        <div className="relative flex items-end gap-4">
          <div className="h-24 w-10 rounded-[1.1rem] bg-[linear-gradient(180deg,#111827,#334155)] shadow-[0_16px_20px_rgba(15,23,42,0.12)]" />
          <div className="mb-1 h-10 w-16 rounded-[1rem] bg-[linear-gradient(180deg,#f8fafc,#cbd5e1)] shadow-[0_16px_20px_rgba(15,23,42,0.12)]" />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("absolute inset-x-5 bottom-4 top-16 flex items-end justify-center", frameClass)}>
      <div className="relative">
        <div className="h-16 w-28 rounded-[1rem] border border-slate-300/70 bg-[linear-gradient(180deg,#e0f2fe,#bae6fd)] shadow-[0_16px_20px_rgba(15,23,42,0.12)]" />
        <div className="absolute inset-[6px] rounded-[0.7rem] bg-[radial-gradient(circle_at_center,#f8fafc,#dbeafe_55%,#bfdbfe)]" />
        <div className="mx-auto h-2 w-10 rounded-b-full bg-slate-400" />
      </div>
    </div>
  )
}
