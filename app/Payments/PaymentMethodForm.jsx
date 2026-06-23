import React, { useState } from "react";
import { CreditCard } from "lucide-react";
import FormSelect from "../../lib/ui/FormSelect";
import { FaApple } from "react-icons/fa";
import { SiPaypal } from "react-icons/si";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";

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
	const [method, setMethod] = useState("apple");
	const [name, setName] = useState("");
	const [city, setCity] = useState("");
	const [cardNumber, setCardNumber] = useState("");
	const [month, setMonth] = useState("");
	const [year, setYear] = useState("");
	const [cvc, setCvc] = useState("");

	const handleContinue = (e) => {
		e.preventDefault();
		toast.success("Payment method saved (demo)");
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className="text-lg">Payment Method</CardTitle>
				<CardDescription>
					Add a new payment method to your account.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleContinue} className="space-y-5">
					<div className="grid grid-cols-3 gap-2">
						{METHODS.map((m) => {
							const selected = method === m.id;
							return (
								<Button
									key={m.id}
									type="button"
									variant="outline"
									onClick={() => setMethod(m.id)}
									className={cn(
										"flex h-auto flex-col items-center justify-center gap-2 rounded-xl border-2 py-3 px-2",
										selected &&
											"border-zinc-900 dark:border-zinc-100 bg-zinc-50/80 dark:bg-zinc-900/50"
									)}
								>
									{m.icon === "card" && (
										<CreditCard className="w-6 h-6" />
									)}
									{m.icon === "paypal" && (
										<SiPaypal className="w-7 h-7 text-[#003087] dark:text-[#009cde]" />
									)}
									{m.icon === "apple" && (
										<FaApple className="w-6 h-6" />
									)}
									<span className="text-xs font-medium">{m.label}</span>
								</Button>
							);
						})}
					</div>

					<div className="space-y-1.5">
						<label className="block text-xs font-semibold">
							Name on the card
						</label>
						<Input
							type="text"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Jane Doe"
							autoComplete="cc-name"
						/>
					</div>

					<div className="space-y-1.5">
						<label className="block text-xs font-semibold">City</label>
						<Input
							type="text"
							value={city}
							onChange={(e) => setCity(e.target.value)}
							placeholder="San Francisco"
						/>
					</div>

					<div className="space-y-1.5">
						<label className="block text-xs font-semibold">
							Card number
						</label>
						<Input
							type="text"
							inputMode="numeric"
							value={cardNumber}
							onChange={(e) => setCardNumber(e.target.value)}
							placeholder="4242 4242 4242 4242"
							autoComplete="cc-number"
						/>
					</div>

					<div className="grid grid-cols-3 gap-3">
						<div className="space-y-1.5">
							<label className="block text-xs font-semibold">
								Expires
							</label>
							<FormSelect
								value={month}
								onChange={(e) => setMonth(e.target.value)}
								placeholder="Month"
								options={MONTHS}
							/>
						</div>
						<div className="space-y-1.5">
							<label className="block text-xs font-semibold">Year</label>
							<FormSelect
								value={year}
								onChange={(e) => setYear(e.target.value)}
								placeholder="Year"
								options={YEARS}
							/>
						</div>
						<div className="space-y-1.5">
							<label className="block text-xs font-semibold">CVC</label>
							<Input
								type="text"
								inputMode="numeric"
								value={cvc}
								onChange={(e) => setCvc(e.target.value)}
								placeholder="CVC"
								autoComplete="cc-csc"
							/>
						</div>
					</div>

					<Button type="submit" className="w-full">
						Continue
					</Button>
				</form>
			</CardContent>
		</Card>
	);
};

export default PaymentMethodForm;
