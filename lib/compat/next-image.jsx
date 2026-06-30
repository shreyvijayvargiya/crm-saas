import React from "react";

/** Drop-in replacement for next/image — uses a standard img element. */
export default function Image({
	src,
	alt = "",
	width,
	height,
	className,
	style,
	priority,
	fill,
	...rest
}) {
	const resolvedSrc = typeof src === "object" && src?.src ? src.src : src;

	const imgStyle = fill
		? {
				...style,
				position: "absolute",
				inset: 0,
				width: "100%",
				height: "100%",
				objectFit: "cover",
			}
		: style;

	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			src={resolvedSrc}
			alt={alt}
			width={width}
			height={height}
			className={className}
			style={imgStyle}
			loading={priority ? "eager" : "lazy"}
			decoding="async"
			{...rest}
		/>
	);
}
