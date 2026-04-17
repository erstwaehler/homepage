import {
  defineCollection,
  defineConfig,
  defineSingleton,
} from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { z } from "zod";
import remarkGfm from "remark-gfm";

const posts = defineCollection({
  name: "posts",
  directory: "content/posts",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    author: z.string().optional(),
    banner: z.string().optional(),
    content: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      slug: document._meta.path,
      mdx,
    };
  },
});

const pms = defineCollection({
  name: "Pressemitteilungen",
  directory: "content/pms",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    description: z.string().optional(),
    banner: z.string().optional(),
    url: z.string(), // Link to the original PM.
    content: z.string().optional(), // Soll nur ein Snippet sein.
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document);
    return {
      ...document,
      slug: document._meta.path,
      mdx,
    };
  },
});

const pages = defineCollection({
  name: "pages",
  directory: "content/pages",
  include: "**/*.mdx",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    content: z.string().optional(),
  }),
  transform: async (document, context) => {
    const mdx = await compileMDX(context, document, {
      remarkPlugins: [remarkGfm],
    });
    return {
      ...document,
      slug: document._meta.path,
      mdx,
    };
  },
});

const team = defineSingleton({
  name: "team",
  filePath: "content/team/team.json",
  parser: "json",
  schema: z.object({
    members: z.array(
      z.object({
        vorname: z.string(),
        rolle: z.string(),
        schule: z.enum([
          "Vincent-Lübeck-Gymnasium",
          "IGS Stade",
          "Gymnasium Athenaeum Stade",
          "Realschule Camper Höhe",
        ]),
        bio: z.string(),
        email: z
          .email()
          .regex(/(@ewf-stade\.de|@erstwaehler\.[a-z]+)$/)
          .optional(),
        socials: z
          .object({
            mastodon: z
              .string()
              .regex(/^[^@]+@[^@]+\.[^@]+$/)
              .optional(),
            instagram: z.string().optional(),
            // option to add more social media
          })
          .optional(),
        profile_image: z.string().optional(),
        banner_image: z.string().optional(),
      }),
    ),
  }),
});

export default defineConfig({
  content: [posts, pages, team, pms],
});
