import { NextResponse } from "next/server";
import { ApiResponse } from "@/types/api.types";

export function handleApiError(error: unknown) {
    console.error("API Error:", error);

    let status = 500;
    let message = "Something went wrong.";

    if (
        typeof error === "object" &&
        error !== null &&
        "status" in error &&
        typeof error.status === "number"
    ) {
        if (error.status === 503) {
            status = 503;
            message = "Service temporarily unavailable. Please try again.";
        } else if (error.status === 429) {
            status = 429;
            message = "Too many requests. Please try again later.";
        }
    }

    return NextResponse.json<ApiResponse>(
        {
            success: false,
            message,
        },
        { status }
    );
}