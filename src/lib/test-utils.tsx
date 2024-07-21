import { CartContextProvider, QueryProvider } from '@/components/Providers'
import { routeTree } from '@/routeTree.gen'
import {
	createRootRoute,
	createRoute,
	createRouter,
	Outlet,
	RouterProvider,
} from '@tanstack/react-router'
import { cleanup, render, RenderOptions } from '@testing-library/react'
import { ReactElement } from 'react'
import { afterEach } from 'vitest'

afterEach(() => {
	cleanup()
})

const router = createRouter({
	routeTree,
})

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

export function fancyRender(component: () => React.JSX.Element, ) {
	const rootRoute = createRootRoute({
		component: Outlet,
	})

	const indexRoute = createRoute({
		getParentRoute: () => rootRoute,
		path: '/',
		component,
	})

	const routerTree = rootRoute.addChildren([indexRoute])
	const router = createRouter({ routeTree })

	// this is rtl's render
	render(
		<CartContextProvider>
			<QueryProvider>
				<RouterProvider router={router} />
			</QueryProvider>
		</CartContextProvider>
	)
}

const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
	return (
		<CartContextProvider>
			<QueryProvider>
				<RouterProvider router={router} />
				{children}
			</QueryProvider>
		</CartContextProvider>
	)
}

const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }
