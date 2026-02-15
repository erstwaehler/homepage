import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
	content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
	return (
		<div className="prose prose-invert prose-lg max-w-none">
			<Markdown
				remarkPlugins={[remarkGfm]}
				components={{
					h1: ({ children }) => (
						<h1 className="text-4xl font-bold text-white mb-6 mt-8 first:mt-0">
							{children}
						</h1>
					),
					h2: ({ children }) => (
						<h2 className="text-2xl font-semibold text-white mb-4 mt-8">
							{children}
						</h2>
					),
					h3: ({ children }) => (
						<h3 className="text-xl font-semibold text-gray-200 mb-3 mt-6">
							{children}
						</h3>
					),
					p: ({ children }) => (
						<p className="text-gray-300 leading-relaxed mb-4">{children}</p>
					),
					strong: ({ children }) => (
						<strong className="text-white font-semibold">{children}</strong>
					),
					ul: ({ children }) => (
						<ul className="list-disc list-inside space-y-2 mb-4 text-gray-300">
							{children}
						</ul>
					),
					ol: ({ children }) => (
						<ol className="list-decimal list-inside space-y-2 mb-4 text-gray-300">
							{children}
						</ol>
					),
					li: ({ children }) => <li className="text-gray-300">{children}</li>,
					a: ({ href, children }) => (
						<a
							href={href}
							className="text-blue-400 hover:text-blue-300 underline transition-colors"
							target={href?.startsWith("http") ? "_blank" : undefined}
							rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
						>
							{children}
						</a>
					),
					hr: () => <hr className="border-slate-700 my-8" />,
					em: ({ children }) => (
						<em className="text-gray-400 italic">{children}</em>
					),
					blockquote: ({ children }) => (
						<blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-400 my-4">
							{children}
						</blockquote>
					),
				}}
			>
				{content}
			</Markdown>
		</div>
	);
}
