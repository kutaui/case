import { Product } from '@/lib/types'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { useContext } from 'react'
import { CartContext } from './Providers'
import { Link } from '@tanstack/react-router'

export function ProductCard({ product }: { product: Product }) {
	const { onAdd } = useContext(CartContext)

	const handleAddToCart = (e: React.MouseEvent) => {
		e.preventDefault() // Prevent the default link behavior
		e.stopPropagation() // Stop the event from bubbling up
		onAdd(product, 1)
	}

	return (
		<Link to={`/products/${product.id}`}>
			<Card className="border w-52 max-h-96  ">
				<CardHeader>
					<img src={product.image} alt="" className="w-40 h-40" />
				</CardHeader>
				<CardContent className="">
					<p className="text-blue-600 text-lg">{product.price} ₺</p>
					<span className="font-semibold overflow-hidden whitespace-nowrap text-ellipsis block">
						{product.name}
					</span>
				</CardContent>
				<CardFooter>
					<Button
						className="bg-blue-600 hover:bg-blue-500 w-full"
						onClick={handleAddToCart}
					>
						Add to Cart
					</Button>
				</CardFooter>
			</Card>
		</Link>
	)
}
