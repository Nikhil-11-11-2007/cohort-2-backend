
"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Sparkles, Trash2 } from "lucide-react";

import { ResumeFormData } from "@/schemas/resume.schema";
import ExperienceDescriptionModal from "../Ai-modals/ExperienceDescriptionModal";

interface ExperienceItemProps {
    index: number;
    onRemove: () => void;
}

export default function ExperienceItem({
    index,
    onRemove,
}: ExperienceItemProps) {
    const {
        register,
        formState: { errors },
    } = useFormContext<ResumeFormData>();

    const [isModalOpen, setIsModalOpen] = useState(false);

    const experienceErrors = errors.workExperience?.[index];

    return (
        <div className="rounded-xl border border-gray-200 p-5">
            <div className="mb-5 flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">
                    Experience {index + 1}
                </h3>

                <button
                    type="button"
                    onClick={onRemove}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50"
                >
                    <Trash2 size={16} />
                    Remove
                </button>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
                {/* Company */}
                <div>
                    <label
                        htmlFor={`workExperience-${index}-company`}
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Company
                    </label>

                    <input
                        id={`workExperience-${index}-company`}
                        type="text"
                        placeholder="Google"
                        {...register(`workExperience.${index}.company`)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {experienceErrors?.company && (
                        <p className="mt-1 text-sm text-red-500">
                            {experienceErrors.company.message}
                        </p>
                    )}
                </div>

                {/* Position */}
                <div>
                    <label
                        htmlFor={`workExperience-${index}-position`}
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Position
                    </label>

                    <input
                        id={`workExperience-${index}-position`}
                        type="text"
                        placeholder="Frontend Developer"
                        {...register(`workExperience.${index}.position`)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {experienceErrors?.position && (
                        <p className="mt-1 text-sm text-red-500">
                            {experienceErrors.position.message}
                        </p>
                    )}
                </div>

                {/* Start Date */}
                <div>
                    <label
                        htmlFor={`workExperience-${index}-startDate`}
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        Start Date
                    </label>

                    <input
                        id={`workExperience-${index}-startDate`}
                        type="date"
                        {...register(`workExperience.${index}.startDate`)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {experienceErrors?.startDate && (
                        <p className="mt-1 text-sm text-red-500">
                            {experienceErrors.startDate.message}
                        </p>
                    )}
                </div>

                {/* End Date */}
                <div>
                    <label
                        htmlFor={`workExperience-${index}-endDate`}
                        className="mb-2 block text-sm font-medium text-gray-700"
                    >
                        End Date
                    </label>

                    <input
                        id={`workExperience-${index}-endDate`}
                        type="date"
                        {...register(`workExperience.${index}.endDate`)}
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    {experienceErrors?.endDate && (
                        <p className="mt-1 text-sm text-red-500">
                            {experienceErrors.endDate.message}
                        </p>
                    )}
                </div>
            </div>

            {/* Description */}
            <div className="mt-5">
                <label
                    htmlFor={`workExperience-${index}-description`}
                    className="mb-2 block text-sm font-medium text-gray-700"
                >
                    Description
                </label>

                <textarea
                    id={`workExperience-${index}-description`}
                    rows={5}
                    placeholder="Describe your responsibilities, achievements and contributions..."
                    {...register(`workExperience.${index}.description`)}
                    className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <div className="mt-1 flex items-start justify-between">
                    {experienceErrors?.description ? (
                        <p className="text-sm text-red-500">
                            {experienceErrors.description.message}
                        </p>
                    ) : (
                        <span />
                    )}

                    <span className="text-xs text-gray-400">
                        Minimum 10 characters
                    </span>
                </div>
            </div>

            {/* AI Description Button */}
            <div className="mt-4">
                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-lg border border-purple-200 px-4 py-2.5 text-sm font-medium text-purple-700 transition hover:bg-purple-50"
                >
                    <Sparkles size={17} />
                    Generate with AI
                </button>
            </div>

            {isModalOpen && (
                <ExperienceDescriptionModal
                    index={index}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}
