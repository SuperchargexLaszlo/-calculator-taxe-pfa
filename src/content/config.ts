import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    group: z.enum(['calculator', 'compliance', 'ghiduri', 'tehnic']),
    keywords: z.array(z.string()),
    relatedPosts: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    noindex: z.boolean().default(false),
  }),
});

export const collections = { blog };
