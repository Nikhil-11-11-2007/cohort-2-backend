"use client";

import { useFormContext } from "react-hook-form";
import { ResumeFormData } from "@/schemas/resume.schema";

export default function PersonalInfoStep() {
    const {
        register,
        formState: { errors },
    } = useFormContext<ResumeFormData>();

    return (
        <section className="rounded-2xl border border-gray-200 bg-white text-black p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-700">
                    Personal Information
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Add your basic information and professional links.
                </p>
            </div>

            {/* Form Fields */}
            <div className="grid gap-5 md:grid-cols-2">

                {/* Full Name */}
                <div>
                    <label
                        htmlFor="fullname"
                        className="mb-2 block text-sm font-medium text-gray-900"
                    >
                        Full Name
                    </label>

                    <input
                        id="fullname"
                        type="text"
                        placeholder="Enter your full name"
                        {...register("personalInfo.fullname")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.personalInfo?.fullname && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.personalInfo.fullname.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        autoComplete="email"
                        {...register("personalInfo.email")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.personalInfo?.email && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.personalInfo.email.message}
                        </p>
                    )}
                </div>

                {/* Mobile */}
                <div>
                    <label
                        htmlFor="mobile"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Mobile Number
                    </label>

                    <input
                        id="mobile"
                        type="tel"
                        placeholder="Enter your mobile number"
                        autoComplete="tel"
                        {...register("personalInfo.mobile")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.personalInfo?.mobile && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.personalInfo.mobile.message}
                        </p>
                    )}
                </div>

                {/* Location */}
                <div>
                    <label
                        htmlFor="location"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Location
                    </label>

                    <input
                        id="location"
                        type="text"
                        placeholder="e.g. Orai, Uttar Pradesh"
                        {...register("personalInfo.location")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.personalInfo?.location && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.personalInfo.location.message}
                        </p>
                    )}
                </div>

                {/* GitHub */}
                <div>
                    <label
                        htmlFor="github"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        GitHub
                    </label>

                    <input
                        id="github"
                        type="url"
                        placeholder="https://github.com/username"
                        {...register("personalInfo.github")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.personalInfo?.github && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.personalInfo.github.message}
                        </p>
                    )}
                </div>

                {/* LinkedIn */}
                <div>
                    <label
                        htmlFor="linkedIn"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        LinkedIn
                    </label>

                    <input
                        id="linkedIn"
                        type="url"
                        placeholder="https://linkedin.com/in/username"
                        {...register("personalInfo.linkedIn")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.personalInfo?.linkedIn && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.personalInfo.linkedIn.message}
                        </p>
                    )}
                </div>

                {/* Portfolio */}
                <div className="md:col-span-2">
                    <label
                        htmlFor="portfolio"
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Portfolio
                    </label>

                    <input
                        id="portfolio"
                        type="url"
                        placeholder="https://yourportfolio.com"
                        {...register("personalInfo.portfolio")}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {errors.personalInfo?.portfolio && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.personalInfo.portfolio.message}
                        </p>
                    )}
                </div>

            </div>
        </section>
    );
}