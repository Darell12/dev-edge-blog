import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1).max(300),
    pubDate: z.date(),
    updatedDate: z.date().optional(),
    author: z.string().default('Anonymous'),
    tags: z.array(z.string()).min(1),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    lang: z.enum(['es', 'en']).default('es'),
    translationKey: z.string().optional(),
  }),
});

export const collections = {
  articles,
};