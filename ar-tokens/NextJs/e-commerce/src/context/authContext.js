"use client";
import { api } from "@/lib/api";
import { createContext, useContext, useEffect, useState } from "react";

const Auth = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const hydrateUser = async () => {
        try {
            const res = await api.get("/api/auth/me")

            console.log("ME SUCCESS:", res.data)

            setUser(res.data.user)
        } catch (error) {
            console.log("ME ERROR:", error.response?.data)
            console.log("ME STATUS:", error.response?.status)

            setUser(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        hydrateUser()
    }, [])

    return <Auth.Provider value={{ user, setUser, loading, hydrateUser }}>
        {children}
    </Auth.Provider>
}

export const useAuth = () => useContext(Auth)