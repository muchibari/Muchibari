'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function EditProductForm({ product, categories }: { product: any, categories: any[] }) {
  const router = useRouter()
  const [name, setName] = useState(product.name)
  const [description, setDescription] = useState(product.description ?? '')
  const [price, setPrice] = useState(product.price.toString())
  const [originalPrice, setOriginalPrice] = useState(product.original_price?.toString() ?? '')
  const [categoryId, setCategoryId] = useState(product.category_id?.toString() ?? '')
  const [inStock, setInStock] = useState(product.in_stock)
  const [isHotDeal, setIsHotDeal] = useState(product.is_hot_deal ?? false)
  const [sizes, setSizes] = useState(product.sizes ?? '')
  const [colors, setColors] = useState(product.colors ?? '')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState(product.image_url ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  const discount = originalPrice && price
    ? Math.round(((parseFloat(originalPrice) - parseFloat(price)) / parseFloat(originalPrice)) * 100)
    : 0

  async function handleSave() {
    setLoading(true)
    setError('')

    let image_url = product.image_url

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
      const { data: urlData } = supabase.storage.from('products').getPublicUrl(fileName)
      image_url = urlData.publicUrl
    }

    const { error: updateError } = await supabase.from('products').update({
      name,
      description,
      price: parseFloat(price),
      original_price: originalPrice ? parseFloat(originalPrice) : null,
      category_id: categoryId ? parseInt(categoryId) : null,
      image_url,
      in_stock: inStock,
      is_hot_deal: isHotDeal,
      sizes: sizes.trim() || null,
      colors: colors.trim() || null,
    }).eq('id', product.id)

    if (updateError) {
      setError(updateError.message)
      setLoading(false)
    } else {
      router.push('/admin/products')
    }
  }

  async function handleDelete() {
    if (!confirm('Delete this product?')) return
    await supabase.from('products').delete().eq('id', product.id)
    router.push('/admin/products')
  }

  return (
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

        {/* In Stock + Hot Deal */}
        <div className="flex items-center gap-3">
          <input type="checkbox" id="inStock" checked={inStock} onChange={e => setInStock(e.target.checked)}
            className="w-4 h-4" />
          <label htmlFor="inStock" className="text-sm font-medium text-gray-700">In Stock</label>
        </div>

        <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-lg px-4 py-3">
          <div>
            <p className="text-sm font-medium text-gray-700">🔥 Hot Deal</p>
            <p className="text-xs text-gray-400 mt-0.5">Show in the Hot Deals slider on homepage</p>
          </div>
          <button
  type="button"
  onClick={() => setIsHotDeal(!isHotDeal)}
  style={{
    width: 48,
    height: 26,
    borderRadius: 999,
    backgroundColor: isHotDeal ? '#f97316' : '#d1d5db',
    position: 'relative',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    flexShrink: 0,
  }}
>
  <span style={{
    position: 'absolute',
    top: 3,
    left: isHotDeal ? 25 : 3,
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: 'white',
    boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    transition: 'left 0.2s',
    display: 'block',
  }} />
</button>
        </div>

        {/* Image */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="w-32 h-32 object-cover rounded-lg mb-3" />
          )}
          <input type="file" accept="image/*" onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2" />
        </div>

        <div className="flex gap-3">
          <button onClick={handleSave} disabled={loading}
            className="flex-1 bg-[#5C3317] text-white py-3 rounded-lg font-semibold hover:bg-[#C4874A] transition-colors disabled:opacity-50">
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button onClick={handleDelete}
            className="px-6 py-3 border border-red-300 text-red-500 rounded-lg font-semibold hover:bg-red-50 transition-colors">
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}