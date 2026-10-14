
"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Sparkles, X } from "lucide-react";

import { ResumeFormData } from "@/schemas/resume.schema";
import { generateExperienceApi } from "@/apis/ai.api";

interface ExperienceDescriptionModalProps {
    index: number;
    onClose: () => void;
}

type ExperienceLevel = "Fresher" | "Junior" | "Mid-Level" | "Senior";

export default function ExperienceDescriptionModal({
    index,
    onClose,
}: ExperienceDescriptionModalProps) {
    const { watch, setValue } = useFormContext<ResumeFormData>();

    const currentPosition = watch(`workExperience.${index}.position`);

    const [jobRole, setJobRole] = useState(currentPosition ?? "");
    const [experienceLevel, setExperienceLevel] =
        useState<ExperienceLevel>("Fresher");
    const [yearsOfExperience, setYearsOfExperience] = useState("0");
    const [techStackInput, setTechStackInput] = useState("");

    const [isGenerating, setIsGenerating] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const handleGenerateDescription = async () => {
        const technologies = techStackInput
            .split(",")
            .map((tech) => tech.trim())
            .filter(Boolean);

        const years = Number(yearsOfExperience);

        if (!jobRole.trim()) {
            setAiError("Please enter your job role.");
            return;
        }

        if (!techStackInput.trim() || technologies.length === 0) {
            setAiError("Please add at least one technology.");
            return;
        }

        if (
            yearsOfExperience.trim() === "" ||
            !Number.isFinite(years) ||
            years < 0
        ) {
            setAiError("Please enter a valid number of years.");
            return;
        }

        try {
            setIsGenerating(true);
            setAiError(null);

            const response = await generateExperienceApi({
                jobRole: jobRole.trim(),
                experienceLevel,
                yearsOfExperience: years,
                techStack: technologies,
            });

            if (!response.success) {
                setAiError(
                    response.message || "Failed to generate work experience description."
                );
                return;
            }

            const description = response.data?.workExperienceDescription;

            if (!description) {
                setAiError("AI did not return a work experience description.");
                return;
            }

            // Updated role aur generated description main form mein save karein.
            setValue(`workExperience.${index}.position`, jobRole.trim(), {
                shouldValidate: true,
                shouldDirty: true,
            });

            setValue(`workExperience.${index}.description`, description, {
                shouldValidate: true,
                shouldDirty: true,
            });

            onClose();
        } catch (error) {
            console.error("Generate experience description error:", error);
            setAiError("AI service is currently busy. Please try again in a few moments");
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
                aria-labelledby="experience-description-title"
                className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
            >
                {/* Header */}
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <Sparkles size={20} className="text-purple-600" />

                            <h2
                                id="experience-description-title"
                                className="text-xl font-bold text-gray-900"
                            >
                                Generate Experience Description
                            </h2>
                        </div>

                        <p className="text-sm text-gray-500">
                            Enter your role and technologies to generate an ATS-friendly
                            work experience description.
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
                    {/* Job Role */}
                    <div>
                        <label
                            htmlFor="experienceJobRole"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Job Role
                        </label>

                        <input
                            id="experienceJobRole"
                            type="text"
                            value={jobRole}
                            onChange={(event) => {
                                setJobRole(event.target.value);
                                setAiError(null);
                            }}
                            disabled={isGenerating}
                            placeholder="Frontend Developer"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 disabled:bg-gray-100"
                        />
                    </div>

                    {/* Experience Level */}
                    <div>
                        <label
                            htmlFor="experienceLevel"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Experience Level
                        </label>

                        <select
                            id="experienceLevel"
                            value={experienceLevel}
                            onChange={(event) =>
                                setExperienceLevel(event.target.value as ExperienceLevel)
                            }
                            disabled={isGenerating}
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                        >
                            <option value="Fresher">Fresher</option>
                            <option value="Junior">Junior</option>
                            <option value="Mid-Level">Mid-Level</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>

                    {/* Years of Experience */}
                    <div>
                        <label
                            htmlFor="yearsOfExperience"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Years of Experience
                        </label>

                        <input
                            id="yearsOfExperience"
                            type="number"
                            min="0"
                            step="0.5"
                            value={yearsOfExperience}
                            onChange={(event) => {
                                setYearsOfExperience(event.target.value);
                                setAiError(null);
                            }}
                            disabled={isGenerating}
                            placeholder="0"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 disabled:bg-gray-100"
                        />
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <label
                            htmlFor="experienceTechStack"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Tech Stack
                        </label>

                        <textarea
                            id="experienceTechStack"
                            rows={3}
                            value={techStackInput}
                            onChange={(event) => {
                                setTechStackInput(event.target.value);
                                setAiError(null);
                            }}
                            disabled={isGenerating}
                            placeholder="React, TypeScript, Node.js, MongoDB"
                            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100 disabled:bg-gray-100"
                        />

                        <p className="mt-1 text-xs text-gray-500">
                            Separate technologies with commas.
                        </p>
                    </div>

                    {/* Error */}
                    {aiError && (
                        <p
                            role="alert"
                            className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
                        >
                            {aiError}
                        </p>
                    )}

                    {/* Actions */}
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
