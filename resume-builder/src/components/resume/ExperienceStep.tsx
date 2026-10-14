
"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { Plus } from "lucide-react";

import { ResumeFormData } from "@/schemas/resume.schema";
import ExperienceItem from "../resume-cards/ExperienceItem";

export default function ExperienceStep() {
    const { control } = useFormContext<ResumeFormData>();

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

            <div className="space-y-6">
                {fields.map((field, index) => (
                    <ExperienceItem
                        key={field.id}
                        index={index}
                        onRemove={() => remove(index)}
                    />
                ))}
            </div>
        </section>
    );
}
