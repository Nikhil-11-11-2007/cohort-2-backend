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
    const { loading } = useAppSelector((state) => state.auth)

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
        <div className="bg-white rounded-[1.5rem] shadow-[0px_10px_40px_rgba(79,70,229,0.08)] w-full max-w-[480px] p-6 md:p-8 border border-gray-200 relative overflow-hidden mx-auto mt-6">
            {/* Subtle top accent line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-600 to-purple-600"></div>
            
            <div className="text-center mb-5">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-indigo-600/10 text-indigo-600 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><line x1="19" x2="19" y1="8" y2="14"/><line x1="22" x2="16" y1="11" y2="11"/>
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Account</h1>
                <p className="text-sm text-gray-500">Start building your AI Resume</p>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6"
            >
                {/* Full Name Field */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1" htmlFor="name">
                        Full Name
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="name"
                            placeholder="Enter your name"
                            {...register("name")}
                            className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-200 outline-none text-sm"
                        />
                    </div>
                    {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.name.message}
                        </p>
                    )}
                </div>

                {/* Email Field */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1" htmlFor="email">
                        Email Address
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                            </svg>
                        </div>
                        <input
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            {...register("email")}
                            className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-200 outline-none text-sm"
                        />
                    </div>
                    {errors.email && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Mobile Number Field */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1" htmlFor="mobile">
                        Mobile Number
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="mobile"
                            placeholder="Enter mobile number"
                            {...register("mobile")}
                            className="w-full pl-11 pr-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-200 outline-none text-sm"
                        />
                    </div>
                    {errors.mobile && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.mobile.message}
                        </p>
                    )}
                </div>

                {/* Password Field */}
                <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-1" htmlFor="password">
                        Password
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                                <rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                            </svg>
                        </div>
                        <input
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            {...register("password")}
                            className="w-full pl-11 pr-12 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20 transition-all duration-200 outline-none text-sm"
                        />
                    </div>
                    {errors.password && (
                        <p className="text-red-500 text-xs mt-1">
                            {errors.password.message}
                        </p>
                    )}
                    {error && (
                        <p className="text-red-500 text-xs mt-1 text-center">
                            {error}
                        </p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex items-center justify-center gap-2 py-2 px-4 mt-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? "Loading..." : "Create Account"}
                    {!loading && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                        </svg>
                    )}
                </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                    Already have an account?{" "}
                    <Link
                        href="/auth/login"
                        className="text-sm font-semibold text-indigo-600 hover:text-purple-600 hover:underline transition-all duration-200 ml-1"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}