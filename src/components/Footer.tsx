import { Link } from "@tanstack/react-router";
import { m } from "@/paraglide/messages";

export default function Footer() {
	return (
		<footer className="bg-slate-900 text-gray-300 border-t border-slate-800">
			<div className="max-w-7xl mx-auto px-6 py-12">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					<div>
						<h3 className="text-white font-semibold text-lg mb-4">
							{m.footer_contact()}
						</h3>
						<p className="text-sm leading-relaxed">
							Erstwähler Forum '26
							<br />
							z. Hd. Jack Ruder
							<br />
							Harsefelder Straße 40
							<br />
							21680 Stade
						</p>
						<p className="text-sm mt-3">
							<a
								href="mailto:info@ewf-stade.de"
								className="hover:text-white transition-colors"
							>
								info@ewf-stade.de
							</a>
						</p>
					</div>
					<div>
						<h3 className="text-white font-semibold text-lg mb-4">
							{m.footer_links()}
						</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									to="/konzept"
									className="hover:text-white transition-colors"
								>
									{m.nav_konzept()}
								</Link>
							</li>
							<li>
								<Link
									to="/team"
									className="hover:text-white transition-colors"
								>
									{m.nav_team()}
								</Link>
							</li>
							<li>
								<Link
									to="/traeger"
									className="hover:text-white transition-colors"
								>
									{m.nav_traeger()}
								</Link>
							</li>
							<li>
								<Link
									to="/blog"
									className="hover:text-white transition-colors"
								>
									{m.nav_blog()}
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="text-white font-semibold text-lg mb-4">
							{m.footer_legal()}
						</h3>
						<ul className="space-y-2 text-sm">
							<li>
								<Link
									to="/impressum"
									className="hover:text-white transition-colors"
								>
									{m.footer_impressum()}
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t border-slate-800 mt-8 pt-8 text-center text-sm text-gray-500">
					<p>{m.footer_copyright()}</p>
				</div>
			</div>
		</footer>
	);
}
