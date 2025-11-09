import {
	User,
	Lock,
	Bell,
	Globe,
	Shield,
	CreditCard,
	Users,
	Key,
	Save,
	Edit,
	X,
	ChevronDown,
	ChevronUp,
	Search,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useTheme } from "../../utils/useTheme";
import { getFocusRingClass } from "../../utils/theme";

const Settings = () => {
	// Theme hook
	const { theme, colorScheme, colors, scheme } = useTheme();

	const [activeTab, setActiveTab] = useState("profile");
	const [isEditMode, setIsEditMode] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [profileSettings, setProfileSettings] = useState({
		name: "John Doe",
		email: "john.doe@company.com",
		phone: "+1 (555) 123-4567",
		company: "Tech Corp",
		role: "Sales Manager",
		avatar: "./people/person-1.png",
		bio: "Experienced sales professional with a passion for building relationships.",
	});

	const [accountSettings, setAccountSettings] = useState({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
		twoFactorEnabled: false,
		apiKey: "sk_live_1234567890abcdef",
	});

	const [notificationSettings, setNotificationSettings] = useState({
		emailNotifications: true,
		smsNotifications: false,
		leadAlerts: true,
		dealUpdates: true,
		weeklyReports: true,
		marketingEmails: false,
	});

	const [preferenceSettings, setPreferenceSettings] = useState({
		theme: "light",
		language: "en",
		timezone: "America/New_York",
		dateFormat: "MM/DD/YYYY",
		currency: "USD",
	});

	const [billingSettings, setBillingSettings] = useState({
		plan: "Professional",
		status: "Active",
		nextBillingDate: "2024-07-25",
		paymentMethod: "**** **** **** 4242",
	});

	const [teamMembers, setTeamMembers] = useState([
		{
			id: "1",
			name: "Alice Johnson",
			email: "alice@company.com",
			role: "Admin",
			status: "Active",
			image: "./people/person-2.png",
		},
		{
			id: "2",
			name: "Bob Smith",
			email: "bob@company.com",
			role: "Manager",
			status: "Active",
			image: "./people/person-3.png",
		},
		{
			id: "3",
			name: "Charlie Brown",
			email: "charlie@company.com",
			role: "User",
			status: "Inactive",
			image: "./people/person-4.png",
		},
	]);

	const [sortConfig, setSortConfig] = useState(null);
	const [searchTerm, setSearchTerm] = useState("");

	const handleInputChange = (section, field, value) => {
		if (section === "profile") {
			setProfileSettings((prev) => ({ ...prev, [field]: value }));
		} else if (section === "account") {
			setAccountSettings((prev) => ({ ...prev, [field]: value }));
		} else if (section === "notifications") {
			setNotificationSettings((prev) => ({ ...prev, [field]: value }));
		} else if (section === "preferences") {
			setPreferenceSettings((prev) => ({ ...prev, [field]: value }));
		}
	};

	const handleSave = (section) => {
		toast.success(
			`${
				section.charAt(0).toUpperCase() + section.slice(1)
			} settings saved successfully!`
		);
		setIsEditMode(false);
	};

	const handlePasswordChange = () => {
		if (accountSettings.newPassword !== accountSettings.confirmPassword) {
			toast.error("Passwords do not match!");
			return;
		}
		if (accountSettings.newPassword.length < 8) {
			toast.error("Password must be at least 8 characters!");
			return;
		}
		toast.success("Password changed successfully!");
		setAccountSettings((prev) => ({
			...prev,
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		}));
	};

	const handleToggle2FA = () => {
		setAccountSettings((prev) => ({
			...prev,
			twoFactorEnabled: !prev.twoFactorEnabled,
		}));
		toast.success(
			`Two-factor authentication ${
				!accountSettings.twoFactorEnabled ? "enabled" : "disabled"
			}`
		);
	};

	const handleRegenerateAPIKey = () => {
		const newKey =
			"sk_live_" +
			Math.random().toString(36).substring(2, 15) +
			Math.random().toString(36).substring(2, 15);
		setAccountSettings((prev) => ({ ...prev, apiKey: newKey }));
		toast.success("API key regenerated successfully!");
	};

	const requestSort = (key) => {
		let direction = "ascending";
		if (
			sortConfig &&
			sortConfig.key === key &&
			sortConfig.direction === "ascending"
		) {
			direction = "descending";
		}
		setSortConfig({ key, direction });
	};

	const sortedTeamMembers = [...teamMembers].sort((a, b) => {
		if (!sortConfig) return 0;
		if (a[sortConfig.key] < b[sortConfig.key])
			return sortConfig.direction === "ascending" ? -1 : 1;
		if (a[sortConfig.key] > b[sortConfig.key])
			return sortConfig.direction === "ascending" ? 1 : -1;
		return 0;
	});

	const filteredTeamMembers = sortedTeamMembers.filter(
		(member) =>
			member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			member.email.toLowerCase().includes(searchTerm.toLowerCase())
	);

	const tabs = [
		{ id: "profile", label: "Profile", icon: User },
		{ id: "account", label: "Account", icon: Lock },
		{ id: "notifications", label: "Notifications", icon: Bell },
		{ id: "preferences", label: "Preferences", icon: Globe },
		{ id: "billing", label: "Billing", icon: CreditCard },
		{ id: "team", label: "Team", icon: Users },
		{ id: "security", label: "Security", icon: Shield },
	];

	const renderProfileSettings = () => (
		<div className={`${colors.card} border ${colors.border} rounded-lg p-6`}>
			<div className="flex justify-between items-center mb-6">
				<h2 className={`text-xl font-semibold ${colors.foreground}`}>
					Profile Information
				</h2>
				<button
					onClick={() => setIsEditMode(!isEditMode)}
					className={`flex items-center gap-2 ${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} text-xs px-4 py-2 rounded transition-all duration-100 ease-in hover:px-6`}
				>
					<Edit size={16} />
					{isEditMode ? "Cancel" : "Edit"}
				</button>
			</div>
			<div className="flex items-center gap-6 mb-6">
				<img
					src={profileSettings.avatar}
					alt={profileSettings.name}
					className={`w-24 h-24 rounded-full border-2 ${colors.border}`}
				/>
				<div>
					<button
						className={`${colors.secondary} ${colors.hoverSecondary} ${colors.secondaryForeground} text-xs px-4 py-2 rounded transition-all duration-100 ease-in`}
					>
						Change Avatar
					</button>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Full Name
					</label>
					<input
						type="text"
						value={profileSettings.name}
						onChange={(e) =>
							handleInputChange("profile", "name", e.target.value)
						}
						disabled={!isEditMode}
						className={`w-full border ${colors.border} ${
							colors.input
						} rounded px-3 py-2 outline-none ${colors.background} ${
							colors.foreground
						} placeholder:${colors.mutedForeground} ${getFocusRingClass(
							colorScheme
						)} disabled:${colors.muted}`}
					/>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Email
					</label>
					<input
						type="email"
						value={profileSettings.email}
						onChange={(e) =>
							handleInputChange("profile", "email", e.target.value)
						}
						disabled={!isEditMode}
						className={`w-full border ${colors.border} ${
							colors.input
						} rounded px-3 py-2 outline-none ${colors.background} ${
							colors.foreground
						} placeholder:${colors.mutedForeground} ${getFocusRingClass(
							colorScheme
						)} disabled:${colors.muted}`}
					/>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Phone
					</label>
					<input
						type="tel"
						value={profileSettings.phone}
						onChange={(e) =>
							handleInputChange("profile", "phone", e.target.value)
						}
						disabled={!isEditMode}
						className={`w-full border ${colors.border} ${
							colors.input
						} rounded px-3 py-2 outline-none ${colors.background} ${
							colors.foreground
						} placeholder:${colors.mutedForeground} ${getFocusRingClass(
							colorScheme
						)} disabled:${colors.muted}`}
					/>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Company
					</label>
					<input
						type="text"
						value={profileSettings.company}
						onChange={(e) =>
							handleInputChange("profile", "company", e.target.value)
						}
						disabled={!isEditMode}
						className={`w-full border ${colors.border} ${
							colors.input
						} rounded px-3 py-2 outline-none ${colors.background} ${
							colors.foreground
						} placeholder:${colors.mutedForeground} ${getFocusRingClass(
							colorScheme
						)} disabled:${colors.muted}`}
					/>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Role
					</label>
					<input
						type="text"
						value={profileSettings.role}
						onChange={(e) =>
							handleInputChange("profile", "role", e.target.value)
						}
						disabled={!isEditMode}
						className={`w-full border ${colors.border} ${
							colors.input
						} rounded px-3 py-2 outline-none ${colors.background} ${
							colors.foreground
						} placeholder:${colors.mutedForeground} ${getFocusRingClass(
							colorScheme
						)} disabled:${colors.muted}`}
					/>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Bio
					</label>
					<textarea
						value={profileSettings.bio}
						onChange={(e) =>
							handleInputChange("profile", "bio", e.target.value)
						}
						disabled={!isEditMode}
						rows={3}
						className={`w-full border ${colors.border} ${
							colors.input
						} rounded px-3 py-2 outline-none ${colors.background} ${
							colors.foreground
						} placeholder:${colors.mutedForeground} ${getFocusRingClass(
							colorScheme
						)} disabled:${colors.muted}`}
					/>
				</div>
			</div>
			{isEditMode && (
				<button
					onClick={() => handleSave("profile")}
					className={`mt-4 flex items-center gap-2 ${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} text-xs px-4 py-2 rounded transition-all duration-100 ease-in hover:px-6`}
				>
					<Save size={16} />
					Save Changes
				</button>
			)}
		</div>
	);

	const renderAccountSettings = () => (
		<div className="space-y-6">
			<div className={`${colors.card} border ${colors.border} rounded-lg p-6`}>
				<h2 className={`text-xl font-semibold ${colors.foreground} mb-6`}>
					Change Password
				</h2>
				<div className="space-y-4">
					<div>
						<label
							className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
						>
							Current Password
						</label>
						<input
							type="password"
							value={accountSettings.currentPassword}
							onChange={(e) =>
								handleInputChange("account", "currentPassword", e.target.value)
							}
							className={`w-full border ${colors.border} ${
								colors.input
							} rounded px-3 py-2 outline-none ${colors.background} ${
								colors.foreground
							} placeholder:${colors.mutedForeground} ${getFocusRingClass(
								colorScheme
							)}`}
							placeholder="Enter current password"
						/>
					</div>
					<div>
						<label
							className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
						>
							New Password
						</label>
						<input
							type="password"
							value={accountSettings.newPassword}
							onChange={(e) =>
								handleInputChange("account", "newPassword", e.target.value)
							}
							className={`w-full border ${colors.border} ${
								colors.input
							} rounded px-3 py-2 outline-none ${colors.background} ${
								colors.foreground
							} placeholder:${colors.mutedForeground} ${getFocusRingClass(
								colorScheme
							)}`}
							placeholder="Enter new password"
						/>
					</div>
					<div>
						<label
							className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
						>
							Confirm New Password
						</label>
						<input
							type="password"
							value={accountSettings.confirmPassword}
							onChange={(e) =>
								handleInputChange("account", "confirmPassword", e.target.value)
							}
							className={`w-full border ${colors.border} ${
								colors.input
							} rounded px-3 py-2 outline-none ${colors.background} ${
								colors.foreground
							} placeholder:${colors.mutedForeground} ${getFocusRingClass(
								colorScheme
							)}`}
							placeholder="Confirm new password"
						/>
					</div>
					<button
						onClick={handlePasswordChange}
						className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} text-xs px-4 py-2 rounded transition-all duration-100 ease-in hover:px-6`}
					>
						Update Password
					</button>
				</div>
			</div>

			<div className={`${colors.card} border ${colors.border} rounded-lg p-6`}>
				<h2 className={`text-xl font-semibold ${colors.foreground} mb-6`}>
					Two-Factor Authentication
				</h2>
				<div className="flex justify-between items-center">
					<div>
						<p className={`text-sm font-medium ${colors.textSecondary}`}>
							Enable 2FA
						</p>
						<p className={`text-xs ${colors.textMuted}`}>
							Add an extra layer of security to your account
						</p>
					</div>
					<button
						onClick={handleToggle2FA}
						className={`px-4 py-2 rounded text-xs transition-all duration-100 ease-in ${
							accountSettings.twoFactorEnabled
								? theme === "dark"
									? "bg-green-900/30 text-green-400 hover:bg-green-900/40 border border-green-800/50"
									: "bg-green-100 text-green-800 hover:bg-green-200"
								: `${colors.secondary} ${colors.hoverSecondary} ${colors.secondaryForeground}`
						}`}
					>
						{accountSettings.twoFactorEnabled ? "Enabled" : "Disabled"}
					</button>
				</div>
			</div>

			<div className={`${colors.card} border ${colors.border} rounded-lg p-6`}>
				<h2 className={`text-xl font-semibold ${colors.foreground} mb-6`}>
					API Key
				</h2>
				<div className="space-y-4">
					<div>
						<label
							className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
						>
							Your API Key
						</label>
						<div className="flex items-center gap-2">
							<input
								type="text"
								value={accountSettings.apiKey}
								readOnly
								className={`w-full border ${colors.border} rounded px-3 py-2 outline-none ${colors.muted} font-mono text-sm ${colors.foreground}`}
							/>
							<button
								onClick={handleRegenerateAPIKey}
								className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} text-xs px-4 py-2 rounded transition-all duration-100 ease-in hover:px-6 whitespace-nowrap`}
							>
								<Key size={16} className="inline mr-1" />
								Regenerate
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);

	const renderNotificationSettings = () => (
		<div className={`${colors.card} border ${colors.border} rounded-lg p-6`}>
			<h2 className={`text-xl font-semibold ${colors.foreground} mb-6`}>
				Notification Preferences
			</h2>
			<div className="space-y-4">
				{Object.entries(notificationSettings).map(([key, value]) => (
					<div
						key={key}
						className={`flex justify-between items-center py-3 border-b ${colors.border}`}
					>
						<div>
							<p
								className={`text-sm font-medium ${colors.textSecondary} capitalize`}
							>
								{key.replace(/([A-Z])/g, " $1").trim()}
							</p>
							<p className={`text-xs ${colors.textMuted}`}>
								Receive notifications for{" "}
								{key
									.toLowerCase()
									.replace(/([A-Z])/g, " $1")
									.trim()}
							</p>
						</div>
						<button
							onClick={() => handleInputChange("notifications", key, !value)}
							className={`px-4 py-2 rounded text-xs transition-all duration-100 ease-in ${
								value
									? theme === "dark"
										? "bg-green-900/30 text-green-400 hover:bg-green-900/40 border border-green-800/50"
										: "bg-green-100 text-green-800 hover:bg-green-200"
									: `${colors.secondary} ${colors.hoverSecondary} ${colors.secondaryForeground}`
							}`}
						>
							{value ? "On" : "Off"}
						</button>
					</div>
				))}
				<button
					onClick={() => handleSave("notifications")}
					className={`mt-4 flex items-center gap-2 ${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} text-xs px-4 py-2 rounded transition-all duration-100 ease-in hover:px-6`}
				>
					<Save size={16} />
					Save Preferences
				</button>
			</div>
		</div>
	);

	const renderPreferenceSettings = () => (
		<div className={`${colors.card} border ${colors.border} rounded-lg p-6`}>
			<h2 className={`text-xl font-semibold ${colors.foreground} mb-6`}>
				Application Preferences
			</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Theme
					</label>
					<select
						value={preferenceSettings.theme}
						onChange={(e) =>
							handleInputChange("preferences", "theme", e.target.value)
						}
						className={`w-full border ${colors.border} ${
							colors.input
						} rounded px-3 py-2 outline-none ${colors.background} ${
							colors.foreground
						} ${getFocusRingClass(colorScheme)}`}
					>
						<option value="light">Light</option>
						<option value="dark">Dark</option>
						<option value="auto">Auto</option>
					</select>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Language
					</label>
					<select
						value={preferenceSettings.language}
						onChange={(e) =>
							handleInputChange("preferences", "language", e.target.value)
						}
						className={`w-full border ${colors.border} ${
							colors.input
						} rounded px-3 py-2 outline-none ${colors.background} ${
							colors.foreground
						} ${getFocusRingClass(colorScheme)}`}
					>
						<option value="en">English</option>
						<option value="es">Spanish</option>
						<option value="fr">French</option>
						<option value="de">German</option>
					</select>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Timezone
					</label>
					<select
						value={preferenceSettings.timezone}
						onChange={(e) =>
							handleInputChange("preferences", "timezone", e.target.value)
						}
						className={`w-full border ${colors.border} ${
							colors.input
						} rounded px-3 py-2 outline-none ${colors.background} ${
							colors.foreground
						} ${getFocusRingClass(colorScheme)}`}
					>
						<option value="America/New_York">Eastern Time (ET)</option>
						<option value="America/Chicago">Central Time (CT)</option>
						<option value="America/Denver">Mountain Time (MT)</option>
						<option value="America/Los_Angeles">Pacific Time (PT)</option>
					</select>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Date Format
					</label>
					<select
						value={preferenceSettings.dateFormat}
						onChange={(e) =>
							handleInputChange("preferences", "dateFormat", e.target.value)
						}
						className={`w-full border ${colors.border} ${
							colors.input
						} rounded px-3 py-2 outline-none ${colors.background} ${
							colors.foreground
						} ${getFocusRingClass(colorScheme)}`}
					>
						<option value="MM/DD/YYYY">MM/DD/YYYY</option>
						<option value="DD/MM/YYYY">DD/MM/YYYY</option>
						<option value="YYYY-MM-DD">YYYY-MM-DD</option>
					</select>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Currency
					</label>
					<select
						value={preferenceSettings.currency}
						onChange={(e) =>
							handleInputChange("preferences", "currency", e.target.value)
						}
						className={`w-full border ${colors.border} ${
							colors.input
						} rounded px-3 py-2 outline-none ${colors.background} ${
							colors.foreground
						} ${getFocusRingClass(colorScheme)}`}
					>
						<option value="USD">USD ($)</option>
						<option value="EUR">EUR (€)</option>
						<option value="GBP">GBP (£)</option>
						<option value="JPY">JPY (¥)</option>
					</select>
				</div>
			</div>
			<button
				onClick={() => handleSave("preferences")}
				className={`mt-4 flex items-center gap-2 ${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} text-xs px-4 py-2 rounded transition-all duration-100 ease-in hover:px-6`}
			>
				<Save size={16} />
				Save Preferences
			</button>
		</div>
	);

	const renderBillingSettings = () => (
		<div className="space-y-6">
			<div className={`${colors.card} border ${colors.border} rounded-lg p-6`}>
				<h2 className={`text-xl font-semibold ${colors.foreground} mb-6`}>
					Subscription Details
				</h2>
				<div className="space-y-4">
					<div
						className={`flex justify-between items-center py-3 border-b ${colors.border}`}
					>
						<span className={`text-sm font-medium ${colors.textSecondary}`}>
							Current Plan
						</span>
						<span className={`text-sm ${colors.foreground} font-semibold`}>
							{billingSettings.plan}
						</span>
					</div>
					<div
						className={`flex justify-between items-center py-3 border-b ${colors.border}`}
					>
						<span className={`text-sm font-medium ${colors.textSecondary}`}>
							Status
						</span>
						<span
							className={`text-sm ${
								theme === "dark" ? "text-green-400" : "text-green-600"
							} font-semibold`}
						>
							{billingSettings.status}
						</span>
					</div>
					<div
						className={`flex justify-between items-center py-3 border-b ${colors.border}`}
					>
						<span className={`text-sm font-medium ${colors.textSecondary}`}>
							Next Billing Date
						</span>
						<span className={`text-sm ${colors.foreground}`}>
							{billingSettings.nextBillingDate}
						</span>
					</div>
					<div className="flex justify-between items-center py-3">
						<span className={`text-sm font-medium ${colors.textSecondary}`}>
							Payment Method
						</span>
						<span className={`text-sm ${colors.foreground}`}>
							{billingSettings.paymentMethod}
						</span>
					</div>
				</div>
				<div className="mt-6 flex gap-2">
					<button
						className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} text-xs px-4 py-2 rounded transition-all duration-100 ease-in hover:px-6`}
					>
						Upgrade Plan
					</button>
					<button
						className={`border ${colors.border} ${scheme.primaryHover} ${scheme.primaryForeground} ${colors.hoverSecondary} rounded ${colors.foreground} px-4 py-2 transition-all duration-100 ease-in hover:px-6 text-xs`}
					>
						Manage Payment
					</button>
				</div>
			</div>
		</div>
	);

	const renderTeamSettings = () => (
		<div className={`${colors.card} border ${colors.border} rounded-lg p-6`}>
			<div className="flex justify-between items-center mb-6">
				<h2 className={`text-xl font-semibold ${colors.foreground}`}>
					Team Members
				</h2>
				<button
					onClick={() => setIsModalOpen(true)}
					className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} text-xs px-4 py-2 rounded transition-all duration-100 ease-in hover:px-6`}
				>
					Add Member
				</button>
			</div>
			<div className="mb-4">
				<div
					className={`flex gap-2 items-center border ${colors.border} rounded px-2 py-1 w-full md:w-auto ${colors.card}`}
				>
					<Search size={18} className={colors.textSecondary} />
					<input
						type="text"
						placeholder="Search team members..."
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						className={`outline-none ${colors.background} ${
							colors.foreground
						} placeholder:${colors.mutedForeground} ${getFocusRingClass(
							colorScheme
						)}`}
					/>
				</div>
			</div>
			<div className="overflow-x-auto">
				<table className={`min-w-full ${colors.card} border ${colors.border}`}>
					<thead className={colors.hover}>
						<tr>
							<th
								className={`py-2 px-4 border-b ${colors.border} text-left ${colors.mutedForeground}`}
							>
								User Info
							</th>
							<th
								className={`py-2 px-4 border-b ${colors.border} text-left cursor-pointer ${colors.mutedForeground} transition-colors`}
								onClick={() => requestSort("email")}
							>
								<div className="flex justify-between items-center">
									<span className="ml-2">Email</span>
									{sortConfig?.key === "email" &&
										(sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} className={colors.textMuted} />
										) : (
											<ChevronDown size={16} className={colors.textMuted} />
										))}
								</div>
							</th>
							<th
								className={`py-2 px-4 border-b ${colors.border} text-left cursor-pointer ${colors.mutedForeground} transition-colors`}
								onClick={() => requestSort("role")}
							>
								<div className="flex justify-between items-center">
									<span className="ml-2">Role</span>
									{sortConfig?.key === "role" &&
										(sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} className={colors.textMuted} />
										) : (
											<ChevronDown size={16} className={colors.textMuted} />
										))}
								</div>
							</th>
							<th
								className={`py-2 px-4 border-b ${colors.border} text-left cursor-pointer ${colors.mutedForeground} transition-colors`}
								onClick={() => requestSort("status")}
							>
								<div className="flex justify-between items-center">
									<span className="ml-2">Status</span>
									{sortConfig?.key === "status" &&
										(sortConfig.direction === "ascending" ? (
											<ChevronUp size={16} className={colors.textMuted} />
										) : (
											<ChevronDown size={16} className={colors.textMuted} />
										))}
								</div>
							</th>
							<th
								className={`py-2 px-4 border-b ${colors.border} text-left ${colors.mutedForeground}`}
							>
								Actions
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredTeamMembers.map((member) => (
							<tr key={member.id} className={colors.hover}>
								<td
									className={`py-2 px-4 flex items-center gap-2 ${colors.foreground}`}
								>
									<img
										src={member.image}
										alt={member.name}
										className={`w-10 h-10 rounded-full mr-2 border ${colors.border}`}
									/>
									<span>{member.name}</span>
								</td>
								<td className={`py-2 px-4 ${colors.foreground}`}>
									{member.email}
								</td>
								<td className={`py-2 px-4 ${colors.foreground}`}>
									{member.role}
								</td>
								<td className={`py-2 px-4 ${colors.foreground}`}>
									<span
										className={`px-2 py-1 rounded text-xs border ${
											member.status === "Active"
												? theme === "dark"
													? "bg-green-900/30 text-green-400 border-green-800/50"
													: "bg-green-100 text-green-800"
												: scheme.chip
										}`}
									>
										{member.status}
									</span>
								</td>
								<td className="py-1 px-4 flex items-center gap-2">
									<Edit
										size={16}
										className={`cursor-pointer ${colors.textSecondary} transition-colors ${colors.hoverSecondary}`}
									/>
									<X
										size={16}
										className={`cursor-pointer ${colors.textSecondary} transition-colors ${colors.hoverSecondary}`}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);

	const renderSecuritySettings = () => (
		<div className="space-y-6">
			<div className={`${colors.card} border ${colors.border} rounded-lg p-6`}>
				<h2 className={`text-xl font-semibold ${colors.foreground} mb-6`}>
					Active Sessions
				</h2>
				<div className="space-y-4">
					<div
						className={`flex justify-between items-center py-3 border-b ${colors.border}`}
					>
						<div>
							<p className={`text-sm font-medium ${colors.textSecondary}`}>
								Chrome on MacOS
							</p>
							<p className={`text-xs ${colors.textMuted}`}>
								Current Session • New York, USA
							</p>
						</div>
						<button
							className={`text-red-600 ${
								theme === "dark" ? "hover:text-red-400" : "hover:text-red-800"
							} text-xs hover:underline transition-colors`}
						>
							Revoke
						</button>
					</div>
					<div
						className={`flex justify-between items-center py-3 border-b ${colors.border}`}
					>
						<div>
							<p className={`text-sm font-medium ${colors.textSecondary}`}>
								Safari on iPhone
							</p>
							<p className={`text-xs ${colors.textMuted}`}>
								2 hours ago • New York, USA
							</p>
						</div>
						<button
							className={`text-red-600 ${
								theme === "dark" ? "hover:text-red-400" : "hover:text-red-800"
							} text-xs hover:underline transition-colors`}
						>
							Revoke
						</button>
					</div>
				</div>
			</div>

			<div className={`${colors.card} border ${colors.border} rounded-lg p-6`}>
				<h2 className={`text-xl font-semibold ${colors.foreground} mb-6`}>
					Login History
				</h2>
				<div className="space-y-4">
					<div
						className={`flex justify-between items-center py-3 border-b ${colors.border}`}
					>
						<div>
							<p className={`text-sm font-medium ${colors.textSecondary}`}>
								Successful Login
							</p>
							<p className={`text-xs ${colors.textMuted}`}>
								Today at 10:30 AM • Chrome on MacOS
							</p>
						</div>
						<span
							className={`${
								theme === "dark" ? "text-green-400" : "text-green-600"
							} text-xs`}
						>
							✓
						</span>
					</div>
					<div
						className={`flex justify-between items-center py-3 border-b ${colors.border}`}
					>
						<div>
							<p className={`text-sm font-medium ${colors.textSecondary}`}>
								Successful Login
							</p>
							<p className={`text-xs ${colors.textMuted}`}>
								Yesterday at 3:45 PM • Safari on iPhone
							</p>
						</div>
						<span
							className={`${
								theme === "dark" ? "text-green-400" : "text-green-600"
							} text-xs`}
						>
							✓
						</span>
					</div>
				</div>
			</div>
		</div>
	);

	return (
		<div
			className={`p-6 overflow-y-scroll max-h-screen hidescrollbar ${colors.background} transition-colors`}
		>
			<div className="flex justify-between items-center flex-wrap my-4">
				<p className={`text-xl font-semibold ${colors.foreground}`}>Settings</p>
			</div>

			<div className="flex flex-col md:flex-row gap-6">
				<div className="md:w-1/4 w-full">
					<div
						className={`${colors.card} border ${colors.border} rounded-lg p-4`}
					>
						<nav className="space-y-2">
							{tabs.map((tab) => {
								const Icon = tab.icon;
								return (
									<button
										key={tab.id}
										onClick={() => setActiveTab(tab.id)}
										className={`w-full flex items-center gap-3 px-4 py-3 rounded transition-all duration-100 ease-in ${
											activeTab === tab.id
												? `${scheme.primary} ${scheme.primaryForeground} ${scheme.primaryHover}`
												: `${colors.foreground} ${colors.hoverSecondary}`
										}`}
									>
										<Icon size={18} />
										<span className="text-sm">{tab.label}</span>
									</button>
								);
							})}
						</nav>
					</div>
				</div>

				<div className="md:w-3/4 w-full">
					{activeTab === "profile" && renderProfileSettings()}
					{activeTab === "account" && renderAccountSettings()}
					{activeTab === "notifications" && renderNotificationSettings()}
					{activeTab === "preferences" && renderPreferenceSettings()}
					{activeTab === "billing" && renderBillingSettings()}
					{activeTab === "team" && renderTeamSettings()}
					{activeTab === "security" && renderSecuritySettings()}
				</div>
			</div>

			{isModalOpen && (
				<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
					<div
						className={`${colors.card} p-6 rounded ${colors.shadow} max-w-md w-full border ${colors.border}`}
					>
						<div className="flex justify-between items-center mb-4">
							<h2 className={`text-lg font-semibold ${colors.foreground}`}>
								Add Team Member
							</h2>
							<button
								onClick={() => setIsModalOpen(false)}
								className={`${colors.hoverSecondary} ${colors.foreground} p-1 rounded transition-colors`}
							>
								<X size={16} />
							</button>
						</div>
						<div className="space-y-4">
							<input
								type="text"
								placeholder="Name"
								className={`w-full border ${colors.border} ${
									colors.input
								} rounded px-3 py-2 outline-none ${colors.background} ${
									colors.foreground
								} placeholder:${colors.mutedForeground} ${getFocusRingClass(
									colorScheme
								)}`}
							/>
							<input
								type="email"
								placeholder="Email"
								className={`w-full border ${colors.border} ${
									colors.input
								} rounded px-3 py-2 outline-none ${colors.background} ${
									colors.foreground
								} placeholder:${colors.mutedForeground} ${getFocusRingClass(
									colorScheme
								)}`}
							/>
							<select
								className={`w-full border ${colors.border} ${
									colors.input
								} rounded px-3 py-2 outline-none ${colors.background} ${
									colors.foreground
								} ${getFocusRingClass(colorScheme)}`}
							>
								<option value="">Select Role</option>
								<option value="Admin">Admin</option>
								<option value="Manager">Manager</option>
								<option value="User">User</option>
							</select>
							<div className="flex gap-2">
								<button
									onClick={() => {
										toast.success("Team member added successfully!");
										setIsModalOpen(false);
									}}
									className={`${scheme.primary} ${scheme.primaryHover} ${scheme.primaryForeground} text-xs px-4 py-2 rounded transition-all duration-100 ease-in hover:px-6`}
								>
									Add Member
								</button>
								<button
									onClick={() => setIsModalOpen(false)}
									className={`${colors.secondary} ${colors.hoverSecondary} ${colors.secondaryForeground} text-xs px-4 py-2 rounded transition-colors`}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Settings;
