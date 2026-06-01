"use client";

import { useAuth } from '@/context/authContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


const ProtectedRoute = ({ children }) => {

    const router = useRouter()
    const { user, loading } = useAuth()

    console.log(user)


    useEffect(() => {
        if (!loading && !user) {
            router.replace("/login")
        }
    }, [user, router, loading])

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <h1 className="text-lg font-semibold">Loading...</h1>
            </div>
        );
    }

    if(!user) return null

    return children
}

export default ProtectedRoute
