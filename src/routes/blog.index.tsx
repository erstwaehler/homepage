import { createFileRoute, Link } from "@tanstack/react-router";
import { getLocale } from "@/paraglide/runtime";
import { m } from "@/paraglide/messages";
import { getBlogPosts } from "@/data/loaders";
import { Calendar, Newspaper } from "lucide-react";

export const Route = createFileRoute("/blog/")({
	loader: async () => {
		const posts = await getBlogPosts();
		return { posts };
	},
	component: BlogPage,
});

function BlogPage() {
	const { posts } = Route.useLoaderData();
	const locale = getLocale();

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<div className="max-w-4xl mx-auto px-6 py-16">
				<div className="text-center mb-12">
					<Newspaper className="w-12 h-12 text-blue-400 mx-auto mb-4" />
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
						{m.blog_title()}
					</h1>
					<p className="text-lg text-gray-400 max-w-2xl mx-auto">
						{m.blog_desc()}
					</p>
				</div>
				<div className="space-y-6">
					{posts.map((post) => {
						const title =
							locale === "de" ? post.title_de : post.title_en;
						const excerpt =
							locale === "de"
								? post.excerpt_de
								: post.excerpt_en;
						return (
							<Link
								key={post.slug}
								to="/blog/$slug"
								params={{ slug: post.slug }}
								className="block bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
							>
								<div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
									<Calendar className="w-4 h-4" />
									<span>{post.date}</span>
								</div>
								<h2 className="text-xl font-semibold text-white mb-2">
									{title}
								</h2>
								<p className="text-gray-400 leading-relaxed">
									{excerpt}
								</p>
								<span className="inline-block mt-4 text-sm text-blue-400 hover:text-blue-300">
									{m.blog_read_more()} →
								</span>
							</Link>
						);
					})}
				</div>
			</div>
		</div>
	);
}
