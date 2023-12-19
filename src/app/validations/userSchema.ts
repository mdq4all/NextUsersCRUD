import { z } from "zod";

export const hierarchyValues = ["visitor", "user", "admin"] as const;

export const userSchema = z.object({

    name: z.string().min(3, {
        message: "Name must be at least 3 characters long"
    }).max(200, { message: 'Name must be less than 200 characters' }),

    username: z.string().min(3, {
        message: "Name must be at least 3 characters long"
    }).max(200, { message: 'Username must be less than 200 characters' }),

    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),

    confirmPassword: z.string().min(6, { message: 'Password must be at least 6 characters long' }),

    hierarchy: z.enum(hierarchyValues)

}).refine((data) => data.password === data.confirmPassword, {
    message: 'Password must match',
    path: ["confirmPassword"],
})