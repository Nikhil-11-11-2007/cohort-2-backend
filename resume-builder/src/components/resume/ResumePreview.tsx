"use client";

import { useFormContext } from "react-hook-form";
import { ResumeFormData } from "@/schemas/resume.schema";

export default function ResumePreview() {
    const { watch } = useFormContext<ResumeFormData>();

    // Pure form ka live data
    const data = watch();

    const {
        title,
        summary,
        personalInfo,
        education,
        workExperience,
        projects,
        skills,
        certifications,
    } = data;

    return (
        <div className="sticky top-6 max-h-[calc(100vh-48px)] overflow-y-auto rounded-2xl bg-white p-8 text-gray-900 shadow-lg">
            {/* Header */}
            {/* Resume Title */}
            {title && (
                <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-blue-600">
                    {title}
                </p>
            )}
            <div className="border-b border-gray-300 pb-5">
                <h1 className="text-2xl font-bold">
                    {personalInfo?.fullname || "Your Name"}
                </h1>

                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-gray-600">
                    {personalInfo?.email && (
                        <span>{personalInfo.email}</span>
                    )}

                    {personalInfo?.mobile && (
                        <span>• {personalInfo.mobile}</span>
                    )}

                    {personalInfo?.location && (
                        <span>• {personalInfo.location}</span>
                    )}
                </div>

                <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm text-blue-600">
                    {personalInfo?.github && (
                        <span>{personalInfo.github}</span>
                    )}

                    {personalInfo?.linkedIn && (
                        <span>{personalInfo.linkedIn}</span>
                    )}

                    {personalInfo?.portfolio && (
                        <span>{personalInfo.portfolio}</span>
                    )}
                </div>
            </div>

            {/* Summary */}
            {summary && (
                <section className="mt-6">
                    <h2 className="border-b border-gray-300 pb-2 text-sm font-bold uppercase tracking-wider">
                        Professional Summary
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-700">
                        {summary}
                    </p>
                </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
                <section className="mt-6">
                    <h2 className="border-b border-gray-300 pb-2 text-sm font-bold uppercase tracking-wider">
                        Education
                    </h2>

                    <div className="mt-4 space-y-4">
                        {education.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between gap-4">
                                    <h3 className="font-semibold">
                                        {item.degree}
                                    </h3>

                                    <span className="text-sm text-gray-500">
                                        {item.startDate} - {item.endDate}
                                    </span>
                                </div>

                                <p className="text-sm text-gray-700">
                                    {item.institute}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Experience */}
            {workExperience && workExperience.length > 0 && (
                <section className="mt-6">
                    <h2 className="border-b border-gray-300 pb-2 text-sm font-bold uppercase tracking-wider">
                        Work Experience
                    </h2>

                    <div className="mt-4 space-y-5">
                        {workExperience.map((item, index) => (
                            <div key={index}>
                                <div className="flex justify-between gap-4">
                                    <h3 className="font-semibold">
                                        {item.position}
                                    </h3>

                                    <span className="text-sm text-gray-500">
                                        {item.startDate} - {item.endDate}
                                    </span>
                                </div>

                                <p className="text-sm font-medium text-gray-600">
                                    {item.company}
                                </p>

                                {item.description && (
                                    <p className="mt-2 text-sm leading-6 text-gray-700">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Projects */}
            {projects && projects.length > 0 && (
                <section className="mt-6">
                    <h2 className="border-b border-gray-300 pb-2 text-sm font-bold uppercase tracking-wider">
                        Projects
                    </h2>

                    <div className="mt-4 space-y-5">
                        {projects.map((project, index) => (
                            <div key={index}>
                                <h3 className="font-semibold">
                                    {project.title}
                                </h3>

                                {project.description && (
                                    <p className="mt-2 text-sm leading-6 text-gray-700">
                                        {project.description}
                                    </p>
                                )}

                                {project.techStack?.length > 0 && (
                                    <p className="mt-2 text-sm text-gray-600">
                                        <span className="font-medium">
                                            Technologies:
                                        </span>{" "}
                                        {project.techStack.join(", ")}
                                    </p>
                                )}

                                <div className="mt-2 flex flex-wrap gap-3 text-sm text-blue-600">
                                    {project.githubUrl && (
                                        <span>{project.githubUrl}</span>
                                    )}

                                    {project.liveUrl && (
                                        <span>{project.liveUrl}</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Skills */}
            {skills && skills.length > 0 && (
                <section className="mt-6">
                    <h2 className="border-b border-gray-300 pb-2 text-sm font-bold uppercase tracking-wider">
                        Skills
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-gray-700">
                        {skills.join(" • ")}
                    </p>
                </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
                <section className="mt-6">
                    <h2 className="border-b border-gray-300 pb-2 text-sm font-bold uppercase tracking-wider">
                        Certifications
                    </h2>

                    <ul className="mt-3 list-inside list-disc space-y-1 text-sm text-gray-700">
                        {certifications.map((certification, index) => (
                            <li key={index}>
                                {certification}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}