"use client"

import { ArrowDownWideNarrow, Search } from "lucide-react"

import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { categories, type Category, type SortOption } from "@/lib/types"

export function FilterToolbar({
  search,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
}: {
  search: string
  onSearchChange: (value: string) => void
  category: Category | "all"
  onCategoryChange: (value: Category | "all") => void
  sortBy: SortOption
  onSortChange: (value: SortOption) => void
}) {
  return (
    <div className="rounded-[2rem] border border-black/5 bg-white/90 p-4 shadow-[0_18px_45px_-32px_rgba(15,23,42,0.45)] sm:p-5">
      <div className="grid gap-4 lg:grid-cols-[1.5fr_0.9fr_0.9fr]">
        <label className="block">
          <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <Search className="size-4 text-slate-500" />
            Search products
          </span>
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by product, chip, best-for tag, or category"
            className="h-11 rounded-2xl border-slate-200 bg-slate-50 px-4 text-sm text-slate-900 placeholder:text-slate-400"
          />
        </label>

        <div>
          <span className="mb-2 block text-sm font-medium text-slate-700">
            Category
          </span>
          <Select value={category} onValueChange={(value) => onCategoryChange(value as Category | "all")}>
            <SelectTrigger className="h-11 w-full rounded-2xl border-slate-200 bg-slate-50 px-4 text-slate-900">
              <SelectValue placeholder="All categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All categories</SelectItem>
              {categories.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <span className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
            <ArrowDownWideNarrow className="size-4 text-slate-500" />
            Sort by
          </span>
          <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
            <SelectTrigger className="h-11 w-full rounded-2xl border-slate-200 bg-slate-50 px-4 text-slate-900">
              <SelectValue placeholder="Featured" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
              <SelectItem value="battery">Battery</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
