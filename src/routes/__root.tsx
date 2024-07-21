import { Header } from '@/components/Header'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import '../index.css'

export const Route = createRootRoute({
	component: Root,
})

function Root() {
	return (
		<>
			<Header />
			<Outlet />
		</>
	)
}
