import { z } from 'zod';

const gDriveOrDocsDomainRegex = /^https:\/\/(?:drive|docs)\.google\.com(?:$|\/)/;

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

export const updateThesisScheduleSchema = z.object({
    defense_date: z.string().optional(),
    defense_time: z.string().optional(),
    room_id: z.string().optional(),
    secretary_id: z.string().optional(),
    panelists: z.array(z.string()).min(3, "At least three panelist must be selected.").optional()
})

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
    title: z.string().min(3, "Attachment title is required"),
    description: z.string().optional(),
    file_type: z.string().optional(),
    file_url: z.string()
        .url("Please enter a valid URL.")
        .refine((val) => gDriveOrDocsDomainRegex.test(val), {
            message: "The link must be a public Google Drive or Docs link.",
        }),
});

export type AddRoomSchemaType = z.infer<typeof addRoomSchema>;
export type AddThesisSchemaType = z.infer<typeof addThesisSchema>;
export type UpdateThesisScheduleSchemaType = z.infer<typeof updateThesisScheduleSchema>;
export type UpdateThesisSchemaType = z.infer<typeof updateThesisSchema>;
export type AddAttachmentSchemaType = z.infer<typeof addAttachmentSchema>;