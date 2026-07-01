import { format, isValid, parse } from "date-fns";

export const DATE_STORAGE_FORMAT = "yyyy-MM-dd";

export function parseDateValue(value) {
	if (!value) return undefined;
	if (value instanceof Date) {
		return isValid(value) ? value : undefined;
	}
	const iso = parse(String(value), DATE_STORAGE_FORMAT, new Date());
	return isValid(iso) ? iso : undefined;
}

export function toDateString(value) {
	if (!value) return "";
	if (value instanceof Date) {
		return isValid(value) ? format(value, DATE_STORAGE_FORMAT) : "";
	}
	const date = parseDateValue(value);
	return date ? format(date, DATE_STORAGE_FORMAT) : "";
}
