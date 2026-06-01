"use client";

import Link from "next/link";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";

const page = () => {

    const [formData, setFormData] = useState({})

    // console.log(formData)

    const handleChange = (e) => {

        const { name, value } = e.target

        setFormData({ ...formData, [name]: value })

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {

            const res = await api.post("/api/auth/login", formData)
            console.log(res)
            
        } catch (error) {
            console.log("error in login", error)
        }
    }

    return (
        <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
            <Card className="w-full max-w-lg">
                <CardHeader className="space-y-5">
                    <CardTitle className="text-center text-2xl md:text-3xl">
                        Welcome Back
                    </CardTitle>

                    <p className="text-center text-sm text-muted-foreground">
                        Login to your account and continue shopping.
                    </p>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            name="email"
                            onChange={handleChange}
                            type="email"
                            placeholder="Email Address"
                        />

                        <Input
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                        />

                        <Button className="w-full">
                            Login
                        </Button>
                    </form>

                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Don't have an account?{" "}
                        <Link
                            href="/register"
                            className="font-medium text-primary hover:underline"
                        >
                            Register
                        </Link>
                    </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default page;