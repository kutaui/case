import { Header } from '@/components/Header'
import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import '../index.css'

export const Route = createRootRoute({
	component: Root,
})

function Root() {
	return (
		<>
			<Header />
			<Outlet />
			<TanStackRouterDevtools />
		</>
	)
}
