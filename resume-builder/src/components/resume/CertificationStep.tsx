"use client";

import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Plus, X } from "lucide-react";

import { ResumeFormData } from "@/schemas/resume.schema";

export default function CertificationsStep() {
  const {
    watch,
    setValue,
  } = useFormContext<ResumeFormData>();

  const [certificationInput, setCertificationInput] = useState("");

  const certifications = watch("certifications") || [];

  const handleAddCertification = () => {
    const trimmedCertification = certificationInput.trim();

    if (!trimmedCertification) return;

    // Duplicate certification add nahi hogi
    if (certifications.includes(trimmedCertification)) {
      return;
    }

    setValue(
      "certifications",
      [...certifications, trimmedCertification],
      {
        shouldValidate: true,
      }
    );

    setCertificationInput("");
  };

  const handleRemoveCertification = (
    certificationToRemove: string
  ) => {
    const updatedCertifications = certifications.filter(
      (certification) =>
        certification !== certificationToRemove
    );

    setValue(
      "certifications",
      updatedCertifications,
      {
        shouldValidate: true,
      }
    );
  };

  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900">
          Certifications
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Add certifications, courses, or professional achievements.
        </p>
      </div>

      {/* Input */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={certificationInput}
          onChange={(e) =>
            setCertificationInput(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleAddCertification();
            }
          }}
          placeholder="e.g. AWS Certified Cloud Practitioner"
          className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />

        <button
          type="button"
          onClick={handleAddCertification}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add Certification
        </button>
      </div>

      {/* Added Certifications */}
      {certifications.length > 0 && (
        <div className="mt-6">
          <p className="mb-3 text-sm font-medium text-gray-700">
            Added Certifications ({certifications.length})
          </p>

          <div className="flex flex-wrap gap-3">
            {certifications.map((certification) => (
              <div
                key={certification}
                className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
              >
                <span>{certification}</span>

                <button
                  type="button"
                  onClick={() =>
                    handleRemoveCertification(certification)
                  }
                  className="text-blue-500 transition hover:text-red-500"
                  aria-label={`Remove ${certification}`}
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