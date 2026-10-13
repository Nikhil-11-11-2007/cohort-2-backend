
"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Sparkles, X } from "lucide-react";

import { ResumeFormData } from "@/schemas/resume.schema";
import { generateProjectDescriptionApi } from "@/apis/ai.api";

interface GenerateProjectDescriptionModalProps {
    index: number;
    onClose: () => void;
}

type ExperienceLevel = "Fresher" | "Mid-Level" | "Senior-Level";

export default function GenerateProjectDescriptionModal({
    index,
    onClose,
}: GenerateProjectDescriptionModalProps) {
    const { watch, setValue } = useFormContext<ResumeFormData>();

    const currentTitle = watch(`projects.${index}.title`);
    const currentTechStack = watch(`projects.${index}.techStack`) ?? [];

    // Modal ke andar editable fields ki local state
    const [projectTitle, setProjectTitle] = useState(currentTitle ?? "");
    const [technologiesInput, setTechnologiesInput] = useState(
        currentTechStack.join(", ")
    );

    const [experienceLevel, setExperienceLevel] =
        useState<ExperienceLevel>("Fresher");

    const [isGenerating, setIsGenerating] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const handleGenerateDescription = async () => {
        const technologies = technologiesInput
            .split(",")
            .map((tech) => tech.trim())
            .filter(Boolean);

        if (!projectTitle.trim()) {
            setAiError("Please enter the project title first.");
            return;
        }

        if (technologies.length === 0) {
            setAiError("Please add at least one technology first.");
            return;
        }

        try {
            setIsGenerating(true);
            setAiError(null);

            const response = await generateProjectDescriptionApi({
                projectTitle: projectTitle.trim(),
                experienceLevel,
                techStack: technologies.join(", "),
            });

            if (!response.success) {
                setAiError(
                    response.message || "Failed to generate project description."
                );
                return;
            }

            const description = response.data?.projectDescription;

            if (!description) {
                setAiError("AI did not return a project description.");
                return;
            }

            // Updated values ko main React Hook Form mein save karein
            setValue(`projects.${index}.title`, projectTitle.trim(), {
                shouldValidate: true,
                shouldDirty: true,
            });

            setValue(`projects.${index}.techStack`, technologies, {
                shouldValidate: true,
                shouldDirty: true,
            });

            setValue(`projects.${index}.description`, description, {
                shouldValidate: true,
                shouldDirty: true,
            });

            onClose();
        } catch (error) {
            console.error("Generate project description error:", error);
            setAiError(
                "Something went wrong while generating the project description. Please Try Again"
            );
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={(event) => {
                if (event.target === event.currentTarget && !isGenerating) {
                    onClose();
                }
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="generate-project-description-title"
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            >
                {/* Modal Header */}
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <Sparkles size={20} className="text-purple-600" />

                            <h2
                                id="generate-project-description-title"
                                className="text-xl font-bold text-gray-900"
                            >
                                Generate Project Description
                            </h2>
                        </div>

                        <p className="text-sm text-gray-500">
                            Edit your project details and generate an ATS-friendly
                            description using AI.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isGenerating}
                        aria-label="Close modal"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-5">
                    {/* Editable Project Title */}
                    <div>
                        <label
                            htmlFor="projectTitle"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Project Title
                        </label>

                        <input
                            id="projectTitle"
                            type="text"
                            value={projectTitle}
                            onChange={(event) => {
                                setProjectTitle(event.target.value);
                                setAiError(null);
                            }}
                            disabled={isGenerating}
                            placeholder="e.g. ATS Resume Builder"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 disabled:bg-gray-100"
                        />
                    </div>

                    {/* Editable Technologies */}
                    <div>
                        <label
                            htmlFor="projectTechStack"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Technologies
                        </label>

                        <textarea
                            id="projectTechStack"
                            rows={3}
                            value={technologiesInput}
                            onChange={(event) => {
                                setTechnologiesInput(event.target.value);
                                setAiError(null);
                            }}
                            disabled={isGenerating}
                            placeholder="React, Next.js, TypeScript, MongoDB"
                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 disabled:bg-gray-100"
                        />

                        <p className="mt-1 text-xs text-gray-500">
                            Separate each technology with a comma.
                        </p>
                    </div>

                    {/* Experience Level */}
                    <div>
                        <label
                            htmlFor="projectExperienceLevel"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Experience Level
                        </label>

                        <select
                            id="projectExperienceLevel"
                            value={experienceLevel}
                            onChange={(event) =>
                                setExperienceLevel(event.target.value as ExperienceLevel)
                            }
                            disabled={isGenerating}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                        >
                            <option value="Fresher">Fresher</option>
                            <option value="Mid-Level">Mid-Level</option>
                            <option value="Senior-Level">Senior-Level</option>
                        </select>
                    </div>

                    {/* Error Message */}
                    {aiError && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
                        >
                            {aiError}
                        </p>
                    )}

                    {/* Modal Actions */}
                    <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isGenerating}
                            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleGenerateDescription}
                            disabled={isGenerating}
                            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <Sparkles size={16} />
                            {isGenerating ? "Generating..." : "Generate Description"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
