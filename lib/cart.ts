export type CartItem = {
  id: number
  name: string
  price: number
  image_url: string
  quantity: number
}

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  const cart = localStorage.getItem('cart')
  return cart ? JSON.parse(cart) : []
}

export function addToCart(item: Omit<CartItem, 'quantity'>) {
  const cart = getCart()
  const existing = cart.find(i => i.id === item.id)
  if (existing) {
    existing.quantity += 1
  } else {
    cart.push({ ...item, quantity: 1 })
  }
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function removeFromCart(id: number) {
  const cart = getCart().filter(i => i.id !== id)
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function updateQuantity(id: number, quantity: number) {
  const cart = getCart().map(i => i.id === id ? { ...i, quantity } : i)
  localStorage.setItem('cart', JSON.stringify(cart))
}

export function clearCart() {
  localStorage.removeItem('cart')
}

export function getCartTotal(): number {
  return getCart().reduce((total, item) => total + item.price * item.quantity, 0)
}