'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

export default function AdminBannersPage() {
  const router = useRouter()

  const [mobileFile, setMobileFile] = useState<File | null>(null)
  const [mobilePreview, setMobilePreview] = useState('')
  const [currentMobileUrl, setCurrentMobileUrl] = useState<string | null>(null)

  const [desktopFile, setDesktopFile] = useState<File | null>(null)
  const [desktopPreview, setDesktopPreview] = useState('')
  const [currentDesktopUrl, setCurrentDesktopUrl] = useState<string | null>(null)

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    supabase.from('hero_banner').select('mobile_image_url, desktop_image_url').eq('id', 1).single()
      .then(({ data }) => {
        if (data) {
          setCurrentMobileUrl(data.mobile_image_url)
          setCurrentDesktopUrl(data.desktop_image_url)
        }
      })
  }, [])

  function handleMobileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setMobileFile(file)
      setMobilePreview(URL.createObjectURL(file))
    }
  }

  function handleDesktopChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setDesktopFile(file)
      setDesktopPreview(URL.createObjectURL(file))
    }
  }

  async function uploadImage(file: File, path: string): Promise<string> {
    const ext = file.name.split('.').pop()
    const fullPath = `${path}.${ext}`

    const { error: uploadError } = await supabase.storage
      .from('banners')
      .upload(fullPath, file, { upsert: true })

    if (uploadError) throw new Error(uploadError.message)

    const { data: { publicUrl } } = supabase.storage.from('banners').getPublicUrl(fullPath)
    return `${publicUrl}?t=${Date.now()}`
  }

  async function handleSubmit() {
    if (!mobileFile && !desktopFile) {
      setError('Please select at least one image to upload.')
      return
    }

    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const updates: Record<string, string> = {}

      if (mobileFile) {
        updates.mobile_image_url = await uploadImage(mobileFile, 'banner-mobile')
        setCurrentMobileUrl(updates.mobile_image_url)
      }

      if (desktopFile) {
        updates.desktop_image_url = await uploadImage(desktopFile, 'banner-desktop')
        setCurrentDesktopUrl(updates.desktop_image_url)
      }

      const { error: dbError } = await supabase
        .from('hero_banner')
        .upsert({ id: 1, ...updates, updated_at: new Date().toISOString() })

      if (dbError) throw new Error(dbError.message)

      setMobileFile(null)
      setDesktopFile(null)
      setMobilePreview('')
      setDesktopPreview('')
      setSuccess(true)
    } catch (err: any) {
      setError(err.message)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#FAF5EF] p-6">
      <div className="flex items-center gap-3 mb-6">
        <Link href="/admin" className="text-[#5C3317] hover:underline text-sm">← Back</Link>
        <h1 className="text-2xl font-bold text-[#5C3317]">Hero Banner</h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 max-w-2xl">
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-4">✓ Banner updated successfully.</p>}

        <div className="space-y-6">

          {/* Mobile Banner */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Banner
              <span className="text-gray-400 font-normal ml-1">recommended 800×400px</span>
            </label>

            {/* current */}
            {!mobilePreview && (
              currentMobileUrl ? (
                <img src={currentMobileUrl} alt="Current mobile banner"
                  className="mb-3 w-full h-32 object-cover rounded-lg" />
              ) : (
                <div className="mb-3 w-full h-32 rounded-lg bg-gradient-to-r from-[#5C3317] to-[#C4874A] flex items-center justify-center">
                  <span className="text-white text-xs font-medium">No image set — default gradient showing</span>
                </div>
              )
            )}

            {/* preview */}
            {mobilePreview && (
              <img src={mobilePreview} alt="Mobile preview"
                className="mb-3 w-full h-32 object-cover rounded-lg" />
            )}

            <input type="file" accept="image/*" onChange={handleMobileChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          </div>

          {/* Desktop Banner */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Desktop Banner
              <span className="text-gray-400 font-normal ml-1">recommended 1600×500px</span>
            </label>

            {/* current */}
            {!desktopPreview && (
              currentDesktopUrl ? (
                <img src={currentDesktopUrl} alt="Current desktop banner"
                  className="mb-3 w-full h-32 object-cover rounded-lg" />
              ) : (
                <div className="mb-3 w-full h-32 rounded-lg bg-gradient-to-r from-[#5C3317] to-[#C4874A] flex items-center justify-center">
                  <span className="text-white text-xs font-medium">No image set — default gradient showing</span>
                </div>
              )
            )}

            {/* preview */}
            {desktopPreview && (
              <img src={desktopPreview} alt="Desktop preview"
                className="mb-3 w-full h-32 object-cover rounded-lg" />
            )}

            <input type="file" accept="image/*" onChange={handleDesktopChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2" />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading || (!mobileFile && !desktopFile)}
            className="w-full bg-[#5C3317] text-white py-3 rounded-lg font-semibold hover:bg-[#C4874A] transition-colors disabled:opacity-50"
          >
            {loading ? 'Uploading...' : 'Save Banner'}
          </button>
        </div>
      </div>
    </div>
  )
}