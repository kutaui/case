import { createLazyFileRoute } from '@tanstack/react-router'
import { useContext } from 'react'
import { CartContext } from '../CartContext'

export const Route = createLazyFileRoute('/about')({
	component: About,
})

function About() {
	const myData = useContext(CartContext)
	console.log(myData)
	return <div className="p-2">Hello from About!</div>
}
