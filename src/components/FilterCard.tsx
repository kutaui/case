import { useState, useMemo } from 'react'
import { useNavigate, useSearch } from '@tanstack/react-router'
import SearchIcon from '@/SearchIcon'
import { Card } from './ui/card'
import { Checkbox } from './ui/checkbox'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Product, SearchParams } from '@/types'
import { ScrollArea } from './ui/scroll-area'

interface Props {
	title: string
	data: Product[]
}

export function FilterCard(props: Props) {
	const navigate = useNavigate()
	const search = useSearch({ from: '/' }) as SearchParams
	const [searchTerm, setSearchTerm] = useState('')
	const isBrand = props.title === 'Brands'
	const paramKey = isBrand ? 'brands' : 'models'

	const selectedItems = useMemo(() => {
		const items = search[paramKey] as string | undefined
		return new Set(
			items ? items.split(',').map((item) => decodeURIComponent(item)) : []
		)
	}, [search, paramKey])

	const filteredData = useMemo(() => {
		return props.data?.filter((product: Product) => {
			const searchField = isBrand ? product.brand : product.model
			return searchField.toLowerCase().includes(searchTerm.toLowerCase())
		})
	}, [props.data, searchTerm, isBrand])

	const updateSearch = (updates: Record<string, string | undefined>) => {
		navigate({
			search: (prev) => {
				const newSearch: Record<string, string | undefined> = { ...prev }
				Object.entries(updates).forEach(([key, value]) => {
					if (value === undefined || value === '') {
						delete newSearch[key]
					} else {
						newSearch[key] = value
					}
				})
				return newSearch
			},
		})
	}

	const handleCheckboxChange = (item: string) => {
		const newSelectedItems = new Set(selectedItems)
		if (newSelectedItems.has(item)) {
			newSelectedItems.delete(item)
		} else {
			newSelectedItems.add(item)
		}

		const newValue = Array.from(newSelectedItems).join(',')
		updateSearch({ [paramKey]: newValue || undefined })
	}

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(e.target.value)
	}

	return (
		<div>
			<p className="text-sm text-gray-400 italic">{props.title}</p>
			<Card className="w-48 p-4">
				<div className="relative w-full max-w-sm xs:block hidden mb-4">
					<Input
						type="text"
						placeholder="Search..."
						className="w-full px-10 py-2 bg-slate-100 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
						value={searchTerm}
						onChange={handleSearchChange}
					/>
					<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
				</div>
				<ScrollArea className="h-16">
					<section className="flex flex-col gap-3">
						{filteredData?.map((product: Product) => {
							const item = isBrand ? product.brand : product.model
							return (
								<div key={product.id} className="flex items-center">
									<Checkbox
										id={item}
										checked={selectedItems.has(item)}
										onCheckedChange={() => handleCheckboxChange(item)}
									/>
									<Label
										htmlFor={item}
										className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 pl-2"
									>
										{item}
									</Label>
								</div>
							)
						})}
					</section>
				</ScrollArea>
			</Card>
		</div>
	)
}
