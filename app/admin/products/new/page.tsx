'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function NewProductPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [originalPrice, setOriginalPrice] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [categories, setCategories] = useState<any[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [sizes, setSizes] = useState('')
  const [colors, setColors] = useState('')
  const [isHotDeal, setIsHotDeal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    supabase.from('categories').select('*').then(({ data, error }) => {
      if (error) console.error('Categories fetch error:', error)
      setCategories(data ?? [])
    })
  }, [])

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  async function handleSubmit() {
    setLoading(true)
    setError('')

    let image_url = ''

    if (imageFile) {
      const fileExt = imageFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(fileName, imageFile)

      if (uploadError) {
        setError('Image upload failed: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('products')
        .getPublicUrl(fileName)
      image_url = urlData.publicUrl
    }

    const { error: insertError } = await supabase.from('products').insert({
      name,
      description,
      price: parseFloat(price),
      original_price: originalPrice ? parseFloat(originalPrice) : null,
      category_id: categoryId ? parseInt(categoryId) : null,
      image_url,
      in_stock: true,
      sizes: sizes.trim() || null,
      colors: colors.trim() || null,
      is_hot_deal: isHotDeal,
    })

    if (insertError) {
      setError(insertError.message)
      setLoading(false)
    } else {
      router.push('/admin/products')
    }
  }

  const discount = originalPrice && price
    ? Math.round(((parseFloat(originalPrice) - parseFloat(price)) / parseFloat(originalPrice)) * 100)
    : 0

  return (
    <div className="min-h-screen bg-[#FAF5EF] p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin/products" className="text-[#5C3317] hover:underline text-sm">← Back</Link>
        <h1 className="text-2xl font-bold text-[#5C3317]">Add Product</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C4874A]" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea value={description} onChange={e => setDescription(e.target.value)} rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C4874A]" />
          </div>

          {/* Price Row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (৳) *</label>
              <input type="number" value={price} onChange={e => setPrice(e.target.value)}
                placeholder="e.g. 2500"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C4874A]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Original Price (৳)
                <span className="text-gray-400 font-normal ml-1">optional</span>
              </label>
              <input type="number" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)}
                placeholder="e.g. 3500"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C4874A]" />
            </div>
          </div>

          {/* Discount preview */}
          {discount > 0 && (
            <p className="text-sm text-green-600 font-medium">
              ✓ This product will show a <span className="font-bold">{discount}% OFF</span> tag
            </p>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select value={categoryId} onChange={e => setCategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C4874A]">
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sizes
              <span className="text-gray-400 font-normal ml-1">optional — comma separated</span>
            </label>
            <input type="text" value={sizes} onChange={e => setSizes(e.target.value)}
              placeholder="e.g. 39,40,41,42,43"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C4874A]" />
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Colors
              <span className="text-gray-400 font-normal ml-1">optional — comma separated</span>
            </label>
            <input type="text" value={colors} onChange={e => setColors(e.target.value)}
              placeholder="e.g. Black,Brown,Tan"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#C4874A]" />
          </div>

          {/* Hot Deal Toggle */}
          <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
            <div>
              <p className="text-sm font-medium text-gray-700">🔥 Hot Deal</p>
              <p className="text-xs text-gray-400 mt-0.5">Show this product in the Hot Deals slider on homepage</p>
            </div>
            <button
              type="button"
              onClick={() => setIsHotDeal(!isHotDeal)}
              className={`relative w-12 h-6 rounded-full transition-colors ${isHotDeal ? 'bg-orange-500' : 'bg-gray-300'}`}
            >
              <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${isHotDeal ? 'translate-x-7' : 'translate-x-1'}`} />
            </button>
          </div>

          {/* Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2" />
            {imagePreview && (
              <img src={imagePreview} alt="Preview"
                className="mt-3 w-32 h-32 object-cover rounded-lg" />
            )}
          </div>

          <button onClick={handleSubmit} disabled={loading || !name || !price}
            className="w-full bg-[#5C3317] text-white py-3 rounded-lg font-semibold hover:bg-[#C4874A] transition-colors disabled:opacity-50">
            {loading ? 'Adding...' : 'Add Product'}
          </button>
        </div>
      </div>
    </div>
  )
}