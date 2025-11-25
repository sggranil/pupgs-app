import { z } from 'zod';

const gDriveOrDocsDomainRegex = /^https:\/\/(?:drive|docs)\.google\.com(?:$|\/)/;

export const enrolledSubjectSchema = z.object({
    subject_name: z.string(),
    thesis_id: z.preprocess(
        (val) => {
            if (typeof val === "string") return parseInt(val, 10);
            return val;
        },
        z.number().int().min(1, "Please select a thesis")
    ),
    or_number: z.string().min(6, "OR Number is required."),
    attachment: z.string().min(6, "OR Attachment is required."),
    status: z.string().optional(),
    message: z.string().optional(),
});

export const addThesisSchema = z.object({
    thesis_title: z.string().min(6, { message: "Thesis title is required." }),
    file_type: z.string().optional(),
    file_url: z
        .string()
        .min(1, { message: "File URL is required." })
        .regex(gDriveOrDocsDomainRegex, {
            message: "Please enter a valid Google Drive or Google Docs link.",
        }),
    status: z.string().optional(),
});

export const updateThesisSchema = z.object({
    status: z.string(),
    message: z.string(),
    adviser_id: z.number().optional(),
    student_id: z.number().optional(),
}).refine(
    (data) => {
        if (data.status !== 'pending_review' && !data.adviser_id) {
            return false;
        }
        return true;
    },
    {
        message: 'Thesis adviser is required for confirmed or rejected statuses.',
        path: ['adviser_id'],
    }
);

export const addRoomSchema = z.object({
    name: z.string().min(1, "Room name is required"),
    location: z.string().optional(),
    capacity: z
        .union([z.string().regex(/^\d+$/, "Must be a number"), z.literal("")])
        .optional(),
});

export const addAttachmentSchema = z.object({
    file_type: z.string().optional(),
    file_url: z.string()
        .url("Please enter a valid URL.")
        .refine((val) => gDriveOrDocsDomainRegex.test(val), {
            message: "The link must be a public Google Drive or Docs link.",
        }),
});

export type AddRoomSchemaType = z.infer<typeof addRoomSchema>;
export type EnrolledSubjectSchemaType = z.infer<typeof enrolledSubjectSchema>;
export type AddThesisSchemaType = z.infer<typeof addThesisSchema>;
export type UpdateThesisSchemaType = z.infer<typeof updateThesisSchema>;
export type AddAttachmentSchemaType = z.infer<typeof addAttachmentSchema>;