"use client";

import { improveContentApi } from "@/apis/ai.api";
import axios from "axios";
import { useFormContext } from "react-hook-form";
import { ResumeFormData } from "@/schemas/resume.schema";
import { Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import GenerateProjectDescriptionModal from "../Ai-modals/ProjectDescriptionModal";

interface ProjectItemProps {
  index: number;
  onRemove: () => void;
}

export default function ProjectItem({ index, onRemove, }: ProjectItemProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeFormData>();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImproving, setIsImproving] = useState(false);
  const [improveError, setImproveError] = useState<string | null>(null);

  const description = watch(`projects.${index}.description`) ?? "";

  const handleImproveDescription = async () => {
    if (!description.trim()) {
      setImproveError("Please enter a project description first.");
      return;
    }

    try {
      setIsImproving(true);
      setImproveError(null);

      const response = await improveContentApi({
        content: description,
      });

      if (!response.success) {
        setImproveError(
          response.message || "Failed to improve project description."
        );
        return;
      }

      const improvedContent = response.data?.improvedContent;

      if (!improvedContent) {
        setImproveError("AI did not return improved content.");
        return;
      }

      setValue(`projects.${index}.description`, improvedContent, {
        shouldDirty: true,
        shouldValidate: true,
      });
    } catch (error) {
      console.error("Improve project description error:", error);

      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        setImproveError(
          typeof message === "string"
            ? message
            : "Unable to improve description. Please try again."
        );
      } else {
        setImproveError("Something went wrong. Please try again.");
      }
    } finally {
      setIsImproving(false);
    }
  };

  const techStack = watch(`projects.${index}.techStack`);

  const handleAddTech = () => {
    setValue(
      `projects.${index}.techStack`,
      [...techStack, ""],
      {
        shouldDirty: true,
      }
    );
  };

  const handleRemoveTech = (techIndex: number) => {
    setValue(
      `projects.${index}.techStack`,
      techStack.filter((_, index) => index !== techIndex),
      {
        shouldDirty: true,
      }
    );
  };

  return (
    <div className="rounded-xl border border-gray-200 p-5">
      {/* Project Header */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-semibold text-gray-900">
          Project {index + 1}
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

      <div className="space-y-5">
        {/* Project Title */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Project Title
          </label>

          <input
            type="text"
            placeholder="ATS Resume Builder"
            {...register(`projects.${index}.title`)}
            className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {errors.projects?.[index]?.title && (
            <p className="mt-1 text-sm text-red-500">
              {errors.projects[index].title.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>

          <textarea
            rows={5}
            placeholder="Describe what you built, what problem it solves and what you contributed..."
            {...register(`projects.${index}.description`)}
            className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />

          {errors.projects?.[index]?.description && (
            <p className="mt-1 text-sm text-red-500">
              {errors.projects[index].description.message}
            </p>
          )}
        </div>

        {/* AI Button */}
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="inline-flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-purple-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-purple-700 active:scale-[0.97]"
        >
          <Sparkles size={17} />
          Generate Description
        </button>

        <button
          type="button"
          disabled={isImproving || !description.trim()}
          onClick={handleImproveDescription}
          className="mt-4 ml-4 inline-flex w-fit items-center gap-2 rounded-lg border border-purple-300 px-4 py-2.5 text-sm font-medium text-purple-700 transition hover:bg-purple-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Sparkles size={17} />
          {isImproving ? "Improving..." : "Improve with AI"}
        </button>

        {improveError && (
          <p className="mt-2 text-sm text-red-500" role="alert">
            {improveError}
          </p>
        )}

        {/* URLs */}
        <div className="grid gap-5 md:grid-cols-2">
          {/* GitHub */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              GitHub URL
            </label>

            <input
              type="url"
              placeholder="https://github.com/username/project"
              {...register(`projects.${index}.githubUrl`)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {errors.projects?.[index]?.githubUrl && (
              <p className="mt-1 text-sm text-red-500">
                {errors.projects[index].githubUrl.message}
              </p>
            )}
          </div>

          {/* Live URL */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Live URL
            </label>

            <input
              type="url"
              placeholder="https://myproject.com"
              {...register(`projects.${index}.liveUrl`)}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            {errors.projects?.[index]?.liveUrl && (
              <p className="mt-1 text-sm text-red-500">
                {errors.projects[index].liveUrl.message}
              </p>
            )}
          </div>
        </div>

        {/* Tech Stack */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">
              Technologies
            </label>

            <button
              type="button"
              onClick={handleAddTech}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              + Add Technology
            </button>
          </div>

          {techStack.length === 0 && (
            <p className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-500">
              Add technologies used in this project.
            </p>
          )}

          <div className="space-y-3">
            {techStack.map((_, techIndex) => (
              <div
                key={techIndex}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  placeholder="React"
                  {...register(
                    `projects.${index}.techStack.${techIndex}`
                  )}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveTech(techIndex)}
                  className="rounded-lg p-3 text-red-500 transition hover:bg-red-50"
                >
                  <Trash2 size={17} />
                </button>
              </div>
            ))}
          </div>

          {errors.projects?.[index]?.techStack && (
            <p className="mt-1 text-sm text-red-500">
              {errors.projects[index].techStack.message}
            </p>
          )}

        </div>
      </div>

      {/* AI Generate Description Modal */}
      {isModalOpen && (
        <GenerateProjectDescriptionModal
          index={index}
          onClose={() => setIsModalOpen(false)}
        />
      )}

    </div>
  );
}
