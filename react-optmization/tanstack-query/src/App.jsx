import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchUsers } from './api/api'

const App = () => {

  const { data, isLoading, isError } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers
  })

  
  if (isLoading) return <p>Loading...</p>
  if (isError) return <p>Error...</p>
  console.log(data)
  
  return (
    <div>
      {data.map((user) => (
        <div key={user.id}>
          <h1>{user.name}</h1>
        </div>
      ))}
    </div>
  )
}

export default App