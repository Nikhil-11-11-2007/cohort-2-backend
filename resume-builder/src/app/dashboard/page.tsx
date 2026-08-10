"use client";

import { createResumeApi } from "@/apis/resume.api";
import { useRouter } from "next/navigation";

import Navbar from "@/components/shared/Navbar";
import Protected from "@/components/Protected";
import Link from "next/link";
import { ArrowRight, FileText, Plus } from "lucide-react";

export default function DashboardPage() {
    const router = useRouter();

    const handleCreateResume =
        async () => {
            try {
                const response =
                    await createResumeApi();

                const resumeId = response.data._id;

                console.log(resumeId);

                router.push(
                    `/resume/${resumeId}`
                );
            } catch (error) {
                console.log(error);
            }
        };

    return (
        <Protected>
            <Navbar />

            <main className="min-h-[calc(100vh-80px)] bg-gray-50 px-6 py-10">
                <div className="mx-auto max-w-6xl">
                    {/* Welcome Section */}
                    <section className="mb-10">
                        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                            <div>
                                <p className="mb-2 text-sm font-medium text-blue-600">
                                    ATS Resume Builder
                                </p>

                                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                    Welcome back, Nikhil 👋
                                </h1>

                                <p className="mt-3 max-w-xl text-gray-600">
                                    Build a professional resume that gets noticed and stands out
                                    in ATS screening.
                                </p>
                            </div>

                            {/* Create Resume Button */}
                            <Link
                                href="#"
                                className="inline-flex w-fit items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                            >
                                <Plus size={20} />
                                Create New Resume
                            </Link>
                        </div>
                    </section>

                    {/* Resumes Section */}
                    <section>
                        <div className="mb-5 flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Your Resumes
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Manage and edit your resumes
                                </p>
                            </div>

                            <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-600">
                                2 Resumes
                            </span>
                        </div>

                        {/* Resume Cards */}
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {/* Resume Card 1 */}
                            <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                <div className="mb-5 flex items-start justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                        <FileText size={24} />
                                    </div>

                                    <button className="text-gray-400 transition hover:text-gray-700">
                                        •••
                                    </button>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900">
                                    Frontend Developer Resume
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Updated 2 hours ago
                                </p>

                                <div className="mt-6">
                                    <Link
                                        href="#"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
                                    >
                                        Edit Resume
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>

                            {/* Resume Card 2 */}
                            <div className="group rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                                <div className="mb-5 flex items-start justify-between">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                                        <FileText size={24} />
                                    </div>

                                    <button className="text-gray-400 transition hover:text-gray-700">
                                        •••
                                    </button>
                                </div>

                                <h3 className="text-lg font-semibold text-gray-900">
                                    Full Stack Developer Resume
                                </h3>

                                <p className="mt-2 text-sm text-gray-500">
                                    Updated yesterday
                                </p>

                                <div className="mt-6">
                                    <Link
                                        href="#"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-blue-600 hover:text-blue-600"
                                    >
                                        Edit Resume
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </div>

                            {/* Create New Resume Card */}
                            <Link
                                href="#"
                                className="group flex min-h-[245px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-white p-5 text-center transition hover:border-blue-500 hover:bg-blue-50/40"
                            >
                                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 transition group-hover:scale-110">
                                    <Plus size={28} />
                                </div>

                                <h3 className="mt-4 text-lg font-semibold text-gray-900">
                                    Create New Resume
                                </h3>

                                <p className="mt-2 max-w-xs text-sm text-gray-500">
                                    Start building your next ATS-friendly resume.
                                </p>
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
        </Protected>
    );
}