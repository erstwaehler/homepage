import {
  defineCollection,
  defineConfig,
  defineParser,
  defineSingleton,
} from "@content-collections/core";
import { compileMDX } from "@content-collections/mdx";
import { parse as parseToml } from "@iarna/toml";
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
    url: z.string(),
    content: z.string().optional(),
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

const partnerSupporters = z.object({
  name: z.string(),
  kind: z.enum(["schule", "foerderverein", "partner", "presse", "sonstiges"]),
  description: z.string().optional(),
  amount: z.number().optional(),
  status: z.enum(["confirmed", "pending", "declined"]).default("confirmed"),
});

const partnerSchools = z.object({
  name: z.string(),
  studentsSent: z.number(),
  note: z.string().optional(),
});

const partnerPolicy = z.object({
  noPrivateDonations: z.literal(true),
  noAdsOrTitleSponsors: z.literal(true),
  noDonationReceipts: z.literal(true),
  backgroundCheckRequired: z.literal(true),
  responseTimeBusinessDays: z.literal(2),
  replyEmail: z.string(),
  contactEmail: z.string(),
  contactDescription: z.string().optional(),
});

const partnerTomlParser = defineParser((content) => parseToml(content));

const partner = defineSingleton({
  name: "partner",
  filePath: "content/partner/partner.toml",
  parser: partnerTomlParser,
  schema: z.object({
    title: z.string(),
    description: z.string(),
    schools: z.array(partnerSchools),
    supporters: z.array(partnerSupporters),
    policy: partnerPolicy,
    publicNotes: z.array(z.string()).optional(),
  }),
});

const teamTomlParser = defineParser((content) => parseToml(content));

const team = defineSingleton({
  name: "team",
  filePath: "content/team/team.toml",
  parser: teamTomlParser,
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
          .string()
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
          })
          .optional(),
        profile_image: z.string().optional(),
        banner_image: z.string().optional(),
      }),
    ),
  }),
});

const heroTomlParser = defineParser((content) => parseToml(content));

const heroimages = defineSingleton({
  name: "hero-images",
  filePath: "content/hero/images.toml",
  parser: heroTomlParser,
  schema: z.object({
    images: z.array(
      z.object({
        src: z.string(),
        credit: z.string().optional(),
      }),
    ),
  }),
});

export default defineConfig({
  content: [posts, pages, team, pms, partner, heroimages],
});
