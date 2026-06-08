import { z } from "zod";

import { personalInfoSchema } from "./personalInfo.schema";
import { educationSchema } from "./education.schema";
import { workExperienceSchema } from "./workExperience.schema";
import { projectSchema } from "./project.schema";

export const resumeSchema = z.object({
    title: z
        .string()
        .min(1, "Resume title is required"),

    summary: z
        .string()
        .min(20, "Summary must be at least 20 characters"),

    personalInfo: personalInfoSchema,

    education: z.array(educationSchema),

    workExperience: z.array(workExperienceSchema),

    projects: z.array(projectSchema),

    skills: z
        .array(z.string())
        .min(1, "Add at least one skill"),

    certifications: z
        .array(z.string())
        .optional(),
});

export type ResumeFormData = z.infer<typeof resumeSchema>;