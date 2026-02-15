import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getBlogPostContent } from "@/data/loaders";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/blog/$slug")({
	loader: async ({ params }) => {
		const locale = getLocale();
		const content = await getBlogPostContent({
			data: { slug: params.slug, locale },
		});
		return { content };
	},
	component: BlogPostPage,
});

function BlogPostPage() {
	const { content } = Route.useLoaderData();

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<div className="max-w-4xl mx-auto px-6 py-16">
				<Link
					to="/blog"
					className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
				>
					<ArrowLeft className="w-4 h-4" />
					{m.blog_back()}
				</Link>
				<MarkdownRenderer content={content} />
			</div>
		</div>
	);
}
