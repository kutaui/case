import { GetProductsQuery } from '@/api/controllers'
import { FilterSidebar } from '@/components/FilterSidebar'
import { ProductCard } from '@/components/ProductCard'
import { ShoppingCart } from '@/components/ShoppingCart'
import { Button } from '@/components/ui/button'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Product, SearchParams } from '@/lib/types'
import {
	createLazyFileRoute,
	useNavigate,
	useSearch,
} from '@tanstack/react-router'
import { useMemo } from 'react'

export const Route = createLazyFileRoute('/')({
	component: Index,
})

const ITEMS_PER_PAGE = 12

function Index() {
	const { data, isLoading } = GetProductsQuery()
	const search = useSearch({ from: '/' }) as SearchParams
	const navigate = useNavigate()

	const currentPage = Number(search.page) || 1

	const filteredProducts = useMemo(() => {
		if (!data) return []

		return data.filter((product: Product) => {
			const brandMatch = !search.brands || search.brands.includes(product.brand)
			const modelMatch = !search.models || search.models.includes(product.model)
			const searchMatch =
				!search.search ||
				product.name.toLowerCase().includes(search.search.toLowerCase()) ||
				product.brand.toLowerCase().includes(search.search.toLowerCase()) ||
				product.model.toLowerCase().includes(search.search.toLowerCase())
			return brandMatch && modelMatch && searchMatch
		})
	}, [data, search.brands, search.models, search.search])

	const sortedProducts = useMemo(() => {
		const order = search.order || 'old-to-new'
		return [...filteredProducts].sort((a, b) => {
			switch (order) {
				case 'price-low-to-high':
					return a.price - b.price
				case 'price-high-to-low':
					return b.price - a.price
				case 'new-to-old':
					return (
						new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
					)
				case 'old-to-new':
				default:
					return (
						new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
					)
			}
		})
	}, [filteredProducts, search.order])

	const paginatedProducts = useMemo(() => {
		const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
		return sortedProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE)
	}, [sortedProducts, currentPage])

	const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE)

	const handlePageChange = (page: number) => {
		navigate({
			search: (old) => ({ ...old, page: page.toString() }),
		})
	}

	const renderPaginationItems = () => {
		const items = []
		const maxVisiblePages = 5

		if (totalPages <= maxVisiblePages) {
			for (let i = 1; i <= totalPages; i++) {
				items.push(
					<PaginationItem key={i}>
						<PaginationLink
							onClick={() => handlePageChange(i)}
							isActive={currentPage === i}
						>
							{i}
						</PaginationLink>
					</PaginationItem>
				)
			}
		} else {
			items.push(
				<PaginationItem key={1}>
					<PaginationLink
						onClick={() => handlePageChange(1)}
						isActive={currentPage === 1}
					>
						1
					</PaginationLink>
				</PaginationItem>
			)

			if (currentPage > 3) {
				items.push(<PaginationEllipsis key="ellipsis-start" />)
			}

			const start = Math.max(2, currentPage - 1)
			const end = Math.min(totalPages - 1, currentPage + 1)
			for (let i = start; i <= end; i++) {
				items.push(
					<PaginationItem key={i}>
						<PaginationLink
							onClick={() => handlePageChange(i)}
							isActive={currentPage === i}
						>
							{i}
						</PaginationLink>
					</PaginationItem>
				)
			}

			if (currentPage < totalPages - 2) {
				items.push(<PaginationEllipsis key="ellipsis-end" />)
			}

			items.push(
				<PaginationItem key={totalPages}>
					<PaginationLink
						onClick={() => handlePageChange(totalPages)}
						isActive={currentPage === totalPages}
					>
						{totalPages}
					</PaginationLink>
				</PaginationItem>
			)
		}

		return items
	}

	if (isLoading) {
		return (
			<main className="flex  flex-col items-center pt-12 xs:pl-16 pl-0 md:min-w-[700px]">
				<p className="text-4xl text-blue-500">Loading</p>
			</main>
		)
	}

	return (
		<main className="flex  flex-col items-center pt-12 xs:pl-16 pl-0 md:min-w-[700px]">
			<Popover>
				<PopoverTrigger asChild className="block xs:hidden">
					<Button>Filter</Button>
				</PopoverTrigger>
				<PopoverContent>
					<FilterSidebar />
				</PopoverContent>
			</Popover>
			<section className="flex gap-6">
				<div className="hidden xs:block">
					<FilterSidebar />
				</div>
				<div className="flex md:grid-cols-2 lg:grid-cols-3 sm:grid xl:grid-cols-4 flex-col gap-6 pt-5">
					{paginatedProducts.map((product: Product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
				{filteredProducts.length < 1 && (
					<p className="text-4xl text-blue-500 mr-14">No products found</p>
				)}
				<aside className=" hidden 2xl:flex">
					<ShoppingCart />
				</aside>
			</section>
			<Pagination className="mt-6">
				<PaginationContent>
					<PaginationItem hidden={currentPage === 1}>
						<PaginationPrevious
							onClick={() => handlePageChange(currentPage - 1)}
						/>
					</PaginationItem>

					<div className="xs:hidden">
						<PaginationLink>
							Page {currentPage} of {totalPages}
						</PaginationLink>
					</div>

					<div className="hidden xs:flex">{renderPaginationItems()}</div>

					<PaginationItem hidden={currentPage === totalPages}>
						<PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</main>
	)
}
