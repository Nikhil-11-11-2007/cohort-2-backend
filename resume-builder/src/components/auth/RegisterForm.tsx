"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerApi } from "@/apis/auth.api";
import { registerSchema } from "@/schemas/register.schema";

import { useAppDispatch } from "@/hooks/useAppDispatch";

import {
    setUser,
    setAuthLoading,
    setAuthError,
} from "@/redux/slices/authSlice";
import { useAppSelector } from "@/hooks/useAppSelector";

type RegisterFormData = {
    name: string;
    email: string;
    mobile: string;
    password: string;
};

export default function RegisterForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.auth.error)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    });

    const onSubmit = async (
        data: RegisterFormData
    ) => {
        try {
            dispatch(setAuthLoading(true));

            const response =
                await registerApi(data);

            dispatch(setUser(response.data.user));

            //   router.push("/dashboard");
            router.push("/");
        } catch (error: any) {
            dispatch(
                setAuthError(
                    error?.response?.data?.message ||
                    "Register Failed"
                )
            );
        } finally {
            dispatch(setAuthLoading(false));
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
            <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900">
                    Create Account
                </h1>

                <p className="text-gray-500 mt-2">
                    Start building your AI Resume
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Full Name
                    </label>

                    <input
                        placeholder="Enter your name"
                        {...register("name")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <input
                        placeholder="Enter your email"
                        {...register("email")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Mobile Number
                    </label>

                    <input
                        placeholder="Enter mobile number"
                        {...register("mobile")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.mobile && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.mobile.message}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter password"
                        {...register("password")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 text-sm text-center">
                            {error}
                        </p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    Create Account
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                    href="/auth/login"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                >
                    Login
                </Link>
            </p>
        </div>
    );
}