import { createFileRoute, Link } from "@tanstack/react-router";
import { Mail, School } from "lucide-react";
import type { TeamMember } from "@/data/loaders";
import { getTeamMembers } from "@/data/loaders";
import { m } from "@/paraglide/messages";
import { getLocale } from "@/paraglide/runtime";

export const Route = createFileRoute("/team/")({
	loader: async () => {
		const members = await getTeamMembers();
		return { members };
	},
	component: TeamPage,
});

function TeamMemberCard({ member }: { member: TeamMember }) {
	const locale = getLocale();
	const description =
		locale === "de" ? member.beschreibung_de : member.beschreibung_en;
	const vornameLower = member.vorname.toLowerCase();

	return (
		<div className="bg-slate-800/50 border border-slate-700 rounded-xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
			<div className="aspect-[3/2] bg-slate-700/50 flex items-center justify-center">
				<img
					src={`/team/${vornameLower}_banner.png`}
					alt={member.vorname}
					className="w-full h-full object-cover"
					onError={(e) => {
						const target = e.target as HTMLImageElement;
						target.style.display = "none";
						if (target.parentElement) {
							target.parentElement.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-600/30 to-cyan-600/30"><span class="text-5xl font-bold text-white/60">${member.vorname[0]}</span></div>`;
						}
					}}
				/>
			</div>
			<div className="p-6">
				<h3 className="text-xl font-semibold text-white mb-1">
					{member.vorname} {member.nachname}
				</h3>
				<span className="inline-block px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium mb-3">
					{member.rolle}
				</span>
				<div className="flex items-center gap-2 text-sm text-gray-400 mb-3">
					<School className="w-4 h-4" />
					<span>{member.schule}</span>
				</div>
				<p className="text-gray-400 text-sm leading-relaxed mb-4">
					{description}
				</p>
				<div className="flex items-center justify-between">
					{member.email && (
						<a
							href={`mailto:${member.email}`}
							className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 transition-colors"
						>
							<Mail className="w-4 h-4" />
							{m.team_email()}
						</a>
					)}
					<Link
						to="/team/$vorname"
						params={{ vorname: vornameLower }}
						className="text-sm text-gray-400 hover:text-white transition-colors"
					>
						{m.team_more()} →
					</Link>
				</div>
			</div>
		</div>
	);
}

function TeamPage() {
	const { members } = Route.useLoaderData();

	return (
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<div className="max-w-7xl mx-auto px-6 py-16">
				<div className="text-center mb-12">
					<h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
						{m.team_page_title()}
					</h1>
					<p className="text-lg text-gray-400 max-w-2xl mx-auto">
						{m.team_page_desc()}
					</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{members.map((member) => (
						<TeamMemberCard key={member.vorname} member={member} />
					))}
				</div>
			</div>
		</div>
	);
}
