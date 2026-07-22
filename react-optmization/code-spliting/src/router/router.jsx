import React, { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from '../layout/MainLayout'
const Home = lazy(() => import("../pages/Home"))
const About = lazy(() => import("../pages/About"))
const Product = lazy(() => import("../pages/Product"))
const Users = lazy(() => import("../pages/Users"))

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: <Suspense fallback={<p>Loading...</p>} >
                    <Home />
                </Suspense>
            },
            {
                path: "/about",
                element: <Suspense fallback={<p>Loading...</p>} >
                    <About />
                </Suspense>
            },
            {
                path: "/product",
                element: <Suspense fallback={<p>Loading...</p>} >
                    <Product />
                </Suspense>
            },
            {
                path: "/users",
                element: <Suspense fallback={<p>Loading...</p>} >
                    <Users />
                </Suspense>
            }
        ]
    }
])

export default router