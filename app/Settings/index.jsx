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
	Database,
} from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useTheme } from "../../utils/useTheme";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FormModal, FormField } from "../../lib/ui/modal";
import ProSetupPanel from "./ProSetupPanel";
import FormSelect from "../../lib/ui/FormSelect";
import {
	Table,
	TableHeader,
	TableBody,
	TableFooter,
	TableHead,
	TableRow,
	TableCell,
	TableCaption,
} from "@/components/ui/table";

const textareaClassName = cn(
	"flex min-h-[80px] w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
);

const Settings = () => {
	const { colors } = useTheme();

	const [activeTab, setActiveTab] = useState("database");
	const [isEditMode, setIsEditMode] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [memberRole, setMemberRole] = useState("");

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
		{ id: "database", label: "Database (PRO)", icon: Database },
		{ id: "profile", label: "Profile", icon: User },
		{ id: "account", label: "Account", icon: Lock },
		{ id: "notifications", label: "Notifications", icon: Bell },
		{ id: "preferences", label: "Preferences", icon: Globe },
		{ id: "billing", label: "Billing", icon: CreditCard },
		{ id: "team", label: "Team", icon: Users },
		{ id: "security", label: "Security", icon: Shield },
	];

	const renderProfileSettings = () => (
		<Card className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h2 className={`text-xl font-semibold ${colors.foreground}`}>
					Profile Information
				</h2>
				<Button
					size="sm"
					variant={isEditMode ? "outline" : "default"}
					onClick={() => setIsEditMode(!isEditMode)}
				>
					<Edit size={16} />
					{isEditMode ? "Cancel" : "Edit"}
				</Button>
			</div>
			<div className="flex items-center gap-6 mb-6">
				<img
					src={profileSettings.avatar}
					alt={profileSettings.name}
					className={`w-24 h-24 rounded-full border-2 ${colors.border}`}
				/>
				<div>
					<Button variant="outline" size="sm">
						Change Avatar
					</Button>
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Full Name
					</label>
					<Input
						type="text"
						value={profileSettings.name}
						onChange={(e) =>
							handleInputChange("profile", "name", e.target.value)
						}
						disabled={!isEditMode}
					/>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Email
					</label>
					<Input
						type="email"
						value={profileSettings.email}
						onChange={(e) =>
							handleInputChange("profile", "email", e.target.value)
						}
						disabled={!isEditMode}
					/>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Phone
					</label>
					<Input
						type="tel"
						value={profileSettings.phone}
						onChange={(e) =>
							handleInputChange("profile", "phone", e.target.value)
						}
						disabled={!isEditMode}
					/>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Company
					</label>
					<Input
						type="text"
						value={profileSettings.company}
						onChange={(e) =>
							handleInputChange("profile", "company", e.target.value)
						}
						disabled={!isEditMode}
					/>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Role
					</label>
					<Input
						type="text"
						value={profileSettings.role}
						onChange={(e) =>
							handleInputChange("profile", "role", e.target.value)
						}
						disabled={!isEditMode}
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
						className={textareaClassName}
					/>
				</div>
			</div>
			{isEditMode && (
				<Button
					size="sm"
					className="mt-4"
					onClick={() => handleSave("profile")}
				>
					<Save size={16} />
					Save Changes
				</Button>
			)}
		</Card>
	);

	const renderAccountSettings = () => (
		<div className="space-y-6">
			<Card className="p-6">
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
						<Input
							type="password"
							value={accountSettings.currentPassword}
							onChange={(e) =>
								handleInputChange("account", "currentPassword", e.target.value)
							}
							placeholder="Enter current password"
						/>
					</div>
					<div>
						<label
							className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
						>
							New Password
						</label>
						<Input
							type="password"
							value={accountSettings.newPassword}
							onChange={(e) =>
								handleInputChange("account", "newPassword", e.target.value)
							}
							placeholder="Enter new password"
						/>
					</div>
					<div>
						<label
							className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
						>
							Confirm New Password
						</label>
						<Input
							type="password"
							value={accountSettings.confirmPassword}
							onChange={(e) =>
								handleInputChange("account", "confirmPassword", e.target.value)
							}
							placeholder="Confirm new password"
						/>
					</div>
					<Button size="sm" onClick={handlePasswordChange}>
						Update Password
					</Button>
				</div>
			</Card>

			<Card className="p-6">
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
					<Button
						size="sm"
						variant={accountSettings.twoFactorEnabled ? "default" : "outline"}
						className={cn(
							accountSettings.twoFactorEnabled &&
								"bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/50"
						)}
						onClick={handleToggle2FA}
					>
						{accountSettings.twoFactorEnabled ? "Enabled" : "Disabled"}
					</Button>
				</div>
			</Card>

			<Card className="p-6">
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
							<Input
								type="text"
								value={accountSettings.apiKey}
								readOnly
								className="font-mono text-sm"
							/>
							<Button
								size="sm"
								className="whitespace-nowrap shrink-0"
								onClick={handleRegenerateAPIKey}
							>
								<Key size={16} />
								Regenerate
							</Button>
						</div>
					</div>
				</div>
			</Card>
		</div>
	);

	const renderNotificationSettings = () => (
		<Card className="p-6">
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
						<Button
							size="sm"
							variant={value ? "default" : "outline"}
							className={cn(
								value &&
									"bg-green-100 text-green-800 hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/50"
							)}
							onClick={() => handleInputChange("notifications", key, !value)}
						>
							{value ? "On" : "Off"}
						</Button>
					</div>
				))}
				<Button
					size="sm"
					className="mt-4"
					onClick={() => handleSave("notifications")}
				>
					<Save size={16} />
					Save Preferences
				</Button>
			</div>
		</Card>
	);

	const renderPreferenceSettings = () => (
		<Card className="p-6">
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
					<FormSelect
						value={preferenceSettings.theme}
						onChange={(e) =>
							handleInputChange("preferences", "theme", e.target.value)
						}
						options={[
							{ value: "light", label: "Light" },
							{ value: "dark", label: "Dark" },
							{ value: "auto", label: "Auto" },
						]}
					/>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Language
					</label>
					<FormSelect
						value={preferenceSettings.language}
						onChange={(e) =>
							handleInputChange("preferences", "language", e.target.value)
						}
						options={[
							{ value: "en", label: "English" },
							{ value: "es", label: "Spanish" },
							{ value: "fr", label: "French" },
							{ value: "de", label: "German" },
						]}
					/>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Timezone
					</label>
					<FormSelect
						value={preferenceSettings.timezone}
						onChange={(e) =>
							handleInputChange("preferences", "timezone", e.target.value)
						}
						options={[
							{ value: "America/New_York", label: "Eastern Time (ET)" },
							{ value: "America/Chicago", label: "Central Time (CT)" },
							{ value: "America/Denver", label: "Mountain Time (MT)" },
							{ value: "America/Los_Angeles", label: "Pacific Time (PT)" },
						]}
					/>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Date Format
					</label>
					<FormSelect
						value={preferenceSettings.dateFormat}
						onChange={(e) =>
							handleInputChange("preferences", "dateFormat", e.target.value)
						}
						options={[
							{ value: "MM/DD/YYYY", label: "MM/DD/YYYY" },
							{ value: "DD/MM/YYYY", label: "DD/MM/YYYY" },
							{ value: "YYYY-MM-DD", label: "YYYY-MM-DD" },
						]}
					/>
				</div>
				<div>
					<label
						className={`block text-sm font-medium ${colors.textSecondary} mb-2`}
					>
						Currency
					</label>
					<FormSelect
						value={preferenceSettings.currency}
						onChange={(e) =>
							handleInputChange("preferences", "currency", e.target.value)
						}
						options={[
							{ value: "USD", label: "USD ($)" },
							{ value: "EUR", label: "EUR (€)" },
							{ value: "GBP", label: "GBP (£)" },
							{ value: "JPY", label: "JPY (¥)" },
						]}
					/>
				</div>
			</div>
			<Button
				size="sm"
				className="mt-4"
				onClick={() => handleSave("preferences")}
			>
				<Save size={16} />
				Save Preferences
			</Button>
		</Card>
	);

	const renderBillingSettings = () => (
		<div className="space-y-6">
			<Card className="p-6">
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
						<Badge
							variant="secondary"
							className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/50"
						>
							{billingSettings.status}
						</Badge>
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
					<Button size="sm">Upgrade Plan</Button>
					<Button size="sm" variant="outline">
						Manage Payment
					</Button>
				</div>
			</Card>
		</div>
	);

	const renderTeamSettings = () => (
		<Card className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h2 className={`text-xl font-semibold ${colors.foreground}`}>
					Team Members
				</h2>
				<Button size="sm" onClick={() => setIsModalOpen(true)}>
					Add Member
				</Button>
			</div>
			<div className="mb-4">
				<div className="relative w-full md:w-auto">
					<Search
						size={18}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
					/>
					<Input
						type="text"
						placeholder="Search team members..."
						className="pl-9"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>
			<Table className={`min-w-full ${colors.card} border ${colors.border}`}>
					<TableHeader className={colors.hover}>
						<TableRow>
							<TableHead
								className={`py-2 px-4 border-b ${colors.border} text-left ${colors.mutedForeground}`}
							>
								User Info
							</TableHead>
							<TableHead
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
							</TableHead>
							<TableHead
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
							</TableHead>
							<TableHead
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
							</TableHead>
							<TableHead
								className={`py-2 px-4 border-b ${colors.border} text-left ${colors.mutedForeground}`}
							>
								Actions
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredTeamMembers.map((member) => (
							<TableRow key={member.id} className={colors.hover}>
								<TableCell
									className={`py-2 px-4 flex items-center gap-2 ${colors.foreground}`}
								>
									<img
										src={member.image}
										alt={member.name}
										className={`w-10 h-10 rounded-full mr-2 border ${colors.border}`}
									/>
									<span>{member.name}</span>
								</TableCell>
								<TableCell className={`py-2 px-4 ${colors.foreground}`}>
									{member.email}
								</TableCell>
								<TableCell className={`py-2 px-4 ${colors.foreground}`}>
									{member.role}
								</TableCell>
								<TableCell className={`py-2 px-4 ${colors.foreground}`}>
									<Badge
										variant={
											member.status === "Active" ? "secondary" : "outline"
										}
										className={cn(
											member.status === "Active" &&
												"bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800/50"
										)}
									>
										{member.status}
									</Badge>
								</TableCell>
								<TableCell className="py-1 px-4 flex items-center gap-2">
									<Button variant="ghost" size="icon" title="Edit">
										<Edit size={16} />
									</Button>
									<Button variant="ghost" size="icon" title="Delete">
										<X size={16} />
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
		</Card>
	);

	const renderSecuritySettings = () => (
		<div className="space-y-6">
			<Card className="p-6">
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
						<Button
							variant="ghost"
							size="sm"
							className="text-destructive hover:text-destructive"
						>
							Revoke
						</Button>
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
						<Button
							variant="ghost"
							size="sm"
							className="text-destructive hover:text-destructive"
						>
							Revoke
						</Button>
					</div>
				</div>
			</Card>

			<Card className="p-6">
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
						<span className="text-green-600 dark:text-green-400 text-xs">
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
						<span className="text-green-600 dark:text-green-400 text-xs">
							✓
						</span>
					</div>
				</div>
			</Card>
		</div>
	);

	return (
		<div
			className={`p-6 overflow-y-scroll max-h-screen hidescrollbar ${colors.card} transition-all duration-100 ease-in`}
		>
			<div className="flex justify-between items-center flex-wrap my-4">
				<p className={`text-xl font-semibold ${colors.foreground}`}>Settings</p>
			</div>

			<div className="flex flex-col md:flex-row gap-6">
				<div className="md:w-60 w-full">
					<Card className="p-4">
						<nav className="space-y-1">
							{tabs.map((tab) => {
								const Icon = tab.icon;
								return (
									<Button
										key={tab.id}
										variant={activeTab === tab.id ? "default" : "ghost"}
										className="w-full justify-start gap-3"
										onClick={() => setActiveTab(tab.id)}
									>
										<Icon size={18} />
										<span className="text-sm">{tab.label}</span>
									</Button>
								);
							})}
						</nav>
					</Card>
				</div>

				<div className="md:w-3/4 w-full">
					{activeTab === "database" && <ProSetupPanel />}
					{activeTab === "profile" && renderProfileSettings()}
					{activeTab === "account" && renderAccountSettings()}
					{activeTab === "notifications" && renderNotificationSettings()}
					{activeTab === "preferences" && renderPreferenceSettings()}
					{activeTab === "billing" && renderBillingSettings()}
					{activeTab === "team" && renderTeamSettings()}
					{activeTab === "security" && renderSecuritySettings()}
				</div>
			</div>

			<FormModal
				open={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				onSubmit={() => {
					toast.success("Team member added successfully!");
					setIsModalOpen(false);
				}}
				title="Add Team Member"
				saveLabel="Add Member"
				maxWidth="max-w-md"
			>
				<FormField label="Name" htmlFor="member-name" required>
					<Input id="member-name" type="text" placeholder="Name" />
				</FormField>
				<FormField label="Email" htmlFor="member-email" required>
					<Input id="member-email" type="email" placeholder="Email" />
				</FormField>
				<FormField label="Role" htmlFor="member-role" required>
					<FormSelect
						id="member-role"
						value={memberRole}
						onChange={(e) => setMemberRole(e.target.value)}
						placeholder="Select Role"
						options={["Admin", "Manager", "User"]}
					/>
				</FormField>
			</FormModal>
		</div>
	);
};

export default Settings;
