"use client";

import { getResumeApi } from "@/apis/resume.api";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { setResume, setResumeError, setResumeLoading } from "@/redux/slices/resumeSlice";
import { useEffect, useState } from "react";

interface ResumeBuilderProps {
  resumeId: string;
}

export default function ResumeBuilder({
  resumeId,
}: ResumeBuilderProps) {

  const dispatch = useAppDispatch()

  

  useEffect(() => {
    const fetchResume = async () => {
      try {
        dispatch(setResumeError(null))
        dispatch(setResumeLoading(true))
        const response = await getResumeApi(resumeId)
        if(response.success){
          dispatch(setResume(response.data))
          console.log(response.data)
        }
      } catch (error:any) {
        dispatch(setResumeError(error?.response?.data?.message || "Can not featch resume"))
      } finally {
        dispatch(setResumeLoading(false))
      }
    }
    fetchResume()
  }, [resumeId])

  

  return <div>

    <h1>resume id: {resumeId}</h1>

  </div>
}