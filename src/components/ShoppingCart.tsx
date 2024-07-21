import { MinusIcon, PlusIcon } from 'lucide-react'
import { useContext } from 'react'
import { CartContext } from './Providers'
import { Button } from './ui/button'
import { Card } from './ui/card'
import { Product, CartItem as ICartItem } from '@/lib/types'

export function ShoppingCart() {
	const { totalPrice, cartItems, toggleCartItemQuantity, onRemove } =
		useContext(CartContext)

	return (
		<section className="flex-col gap-10 pt-5 flex">
			<Card>
				{cartItems.map((item) => (
					<CartItem
						key={item.id}
						item={item}
						toggleCartItemQuantity={toggleCartItemQuantity}
						onRemove={onRemove}
					/>
				))}
				{cartItems.length === 0 && <p className="p-12">Your cart is empty</p>}
			</Card>
			<Card className="p-4 flex flex-col gap-4">
				<p>
					Total Price:{' '}
					<span className="text-blue-500 font-bold">
						{typeof totalPrice === 'number' ? totalPrice.toFixed(2) : '0.00'}₺
					</span>
				</p>
				<Button className="w-full" disabled={cartItems.length === 0}>
					Checkout
				</Button>
			</Card>
		</section>
	)
}

function CartItem({
	item,
	toggleCartItemQuantity,
	onRemove,
}: {
	item: ICartItem
	toggleCartItemQuantity: (id: number, value: 'inc' | 'dec') => void
	onRemove: (product: Product) => void
}) {
	const handleDecrease = () => {
		if (item.quantity === 1) {
			onRemove(item)
		} else {
			toggleCartItemQuantity(item.id, 'dec')
		}
	}

	const handleIncrease = () => {
		toggleCartItemQuantity(item.id, 'inc')
	}

	return (
		<div className="flex flex-col gap-4 justify-between w-72 p-4 ">
			<div>
				<p>{item.name}</p>
				<p className="text-blue-500">{item.price}₺</p>
			</div>
			<div className="flex ">
				<Button className="bg-slate-200 w-12 h-10" onClick={handleDecrease}>
					<MinusIcon className="text-black" />
				</Button>
				<div className="bg-blue-500 h-10 w-12 text-center">
					<p className="text-3xl bg-blue-500 text-white">{item.quantity}</p>
				</div>
				<Button className="bg-slate-200 w-12 h-10" onClick={handleIncrease}>
					<PlusIcon className="text-black" />
				</Button>
			</div>
		</div>
	)
}
