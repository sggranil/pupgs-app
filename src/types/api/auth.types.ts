import { z } from 'zod';

export const registerSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  middle_name: z.string().optional(),
  ext_name: z.string().optional(),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirm_password: z
    .string()
    .min(6, "Confirm password must be at least 6 characters").optional(),
  role: z.enum(["student", "adviser"], { message: "Role must be either 'student' or 'adviser'" }),
}).refine((data) => data.password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, { message: "Password is required" }),
});

export const updateUserSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  middle_name: z.string().optional(),
  ext_name: z.string().optional(),
  standing: z.string().optional(),
  position: z.string().optional(),
  tel_number: z.string().optional(),
  old_password: z.string().optional(),
  password: z.string().optional(),
  confirm_password: z.string().optional(),
})

export type RegisterSchemaType = z.infer<typeof registerSchema>;
export type LoginSchemaType = z.infer<typeof loginSchema>;
export type UpdateSchemaType = z.infer<typeof updateUserSchema>;

