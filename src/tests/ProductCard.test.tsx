import { ProductCard } from '@/components/ProductCard'
import { describe, expect, it } from 'vitest'
import { fireEvent, render, screen, waitFor } from '../lib/test-utils'
import { useContext } from 'react'
import { CartContext } from '@/components/Providers'

const product = {
	name: 'Test Product',
	price: 100,
	image: 'test.png',
	id: 1,
	brand: 'Test Brand',
	model: 'Test Model',
	description: 'Test Description',
	createdAt: '2021-01-01',
}

describe('ProductCard', () => {
	it('should render the product card', async () => {
		await render(<ProductCard product={product} />)
		expect(screen.getByText(product.name)).toBeInTheDocument()
	})

	it('should add the product to cart', async () => {
		await render(
			<>
				<ProductCard product={product} />
				<CartItemsChecker />
			</>
		)
		const addToCartButton = screen.getByText('Add to Cart')
		fireEvent.click(addToCartButton)
		await waitFor(() => {
			const cartItemsChecker = screen.getByTestId('cart-items-checker')
			expect(cartItemsChecker).toHaveTextContent(product.name)
		})
	})
})

const CartItemsChecker = () => {
	const { cartItems } = useContext(CartContext)
	return (
		<div data-testid="cart-items-checker">
			{cartItems.map((item) => item.name).join(', ')}
		</div>
	)
}
