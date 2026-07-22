import React from 'react'
import { NavLink } from 'react-router'

const Navbar = () => {
  return (
    <div className='w-full flex justify-between p-3'>
        <h1>Logo</h1>
        <div className='gap-3 flex'>
            <NavLink className={({isActive}) => isActive ? "text-red-500": "text-white"} to={"/"}>Home</NavLink>
            <NavLink className={({isActive}) => isActive ? "text-red-500": "text-white"} to={"/about"}>About</NavLink>
            <NavLink className={({isActive}) => isActive ? "text-red-500": "text-white"} to={"/product"}>Product</NavLink>
            <NavLink className={({isActive}) => isActive ? "text-red-500": "text-white"} to={"/users"}>Users</NavLink>
        </div>
    </div>
  )
}

export default Navbar