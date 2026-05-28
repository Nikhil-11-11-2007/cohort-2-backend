import React from 'react'
import { axiosInstance } from './config/axiosInstance'

const App = () => {

  const getData = async () => {
    try {
      const res = await axiosInstance.get("/products")
      console.log("this is UI app.jsx",res)
    } catch (error) {
      console.log("error in api", error)
    }
  }

  getData()

  return (
    <div style={{background: "#999", height: "100vh", width: "100vw"}}>
      <h1>hello</h1>
    </div>
  )
}

export default App