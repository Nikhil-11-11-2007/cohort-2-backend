"use client";

import { getResumeApi, updateResumeApi } from "@/apis/resume.api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import {
  setResume,
  setResumeError,
  setResumeLoading,
} from "@/redux/slices/resumeSlice";

import { useEffect, useState } from "react";

import {
  useForm,
  FormProvider,
} from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/navigation";

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
  const router = useRouter();

  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

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
      setIsSaving(true);
      setSaveError(null);

      const response = await updateResumeApi(
        resumeId,
        data
      );

      if (response.success) {

        // Redux mein latest resume update
        dispatch(setResume(response.data));

        // Form ko latest backend data se sync
        methods.reset(response.data);

        console.log(
          response.message ||
          "Resume saved successfully"
        );

        // Save successful hone ke baad Dashboard
        router.push("/dashboard");
      }

    } catch (error: any) {

      const message =
        error?.response?.data?.message ||
        "Error in updating resume";

      setSaveError(message);

      console.log(error, message);

    } finally {
      setIsSaving(false);
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
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(400px,0.8fr)]">

            {/* LEFT SIDE */}
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
                    {methods.formState.errors.title.message}
                  </p>
                )}

              </section>

              <PersonalInfoStep />

              <SummaryStep />

              <EducationStep />

              <ExperienceStep />

              <ProjectsStep />

              <SkillsStep />

              <CertificationsStep />

              {/* Save Button */}
              <div className="flex flex-col items-end gap-3 pb-10">

                {saveError && (
                  <p className="text-sm text-red-500">
                    {saveError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white shadow-sm transition hover:bg-blue-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSaving
                    ? "Saving..."
                    : "Save Resume"}
                </button>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <aside className="hidden xl:block">
              <ResumePreview />
            </aside>

          </div>

          {/* Mobile Preview */}
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