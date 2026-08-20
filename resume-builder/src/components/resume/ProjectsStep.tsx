"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { ResumeFormData } from "@/schemas/resume.schema";
import { Plus, Trash2 } from "lucide-react";

export default function ProjectsStep() {
  const {
    control,
    register,
    formState: { errors },
  } = useFormContext<ResumeFormData>();

  // Projects ke liye field array
  const {
    fields: projectFields,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "projects",
  });

  const handleAddProject = () => {
    appendProject({
      title: "",
      description: "",
      githubUrl: "",
      liveUrl: "",
      techStack: [],
    });
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Projects
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Add projects that showcase your skills and experience.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddProject}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={17} />
          Add Project
        </button>
      </div>

      {/* Empty State */}
      {projectFields.length === 0 && (
        <div className="rounded-xl border-2 border-dashed border-gray-200 py-10 text-center">
          <p className="text-sm text-gray-500">
            No projects added yet.
          </p>

          <button
            type="button"
            onClick={handleAddProject}
            className="mt-3 text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            + Add your first project
          </button>
        </div>
      )}

      {/* Projects */}
      <div className="space-y-6">
        {projectFields.map((field, index) => (
          <ProjectItem
            key={field.id}
            index={index}
            control={control}
            register={register}
            errors={errors}
            onRemove={() => removeProject(index)}
          />
        ))}
      </div>
    </section>
  );
}

interface ProjectItemProps {
  index: number;
  control: any;
  register: any;
  errors: any;
  onRemove: () => void;
}

function ProjectItem({
  index,
  control,
  register,
  errors,
  onRemove,
}: ProjectItemProps) {
  const {
    fields: techFields,
    append: appendTech,
    remove: removeTech,
  } = useFieldArray({
    control,
    name: `projects.${index}.techStack`,
  });

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
              onClick={() => appendTech("")}
              className="text-sm font-medium text-blue-600 hover:text-blue-700"
            >
              + Add Technology
            </button>
          </div>

          {techFields.length === 0 && (
            <p className="rounded-lg bg-gray-50 px-4 py-3 text-sm text-gray-500">
              Add technologies used in this project.
            </p>
          )}

          <div className="space-y-3">
            {techFields.map((techField, techIndex) => (
              <div
                key={techField.id}
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
                  onClick={() => removeTech(techIndex)}
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
    </div>
  );
}