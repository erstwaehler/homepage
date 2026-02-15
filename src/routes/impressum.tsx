import { createFileRoute } from "@tanstack/react-router";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { getMarkdownContent } from "@/data/loaders";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/impressum")({
	loader: async () => {
		const locale = getLocale();
		const content = await getMarkdownContent({
			data: { page: "impressum", locale },
		});
		return { content };
	},
	component: ImpressumPage,
});

function ImpressumPage() {
	const { content } = Route.useLoaderData();

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<div className="max-w-4xl mx-auto px-6 py-16">
				<MarkdownRenderer content={content} />
			</div>
		</div>
	);
}
