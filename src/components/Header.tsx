import { Link } from "@tanstack/react-router";
import ParaglideLocaleSwitcher from "./LocaleSwitcher.tsx";
import { m } from "@/paraglide/messages";
import { useState } from "react";
import {
	BookOpen,
	FileText,
	HandHeart,
	Home,
	Menu,
	Newspaper,
	Users,
	X,
} from "lucide-react";

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);

	const navItems = [
		{ to: "/" as const, label: () => m.nav_home(), icon: Home },
		{
			to: "/konzept" as const,
			label: () => m.nav_konzept(),
			icon: BookOpen,
		},
		{ to: "/team" as const, label: () => m.nav_team(), icon: Users },
		{
			to: "/traeger" as const,
			label: () => m.nav_traeger(),
			icon: HandHeart,
		},
		{ to: "/blog" as const, label: () => m.nav_blog(), icon: Newspaper },
		{
			to: "/impressum" as const,
			label: () => m.nav_impressum(),
			icon: FileText,
		},
	];

	return (
		<>
			<header className="p-4 flex items-center justify-between bg-slate-900 text-white shadow-lg border-b border-slate-800">
				<div className="flex items-center">
					<button
						onClick={() => setIsOpen(true)}
						className="p-2 hover:bg-slate-800 rounded-lg transition-colors md:hidden"
						aria-label="Open menu"
					>
						<Menu size={24} />
					</button>
					<h1 className="ml-2 text-xl font-bold">
						<Link to="/" className="flex items-center gap-2">
							<span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
								EWF
							</span>
							<span className="text-gray-300 text-sm font-normal hidden sm:inline">
								Erstwähler Forum '26
							</span>
						</Link>
					</h1>
				</div>

				{/* Desktop nav */}
				<nav className="hidden md:flex items-center gap-1">
					{navItems.map((item) => (
						<Link
							key={item.to}
							to={item.to}
							className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-slate-800 transition-colors"
							activeProps={{
								className:
									"px-3 py-2 rounded-lg text-sm font-medium text-white bg-slate-800",
							}}
							activeOptions={{ exact: true }}
						>
							{item.label()}
						</Link>
					))}
					<div className="ml-2 border-l border-slate-700 pl-2">
						<ParaglideLocaleSwitcher />
					</div>
				</nav>
			</header>

			{/* Mobile sidebar */}
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 z-40 md:hidden"
					onClick={() => setIsOpen(false)}
					onKeyDown={(e) => e.key === "Escape" && setIsOpen(false)}
				/>
			)}
			<aside
				className={`fixed top-0 left-0 h-full w-80 bg-slate-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out flex flex-col md:hidden ${
					isOpen ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<div className="flex items-center justify-between p-4 border-b border-slate-700">
					<h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
						Erstwähler Forum
					</h2>
					<button
						onClick={() => setIsOpen(false)}
						className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
						aria-label="Close menu"
					>
						<X size={24} />
					</button>
				</div>

				<nav className="flex-1 p-4 overflow-y-auto">
					{navItems.map((item) => {
						const Icon = item.icon;
						return (
							<Link
								key={item.to}
								to={item.to}
								onClick={() => setIsOpen(false)}
								className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-800 transition-colors mb-1"
								activeProps={{
									className:
										"flex items-center gap-3 p-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors mb-1",
								}}
								activeOptions={{ exact: true }}
							>
								<Icon size={20} />
								<span className="font-medium">
									{item.label()}
								</span>
							</Link>
						);
					})}
				</nav>

				<div className="p-4 border-t border-slate-700 bg-slate-800/50">
					<ParaglideLocaleSwitcher />
				</div>
			</aside>
		</>
	);
}
