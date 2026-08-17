"use client";

import { getResumeApi } from "@/apis/resume.api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setResume, setResumeError, setResumeLoading } from "@/redux/slices/resumeSlice";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface ResumeBuilderProps {
  resumeId: string;
}

import {
  resumeSchema,
  ResumeFormData,
} from "@/schemas/resume.schema"

export default function ResumeBuilder({
  resumeId,
}: ResumeBuilderProps) {

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ResumeFormData>({
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

          reset(response.data)

          console.log(response.data)
        }
      } catch (error: any) {
        dispatch(setResumeError(error?.response?.data?.message || "Cannot featch resume"))
      } finally {
        dispatch(setResumeLoading(false))
      }
    }
    fetchResume()
  }, [resumeId, dispatch, reset])



  return <div>

    <h1>resume id: {resumeId}</h1>

  </div>
}