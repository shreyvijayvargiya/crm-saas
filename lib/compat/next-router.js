import {
	useNavigate,
	useRouter as useTanStackRouter,
	useLocation,
	useParams,
} from "@tanstack/react-router";

let globalNavigate = null;

export function bindGlobalNavigate(navigate) {
	globalNavigate = navigate;
}

function navigateTo(url, replace = false) {
	if (globalNavigate) {
		globalNavigate({ to: url, replace });
		return;
	}
	if (typeof window !== "undefined") {
		if (replace) window.location.replace(url);
		else window.location.assign(url);
	}
}

/** Mirrors next/router useRouter() for existing CRM components. */
export function useRouter() {
	const navigate = useNavigate();
	const router = useTanStackRouter();
	const location = useLocation();
	const params = useParams({ strict: false }) ?? {};

	globalNavigate = navigate;

	return {
		pathname: location.pathname,
		asPath: `${location.pathname}${location.searchStr || ""}`,
		query: params,
		push: (url) => navigate({ to: url }),
		replace: (url) => navigate({ to: url, replace: true }),
		back: () => router.history.back(),
	};
}

/** Default export used by app/Home — mirrors next/router singleton. */
const router = {
	push: (url) => navigateTo(url),
	replace: (url) => navigateTo(url, true),
	back: () => {
		if (typeof window !== "undefined") window.history.back();
	},
};

export default router;
