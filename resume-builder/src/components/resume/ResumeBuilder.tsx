"use client";

import { getResumeApi, updateResumeApi } from "@/apis/resume.api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  setResume,
  setResumeError,
  setResumeLoading,
} from "@/redux/slices/resumeSlice";

import { useEffect } from "react";
import {
  useForm,
  FormProvider,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import {
  resumeSchema,
  ResumeFormData,
} from "@/schemas/resume.schema";

import PersonalInfoStep from "./PersonalInfoStep";
import SummaryStep from "./SummaryStep";
import EducationStep from "./EducationStep";
import ExperienceStep from "./ExperienceStep";
import ProjectsStep from "./ProjectsStep";
import SkillsStep from "./SkillsStep";
import CertificationsStep from "./CertificationStep";
import ResumePreview from "./ResumePreview";

interface ResumeBuilderProps {
  resumeId: string;
}

export default function ResumeBuilder({
  resumeId,
}: ResumeBuilderProps) {
  const dispatch = useAppDispatch();

  const methods = useForm<ResumeFormData>({
    resolver: zodResolver(resumeSchema),

    defaultValues: {
      title: "",
      summary: "",

      personalInfo: {
        fullname: "",
        email: "",
        mobile: "",
        location: "",
        github: "",
        linkedIn: "",
        portfolio: "",
      },

      education: [],
      workExperience: [],
      projects: [],
      skills: [],
      certifications: [],
    },
  });

  useEffect(() => {
    const fetchResume = async () => {
      try {
        dispatch(setResumeError(null));
        dispatch(setResumeLoading(true));

        const response = await getResumeApi(resumeId);

        if (response.success) {
          dispatch(setResume(response.data));

          // Backend ka data form mein set hoga
          methods.reset(response.data);
        }
      } catch (error: any) {
        dispatch(
          setResumeError(
            error?.response?.data?.message ||
            "Cannot fetch resume"
          )
        );
      } finally {
        dispatch(setResumeLoading(false));
      }
    };

    fetchResume();
  }, [resumeId, dispatch, methods]);

  const onSubmit = async (
    data: ResumeFormData
  ) => {
    try {
      const response = await updateResumeApi(
        resumeId,
        data
      );

      console.log(
        response,
        "Resume updated"
      );
    } catch (error) {
      console.log(
        error,
        "Error in updating resume"
      );
    }
  };

  return (
    <FormProvider {...methods}>
      <main className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10">

        {/* Header */}
        <div className="mx-auto mb-8 max-w-[1600px]">
          <h1 className="text-3xl font-bold text-gray-900">
            Resume Builder
          </h1>

          <p className="mt-2 text-gray-500">
            Build and preview your ATS-friendly resume.
          </p>
        </div>

        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="mx-auto max-w-[1600px]"
        >
          {/* Main Layout */}
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(400px,0.8fr)]">

            {/* ================= LEFT SIDE ================= */}
            {/* Form */}
            <div className="space-y-6">

              {/* Resume Title */}
              <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Resume Details
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Give your resume a name for easy identification.
                  </p>
                </div>

                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Resume Title
                </label>

                <input
                  id="title"
                  type="text"
                  placeholder="e.g. Frontend Developer Resume"
                  {...methods.register("title")}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />

                {methods.formState.errors.title && (
                  <p className="mt-1 text-sm text-red-500">
                    {
                      methods.formState.errors
                        .title?.message
                    }
                  </p>
                )}
              </section>

              {/* Personal Information */}
              <PersonalInfoStep />

              {/* Summary */}
              <SummaryStep />

              {/* Education */}
              <EducationStep />

              {/* Experience */}
              <ExperienceStep />

              {/* Projects */}
              <ProjectsStep />

              {/* Skills */}
              <SkillsStep />

              {/* Certifications */}
              <CertificationsStep />

              {/* Save Button */}
              <div className="flex justify-end pb-10">
                <button
                  type="submit"
                  className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md"
                >
                  Save Resume
                </button>
              </div>

            </div>

            {/* ================= RIGHT SIDE ================= */}
            {/* Live Resume Preview */}
            <aside className="hidden xl:block">
              <ResumePreview />
            </aside>

          </div>

          {/* Mobile / Tablet Preview */}
          <div className="mt-8 xl:hidden">
            <h2 className="mb-4 text-xl font-bold text-gray-900">
              Resume Preview
            </h2>

            <ResumePreview />
          </div>

        </form>
      </main>
    </FormProvider>
  );
}