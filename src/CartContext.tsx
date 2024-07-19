import { createContext } from 'react'

export const CartContext = createContext('')

export const CartContextProvider = ({ children }) => {
	const myData = 'Hello from Context!'

	return <CartContext.Provider value={myData}>{children}</CartContext.Provider>
}
