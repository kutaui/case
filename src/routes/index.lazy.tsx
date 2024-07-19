import { GetProductsQuery } from '@/api/controllers'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
	component: Index,
})

function Index() {
	const { data } = GetProductsQuery()
	console.log(data)

	return (
		<div className="p-2">
			<h3>Welcome Home!</h3>
		</div>
	)
}
