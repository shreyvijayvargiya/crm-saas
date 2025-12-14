import { redirect } from "next/navigation";

export default function Home() {
	// For MVP, we redirect to login
	// In production, you'd check for a valid session
	redirect("/login");
}
