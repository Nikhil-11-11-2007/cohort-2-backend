import { z } from "zod";

export const personalInfoSchema = z.object({
    fullname: z.string().min(2),

    email: z.email(),

    mobile: z.string().min(10),

    location: z.string(),

    github: z.string().optional(),

    linkedIn: z.string().optional(),

    portfolio: z.string().optional(),
});

export type PersonalInfoFormData =
    z.infer<typeof personalInfoSchema>;