import { Product } from '@/types'
import { Button } from './ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader
} from './ui/card'

export function ProductCard({ product }: { product: Product }) {
	return (
		<Card className="border w-52 ">
			<CardHeader>
				<img src={product.image} alt="" className="w-40 h-40" />
			</CardHeader>
			<CardContent>
				<p className="text-blue-600 text-lg">{product.price} ₺</p>
				<p className='font-semibold'>{product.name}</p>
			</CardContent>
			<CardFooter>
				<Button className="bg-blue-600 hover:bg-blue-500 w-full">
					Add to Cart
				</Button>
			</CardFooter>
		</Card>
	)
}
