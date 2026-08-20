"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { ResumeFormData } from "@/schemas/resume.schema";
import { Plus, Trash2 } from "lucide-react";

export default function ExperienceStep() {
    const {
        control,
        register,
        formState: { errors },
    } = useFormContext<ResumeFormData>();

    const { fields, append, remove } = useFieldArray({
        control,
        name: "workExperience",
    });

    const handleAddExperience = () => {
        append({
            company: "",
            position: "",
            startDate: "",
            endDate: "",
            description: "",
        });
    };

    return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">
                        Work Experience
                        <span className="ml-2 text-sm font-normal text-gray-400">
                            (Optional)
                        </span>
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Add your previous work experience, internships or jobs.
                        Skip this section if you are a fresher.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleAddExperience}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
                >
                    <Plus size={17} />
                    Add Experience
                </button>
            </div>

            {/* Empty State */}
            {fields.length === 0 && (
                <div className="rounded-xl border-2 border-dashed border-gray-200 py-10 text-center">
                    <p className="text-sm text-gray-500">
                        No work experience added yet.
                    </p>

                    <button
                        type="button"
                        onClick={handleAddExperience}
                        className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                        + Add your experience
                    </button>
                </div>
            )}

            {/* Experience Items */}
            <div className="space-y-6">
                {fields.map((field, index) => (
                    <div
                        key={field.id}
                        className="rounded-xl border border-gray-200 p-5"
                    >
                        {/* Experience Header */}
                        <div className="mb-5 flex items-center justify-between">
                            <h3 className="font-semibold text-gray-900">
                                Experience {index + 1}
                            </h3>

                            <button
                                type="button"
                                onClick={() => remove(index)}
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

                                {errors.workExperience?.[index]?.company && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.workExperience[index].company.message}
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

                                {errors.workExperience?.[index]?.position && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.workExperience[index].position.message}
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

                                {errors.workExperience?.[index]?.startDate && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.workExperience[index].startDate.message}
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

                                {errors.workExperience?.[index]?.endDate && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.workExperience[index].endDate.message}
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
                                {errors.workExperience?.[index]?.description ? (
                                    <p className="text-sm text-red-500">
                                        {errors.workExperience[index].description.message}
                                    </p>
                                ) : (
                                    <span />
                                )}

                                <span className="text-xs text-gray-400">
                                    Minimum 10 characters
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}