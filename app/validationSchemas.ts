import { z } from "zod";

/* Update title and description */
export const issueSchema = z.object({
    title: z.string().min(1, 'Title is reqired.').max(255),
    description: z.string().min(1, 'Description is reqired.').max(65535),
});

/* Using our select component, we want to updated assigned to user id, and optional title and description - more flexible this endpont */
export const patchIssueSchema = z.object({
    title: z.string().min(1, 'Title is reqired.').max(255).optional(),
    description: z.string().min(1, 'Description is reqired.').max(65535).optional(),
    assignedToUserId: z.string().min(1, 'AssignedToUserId is reqired').max(255).optional().nullable(), /* string type, min char 1 to max 255 or null(nullable - no user) */
});