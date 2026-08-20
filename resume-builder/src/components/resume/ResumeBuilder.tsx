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

      <form onSubmit={methods.handleSubmit(onSubmit)}>

        {/* Resume components yahan aayenge */}
        <PersonalInfoStep />

        <SummaryStep />

        <EducationStep />

        <ExperienceStep />

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