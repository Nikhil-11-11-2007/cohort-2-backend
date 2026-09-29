"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ResumeFormData } from "@/schemas/resume.schema";
import { Sparkles, X } from "lucide-react";

export default function SummaryStep() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ResumeFormData>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Professional Summary
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Write a short summary about your experience, skills and career
            goals.
          </p>
        </div>

        {/* AI Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-purple-700 active:scale-[0.97]"
        >
          <Sparkles size={17} />
          Generate with AI
        </button>
      </div>

      {/* Summary Input */}
      <div>
        <label
          htmlFor="summary"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Summary
        </label>

        <textarea
          id="summary"
          rows={7}
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

      {/* AI Summary Modal */}
      {isModalOpen && (
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
                onClick={() => setIsModalOpen(false)}
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
                  placeholder="e.g. Full Stack Developer"
                  required
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
                  placeholder="e.g. React, Node.js, MongoDB"
                  required
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
                  required
                  defaultValue="Fresher"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
                >
                  <option value="Fresher">Fresher</option>
                  <option value="Mid-Level">Mid-Level</option>
                  <option value="Senior-Level">Senior-Level</option>
                </select>
              </div>

              {/* Modal Actions */}
              <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-purple-700 active:scale-[0.97]"
                >
                  <Sparkles size={16} />
                  Generate Summary
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}