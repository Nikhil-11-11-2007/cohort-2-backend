import axios from 'axios'
import React, { useEffect, useState } from 'react'
import PaginationButton from './components/PaginationButton'

const App = () => {

  const [postData, setPostData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(10)

  const fetchData = async () => {
    const res = await axios.get("https://dummyjson.com/products")
    setPostData(res.data.products)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const lastPostIndex = currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPost = postData.slice(firstPostIndex, lastPostIndex)

  return (
    <div className='min-h-screen bg-black text-white w-full flex flex-col'>
      <div className='min-h-screen w-full flex flex-wrap px-21 items-center gap-5 bg-black text-white'>

        {currentPost.map((item) => {
          return <div key={item.id} className='w-80 h-75 bg-red-900 rounded-md flex items-center justify-center flex-col '>
            <img className='w-30' src={item.images} alt="" />
            <h1 className='text-center'>{item.title}</h1>
          </div>
        })}


        <PaginationButton totalPost={postData.length} postPerPage={postPerPage} setCurrentPage={setCurrentPage} />
      </div>
    </div>
  )
}

export default App