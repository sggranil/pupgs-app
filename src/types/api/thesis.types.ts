import { z } from 'zod';

export const enrolledSubjectSchema = z.object({
    subject_name: z.string(),
    or_number: z.string().min(6, "OR Number is required."),
    attachment: z.string().min(6, "OR Attachment is required."),
    is_confirmed: z.boolean().optional(),
    message: z.string().optional(),
});

export const addThesisSchema = z.object({
    thesis_title: z.string().min(6, "Thesis title is required."),
    file_url: z.string().min(6, "Concept paper attachment is required."),
})

export const updateThesisSchema = z.object({
    is_confirmed: z.boolean().optional(),
    message: z.string().optional(),
    adviser_id: z.number().optional()
})

export const addRoomSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  location: z.string().optional(),
  capacity: z
    .union([z.string().regex(/^\d+$/, "Must be a number"), z.literal("")])
    .optional(),
});

export type AddRoomSchemaType = z.infer<typeof addRoomSchema>;
export type EnrolledSubjectSchemaType = z.infer<typeof enrolledSubjectSchema>;
export type AddThesisSchemaType = z.infer<typeof addThesisSchema>;
export type UpdateThesisSchemaType = z.infer<typeof updateThesisSchema>;