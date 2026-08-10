import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
	ArrowLeft,
	BookOpen,
	CreditCard,
	FileQuestion,
	HelpCircle,
	LogIn,
	LogOut,
	Mail,
	MapPin,
	Package,
	ShoppingBag,
	User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const BLOG_POSTS = [
	{
		id: "b1",
		title: "Why tiny commerce wins",
		excerpt: "Ship a store that fits in a dock — no image grid required.",
		body: "Dashy keeps every flow above the dock: browse, buy, and manage account without leaving the shell. Nested posts open as a second layer so the dock stays your always-on OS.",
	},
	{
		id: "b2",
		title: "Designing for zero product photos",
		excerpt: "Text-first SKUs, clear CTAs, and a calm purchase path.",
		body: "When you skip photography, copy and price hierarchy do the work. Each SKU is a row with name, price, and one-tap buy — perfect for demos and template kits.",
	},
	{
		id: "b3",
		title: "Account pages that feel native",
		excerpt: "Orders, cards, and addresses as dock-adjacent panels.",
		body: "After login, Account expands into Details, Orders, Cards, and Addresses. Everything lives in the same max-height panel stacked above the dock.",
	},
];

const CATALOG = [
	{ id: "p1", name: "Studio Cap", price: 48, blurb: "Unstructured cotton · charcoal" },
	{ id: "p2", name: "Dock Tee", price: 36, blurb: "Heavyweight · bone white" },
	{ id: "p3", name: "Trail Bottle", price: 28, blurb: "Steel 500ml · matte black" },
	{ id: "p4", name: "Desk Mat", price: 54, blurb: "Wool felt · slate" },
];

const FAQ = [
	{
		q: "Do I need product images?",
		a: "No — this demo is text-first. The dock is the only chrome; content opens above it.",
	},
	{
		q: "How does checkout work?",
		a: "Open Buy from the dock, pick a SKU, then Confirm. Orders appear in Account → Orders after login.",
	},
	{
		q: "Can I nest pages?",
		a: "Yes. Blog → post, and Account → Details / Orders / Cards / Addresses.",
	},
];

const DOCK_ITEMS = [
	{ id: "close", label: "Dashy", brand: true },
	{ id: "blog", label: "Blog", Icon: BookOpen },
	{ id: "buy", label: "Buy", Icon: ShoppingBag },
	{ id: "help", label: "Help", Icon: HelpCircle },
	{ id: "faq", label: "FAQ", Icon: FileQuestion },
	{ id: "contact", label: "Contact", Icon: Mail },
	{ id: "account", label: "Account", Icon: User, auth: true },
	{ id: "login", label: "Login", Icon: LogIn, guest: true },
];

function PanelShell({ title, onBack, children }) {
	return (
		<div className="flex h-full min-h-0 flex-col">
			<div className="flex shrink-0 items-center gap-2 border-b border-zinc-200 px-4 py-3">
				{onBack ? (
					<button
						type="button"
						onClick={onBack}
						className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
						aria-label="Back"
					>
						<ArrowLeft className="h-4 w-4" />
					</button>
				) : (
					<span className="h-8 w-8" />
				)}
				<h2 className="flex-1 truncate text-sm font-semibold tracking-tight text-zinc-900">
					{title}
				</h2>
				<span className="rounded-full bg-zinc-100 px-2 py-0.5 text-[10px] font-medium text-zinc-500">
					Above dock
				</span>
			</div>
			<div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">{children}</div>
		</div>
	);
}

function BlogList({ onOpen }) {
	return (
		<ul className="space-y-2">
			{BLOG_POSTS.map((post) => (
				<li key={post.id}>
					<button
						type="button"
						onClick={() => onOpen(post.id)}
						className="w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-left transition hover:bg-zinc-100"
					>
						<p className="text-sm font-semibold text-zinc-900">{post.title}</p>
						<p className="mt-1 text-xs text-zinc-500">{post.excerpt}</p>
					</button>
				</li>
			))}
		</ul>
	);
}

function BlogPost({ post }) {
	if (!post) return null;
	return (
		<article className="space-y-3 text-sm text-zinc-600">
			<h3 className="text-base font-semibold text-zinc-900">{post.title}</h3>
			<p className="leading-relaxed">{post.body}</p>
		</article>
	);
}

function BuyView({ onBought }) {
	const [picked, setPicked] = useState(CATALOG[0].id);
	const sku = CATALOG.find((p) => p.id === picked) || CATALOG[0];

	return (
		<div className="space-y-4">
			<p className="text-xs text-zinc-500">Pick a SKU — text-only catalog.</p>
			<ul className="space-y-2">
				{CATALOG.map((p) => {
					const active = p.id === picked;
					return (
						<li key={p.id}>
							<button
								type="button"
								onClick={() => setPicked(p.id)}
								className={cn(
									"flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left transition",
									active
										? "border-zinc-900 bg-zinc-900 text-white"
										: "border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-50"
								)}
							>
								<span>
									<span className="block text-sm font-semibold">{p.name}</span>
									<span
										className={cn(
											"block text-xs",
											active ? "text-zinc-300" : "text-zinc-500"
										)}
									>
										{p.blurb}
									</span>
								</span>
								<span className="text-sm font-semibold">${p.price}</span>
							</button>
						</li>
					);
				})}
			</ul>
			<button
				type="button"
				onClick={() => onBought(sku)}
				className="w-full rounded-full bg-zinc-900 py-2.5 text-sm font-semibold text-white hover:bg-zinc-800"
			>
				Buy {sku.name} · ${sku.price}
			</button>
		</div>
	);
}

function HelpView() {
	return (
		<div className="space-y-3 text-sm text-zinc-600">
			<p className="font-semibold text-zinc-900">Need a hand?</p>
			<p className="leading-relaxed">
				Use FAQ for quick answers, Contact to write us, or Buy to place a demo order.
				After login, manage orders and addresses from Account.
			</p>
			<ol className="list-decimal space-y-1 pl-4 text-xs text-zinc-500">
				<li>Open Buy from the dock</li>
				<li>Confirm a SKU</li>
				<li>Login → Account → Orders</li>
			</ol>
		</div>
	);
}

function FaqView() {
	return (
		<ul className="space-y-2">
			{FAQ.map((item) => (
				<li
					key={item.q}
					className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3"
				>
					<p className="text-sm font-semibold text-zinc-900">{item.q}</p>
					<p className="mt-1 text-xs leading-relaxed text-zinc-500">{item.a}</p>
				</li>
			))}
		</ul>
	);
}

function ContactView() {
	const [sent, setSent] = useState(false);
	return (
		<form
			className="space-y-3"
			onSubmit={(e) => {
				e.preventDefault();
				setSent(true);
			}}
		>
			<input
				required
				placeholder="Email"
				type="email"
				className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-400"
			/>
			<textarea
				required
				placeholder="Message"
				rows={4}
				className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-zinc-400"
			/>
			<button
				type="submit"
				className="w-full rounded-full bg-zinc-900 py-2.5 text-sm font-semibold text-white"
			>
				{sent ? "Sent — thanks" : "Send message"}
			</button>
		</form>
	);
}

function LoginView({ onLogin }) {
	return (
		<form
			className="space-y-3"
			onSubmit={(e) => {
				e.preventDefault();
				onLogin();
			}}
		>
			<p className="text-xs text-zinc-500">Demo login — any email works.</p>
			<input
				required
				defaultValue="you@dashy.store"
				type="email"
				className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-400"
			/>
			<input
				required
				defaultValue="••••••••"
				type="password"
				className="w-full rounded-xl border border-zinc-200 bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none focus:border-zinc-400"
			/>
			<button
				type="submit"
				className="w-full rounded-full bg-zinc-900 py-2.5 text-sm font-semibold text-white"
			>
				Sign in
			</button>
		</form>
	);
}

function AccountHub({ onOpen, onLogout, orders }) {
	const links = [
		{ id: "details", label: "Account details", Icon: User },
		{ id: "orders", label: `Orders (${orders.length})`, Icon: Package },
		{ id: "cards", label: "Cards", Icon: CreditCard },
		{ id: "addresses", label: "Addresses", Icon: MapPin },
	];
	return (
		<div className="space-y-2">
			{links.map(({ id, label, Icon }) => (
				<button
					key={id}
					type="button"
					onClick={() => onOpen(id)}
					className="flex w-full items-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-left text-sm text-zinc-900 hover:bg-zinc-100"
				>
					<Icon className="h-4 w-4 text-zinc-500" />
					{label}
				</button>
			))}
			<button
				type="button"
				onClick={onLogout}
				className="mt-2 flex w-full items-center justify-center gap-2 rounded-full border border-zinc-200 py-2.5 text-sm text-zinc-600 hover:bg-zinc-50"
			>
				<LogOut className="h-4 w-4" />
				Sign out
			</button>
		</div>
	);
}

function AccountDetails() {
	return (
		<div className="space-y-3 text-sm text-zinc-600">
			{[
				["Name", "Alex Buyer"],
				["Email", "you@dashy.store"],
				["Member since", "Aug 2026"],
			].map(([k, v]) => (
				<div
					key={k}
					className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3"
				>
					<p className="text-xs text-zinc-500">{k}</p>
					<p className="font-medium text-zinc-900">{v}</p>
				</div>
			))}
		</div>
	);
}

function OrdersView({ orders }) {
	if (!orders.length) {
		return <p className="text-sm text-zinc-500">No orders yet — grab something from Buy.</p>;
	}
	return (
		<ul className="space-y-2">
			{orders.map((o) => (
				<li
					key={o.id}
					className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm"
				>
					<span>
						<span className="block font-semibold text-zinc-900">{o.name}</span>
						<span className="text-xs text-zinc-500">{o.id}</span>
					</span>
					<span className="font-semibold text-zinc-900">${o.price}</span>
				</li>
			))}
		</ul>
	);
}

function CardsView() {
	return (
		<div className="space-y-2">
			<div className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-zinc-800 to-zinc-950 px-4 py-5 text-white shadow-lg">
				<p className="text-[10px] uppercase tracking-widest text-zinc-400">Visa</p>
				<p className="mt-6 font-mono text-sm tracking-widest">•••• •••• •••• 4242</p>
				<p className="mt-3 text-xs text-zinc-300">Alex Buyer · 08/28</p>
			</div>
			<p className="text-xs text-zinc-500">Demo card on file — not a real payment method.</p>
		</div>
	);
}

function AddressesView() {
	return (
		<ul className="space-y-2 text-sm">
			{[
				["Home", "214 Dock Lane\nChicago, IL 60601"],
				["Studio", "88 Component Ave\nAustin, TX 78701"],
			].map(([title, lines]) => (
				<li
					key={title}
					className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3"
				>
					<p className="font-semibold text-zinc-900">{title}</p>
					<p className="mt-1 whitespace-pre-line text-xs leading-relaxed text-zinc-500">
						{lines}
					</p>
				</li>
			))}
		</ul>
	);
}

/**
 * HeroDockCommerce — light Mac-style dock mini store.
 * Default: only dock visible (no panel). Dashy closes any open page.
 * Active dock highlight only while a page is open.
 */
export default function HeroDockCommerce({ className }) {
	const [route, setRoute] = useState(null);
	const [blogId, setBlogId] = useState(null);
	const [accountTab, setAccountTab] = useState(null);
	const [loggedIn, setLoggedIn] = useState(false);
	const [orders, setOrders] = useState([]);
	const [toast, setToast] = useState("");

	const closeAll = () => {
		setRoute(null);
		setBlogId(null);
		setAccountTab(null);
	};

	const openDock = (id) => {
		if (id === "close") {
			closeAll();
			return;
		}
		if (id === "account" && !loggedIn) {
			setRoute("login");
			setBlogId(null);
			setAccountTab(null);
			return;
		}
		if (id === "login" && loggedIn) {
			setRoute("account");
			setAccountTab(null);
			return;
		}
		setRoute(id);
		setBlogId(null);
		setAccountTab(null);
	};

	const panel = useMemo(() => {
		if (!route) return null;

		if (route === "blog" && blogId) {
			const post = BLOG_POSTS.find((p) => p.id === blogId);
			return {
				title: "Blog post",
				onBack: () => setBlogId(null),
				body: <BlogPost post={post} />,
			};
		}
		if (route === "account" && accountTab) {
			const titles = {
				details: "Account details",
				orders: "Orders",
				cards: "Cards",
				addresses: "Addresses",
			};
			const bodies = {
				details: <AccountDetails />,
				orders: <OrdersView orders={orders} />,
				cards: <CardsView />,
				addresses: <AddressesView />,
			};
			return {
				title: titles[accountTab],
				onBack: () => setAccountTab(null),
				body: bodies[accountTab],
			};
		}

		const map = {
			blog: { title: "Blog", body: <BlogList onOpen={setBlogId} /> },
			buy: {
				title: "Buy",
				body: (
					<BuyView
						onBought={(sku) => {
							const order = {
								id: `ORD-${String(orders.length + 1).padStart(3, "0")}`,
								name: sku.name,
								price: sku.price,
							};
							setOrders((prev) => [order, ...prev]);
							setToast(`Ordered ${sku.name}`);
							setTimeout(() => setToast(""), 1800);
							if (loggedIn) {
								setRoute("account");
								setAccountTab("orders");
							}
						}}
					/>
				),
			},
			help: { title: "Help", body: <HelpView /> },
			faq: { title: "FAQ", body: <FaqView /> },
			contact: { title: "Contact", body: <ContactView /> },
			login: {
				title: "Login",
				body: (
					<LoginView
						onLogin={() => {
							setLoggedIn(true);
							setRoute("account");
							setToast("Signed in");
							setTimeout(() => setToast(""), 1600);
						}}
					/>
				),
			},
			account: {
				title: "Account",
				body: (
					<AccountHub
						orders={orders}
						onOpen={setAccountTab}
						onLogout={() => {
							setLoggedIn(false);
							setAccountTab(null);
							closeAll();
							setToast("Signed out");
							setTimeout(() => setToast(""), 1600);
						}}
					/>
				),
			},
		};
		return map[route] || null;
	}, [route, blogId, accountTab, orders, loggedIn]);

	const dockVisible = DOCK_ITEMS.filter((item) => {
		if (item.guest) return !loggedIn;
		if (item.auth) return loggedIn;
		return true;
	});

	return (
		<section
			className={cn("relative w-full overflow-hidden bg-zinc-100 text-zinc-900", className)}
			style={{
				height: "100vh",
				width: "100vw",
				marginLeft: "calc(50% - 50vw)",
			}}
			aria-label="Dock commerce"
		>
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.9),transparent_65%)]" />

			{/* Content panel — only when a dock page is open */}
			<div className="absolute inset-x-0 top-0 bottom-[5.5rem] z-10 flex items-end justify-center px-3 pt-6 sm:px-6">
				<AnimatePresence exitBeforeEnter initial={false}>
					{panel ? (
						<motion.div
							key={`${route}-${blogId || ""}-${accountTab || ""}`}
							initial={{ opacity: 0, y: 18, scale: 0.98 }}
							animate={{ opacity: 1, y: 0, scale: 1 }}
							exit={{ opacity: 0, y: 10, scale: 0.98 }}
							transition={{ type: "spring", stiffness: 380, damping: 32 }}
							className="flex h-full max-h-[min(70vh,36rem)] w-full max-w-lg flex-col overflow-hidden rounded-[1.75rem] border border-zinc-200 bg-white shadow-2xl shadow-zinc-300/50"
						>
							<PanelShell title={panel.title} onBack={panel.onBack}>
								{panel.body}
							</PanelShell>
						</motion.div>
					) : null}
				</AnimatePresence>
			</div>

			<AnimatePresence>
				{toast ? (
					<motion.div
						initial={{ opacity: 0, y: 8 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: 8 }}
						className="absolute bottom-24 left-1/2 z-30 -translate-x-1/2 rounded-full bg-zinc-900 px-4 py-2 text-xs font-semibold text-white shadow-lg"
					>
						{toast}
					</motion.div>
				) : null}
			</AnimatePresence>

			{/* Light Mac-style dock */}
			<nav
				className="absolute bottom-4 left-1/2 z-20 flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-0.5 overflow-x-auto rounded-full border border-zinc-200 bg-white/95 px-2 py-1.5 shadow-xl shadow-zinc-300/60 backdrop-blur-xl [scrollbar-width:none] sm:gap-1 sm:px-3 sm:py-2 [&::-webkit-scrollbar]:hidden"
				aria-label="Dashy dock"
			>
				{dockVisible.map((item) => {
					const Icon = item.Icon;
					const active = Boolean(route) && route === item.id;
					return (
						<button
							key={item.id}
							type="button"
							onClick={() => openDock(item.id)}
							className={cn(
								"relative flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-2 text-xs font-medium transition sm:px-3",
								item.brand
									? "text-zinc-900"
									: active
										? "bg-zinc-900 text-white"
										: "text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
							)}
						>
							{item.brand ? (
								<span className="px-1 text-sm font-semibold tracking-tight">
									{item.label}
								</span>
							) : (
								<>
									<Icon className="h-3.5 w-3.5 sm:h-4 sm:w-4" strokeWidth={1.75} />
									<span className="hidden sm:inline">{item.label}</span>
								</>
							)}
						</button>
					);
				})}
			</nav>
		</section>
	);
}
