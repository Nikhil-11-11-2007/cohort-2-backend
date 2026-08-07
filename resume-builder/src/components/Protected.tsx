import { useAppSelector } from "@/hooks/useAppSelector";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react"

interface ProtectedProps {
    children: React.ReactNode;
}

export default function Protected({ children }: ProtectedProps) {

    const router = useRouter()

    const { user, loading } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (!loading && !user) {
            router.push("/login")
        }
    }, [])

    if (loading) {
        return <div>Loading...</div>
    }

    if (!user) {
        return null
    }

    return <>{children}</>

}