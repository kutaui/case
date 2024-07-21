import { GetProductQuery } from '@/api/controllers'
import { CartContext } from '@/components/Providers'
import { ShoppingCart } from '@/components/ShoppingCart'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { createFileRoute } from '@tanstack/react-router'
import { useContext } from 'react'

export const Route = createFileRoute('/products/$productId')({
	component: PostComponent,
})

function PostComponent() {
	const { productId } = Route.useParams()
	const { data } = GetProductQuery(productId)
	const { onAdd } = useContext(CartContext)

	const handleAddToCart = () => {
		if (data) onAdd(data, 1)
	}

	return (
		<main className="flex gap-8 items-center p-12 md:min-w-[700px] mx-auto max-w-[1440px]">
			<section>
				<Card className="flex lg:flex-row flex-col p-4 gap-4 max-w-[1200px]">
					<img src={data?.image} alt="" />
					<div className="flex flex-col gap-2">
						<h1 className="text-2xl">{data?.name}</h1>
						<p className="text-blue-500 font-semibold text-xl">{data?.price}</p>
						<Button onClick={handleAddToCart}>Add to Cart</Button>
						<p>{data?.description}</p>
					</div>
				</Card>
			</section>
			<aside className=" hidden 2xl:flex">
				<ShoppingCart />
			</aside>
		</main>
	)
}
