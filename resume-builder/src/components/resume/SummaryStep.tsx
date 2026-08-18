"use client";

import { useFormContext } from "react-hook-form";
import { ResumeFormData } from "@/schemas/resume.schema";

export default function SummaryStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ResumeFormData>();

  return (
    <section className="rounded-2xl border border-gray-200 bg-white text-black p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Professional Summary
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Write a short summary about your experience, skills and career goals.
        </p>
      </div>

      <div>
        <label
          htmlFor="summary"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Summary
        </label>

        <textarea
          id="summary"
          rows={6}
          placeholder="Write your professional summary..."
          {...register("summary")}
          className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        {errors.summary && (
          <p className="mt-1 text-sm text-red-500">
            {errors.summary.message}
          </p>
        )}
      </div>
    </section>
  );
}