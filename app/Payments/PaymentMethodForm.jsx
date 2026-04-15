import React, { useState } from "react";
import { CreditCard, ChevronDown } from "lucide-react";
import { FaApple } from "react-icons/fa";
import { SiPaypal } from "react-icons/si";
import { toast } from "react-toastify";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const METHODS = [
	{ id: "card", label: "Card", icon: "card" },
	{ id: "paypal", label: "Paypal", icon: "paypal" },
	{ id: "apple", label: "Apple", icon: "apple" },
];

const MONTHS = Array.from({ length: 12 }, (_, i) =>
	String(i + 1).padStart(2, "0"),
);
const YEARS = Array.from({ length: 12 }, (_, i) => String(new Date().getFullYear() + i));

const PaymentMethodForm = () => {
	const { colorScheme, colors } = useTheme();
	const [method, setMethod] = useState("apple");
	const [name, setName] = useState("");
	const [city, setCity] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [cvc, setCvc] = useState("");

	const inputClass = `w-full px-3 py-2 text-sm rounded-md border ${colors.border} ${colors.background} ${colors.foreground} placeholder:${colors.textMuted} focus:outline-none focus:ring-2 ${getFocusRingClass(colorScheme)}`;

	const handleContinue = (e) => {
		e.preventDefault();
		toast.success("Payment method saved (demo)");
	};

	return (
		<div
			className={`${colors.card} border ${colors.border} rounded-xl p-6 md:p-8 ${colors.shadow}`}
		>
			<div className="mb-6">
				<h2 className={`text-lg font-semibold ${colors.foreground}`}>Payment Method</h2>
				<p className={`text-sm mt-1 ${colors.mutedForeground}`}>
					Add a new payment method to your account.
				</p>
			</div>

			<form onSubmit={handleContinue} className="space-y-5">
				<div className="grid grid-cols-3 gap-2">
					{METHODS.map((m) => {
						const selected = method === m.id;
						return (
							<button
								key={m.id}
								type="button"
								onClick={() => setMethod(m.id)}
								className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 py-3 px-2 transition-colors ${
									selected
										? "border-zinc-900 dark:border-zinc-100 bg-zinc-50/80 dark:bg-zinc-900/50"
										: `border-zinc-200 dark:border-zinc-700 ${colors.hoverSecondary}`
								}`}
							>
								{m.icon === "card" && (
									<CreditCard className={`w-6 h-6 ${colors.foreground}`} />
								)}
								{m.icon === "paypal" && (
									<SiPaypal className="w-7 h-7 text-[#003087] dark:text-[#009cde]" />
								)}
								{m.icon === "apple" && (
									<FaApple className={`w-6 h-6 ${colors.foreground}`} />
								)}
								<span className={`text-xs font-medium ${colors.foreground}`}>{m.label}</span>
							</button>
						);
					})}
				</div>

				<div>
					<label className={`block text-xs font-semibold ${colors.foreground} mb-1.5`}>
						Name on the card
					</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						className={inputClass}
						placeholder="Jane Doe"
						autoComplete="cc-name"
					/>
				</div>

				<div>
					<label className={`block text-xs font-semibold ${colors.foreground} mb-1.5`}>City</label>
					<input
						type="text"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						className={inputClass}
						placeholder="San Francisco"
					/>
				</div>

				<div>
					<label className={`block text-xs font-semibold ${colors.foreground} mb-1.5`}>
						Card number
					</label>
					<input
						type="text"
						inputMode="numeric"
						value={cardNumber}
						onChange={(e) => setCardNumber(e.target.value)}
						className={inputClass}
						placeholder="4242 4242 4242 4242"
						autoComplete="cc-number"
					/>
				</div>

				<div className="grid grid-cols-3 gap-3">
					<div>
						<label className={`block text-xs font-semibold ${colors.foreground} mb-1.5`}>
							Expires
						</label>
						<div className="relative">
							<select
								value={month}
								onChange={(e) => setMonth(e.target.value)}
								className={`${inputClass} appearance-none pr-8`}
							>
								<option value="">Month</option>
								{MONTHS.map((mo) => (
									<option key={mo} value={mo}>
										{mo}
									</option>
								))}
							</select>
							<ChevronDown
								className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 ${colors.textMuted}`}
							/>
						</div>
					</div>
					<div>
						<label className={`block text-xs font-semibold ${colors.foreground} mb-1.5`}>Year</label>
						<div className="relative">
							<select
								value={year}
								onChange={(e) => setYear(e.target.value)}
								className={`${inputClass} appearance-none pr-8`}
							>
								<option value="">Year</option>
								{YEARS.map((y) => (
									<option key={y} value={y}>
										{y}
									</option>
								))}
							</select>
							<ChevronDown
								className={`pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 w-4 h-4 ${colors.textMuted}`}
							/>
						</div>
					</div>
					<div>
						<label className={`block text-xs font-semibold ${colors.foreground} mb-1.5`}>CVC</label>
						<input
							type="text"
							inputMode="numeric"
							value={cvc}
							onChange={(e) => setCvc(e.target.value)}
							className={inputClass}
							placeholder="CVC"
							autoComplete="cc-csc"
						/>
					</div>
				</div>

				<button
					type="submit"
					className="w-full py-3 rounded-xl text-sm font-semibold bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 transition-colors"
				>
					Continue
				</button>
			</form>
		</div>
	);
};

export default PaymentMethodForm;
