import React, { useEffect, useState } from 'react'

const App = () => {

  const [search, setSearch] = useState("")

  const handleChange = (e) => {
    setSearch(e.target.value)
  }
  
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Api calling", search)
    }, 1000)

    return () => clearTimeout(timer)

  }, [search])
  
  return (
    <div>
      <input value={search} onChange={handleChange} type="text" placeholder='Search' />
    </div>
  )
}

export default App