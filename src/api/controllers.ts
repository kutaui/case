import { Product } from '@/types'
import { useQuery } from '@tanstack/react-query'

export const GetProductsRequest = () => {
	return fetch('https://5fc9346b2af77700165ae514.mockapi.io/products')
		.then((response) => response.json())
		.then((data) => data)
}

export const GetProductsQuery = () =>
	useQuery({
		queryKey: ['products'],
		queryFn: () => GetProductsRequest(),
	})

export const GetProductRequest = (id: string) => {
	return fetch(`https://5fc9346b2af77700165ae514.mockapi.io/products/${id}`)
		.then((response) => response.json())
		.then((data) => data)
}

export const GetProductQuery = (id: string) =>
	useQuery({
		queryKey: ['product', id],
		queryFn: () => GetProductRequest(id),
	})
