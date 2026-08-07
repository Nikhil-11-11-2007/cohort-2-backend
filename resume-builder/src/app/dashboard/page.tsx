"use client";

import { createResumeApi } from "@/apis/resume.api";
import { useRouter } from "next/navigation";

import Navbar from "@/components/shared/Navbar";

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
        <>
            <Navbar />

            <main className="p-10">
                <h1 className="text-3xl font-bold mb-8">
                    Dashboard
                </h1>

                <button
                    onClick={handleCreateResume}
                    className="bg-blue-600 text-white px-5 py-3 rounded"
                >
                    Create Resume
                </button>
            </main>
        </>
    );
}