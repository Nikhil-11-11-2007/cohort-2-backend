"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { loginApi } from "@/apis/auth.api";
import { loginSchema } from "@/schemas/login.schema";

import { useAppDispatch } from "@/hooks/useAppDispatch";

import {
    setUser,
    setAuthLoading,
    setAuthError,
} from "@/redux/slices/authSlice";
import { useAppSelector } from "@/hooks/useAppSelector";

type LoginFormData = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const error = useAppSelector((state) => state.auth.error)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (
        data: LoginFormData
    ) => {
        try {
            dispatch(setAuthError(null));
            dispatch(setAuthLoading(true));

            const response = await loginApi(data);

            dispatch(setUser(response.data.user));

            router.push("/");
        } catch (error: any) {
            dispatch(
                setAuthError(
                    error?.response?.data?.message ||
                    "Login Failed"
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
                    Welcome Back
                </h1>

                <p className="text-gray-500 mt-2">
                    Login to your account
                </p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
            >
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                        Email
                    </label>

                    <input
                        type="email"
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
                        Password
                    </label>

                    <input
                        type="password"
                        placeholder="Enter your password"
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
                    Login
                </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                    href="/auth/register"
                    className="font-semibold text-blue-600 hover:text-blue-700"
                >
                    Register
                </Link>
            </p>
        </div>
    );
}