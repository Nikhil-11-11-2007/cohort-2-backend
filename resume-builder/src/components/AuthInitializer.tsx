"use client";

import { getMe } from "@/apis/auth.api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setAuthError, setAuthLoading, setUser } from "@/redux/slices/authSlice";
import { useEffect } from "react";

export default function AuthInitializer() {
    const dispatch = useAppDispatch()

    useEffect(() => {

        const currentUser = async () => {
            try {
                dispatch(setAuthLoading(true))
                const response = await getMe()
                if(response.success){
                    dispatch(setUser(response.data.user))
                }else {
                    dispatch(setUser(null))
                }

            } catch (error) {
                dispatch(setUser(null))
                dispatch(setAuthError("Unauthorized"))

            } finally {
                dispatch(setAuthLoading(false))
            }
        }
        currentUser()
    }, [dispatch])

    return null
}