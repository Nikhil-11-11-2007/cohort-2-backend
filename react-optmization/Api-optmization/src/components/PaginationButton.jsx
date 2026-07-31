import React from 'react'

const PaginationButton = ({totalPost,postPerPage, setCurrentPage}) => {

  let pages = []

  for (let i = 1; i <= Math.ceil(totalPost / postPerPage); i++) {
    pages.push(i)
  }

  return (
    <div className='w-full flex gap-2 items-center justify-center my-14'>
      {pages.map((page) => (
        <button onClick={() => setCurrentPage(page)} className='border-1 active:scale-[0.97] px-5 py-3 rounded-md'>{page}</button>
      ))}
    </div>
  )
}

export default PaginationButton