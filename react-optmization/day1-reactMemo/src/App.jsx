import React, { useCallback, useMemo, useState } from 'react'
import About from './components/About'

const App = () => {

  console.log("app re-rendering...")

  const [count, setCount] = useState(0)
  // const [users, setUsers] = useState({
  //   name: "test1",
  //   id: 1
  // })

  const greet = useCallback(() => {
    console.log("Hello")
  }, [])

  const heavyCalc = useMemo(() => {
    console.log("calculating value")
    for (let i = 0; i < 10000000; i++) { }
    // return 10
  }, [])

  return (
    <div className='h-screen bg-[#111] p-4 text-white '>
      <h1>App - {count}</h1>
      <button className='px-4 py-2 mt-3 active:scale-[0.97] rounded-2xl bg-amber-900'
        onClick={() => setCount(count + 1)}
      >Increase</button>

      <h3>heavy calc - {heavyCalc}</h3>

      {/* <h1>user name - {users.name}</h1> */}
      {/* <button className='px-4 py-2 mt-3 active:scale-[0.97] rounded-2xl bg-amber-900'
      onClick={() => setUsers({...users, name:"test2"})}
      >Change name</button> */}
      {/* <About greet={greet} /> */}
      <About />
    </div>
  )
}

export default App