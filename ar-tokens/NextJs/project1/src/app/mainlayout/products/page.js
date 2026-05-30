import React from 'react'

const page = async() => {

    let res = await fetch("https://fakestoreapi.com/products")
    let data = await res.json()
    console.log(data)

  return (
    <div className='p-6'>
      <h1>this is products page</h1>
      
      <div>
        {data.map(elem => <h1 key={elem.id}>{elem.title}</h1>)}
      </div>
    </div>
  )
}

export default page
