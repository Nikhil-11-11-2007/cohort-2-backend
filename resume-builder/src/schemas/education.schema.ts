import { z } from "zod";

export const educationSchema = z.object({
    institute: z
        .string()
        .min(1, "Institute is required"),

    degree: z
        .string()
        .min(1, "Degree is required"),

    startDate: z
        .string()
        .min(1, "Start date is required"),

    endDate: z
        .string()
        .min(1, "End date is required"),
});

export type EducationFormData = z.infer<typeof educationSchema>;