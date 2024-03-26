import { z } from "zod";

export const issueSchema = z.object({
    title: z.string().min(1, 'Title is reqired.').max(255),
    description: z.string().min(1, 'Description is reqired.'),
});
