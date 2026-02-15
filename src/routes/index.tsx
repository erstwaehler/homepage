import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Calendar,
	MapPin,
	MessageSquare,
	Mic,
	School,
	Store,
	Users,
} from "lucide-react";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	const highlights = [
		{
			icon: <Mic className="w-10 h-10 text-blue-400" />,
			title: m.highlight_podium(),
			description: m.highlight_podium_desc(),
		},
		{
			icon: <MessageSquare className="w-10 h-10 text-cyan-400" />,
			title: m.highlight_gespraech(),
			description: m.highlight_gespraech_desc(),
		},
		{
			icon: <Store className="w-10 h-10 text-teal-400" />,
			title: m.highlight_markt(),
			description: m.highlight_markt_desc(),
		},
	];

	const schools = [
		{ name: m.school_athe(), abbr: "ATHE" },
		{ name: m.school_igs(), abbr: "IGS" },
		{ name: m.school_vlg(), abbr: "VLG" },
	];

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			{/* Hero Section */}
			<section className="relative py-24 px-6 text-center overflow-hidden">
				<div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-cyan-500/10 to-teal-500/10" />
				<div className="relative max-w-5xl mx-auto">
					<div className="inline-block px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium mb-6 border border-blue-500/30">
						{m.pflichtveranstaltung()}
					</div>
					<h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
						{m.hero_title()}
					</h1>
					<p className="text-2xl md:text-3xl text-gray-300 mb-4 font-light">
						{m.hero_subtitle()}
					</p>
					<p className="text-lg text-gray-400 max-w-3xl mx-auto mb-6">
						{m.hero_description()}
					</p>
					<div className="flex items-center justify-center gap-2 text-gray-400 mb-8">
						<Calendar className="w-5 h-5" />
						<span className="text-sm md:text-base">{m.hero_date()}</span>
					</div>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link
							to="/konzept"
							className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-blue-600/30"
						>
							{m.hero_cta_konzept()}
						</Link>
						<Link
							to="/team"
							className="px-8 py-3 border border-slate-600 hover:border-slate-500 text-gray-300 hover:text-white font-semibold rounded-lg transition-colors"
						>
							{m.nav_team()}
						</Link>
					</div>
				</div>
			</section>

			{/* What section */}
			<section className="py-16 px-6 max-w-5xl mx-auto text-center">
				<h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
					{m.section_what()}
				</h2>
				<p className="text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
					{m.section_what_desc()}
				</p>
			</section>

			{/* Highlights */}
			<section className="py-16 px-6 max-w-7xl mx-auto">
				<h2 className="text-3xl font-bold text-white mb-10 text-center">
					{m.section_highlights()}
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{highlights.map((item) => (
						<div
							key={item.title}
							className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 text-center"
						>
							<div className="flex justify-center mb-4">{item.icon}</div>
							<h3 className="text-xl font-semibold text-white mb-3">
								{item.title}
							</h3>
							<p className="text-gray-400 leading-relaxed">
								{item.description}
							</p>
						</div>
					))}
				</div>
			</section>

			{/* Schools */}
			<section className="py-16 px-6 max-w-5xl mx-auto">
				<h2 className="text-3xl font-bold text-white mb-10 text-center">
					{m.section_schools()}
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{schools.map((school) => (
						<div
							key={school.abbr}
							className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center hover:border-cyan-500/50 transition-colors"
						>
							<School className="w-10 h-10 text-cyan-400 mx-auto mb-4" />
							<h3 className="text-lg font-semibold text-white mb-1">
								{school.name}
							</h3>
							<span className="text-sm text-gray-500">{school.abbr}</span>
						</div>
					))}
				</div>
			</section>

			{/* Unique badge */}
			<section className="py-16 px-6 text-center">
				<div className="max-w-3xl mx-auto bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-8">
					<Users className="w-12 h-12 text-blue-400 mx-auto mb-4" />
					<p className="text-xl text-gray-200 font-medium">
						{m.unique_event()}
					</p>
				</div>
			</section>

			{/* CTA */}
			<section className="py-16 px-6 text-center">
				<div className="flex items-center justify-center gap-2 text-gray-400 mb-4">
					<MapPin className="w-5 h-5" />
					<span>Stadeum, Stade</span>
				</div>
				<Link
					to="/konzept"
					className="inline-block px-10 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-blue-600/30 text-lg"
				>
					{m.hero_cta()}
				</Link>
			</section>
		</div>
	);
}
