import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(2, "Minimum 2 characters"),

    email: z.email("Invalid email"),

    mobile: z
        .string()
        .min(10, "Minimum 10 digits")
        .max(10, "Maximum 10 digits"),

    password: z
        .string()
        .min(6, "Minimum 6 characters"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;