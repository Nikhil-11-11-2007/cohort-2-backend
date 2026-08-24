"use client";

import { getResumeApi, updateResumeApi } from "@/apis/resume.api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setResume, setResumeError, setResumeLoading } from "@/redux/slices/resumeSlice";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resumeSchema,
  ResumeFormData,
} from "@/schemas/resume.schema"
import PersonalInfoStep from "./PersonalInfoStep";
import SummaryStep from "./SummaryStep";
import EducationStep from "./EducationStep";
import ExperienceStep from "./ExperienceStep";
import ProjectsStep from "./ProjectsStep";
import SkillsStep from "./SkillsStep";

interface ResumeBuilderProps {
  resumeId: string;
}


export default function ResumeBuilder({
  resumeId,
}: ResumeBuilderProps) {

  const dispatch = useAppDispatch()

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
        dispatch(setResumeError(null))
        dispatch(setResumeLoading(true))
        const response = await getResumeApi(resumeId)
        if (response.success) {
          dispatch(setResume(response.data))

          methods.reset(response.data)

          console.log(response.data)
        }
      } catch (error: any) {
        dispatch(setResumeError(error?.response?.data?.message || "Cannot featch resume"))
      } finally {
        dispatch(setResumeLoading(false))
      }
    }
    fetchResume()
  }, [resumeId, dispatch, methods])

  const onSubmit = async (data: ResumeFormData) => {
    try {

      const response = await updateResumeApi(resumeId, data)

      console.log(response, "Resume updated")

    } catch (error) {

      console.log(error, "Error in updating resume")

    }
  }



  return <FormProvider {...methods}>
    <main className="min-h-screen bg-gray-50 p-10">

      <h1 className="mb-8 text-3xl font-bold">
        Resume Builder
      </h1>

      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
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
      </div>

      <form onSubmit={methods.handleSubmit(onSubmit)}>

        {/* Resume components yahan aayenge */}
        <PersonalInfoStep />

        <SummaryStep />

        <EducationStep />

        <ExperienceStep />

        <ProjectsStep />

        <SkillsStep />

        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-5 py-3 text-white"
        >
          Save Resume
        </button>

      </form>

    </main>
  </FormProvider>
}