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
        ) : null}
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
