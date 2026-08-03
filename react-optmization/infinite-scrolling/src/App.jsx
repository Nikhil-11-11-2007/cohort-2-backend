import React, { useEffect, useState } from 'react'
import axios from "axios"

const App = () => {

  const [postData, setPostData] = useState([])
  const [pageCount, setPageCount] = useState(1)
  const [loading, setLoading] = useState(true)

  const featchData = async () => {
    const res = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=20&_page=${pageCount}`)
    const data = res.data
    setPostData((prev) => [...prev, ...data])
    setLoading(false)
  }

  useEffect(() => {
    featchData()
  }, [pageCount])

  const handleScroll = async (e) => {
    const scrollHeight = document.documentElement.scrollHeight
    const innerHeight = window.innerHeight
    const scrollTop = document.documentElement.scrollTop

    if (scrollTop + innerHeight + 1 >= scrollHeight) {
      setPageCount(prev => prev + 1)
      setLoading(true)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className='min-h-screen w-full bg-[#111] text-white p-5 '>
      <h1 className='text-center text-4xl m-5'>Infinite scroll</h1>
      <div className='w-full flex flex-wrap gap-5 justify-center items-center'>
        {postData.map((item) => (
          <div key={item.id} className='w-65 h-80 border-2 rounded-md mt-3 '>
            <h1 className='text-center'>{item.title}</h1>
          </div>
        ))}
      </div>
      {loading && <p>Loading...</p>}
    </div>
  )
}

export default App