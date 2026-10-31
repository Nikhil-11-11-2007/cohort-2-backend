"use client";

import { useState } from "react";
import axios from "axios";

import {
    generateSummaryApi,
    generateSkillsApi,
    generateProjectDescriptionApi,
    generateExperienceApi,
    improveContentApi,
} from "@/apis/ai.api";

type AIOperation = | "summary" | "skills" | "projectDescription" | "experienceDescription" | "improveContent";

type AIStatus = {
    isLoading: boolean;
    error: string | null;
};

const initialStatus: AIStatus = {
    isLoading: false,
    error: null,
};

export default function useAI() {
    const [status, setStatus] = useState<
        Record<AIOperation, AIStatus>
    >({
        summary: { ...initialStatus },
        skills: { ...initialStatus },
        projectDescription: { ...initialStatus },
        experienceDescription: { ...initialStatus },
        improveContent: { ...initialStatus },
    });

    const runAI = async <T,>(
        operation: AIOperation,
        request: () => Promise<T>
    ): Promise<T | null> => {
        setStatus((prev) => ({
            ...prev,
            [operation]: {
                isLoading: true,
                error: null,
            },
        }));

        try {
            return await request();
        } catch (error: unknown) {
            console.error(`AI ${operation} error:`, error);

            let message = "Something went wrong. Please try again.";

            if (axios.isAxiosError(error)) {
                const apiMessage = error.response?.data?.message;

                if (typeof apiMessage === "string") {
                    message = apiMessage;
                } else if (!error.response) {
                    message = "Network error. Please try again.";
                }
            } else if (error instanceof Error) {
                message = error.message;
            }

            setStatus((prev) => ({
                ...prev,
                [operation]: {
                    isLoading: false,
                    error: message,
                },
            }));

            return null;
        } finally {
            setStatus((prev) => ({
                ...prev,
                [operation]: {
                    ...prev[operation],
                    isLoading: false,
                },
            }));
        }
    };

    const generateSummary = (
        payload: Parameters<typeof generateSummaryApi>[0]
    ) =>
        runAI("summary", async () => {
            const response = await generateSummaryApi(payload);

            if (!response.success) {
                throw new Error(response.message || "Failed to generate summary.");
            }

            if (!response.data?.summary) {
                throw new Error("AI did not return a summary.");
            }

            return response.data.summary;
        });

    const generateSkills = (
        payload: Parameters<typeof generateSkillsApi>[0]
    ) =>
        runAI("skills", async () => {
            const response = await generateSkillsApi(payload);

            if (!response.success) {
                throw new Error(response.message || "Failed to generate skills.");
            }

            const skills = response.data?.skills;

            if (
                !Array.isArray(skills) ||
                !skills.every((skill) => typeof skill === "string")
            ) {
                throw new Error("AI returned an invalid skills response.");
            }

            return skills;
        });

    const generateProjectDescription = (
        payload: Parameters<typeof generateProjectDescriptionApi>[0]
    ) =>
        runAI("projectDescription", async () => {
            const response = await generateProjectDescriptionApi(payload);

            if (!response.success) {
                throw new Error(
                    response.message || "Failed to generate project description."
                );
            }

            const description = response.data?.projectDescription;

            if (!description) {
                throw new Error("AI did not return a project description.");
            }

            return description;
        });

    const generateExperienceDescription = (
        payload: Parameters<typeof generateExperienceApi>[0]
    ) =>
        runAI("experienceDescription", async () => {
            const response = await generateExperienceApi(payload);

            if (!response.success) {
                throw new Error(
                    response.message || "Failed to generate experience description."
                );
            }

            // Apni API ke actual response field name ke according adjust karein.
            const description = response.data?.workExperienceDescription;

            if (!description) {
                throw new Error("AI did not return an experience description.");
            }

            return description;
        });

    const improveContent = (
        payload: Parameters<typeof improveContentApi>[0]
    ) =>
        runAI("improveContent", async () => {
            const response = await improveContentApi(payload);

            if (!response.success) {
                throw new Error(response.message || "Failed to improve content.");
            }

            const content = response.data?.improvedContent;

            if (!content) {
                throw new Error("AI did not return improved content.");
            }

            return content;
        });

    return {
        generateSummary,
        generateSkills,
        generateProjectDescription,
        generateExperienceDescription,
        improveContent,

        summaryLoading: status.summary.isLoading,
        summaryError: status.summary.error,

        skillsLoading: status.skills.isLoading,
        skillsError: status.skills.error,

        projectDescriptionLoading: status.projectDescription.isLoading,
        projectDescriptionError: status.projectDescription.error,

        experienceDescriptionLoading: status.experienceDescription.isLoading,
        experienceDescriptionError: status.experienceDescription.error,

        improveContentLoading: status.improveContent.isLoading,
        improveContentError: status.improveContent.error,
    };
}