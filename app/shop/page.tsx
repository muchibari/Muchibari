'use client'

import { Suspense, useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Filter, X } from 'lucide-react'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/product-card'

const categories = [
  { id: 'all', label: 'All Products', labelBn: 'সকল পণ্য' },
  { id: 'men', label: 'Men', labelBn: 'পুরুষ' },
  { id: 'women', label: 'Women', labelBn: 'মহিলা' },
  { id: 'casual', label: 'Casual', labelBn: 'ক্যাজুয়াল' },
  { id: 'formal', label: 'Formal', labelBn: 'ফর্মাল' },
  { id: 'accessories', label: 'Accessories', labelBn: 'এক্সেসরিজ' },
]

function ShopContent() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'

  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products
    return products.filter((product) => product.category === selectedCategory)
  }, [selectedCategory])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Button */}
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="lg:hidden flex items-center justify-center gap-2 bg-card border border-border rounded-lg px-4 py-3 font-medium"
        >
          <Filter className="w-5 h-5" />
          Filter by Category
        </button>

        {/* Mobile Filter Sidebar */}
        {isMobileFilterOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-foreground/50">
            <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-background p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-lg">Categories</h2>
                <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 hover:bg-muted rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => { setSelectedCategory(category.id); setIsMobileFilterOpen(false) }}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                      selectedCategory === category.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                    }`}
                  >
                    <span className="block font-medium">{category.label}</span>
                    <span className="block text-sm opacity-70">{category.labelBn}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 bg-card rounded-xl p-6 shadow-sm">
            <h2 className="font-semibold text-lg mb-4">Categories</h2>
            <nav className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors ${
                    selectedCategory === category.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                  }`}
                >
                  <span className="block font-medium">{category.label}</span>
                  <span className="block text-sm opacity-70">{category.labelBn}</span>
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground">
              Showing <span className="font-semibold text-foreground">{filteredProducts.length}</span> products
            </p>
            <select
              className="bg-card border border-border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              defaultValue="featured"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">No products found in this category.</p>
              <button onClick={() => setSelectedCategory('all')} className="mt-4 text-primary font-medium hover:underline">
                View all products
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ShopPage() {
  return (
    <div className="min-h-screen">
      <div className="bg-primary py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-serif text-3xl lg:text-4xl font-bold text-primary-foreground">
            Shop Our Collection
          </h1>
          <p className="mt-2 text-primary-foreground/80">
            আমাদের সংগ্রহ থেকে আপনার পছন্দের পণ্য বেছে নিন
          </p>
        </div>
      </div>

      <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Loading...</div>}>
        <ShopContent />
      </Suspense>
    </div>
  )
}