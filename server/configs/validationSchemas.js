import { z } from 'zod';

export const signupSchema = z.object({
    username: z.string().min(3, 'Username must be atleast 3 Characters').max(50, "Username is too long"),
    email: z.string().email("Invalid email"),
    password: z.string().min(8, "Password must be atleast 8 Characters")
});

export const signinSchema = z.object({
    email: z.string().email("Invalid email"),
    password: z.string().min(1, "Password is required")
});
