import axiosInstance from "@/lib/axios";
import { IResume } from "@/types/resume.types";

export const createResumeApi = async () => {
    const response = await axiosInstance.post(
        "/resume/create"
    );

    return response.data;
};

export const getResumeApi = async (
    resumeId: string
) => {
    const response = await axiosInstance.get(
        `/resume/${resumeId}`
    );

    return response.data;
};

export const updateResumeApi = async (
    resumeId: string,
    payload: Partial<IResume>
) => {
    const response = await axiosInstance.patch(
        `/resume/${resumeId}`,
        payload
    );

    return response.data;
};