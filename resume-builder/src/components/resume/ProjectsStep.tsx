"use client";

import { useFieldArray, useFormContext } from "react-hook-form";
import { ResumeFormData } from "@/schemas/resume.schema";
import { Plus } from "lucide-react";

import ProjectItem from "../resume-cards/ProjectItem";

export default function ProjectsStep() {
  const { control } = useFormContext<ResumeFormData>();

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
            onRemove={() => removeProject(index)}
          />
        ))}
      </div>
    </section>
  );
}