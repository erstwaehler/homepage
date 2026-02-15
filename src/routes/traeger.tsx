import { createFileRoute } from "@tanstack/react-router";
import { HandHeart, School, Users } from "lucide-react";
import { m } from "@/paraglide/messages";

export const Route = createFileRoute("/traeger")({
	component: TraegerPage,
});

function TraegerPage() {
	const schools = [
		{ name: m.school_athe(), abbr: "ATHE" },
		{ name: m.school_igs(), abbr: "IGS" },
		{ name: m.school_vlg(), abbr: "VLG" },
	];

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<div className="max-w-5xl mx-auto px-6 py-16">
				<div className="text-center mb-12">
					<HandHeart className="w-12 h-12 text-blue-400 mx-auto mb-4" />
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
						{m.traeger_title()}
					</h1>
					<p className="text-lg text-gray-400 max-w-2xl mx-auto">
						{m.traeger_desc()}
					</p>
				</div>

				{/* Schools */}
				<div className="mb-16">
					<h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
						<School className="w-6 h-6 text-cyan-400" />
						{m.traeger_schulen()}
					</h2>
					<p className="text-gray-400 mb-8">{m.traeger_schulen_desc()}</p>
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
				</div>

				{/* Youth councils */}
				<div>
					<h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
						<Users className="w-6 h-6 text-teal-400" />
						{m.traeger_jugendringe()}
					</h2>
					<p className="text-gray-400 mb-8">{m.traeger_jugendringe_desc()}</p>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
						<div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center hover:border-teal-500/50 transition-colors">
							<Users className="w-10 h-10 text-teal-400 mx-auto mb-4" />
							<h3 className="text-lg font-semibold text-white">
								{m.traeger_stadtjugendring()}
							</h3>
						</div>
						<div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center hover:border-teal-500/50 transition-colors">
							<Users className="w-10 h-10 text-teal-400 mx-auto mb-4" />
							<h3 className="text-lg font-semibold text-white">
								{m.traeger_kreisjugendring()}
							</h3>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
