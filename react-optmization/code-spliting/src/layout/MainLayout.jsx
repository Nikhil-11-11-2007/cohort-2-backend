import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../components/Navbar'

const MainLayout = () => {
    return (
        <div className='h-screen bg-[#111] text-white '>
            <Navbar />
            <Outlet />
        </div>
    )
}

export default MainLayout