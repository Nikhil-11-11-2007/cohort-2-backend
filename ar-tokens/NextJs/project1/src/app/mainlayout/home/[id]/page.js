import React from 'react'

const page = async ({params}) => {

    const {id} = await params
    console.log(id)

    
  return (
    <div>
        <h1>this is comman page jismai dynamic id ayigi {id}</h1>
    </div>
  )
}

export default page