'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function AddCategoryForm() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  async function handleAdd() {
    if (!name.trim()) return
    setLoading(true)
    setError('')

    const slug = name.toLowerCase().replace(/ /g, '-')
    let image_url: string | null = null

    if (imageFile) {
      const ext = imageFile.name.split('.').pop()
      const path = `${slug}.${ext}`

      const { error: uploadError } = await supabase.storage
        .from('categories')
        .upload(path, imageFile, { upsert: true })

      if (uploadError) {
        setError('Image upload failed: ' + uploadError.message)
        setLoading(false)
        return
      }

      const { data: { publicUrl } } = supabase.storage.from('categories').getPublicUrl(path)
      image_url = publicUrl
    }

    const { error } = await supabase.from('categories').insert({ name, slug, image_url })

    if (error) {
      setError(error.message)
    } else {
      setName('')
      setImageFile(null)
      setImagePreview('')
      router.refresh()
    }

    setLoading(false)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <h2 className="font-semibold text-gray-700 mb-4">Add New Category</h2>
      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      <div className="space-y-3">
        <input
          type="text"
          placeholder="Category name"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#C4874A]"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Image
            <span className="text-gray-400 font-normal ml-1">optional</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview"
              className="mt-2 w-16 h-16 object-cover rounded-lg" />
          )}
        </div>

        <button
          onClick={handleAdd}
          disabled={loading || !name.trim()}
          className="w-full bg-[#5C3317] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#C4874A] transition-colors disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Category'}
        </button>
      </div>
    </div>
  )
}