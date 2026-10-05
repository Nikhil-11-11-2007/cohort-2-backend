"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Sparkles, X } from "lucide-react";

import { ResumeFormData } from "@/schemas/resume.schema";
import { generateSummaryApi } from "@/apis/ai.api";

interface GenerateSummaryModalProps {
    onClose: () => void;
}

export default function GenerateSummaryModal({
    onClose,
}: GenerateSummaryModalProps) {
    const { setValue } = useFormContext<ResumeFormData>();

    const [jobTitle, setJobTitle] = useState("");
    const [skillsInput, setSkillsInput] = useState("");
    const [experienceLevel, setExperienceLevel] = useState<"Fresher" | "Mid-Level" | "Senior-Level">("Fresher");

    const [isGenerating, setIsGenerating] = useState(false);
    const [aiError, setAiError] = useState<string | null>(null);

    const handleGenerateSummary = async () => {
        const skills = skillsInput
            .split(",")
            .map((skill) => skill.trim())
            .filter(Boolean);

        if (!jobTitle.trim() || skills.length === 0) {
            setAiError("Please enter a job title and at least one skill.");
            return;
        }

        try {
            setIsGenerating(true);
            setAiError(null);

            const response = await generateSummaryApi({
                jobTitle: jobTitle.trim(),
                skills,
                experienceLevel,
            });

            if (!response.success) {
                setAiError(response.message || "Failed to generate summary.");
                return;
            }

            setValue("summary", response.data.summary, {
                shouldValidate: true,
                shouldDirty: true,
            });

            onClose();
        } catch (error) {
            console.error("Generate summary error:", error);

            setAiError("Something went wrong while generating the summary.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
                {/* Modal Header */}
                <div className="mb-6 flex items-start justify-between">
                    <div>
                        <div className="mb-2 flex items-center gap-2">
                            <Sparkles size={20} className="text-purple-600" />

                            <h2 className="text-xl font-bold text-gray-900">
                                Generate Summary
                            </h2>
                        </div>

                        <p className="text-sm text-gray-500">
                            Enter your details to generate an ATS-friendly summary.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        aria-label="Close modal"
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Modal Fields */}
                <div className="space-y-5">
                    {/* Job Title */}
                    <div>
                        <label
                            htmlFor="jobTitle"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Job Title
                        </label>

                        <input
                            id="jobTitle"
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            placeholder="e.g. Full Stack Developer"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                        />
                    </div>

                    {/* Skills */}
                    <div>
                        <label
                            htmlFor="skills"
                            className="mb-2 block text-sm font-medium text-gray-700"
                        >
                            Skills
                        </label>

                        <input
                            id="skills"
                            type="text"
                            value={skillsInput}
                            onChange={(e) => setSkillsInput(e.target.value)}
                            placeholder="e.g. React, Node.js, MongoDB"
                            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                        />

                        <p className="mt-1 text-xs text-gray-500">
                            Separate multiple skills with commas.
                        </p>
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
                            onChange={(e) =>
                                setExperienceLevel(
                                    e.target.value as
                                    | "Fresher"
                                    | "Mid-Level"
                                    | "Senior-Level"
                                )
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                        >
                            <option value="Fresher">Fresher</option>
                            <option value="Mid-Level">Mid-Level</option>
                            <option value="Senior-Level">Senior-Level</option>
                        </select>
                    </div>

                    {/* Error */}
                    {aiError && (
                        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
                            {aiError}
                        </p>
                    )}

                    {/* Modal Actions */}
                    <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isGenerating}
                            className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleGenerateSummary}
                            disabled={isGenerating}
                            className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-70"
                        >
                            <Sparkles size={16} />
                            {isGenerating ? "Generating..." : "Generate Summary"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}