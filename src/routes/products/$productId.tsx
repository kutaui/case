import { GetProductQuery } from '@/api/controllers'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$productId')({
	component: PostComponent,
})

function PostComponent() {
	const { productId } = Route.useParams()
	const { data } = GetProductQuery(productId)
	console.log(data)

	return <div>Post ID: {productId}</div>
}
