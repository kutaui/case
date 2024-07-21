import { Product, CartItem, Context } from '@/lib/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

const defaultContext: Context = {
	cartItems: [],
	setCartItems: () => {},
	totalPrice: 0,
	qty: 1,
	onAdd: () => {},
	toggleCartItemQuantity: () => {},
	onRemove: () => {},
}

export const CartContext = createContext<Context>(defaultContext)

export const CartContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [cartItems, setCartItems] = useState<CartItem[]>([])
	const [totalPrice, setTotalPrice] = useState<number>(0)
	const [qty, setQty] = useState(1)
	const { toast } = useToast()

	useEffect(() => {
		const cartFromLocalStorage = localStorage.getItem('cartItems')
		if (cartFromLocalStorage) {
			try {
				const { cartItems, totalPrice } = JSON.parse(cartFromLocalStorage)
				if (Array.isArray(cartItems) && cartItems.length > 0) {
					setCartItems(cartItems)
					setTotalPrice(Number(totalPrice) || 0)
				}
			} catch (error) {
				console.error('Error parsing cart data from localStorage:', error)
			}
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('cartItems', JSON.stringify({ cartItems, totalPrice }))
	}, [cartItems, totalPrice])

	const calculateTotalPrice = (items: CartItem[]) => {
		return items.reduce((total, item) => total + item.price * item.quantity, 0)
	}

	const onAdd = (product: Product, quantity: number) => {
		const checkProductInCart = cartItems.find(
			(item: CartItem) => item.id === product.id
		)

		let updatedCartItems: CartItem[]
		if (checkProductInCart) {
			updatedCartItems = cartItems.map((item) => {
				if (item.id === product.id) {
					return { ...item, quantity: item.quantity + quantity }
				}
				return item
			})
		} else {
			const newItem: CartItem = { ...product, quantity }
			updatedCartItems = [...cartItems, newItem]
		}

		setCartItems(updatedCartItems)
		setTotalPrice(calculateTotalPrice(updatedCartItems))
		setQty(1)

		toast({
			title: 'Success',
			description: `${quantity} ${product.name} added to the cart.`,
		})
	}

	const onRemove = (product: Product) => {
		const updatedCartItems = cartItems.filter((item) => item.id !== product.id)
		setCartItems(updatedCartItems)
		setTotalPrice(calculateTotalPrice(updatedCartItems))
		toast({
			title: 'Success',
			description: `${product.name} removed from cart.`,
		})
	}

	const toggleCartItemQuantity = (id: number, value: 'inc' | 'dec') => {
		const updatedCartItems = cartItems.map((item) => {
			if (item.id === id) {
				return {
					...item,
					quantity:
						value === 'inc'
							? item.quantity + 1
							: Math.max(1, item.quantity - 1),
				}
			}
			return item
		})

		setCartItems(updatedCartItems)
		setTotalPrice(calculateTotalPrice(updatedCartItems))
	}

	const contextValue: Context = {
		cartItems,
		setCartItems,
		totalPrice,
		qty,
		onAdd,
		toggleCartItemQuantity,
		onRemove,
	}

	return (
		<CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
	)
}

const queryClient = new QueryClient()

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
