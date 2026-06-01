"use client";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";

const page = () => {

  const router = useRouter()
  const [formData, setFormData] = useState({})

  // console.log(formData)

  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData({ ...formData, [name]: value })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {

      const res = await api.post("/api/auth/register", formData)
      console.log(res);
      router.push("/home")

    } catch (error) {
      console.log("error in register", error)
    }
  }

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <Card className="w-full max-w-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="text-center text-2xl md:text-3xl">
            Create Account
          </CardTitle>

          <p className="text-center text-sm text-muted-foreground">
            Join us and start your shopping journey.
          </p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-7">
            <Input
              name="name"
              onChange={handleChange}
              type="text"
              placeholder="Full Name"
            />

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
              Register
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default page;    