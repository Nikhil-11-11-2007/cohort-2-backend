"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { ResumeFormData } from "@/schemas/resume.schema";
import { Plus, Trash2 } from "lucide-react";

export default function EducationStep() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormData>();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  const handleAddEducation = () => {
    append({
      institute: "",
      degree: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Education
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add your educational background.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddEducation}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />
          Add Education
        </button>
      </div>

      {/* Empty State */}
      {fields.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 py-10 text-center">
          <p className="text-sm text-gray-500">
            No education added yet.
          </p>

          <button
            type="button"
            onClick={handleAddEducation}
            className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            + Add your education
          </button>
        </div>
      )}

      {/* Education Fields */}
      <div className="space-y-6">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-xl border border-gray-200 p-5"
          >
            {/* Education Header */}
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">
                Education {index + 1}
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

              {/* Institute */}
              <div>
                <label
                  htmlFor={`education-${index}-institute`}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Institute
                </label>

                <input
                  id={`education-${index}-institute`}
                  type="text"
                  placeholder="Asian International University"
                  {...register(`education.${index}.institute`)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                {errors.education?.[index]?.institute && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.education[index].institute.message}
                  </p>
                )}
              </div>

              {/* Degree */}
              <div>
                <label
                  htmlFor={`education-${index}-degree`}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Degree
                </label>

                <input
                  id={`education-${index}-degree`}
                  type="text"
                  placeholder="BCA"
                  {...register(`education.${index}.degree`)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                {errors.education?.[index]?.degree && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.education[index].degree.message}
                  </p>
                )}
              </div>

              {/* Start Date */}
              <div>
                <label
                  htmlFor={`education-${index}-startDate`}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Start Date
                </label>

                <input
                  id={`education-${index}-startDate`}
                  type="date"
                  {...register(`education.${index}.startDate`)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                {errors.education?.[index]?.startDate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.education[index].startDate.message}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label
                  htmlFor={`education-${index}-endDate`}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  End Date
                </label>

                <input
                  id={`education-${index}-endDate`}
                  type="date"
                  {...register(`education.${index}.endDate`)}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                {errors.education?.[index]?.endDate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.education[index].endDate.message}
                  </p>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}