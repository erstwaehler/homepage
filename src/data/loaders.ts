import { createServerFn } from "@tanstack/react-start";

interface TeamMember {
	vorname: string;
	nachname: string;
	rolle: string;
	schule: string;
	email: string;
	beschreibung_de: string;
	beschreibung_en: string;
}

export const getTeamMembers = createServerFn({ method: "GET" }).handler(
	async (): Promise<TeamMember[]> => {
		const fs = await import("node:fs");
		const path = await import("node:path");
		const filePath = path.resolve(process.cwd(), "src/data/team.jsonl");
		const content = fs.readFileSync(filePath, "utf-8");
		const lines = content.trim().split("\n");
		return lines.map((line) => JSON.parse(line) as TeamMember);
	},
);

export const getTeamMember = createServerFn({ method: "GET" })
	.inputValidator((vorname: string) => vorname)
	.handler(async ({ data: vorname }): Promise<TeamMember | null> => {
		const fs = await import("node:fs");
		const path = await import("node:path");
		const filePath = path.resolve(process.cwd(), "src/data/team.jsonl");
		const content = fs.readFileSync(filePath, "utf-8");
		const lines = content.trim().split("\n");
		const members = lines.map((line) => JSON.parse(line) as TeamMember);
		return (
			members.find((m) => m.vorname.toLowerCase() === vorname.toLowerCase()) ??
			null
		);
	});

export const getMarkdownContent = createServerFn({ method: "GET" })
	.inputValidator((data: { page: string; locale: string }) => data)
	.handler(async ({ data: { page, locale } }): Promise<string> => {
		const fs = await import("node:fs");
		const path = await import("node:path");
		const suffix = locale === "de" ? "" : `.${locale}`;
		const filePath = path.resolve(
			process.cwd(),
			`src/content/pages/${page}${suffix}.md`,
		);
		try {
			return fs.readFileSync(filePath, "utf-8");
		} catch {
			// Fallback to default locale
			const fallbackPath = path.resolve(
				process.cwd(),
				`src/content/pages/${page}.md`,
			);
			return fs.readFileSync(fallbackPath, "utf-8");
		}
	});

export interface BlogPost {
	slug: string;
	title_de: string;
	title_en: string;
	date: string;
	excerpt_de: string;
	excerpt_en: string;
}

export const getBlogPosts = createServerFn({ method: "GET" }).handler(
	async (): Promise<BlogPost[]> => {
		const fs = await import("node:fs");
		const path = await import("node:path");
		const filePath = path.resolve(process.cwd(), "src/data/blog-posts.json");
		const content = fs.readFileSync(filePath, "utf-8");
		return JSON.parse(content) as BlogPost[];
	},
);

export const getBlogPostContent = createServerFn({ method: "GET" })
	.inputValidator((data: { slug: string; locale: string }) => data)
	.handler(async ({ data: { slug, locale } }): Promise<string> => {
		const fs = await import("node:fs");
		const path = await import("node:path");
		const suffix = locale === "de" ? "" : `.${locale}`;
		const filePath = path.resolve(
			process.cwd(),
			`src/content/blog/${slug}${suffix}.md`,
		);
		try {
			return fs.readFileSync(filePath, "utf-8");
		} catch {
			const fallbackPath = path.resolve(
				process.cwd(),
				`src/content/blog/${slug}.md`,
			);
			return fs.readFileSync(fallbackPath, "utf-8");
		}
	});

export type { TeamMember };
