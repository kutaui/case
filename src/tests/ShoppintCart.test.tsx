import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '../lib/test-utils'
import { CartContext } from '@/components/Providers'
import { ShoppingCart } from '@/components/ShoppingCart'

const mockCartItems = [
	{ id: 1, name: 'Product 1', price: 10, quantity: 2 },
	{ id: 2, name: 'Product 2', price: 20, quantity: 1 },
]

const mockContext = {
	totalPrice: 30.00,
	cartItems: mockCartItems,
	toggleCartItemQuantity: vi.fn(),
	onRemove: vi.fn(),
}

describe('ShoppingCart', () => {
	it('renders cart items', () => {
		render(
			<CartContext.Provider value={mockContext}>
				<ShoppingCart />
			</CartContext.Provider>
		)

		expect(screen.getByText('Product 1')).toBeInTheDocument()
		expect(screen.getByText('Product 2')).toBeInTheDocument()
	})


    it('calls toggleCartItemQuantity when increasing or decreasing quantity', () => {
        render(
            <CartContext.Provider value={mockContext}>
                <ShoppingCart />
            </CartContext.Provider>
        )
    
        const increaseButtons = screen.getAllByTestId('increase-quantity')
        const decreaseButtons = screen.getAllByTestId('decrease-quantity')
    
        fireEvent.click(decreaseButtons[0])
        expect(mockContext.toggleCartItemQuantity).toHaveBeenCalledWith(1, 'dec')
    
        fireEvent.click(increaseButtons[0])
        expect(mockContext.toggleCartItemQuantity).toHaveBeenCalledWith(1, 'inc')
    })

	it('calls onRemove when decreasing quantity to 0', () => {
		render(
			<CartContext.Provider value={mockContext}>
				<ShoppingCart />
			</CartContext.Provider>
		)

        const decreaseButtons = screen.getAllByTestId('decrease-quantity')

        fireEvent.click(decreaseButtons[1])
        expect(mockContext.onRemove).toHaveBeenCalledWith(mockCartItems[1])
	})

	it('disables checkout button when cart is empty', () => {
		const emptyCartContext = { ...mockContext, cartItems: [] }

		render(
			<CartContext.Provider value={emptyCartContext}>
				<ShoppingCart />
			</CartContext.Provider>
		)

		const checkoutButton = screen.getByText('Checkout')
		expect(checkoutButton).toBeDisabled()
	})
})
