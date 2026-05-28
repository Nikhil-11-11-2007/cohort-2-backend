import React, { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import AuthLayout from '../layouts/AuthLayout'
import Login from '../pages/Login'
import Register from '../pages/Register'
import MainLayout from '../layouts/MainLayout'
import Home from '../pages/Home'
import Public from './protected/Public'
import Protected from './protected/Protected'
import { axiosInstance } from '../config/axiosInstance'
import { useDispatch } from 'react-redux'
import { addUser, removeUser } from '../state/authReducer'

const AppRoutes = () => {

    console.log("appRoutes")

    const dispatch = useDispatch()

    useEffect(() => {
        (async () => {
            try {

                const res = await axiosInstance.get("/api/auth/me")
                dispatch(addUser(res?.data?.user))  
            } catch (error) {
                dispatch(removeUser())
                console.log("error in me api", error)
            }
        })()
    }, [])

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Public />, // user aya to /home
            children: [
                {
                    path: "",
                    element: <AuthLayout />,
                    children: [
                        {
                            path: "",
                            element: <Login />
                        },
                        {
                            path: "register",
                            element: <Register />
                        }
                    ]
                }
            ]
        },
        {
            path: "/home",
            element: <Protected />, // user nhi hai !(not) se true kro aur / pr bhejo
            children: [
                {
                    path: "",
                    element: <MainLayout />,
                    children: [
                        {
                            path: "",
                            element: <Home />
                        }
                    ]
                }
            ]
        }
    ])

    return <RouterProvider router={router} />
}

export default AppRoutes