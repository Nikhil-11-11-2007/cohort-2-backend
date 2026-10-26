"use client";

import { useState } from "react";
import axios from "axios";
import { improveContentApi } from "@/apis/ai.api";

export default function useImproveContent() {
    const [isImproving, setIsImproving] = useState(false);
    const [improveError, setImproveError] = useState<string | null>(null);

    const improveContent = async (content: string) => {
        if (!content.trim()) {
            setImproveError("Please enter some content first.");
            return null;
        }

        try {
            setIsImproving(true);
            setImproveError(null);

            const response = await improveContentApi({ content });

            if (!response.success) {
                setImproveError(
                    response.message || "Failed to improve content."
                );
                return null;
            }

            const improvedContent = response.data?.improvedContent;

            if (!improvedContent) {
                setImproveError("AI did not return improved content.");
                return null;
            }

            return improvedContent;
        } catch (error) {
            console.error("Improve content error:", error);

            if (axios.isAxiosError(error)) {
                const message = error.response?.data?.message;

                setImproveError(
                    typeof message === "string"
                        ? message
                        : "Unable to improve content. Please try again."
                );
            } else {
                setImproveError("Something went wrong. Please try again.");
            }

            return null;
        } finally {
            setIsImproving(false);
        }
    };

    return {
        improveContent,
        isImproving,
        improveError,
        setImproveError,
    };
}