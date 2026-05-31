'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { getCart, removeFromCart, updateQuantity, getCartTotal, CartItem } from '@/lib/cart'
import { supabase } from '@/lib/supabase'

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setCart(getCart())
  }, [])

  function handleRemove(id: number) {
    removeFromCart(id)
    setCart(getCart())
  }

  function handleQuantity(id: number, quantity: number) {
    if (quantity < 1) return
    updateQuantity(id, quantity)
    setCart(getCart())
  }

  async function handleCheckout() {
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth/login')
      return
    }
    router.push('/checkout')
  }

  if (cart.length === 0) {
    return (
      <div className="pb-24 bg-[#FAF5EF] min-h-screen flex flex-col items-center justify-center gap-4">
        <span className="text-6xl">🛒</span>
        <p className="text-gray-500 font-medium">Your cart is empty</p>
        <Link href="/shop" className="bg-[#5C3317] text-white px-6 py-3 rounded-xl font-semibold">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div className="pb-24 bg-[#FAF5EF] min-h-screen">
      <div className="px-4 pt-6 pb-2">
        <h1 className="text-xl font-bold text-[#5C3317]">My Cart</h1>
      </div>

      <div className="px-4 space-y-3 mt-2">
        {cart.map((item) => (
          <div key={item.id} className="bg-white rounded-xl p-4 flex gap-3 items-center shadow-sm">
            {item.image_url ? (
              <img src={item.image_url} alt={item.name}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0" />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-2xl flex-shrink-0">👟</div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-800 truncate">{item.name}</p>
              <p className="text-[#5C3317] font-bold">৳{item.price}</p>
              <div className="flex items-center gap-2 mt-2">
                <button onClick={() => handleQuantity(item.id, item.quantity - 1)}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold">−</button>
                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                <button onClick={() => handleQuantity(item.id, item.quantity + 1)}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-lg font-bold">+</button>
              </div>
            </div>
            <button onClick={() => handleRemove(item.id)}
              className="text-red-400 hover:text-red-600 text-xl flex-shrink-0">✕</button>
          </div>
        ))}
      </div>

      {/* Total + Checkout */}
      <div className="mx-4 mt-6 bg-white rounded-xl p-5 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold text-gray-700">Total</span>
          <span className="text-xl font-bold text-[#5C3317]">৳{getCartTotal()}</span>
        </div>
        <button onClick={handleCheckout} disabled={loading}
          className="w-full bg-[#5C3317] text-white py-4 rounded-xl font-semibold text-base hover:bg-[#C4874A] transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}