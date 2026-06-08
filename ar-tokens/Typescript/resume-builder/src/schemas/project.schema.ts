import { z } from "zod";

export const projectSchema = z.object({
    title: z
        .string()
        .min(1, "Project title is required"),

    description: z
        .string()
        .min(10, "Description must be at least 10 characters"),

    githubUrl: z.url({
        message: "Invalid GitHub URL",
    }),

    liveUrl: z.url({
        message: "Invalid Live URL",
    }),

    techStack: z
        .array(z.string())
        .min(1, "Add at least one technology"),
});

export type ProjectFormData = z.infer<typeof projectSchema>;