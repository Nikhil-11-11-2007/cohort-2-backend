import React, { useState } from 'react'
import About from './components/About'

const App = () => {

  console.log("App rendering...")

  const [count, setCount] = useState(0)
  const [users, setUsers] = useState({
    name: "nikhil"
  })

  return (
    <div className='h-screen bg-black text-white p-5'>
      <h1 className='ml-9'>count - {count}</h1>
      <button onClick={() => setCount(count + 1)}
        className='p-3 m-9 bg-red-300 rounded-2xl active:scale-[0.95]'>
        increase count
      </button>
      <h1>{users.name}</h1>
      <button onClick={() => setUsers({...users, name:"Test1"})}
      className='p-3 m-9 bg-red-300 rounded-2xl active:scale-[0.95]'>
        change user
      </button>
      <About users={users} />
    </div>
  )
}

export default App
