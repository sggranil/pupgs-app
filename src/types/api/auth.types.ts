import { z } from 'zod';

export const registerSchema = z.object({
  first_name: z.string().min(2, { message: "First name is required" }),
  middle_name: z.string().min(2, { message: "Middle name is required" }).optional(),
  last_name: z.string().min(2, { message: "Last name is required" }),
  ext_name: z.string().min(2, { message: "Extension name is required" }).optional(),
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
  role: z.enum(['student', 'adviser'], { message: "Role must be either 'student' or 'adviser'" }),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Email address is required" }),
  password: z.string().min(8, { message: "Password is required" }),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;

