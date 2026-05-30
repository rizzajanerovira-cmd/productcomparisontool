export const categories = [
  "Smartphones",
  "Laptops",
  "Tablets",
  "Smartwatches",
  "Earbuds",
  "Cameras",
  "Gaming Consoles",
  "TVs/Monitors",
] as const

export const sortOptions = [
  "featured",
  "price",
  "rating",
  "battery",
  "performance",
] as const

export type Category = (typeof categories)[number]
export type SortOption = (typeof sortOptions)[number]

export type Product = {
  id: string
  name: string
  category: Category
  imageUrl?: string
  price: number
  rating: number
  reviewCount: number
  processor: string
  ram: string
  ramGb: number
  storage: string
  storageGb: number
  display: string
  battery: string
  batteryScore: number
  benchmark: string
  benchmarkScore: number
  performance: string
  performanceScore: number
  camera: string
  weight: string
  weightGrams: number
  warranty: string
  warrantyMonths: number
  bestFor: string
  pros: string[]
  cons: string[]
  summary: string
  imageLabel: string
  tags: string[]
  featured?: boolean
}
