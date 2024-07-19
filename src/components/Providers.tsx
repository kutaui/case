import { Product, CartItem, Context } from '@/types'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext, useEffect, useState } from 'react'
import { useToast } from '@/components/ui/use-toast'

const defaultContext: Context = {
	cartItems: [],
	setCartItems: () => {},
	totalPrice: 0,
	setTotalPrice: () => {},
	qty: 1,
	setQty: () => {},
	incQty: () => {},
	decQty: () => {},
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
	const [totalPrice, setTotalPrice] = useState(0)
	const [qty, setQty] = useState(1)
	const { toast } = useToast()

	useEffect(() => {
		const cartFromLocalStorage = localStorage.getItem('cartItems')
		if (cartFromLocalStorage) {
			const { cartItems, totalPrice } = JSON.parse(cartFromLocalStorage)
			setCartItems(cartItems)
			setTotalPrice(totalPrice)
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('cartItems', JSON.stringify({ cartItems, totalPrice }))
	}, [cartItems, totalPrice])

	const onAdd = (product: Product, quantity: number) => {
		const checkProductInCart = cartItems.find(
			(item: CartItem) => item.id === product.id
		)
		setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity)
		setQty(1)

		if (checkProductInCart) {
			const updatedCartItems = cartItems.map((item) => {
				if (item.id === product.id) {
					return { ...item, quantity: item.quantity + quantity }
				}
				return item
			})
			setCartItems(updatedCartItems)
		} else {
			const newItem: CartItem = { ...product, quantity }
			setCartItems([...cartItems, newItem])
		}
		toast({
			title: 'Success',
			description: `${qty} ${product.name} added to the cart.`,
		})
	}

	const onRemove = (product: Product) => {
		const foundProduct = cartItems.find((item) => item.id === product.id)
		if (foundProduct) {
			const newCartItems = cartItems.filter((item) => item.id !== product.id)

			setTotalPrice(
				(prevTotalPrice) =>
					prevTotalPrice - foundProduct.price * foundProduct.quantity
			)
			setCartItems(newCartItems)
		}
	}

	const toggleCartItemQuantity = (id: number, value: 'inc' | 'dec') => {
		const foundProduct = cartItems.find((item) => item.id === id)
		if (foundProduct) {
			if (value === 'inc') {
				const updatedData = cartItems.map((item) =>
					item.id === id ? { ...item, quantity: item.quantity + 1 } : item
				)
				setCartItems(updatedData)
				setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
			} else if (value === 'dec') {
				if (foundProduct.quantity > 1) {
					const updatedData = cartItems.map((item) =>
						item.id === id
							? {
									...item,
									quantity: item.quantity - 1,
								}
							: item
					)
					setCartItems(updatedData)
					setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
				}
			}
		}
	}

	const incQty = () => {
		setQty((prev) => prev + 1)
	}

	const decQty = () => {
		setQty((prev) => {
			if (prev - 1 < 1) return 1
			return prev - 1
		})
	}

	const contextValue: Context = {
		cartItems,
		setCartItems,
		totalPrice,
		setTotalPrice,
		qty,
		setQty,
		incQty,
		decQty,
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
