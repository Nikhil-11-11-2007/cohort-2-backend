import { z } from "zod";

export const workExperienceSchema = z.object({
    company: z
        .string()
        .min(1, "Company name is required"),

    position: z
        .string()
        .min(1, "Position is required"),

    startDate: z
        .string()
        .min(1, "Start date is required"),

    endDate: z
        .string()
        .min(1, "End date is required"),

    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),
});

export type WorkExperienceFormData = z.infer<typeof workExperienceSchema>;