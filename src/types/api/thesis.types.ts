import { z } from 'zod';

export const enrolledSubjectSchema = z.object({
    subject_name: z.string(),
    or_number: z.string().min(6, "OR Number is required."),
    attachment: z.string().min(6, "OR Attachment is required."),
});

export type EnrolledSubjectSchemaType = z.infer<typeof enrolledSubjectSchema>;