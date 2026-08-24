"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { X, Plus } from "lucide-react";

import { ResumeFormData } from "@/schemas/resume.schema";

export default function SkillsStep() {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ResumeFormData>();

  const [skillInput, setSkillInput] = useState("");

  const skills = watch("skills");

  const handleAddSkill = () => {
    const trimmedSkill = skillInput.trim();

    if (!trimmedSkill) return;

    // Duplicate skill add nahi hone denge
    if (skills.includes(trimmedSkill)) {
      return;
    }

    setValue("skills", [...skills, trimmedSkill], {
      shouldValidate: true,
    });

    setSkillInput("");
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    const updatedSkills = skills.filter(
      (skill) => skill !== skillToRemove
    );

    setValue("skills", updatedSkills, {
      shouldValidate: true,
    });
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Skills
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add your technical and professional skills.
        </p>
      </div>

      {/* Input */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddSkill();
            }
          }}
          placeholder="e.g. React, JavaScript, Node.js"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={handleAddSkill}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Skill
        </button>
      </div>

      {/* Validation Error */}
      {errors.skills && (
        <p className="mt-2 text-sm text-red-500">
          {errors.skills.message}
        </p>
      )}

      {/* Skills List */}
      {skills.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-gray-700">
            Added Skills ({skills.length})
          </p>

          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
              >
                {skill}

                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="rounded-full text-blue-500 transition hover:text-red-500"
                  aria-label={`Remove ${skill}`}
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}