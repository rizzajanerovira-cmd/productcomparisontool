"use client"

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"
import { toast } from "sonner"

import { productMap } from "@/lib/mock-data"
import type { Product } from "@/lib/types"

const STORAGE_KEY = "gadget-comparison-selection"
const MAX_COMPARE_ITEMS = 4

type ComparisonContextValue = {
  selectedIds: string[]
  selectedProducts: Product[]
  compareCount: number
  maxCompareItems: number
  canCompare: boolean
  isHydrated: boolean
  hasProduct: (productId: string) => boolean
  addProduct: (product: Product) => void
  removeProduct: (productId: string) => void
  clearComparison: () => void
}

const ComparisonContext = createContext<ComparisonContextValue | null>(null)

export function ComparisonProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    const syncFromStorage = () => {
      const stored = window.localStorage.getItem(STORAGE_KEY)

      if (!stored) {
        setSelectedIds([])
        setIsHydrated(true)
        return
      }

      try {
        const parsed = JSON.parse(stored) as string[]
        setSelectedIds(parsed.filter((id) => productMap[id]))
      } catch {
        window.localStorage.removeItem(STORAGE_KEY)
        setSelectedIds([])
      } finally {
        setIsHydrated(true)
      }
    }

    const timeoutId = window.setTimeout(syncFromStorage, 0)
    return () => window.clearTimeout(timeoutId)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined" || !isHydrated) {
      return
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds))
  }, [isHydrated, selectedIds])

  const selectedProducts = useMemo(
    () => selectedIds.map((id) => productMap[id]).filter(Boolean),
    [selectedIds]
  )

  const value = useMemo<ComparisonContextValue>(
    () => ({
      selectedIds,
      selectedProducts,
      compareCount: selectedIds.length,
      maxCompareItems: MAX_COMPARE_ITEMS,
      canCompare: selectedIds.length >= 2,
      isHydrated,
      hasProduct: (productId) => selectedIds.includes(productId),
      addProduct: (product) => {
        setSelectedIds((current) => {
          if (current.includes(product.id)) {
            toast.info("Already added", {
              description: `${product.name} is already in your comparison list.`,
            })
            return current
          }

          if (current.length >= MAX_COMPARE_ITEMS) {
            toast.warning("Comparison limit reached", {
              description:
                "You can compare up to 4 gadgets at a time. Remove one to add another.",
            })
            return current
          }

          toast.success("Added to comparison", {
            description: `${product.name} is ready to compare.`,
          })

          return [...current, product.id]
        })
      },
      removeProduct: (productId) => {
        setSelectedIds((current) =>
          current.filter((currentId) => currentId !== productId)
        )
      },
      clearComparison: () => {
        setSelectedIds([])
        toast.success("Comparison cleared", {
          description: "Your selected gadgets were removed.",
        })
      },
    }),
    [isHydrated, selectedIds, selectedProducts]
  )

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  )
}

export function useComparison() {
  const context = useContext(ComparisonContext)

  if (!context) {
    throw new Error("useComparison must be used within ComparisonProvider")
  }

  return context
}
