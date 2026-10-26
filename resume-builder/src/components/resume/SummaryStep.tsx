"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { ResumeFormData } from "@/schemas/resume.schema";
import { Sparkles } from "lucide-react";
import GenerateSummaryModal from "../Ai-modals/GenerateSummaryModal";
import useImproveContent from "@/hooks/useImproveContent";

export default function SummaryStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeFormData>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const summary = watch("summary") ?? "";

  const { improveContent, isImproving, improveError} = useImproveContent()

  const handleImproveSummary = async () => {
    const improvedContent = await improveContent(summary);

    if (improvedContent === null) return;

    setValue("summary", improvedContent, {
      shouldDirty: true,
      shouldValidate: true,
    });
  };

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
      {/* AI Button */}
      <button
        type="button"
        onClick={() => setIsModalOpen(true)}
        className="inline-flex mt-4 w-fit cursor-pointer items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-purple-700 active:scale-[0.97]"
      >
        <Sparkles size={17} />
        Generate with AI
      </button>

      <button
        type="button"
        disabled={isImproving || !summary?.trim()}
        onClick={handleImproveSummary}
        className="inline-flex mt-4 ml-3 w-fit items-center gap-2 rounded-lg border border-purple-300 px-4 py-2.5 text-sm font-medium text-purple-700 transition hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <Sparkles size={17} />
        {isImproving ? "Improving..." : "Improve with AI"}
      </button>

      {improveError && (
        <p className="mt-2 text-sm text-red-500" role="alert">
          {improveError}
        </p>
      )}

      {/* AI Summary Modal */}
      {isModalOpen && (
        <GenerateSummaryModal onClose={() => setIsModalOpen(false)} />
      )}
    </section>
  );
}