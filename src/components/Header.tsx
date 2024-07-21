import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { SearchIcon, WalletIcon, User } from 'lucide-react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { Input } from '../components/ui/input'
import '../index.css'
import { ShoppingCart } from './ShoppingCart'
import { useCallback, useContext, useEffect, useState } from 'react'
import { CartContext } from './Providers'
import { SearchParams } from '@/lib/types'

function debounce<T extends (...args: any[]) => void>(
	func: T,
	delay: number
): (...args: Parameters<T>) => void {
	let timeoutId: NodeJS.Timeout

	return (...args: Parameters<T>) => {
		clearTimeout(timeoutId)
		timeoutId = setTimeout(() => func(...args), delay)
	}
}

export function Header() {
	const { totalPrice } = useContext(CartContext)

	const navigate = useNavigate()
	const search = useSearch({ from: '/' }) as SearchParams
	const [searchQuery, setSearchQuery] = useState(search.query || '')

	const debouncedSearch = useCallback(
		debounce((search: string) => {
			navigate({
				search: (old) => ({ ...old, search }),
			})
		}, 1000),
		[navigate]
	)

	useEffect(() => {
		debouncedSearch(searchQuery)
	}, [searchQuery, debouncedSearch])

	const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(e.target.value)
	}

	return (
		<header className="p-4 bg-blue-600">
			<div className="flex max-w-[1440px] justify-between items-center mx-auto gap-3 ">
				<div className="flex sm:justify-end sm:gap-20 items-center w-[580px] gap-8">
					<Link to="/" className="font-bold text-white sm:text-3xl">
						Eteration
					</Link>
					<div className="relative w-full max-w-sm xs:block hidden">
						<Input
							value={searchQuery}
							onChange={handleSearchChange}
							type="text"
							placeholder="Search..."
							className="w-full px-10 py-2 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
						/>
						<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
					</div>
					{/* Mobile Search */}
					<div className="xs:hidden">
						<Popover>
							<PopoverTrigger className="text-white">
								<div className="relative w-full max-w-sm">
									<SearchIcon className="absolute -left-6 top-1/2 -translate-y-1/2 w-5 h-5 " />
									<p>Search</p>
								</div>
							</PopoverTrigger>
							<PopoverContent>
								<div className="relative w-full max-w-sm">
									<Input
										value={searchQuery}
										onChange={handleSearchChange}
										type="text"
										placeholder="Search..."
										className="w-full px-10 py-2 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
									/>
									<SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
								</div>
							</PopoverContent>
						</Popover>
					</div>
					{/* Mobile Search */}
				</div>
				<div className="flex gap-4 lg:pr-32">
					<div className=" items-center gap-1 2xl:flex hidden">
						<WalletIcon className="text-white w-5 h-5" />
						<p className="text-white ">{totalPrice}₺</p>
					</div>
					{/* Mobile Cart */}
					<Popover>
						<PopoverTrigger className="text-white 2xl:hidden block">
							<div className="flex items-center gap-1">
								<WalletIcon className="text-white w-5 h-5" />
								<p className="text-white ">{totalPrice}₺</p>
							</div>
						</PopoverTrigger>
						<PopoverContent>
							<ShoppingCart />
						</PopoverContent>
					</Popover>

					{/* Mobile Cart */}
					<div className="flex items-center gap-1">
						<User className="text-white w-5 h-5" />
						<p className="text-white">Kutay</p>
					</div>
				</div>
			</div>
		</header>
	)
}
