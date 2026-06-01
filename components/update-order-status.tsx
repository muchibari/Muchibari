'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export function UpdateOrderStatus({ orderId, currentStatus }: { orderId: number, currentStatus: string }) {
  const router = useRouter()

  async function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    await supabase.from('orders').update({ status: e.target.value }).eq('id', orderId)
    router.refresh()
  }

  return (
    <select value={currentStatus} onChange={handleChange}
      className="mt-1 text-xs border border-gray-300 rounded-lg px-2 py-1 focus:outline-none">
      <option value="pending">Pending</option>
      <option value="confirmed">Confirmed</option>
      <option value="shipped">Shipped</option>
      <option value="delivered">Delivered</option>
    </select>
  )
}