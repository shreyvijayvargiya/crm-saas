import { z } from "zod";

export const CmsBlogPostSchema = z.object({
	id: z.number(),
	title: z.string(),
	author: z.string(),
	authorAvatar: z.string(),
	category: z.string(),
	status: z.string(),
	publishDate: z.string(),
	views: z.number(),
	likes: z.number(),
	content: z.string(),
	tags: z.array(z.string()),
	featuredImage: z.string(),
});

export const AppCmsDataSchema = z.object({
	source: z.string().optional(),
	blogs: z.array(CmsBlogPostSchema),
	subscribers: z.array(
		z.object({
			id: z.number(),
			name: z.string(),
			email: z.string(),
			subscribedDate: z.string(),
			status: z.string(),
			avatarColor: z.string(),
		})
	),
	newBlogFormDefaults: z.object({
		title: z.string(),
		content: z.string(),
		author: z.string(),
		category: z.string(),
		tags: z.string(),
		featuredImage: z.string(),
		publishDate: z.string(),
		status: z.string(),
		excerpt: z.string(),
	}),
});