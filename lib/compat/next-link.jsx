import React from "react";
import { Link as TanLink } from "@tanstack/react-router";

const MOTION_PROPS = new Set([
	"layout",
	"whileTap",
	"whileHover",
	"initial",
	"animate",
	"transition",
	"exit",
	"layoutId",
]);

/**
 * Drop-in replacement for next/link (Pages Router).
 * Supports legacy passHref + <a> child pattern used across the template.
 */
export default function Link({ href, passHref, children, ...rest }) {
	const to = typeof href === "object" ? href.pathname || "/" : href;

	if (passHref && React.isValidElement(children)) {
		const child = React.Children.only(children);
		const anchorProps = {};

		for (const [key, value] of Object.entries(child.props)) {
			if (key === "children") continue;
			if (MOTION_PROPS.has(key)) continue;
			anchorProps[key] = value;
		}

		return (
			<TanLink to={to} {...rest} {...anchorProps}>
				{child.props.children}
			</TanLink>
		);
	}

	return (
		<TanLink to={to} {...rest}>
			{children}
		</TanLink>
	);
}
