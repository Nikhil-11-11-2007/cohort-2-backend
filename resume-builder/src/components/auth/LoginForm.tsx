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
    const { loading } = useAppSelector((state) => state.auth)

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
        <div className="bg-white rounded-[1.5rem] shadow-[0px_10px_40px_rgba(79,70,229,0.08)] w-full max-w-[480px] p-8 md:p-10 border border-gray-200 relative overflow-hidden mx-auto mt-12">
            {/* Subtle top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
            
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600/10 text-indigo-600 mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                    </svg>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-base text-gray-500">Sign in to continue your career journey</p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Email Field */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2" htmlFor="email">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                            </svg>
                        </div>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            {...register("email")}
                            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-200 outline-none text-base"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <div className="flex justify-between items-center mb-2">
                        <label className="block text-sm font-semibold text-gray-900" htmlFor="password">
                            Password
                        </label>
                        <Link href="/auth/forgot-password" className="text-sm font-medium text-indigo-600 hover:text-purple-600 transition-colors duration-200">
                            Forgot Password?
                        </Link>
                    </div>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            {...register("password")}
                            className="w-full pl-11 pr-12 py-3 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-200 outline-none text-base"
                        />
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.password.message}
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 text-sm mt-2 text-center">
                            {error}
                        </p>
                    )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center">
                    <input className="h-4 w-4 text-indigo-600 focus:ring-indigo-600 border-gray-300 rounded cursor-pointer" id="remember-me" type="checkbox"/>
                    <label className="ml-2 block text-sm text-gray-500 cursor-pointer" htmlFor="remember-me">
                        Remember me
                    </label>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Loading..." : "Login"}
                    {!loading && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                    )}
                </button>
            </form>

            {/* Registration Link */}
            <div className="mt-8 text-center">
                <p className="text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/auth/register"
                        className="text-sm font-semibold text-indigo-600 hover:text-purple-600 hover:underline transition-all duration-200 ml-1"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}