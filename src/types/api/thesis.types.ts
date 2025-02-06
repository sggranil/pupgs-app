import { z } from 'zod';

export const enrolledSubjectSchema = z.object({
    subject_name: z.string(),
    or_number: z.string().min(6, "OR Number is required."),
    attachment: z.string().min(6, "OR Attachment is required."),
});

export const addThesisSchema = z.object({
    thesis_title: z.string().min(6, "Thesis title is required."),
    file_url: z.string().min(6, "Concept paper attachment is required."),
})

export type EnrolledSubjectSchemaType = z.infer<typeof enrolledSubjectSchema>;
export type AddThesisSchemaType = z.infer<typeof addThesisSchema>;