import { z } from "zod";


export const postSchema = z.object({
    id: z.number(),
    username: z.string(),
    created_datetime: z.string(),
    title: z.string(),
    content: z.string(),
});
export type Post = z.infer<typeof postSchema>;

export const getPostsResponseSchema = z.object({
    count: z.number().optional().nullable(),
    next: z.string().nullable(),
    previous: z.string().nullable(),
    results: z.array(postSchema),
});

export type GetPostsResponse = z.infer<typeof getPostsResponseSchema>;