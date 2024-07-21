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
	qty: number
	onAdd: (product: Product, quantity: number) => void
	toggleCartItemQuantity: (id: number, value: 'inc' | 'dec') => void
	onRemove: (product: Product) => void
}

export interface SearchParams {
	brands?: string
	models?: string
	order?: string
	search?: string
	page?: string
}
