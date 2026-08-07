import axiosInstance from "@/lib/axios";
import {
  GenerateSummary,
  GenerateProjectDescriptionBody,
  GenerateExperienceDescriptionBody,
  ImproveContentBody,
  GenerateSkills,
} from "@/types/ai.types";

export const generateSummaryApi = async (
  payload: GenerateSummary
) => {
  const response = await axiosInstance.post(
    "/ai/generate-summary",
    payload
  );

  return response.data;
};

export const generateProjectDescriptionApi =
  async (
    payload: GenerateProjectDescriptionBody
  ) => {
    const response =
      await axiosInstance.post(
        "/ai/generate-project-description",
        payload
      );

    return response.data;
  };

export const generateExperienceApi = async (
  payload: GenerateExperienceDescriptionBody
) => {
  const response = await axiosInstance.post(
    "/ai/generate-experience-description",
    payload
  );

  return response.data;
};

export const improveContentApi = async (
  payload: ImproveContentBody
) => {
  const response = await axiosInstance.post(
    "/ai/improve-content",
    payload
  );

  return response.data;
};

export const getATSScoreApi = async (
  resumeText: string
) => {
  const response = await axiosInstance.post(
    "/ai/ats-score",
    {
      resumeText,
    }
  );

  return response.data;
};

export const generateSkillsApi = async (
  payload: GenerateSkills
) => {
  const response = await axiosInstance.post(
    "/ai/generate-skills",
    payload
  );

  return response.data;
};