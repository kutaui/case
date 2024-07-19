import AccountIcon from '@/AccountIcon'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import SearchIcon from '@/SearchIcon'
import WalletIcon from '@/WalletIcon'
import { Link } from '@tanstack/react-router'
import { Input } from '../components/ui/input'
import '../index.css'

export function Header() {
	return (
		<header className="p-4 bg-blue-600">
			<div className="flex max-w-[1440px] justify-between items-center mx-auto gap-3 xs:gap-8">
				<div className="flex justify-between items-center w-[800px] gap-8">
					<Link to="/" className="font-bold text-white  sm:text-3xl">
						Eteration
					</Link>
					<div className="relative w-full max-w-sm xs:block hidden">
						<Input
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
				<div>
					<div className="flex gap-4">
						<div className=" items-center gap-1 xs:flex hidden">
							<WalletIcon className="text-white w-5 h-5" />
							<p className="text-white ">117.885</p>
						</div>

						{/* Mobile Cart */}
						<Popover>
							<PopoverTrigger className="text-white xs:hidden block">
								<div className="flex items-center gap-1">
									<WalletIcon className="text-white w-5 h-5" />
									<p className="text-white ">200.885</p>
								</div>
							</PopoverTrigger>
							<PopoverContent>
								<div className="relative w-full max-w-sm">
									there will be cartt
								</div>
							</PopoverContent>
						</Popover>
						{/* Mobile Cart */}

						<div className="flex items-center gap-1">
							<AccountIcon className="text-white w-5 h-5" />
							<p className="text-white">Kutay</p>
						</div>
					</div>
				</div>
			</div>
		</header>
	)
}
