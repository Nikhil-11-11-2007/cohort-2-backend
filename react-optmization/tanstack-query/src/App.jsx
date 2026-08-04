import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchProducts } from './api/api'

const App = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
    // staleTime: 1000*10
    // gcTime: 1000*10
  })

  
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>
  console.log(data)
  
  return (
    <div>
      {data.map((product) => (
        <div key={product.id}>
          <img loading='lazy' src={product.image} alt="" />
          <h1>{product.title}</h1>
        </div>
      ))}
    </div>
  )
}

export default App