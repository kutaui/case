export interface Product {
	id: number
	name: string
	description: string
	image: string
	price: number
	model: string
	brand: string
	createdAt: string
}

export interface CartItem extends Product {
	quantity: number
}

export interface Context {
	cartItems: CartItem[]
	setCartItems: (cart: CartItem[]) => void
	totalPrice: number
	setTotalPrice: (price: number) => void
	qty: number
	setQty: (qty: number) => void
	incQty: () => void
	decQty: () => void
	onAdd: (product: Product, quantity: number) => void
	toggleCartItemQuantity: (id: number, value: 'inc' | 'dec') => void
	onRemove: (product: Product) => void
}
