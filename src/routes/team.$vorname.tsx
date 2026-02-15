import { createFileRoute, Link } from "@tanstack/react-router";
import { getLocale } from "@/paraglide/runtime";
import { m } from "@/paraglide/messages";
import { getTeamMember } from "@/data/loaders";
import { ArrowLeft, Mail, School } from "lucide-react";

export const Route = createFileRoute("/team/$vorname")({
	loader: async ({ params }) => {
		const member = await getTeamMember({ data: params.vorname });
		if (!member) {
			throw new Error("Team member not found");
		}
		return { member };
	},
	component: TeamMemberPage,
});

function TeamMemberPage() {
	const { member } = Route.useLoaderData();
	const locale = getLocale();
	const description =
		locale === "de" ? member.beschreibung_de : member.beschreibung_en;
	const vornameLower = member.vorname.toLowerCase();

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<div className="max-w-4xl mx-auto px-6 py-16">
				<Link
					to="/team"
					className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
				>
					<ArrowLeft className="w-4 h-4" />
					{m.team_back()}
				</Link>

				<div className="bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden">
					{/* Banner */}
					<div className="h-48 md:h-64 bg-gradient-to-br from-blue-600/30 to-cyan-600/30 relative">
						<img
							src={`/team/${vornameLower}_banner.png`}
							alt=""
							className="w-full h-full object-cover"
							onError={(e) => {
								(e.target as HTMLImageElement).style.display =
									"none";
							}}
						/>
					</div>

					{/* Profile area */}
					<div className="relative px-8 pb-8">
						<div className="-mt-16 mb-6">
							<div className="w-32 h-32 rounded-full border-4 border-slate-800 bg-slate-700 overflow-hidden">
								<img
									src={`/team/${vornameLower}_profile.png`}
									alt={member.vorname}
									className="w-full h-full object-cover"
									onError={(e) => {
										const target =
											e.target as HTMLImageElement;
										target.style.display = "none";
										if (target.parentElement) {
											target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600 to-cyan-600"><span class="text-4xl font-bold text-white">${member.vorname[0]}</span></div>`;
										}
									}}
								/>
							</div>
						</div>

						<h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
							{member.vorname} {member.nachname}
						</h1>

						<div className="flex flex-wrap gap-3 mb-6">
							<span className="inline-flex items-center px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium">
								{member.rolle}
							</span>
							<span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-700/50 text-gray-300 text-sm">
								<School className="w-4 h-4" />
								{member.schule}
							</span>
						</div>

						<p className="text-gray-300 text-lg leading-relaxed mb-6">
							{description}
						</p>

						{member.email && (
							<a
								href={`mailto:${member.email}`}
								className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
							>
								<Mail className="w-4 h-4" />
								{member.email}
							</a>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
