import { GetProductsQuery } from '@/api/controllers'
import { FilterCard } from './FilterCard'
import { Card } from './ui/card'
import { Label } from './ui/label'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { useEffect, useState } from 'react'
import { SearchParams } from '@/types'
import { useNavigate, useSearch } from '@tanstack/react-router'

export function FilterSidebar() {
	const [order, setOrder] = useState('old-to-new')
	const search = useSearch({ from: '/' }) as SearchParams
	const navigate = useNavigate()

	const { data } = GetProductsQuery()

	useEffect(() => {
		if (search.order) {
			setOrder(search.order)
		}
	}, [search.order])

	const orderHandler = (order: string) => {
		setOrder(order)
		navigate({
			search: {
				...search,
				order,
			},
		})
	}

	return (
		<aside className="flex-col gap-4 pr-4 ">
			<div>
				<p className="text-sm text-gray-400 italic">Sort by</p>
				<Card className="w-48 p-4">
					<RadioGroup value={order} onValueChange={(e) => orderHandler(e)}>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="old-to-new" id="old-to-new" />
							<Label htmlFor="old-to-new">Old to new</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem value="new-to-old" id="new-to-old" />
							<Label htmlFor="new-to-old">New to old</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="price-high-to-low"
								id="price-high-to-low"
							/>
							<Label htmlFor="price-high-to-low">Price high to low</Label>
						</div>
						<div className="flex items-center space-x-2">
							<RadioGroupItem
								value="price-low-to-high"
								id="price-low-to-high"
							/>
							<Label htmlFor="price-low-to-high">Price low to high</Label>
						</div>
					</RadioGroup>
				</Card>
			</div>
			<FilterCard title="Brands" data={data} />
			<FilterCard title="Model" data={data} />
		</aside>
	)
}
