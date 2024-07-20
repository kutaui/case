import { GetProductsQuery } from '@/api/controllers'
import { FilterSidebar } from '@/components/FilterSidebar'
import { ProductCard } from '@/components/ProductCard'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Product } from '@/types'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
	component: Index,
})

function Index() {
	const { data } = GetProductsQuery()
	console.log(data)

	return (
		<main className="flex gap-6 bg-stone-100  flex-col items-center pt-12 ">
			<Popover>
				<PopoverTrigger asChild className="block xs:hidden">
					<Button>Filter</Button>
				</PopoverTrigger>
				<PopoverContent>
					<FilterSidebar />
				</PopoverContent>
			</Popover>
			<section className="flex max-w-[1440px] mx-auto">
				<div className="hidden xs:flex">
					<FilterSidebar />
				</div>
				<div>
					{data?.map((product: Product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			</section>
		</main>
	)
}
