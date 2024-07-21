import { Toaster } from '@/components/ui/toaster'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { CartContextProvider, QueryProvider } from './components/Providers'
import { routeTree } from './routeTree.gen'

const router = createRouter({
	routeTree,
})
declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router
	}
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement)
	root.render(
		<StrictMode>
			<CartContextProvider>
				<QueryProvider>
					<RouterProvider router={router} />
					<Toaster />
				</QueryProvider>
			</CartContextProvider>
		</StrictMode>
	)
}
