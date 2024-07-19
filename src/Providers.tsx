import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createContext } from 'react'

export const CartContext = createContext('')

export const CartContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const myData = 'Hello from Context!'

	return <CartContext.Provider value={myData}>{children}</CartContext.Provider>
}

const queryClient = new QueryClient()

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}
