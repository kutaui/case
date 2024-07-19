import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/$productId')({
	// In a loader
	// Or in a component
	component: PostComponent,
})

function PostComponent() {
	const { productId } = Route.useParams()

	return <div>Post ID: {productId}</div>
}
