import { format, isValid, parse } from "date-fns";

export const DATE_STORAGE_FORMAT = "yyyy-MM-dd";
export const DATE_DISPLAY_FORMAT = "dd/MM/yyyy";

export function parseDateValue(value) {
	if (!value) return undefined;
	if (value instanceof Date) {
		return isValid(value) ? value : undefined;
	}
	const iso = parse(String(value), DATE_STORAGE_FORMAT, new Date());
	if (isValid(iso)) return iso;
	const display = parse(String(value), DATE_DISPLAY_FORMAT, new Date());
	return isValid(display) ? display : undefined;
}

export function toDateString(value) {
	const date = parseDateValue(value);
	return date ? format(date, DATE_STORAGE_FORMAT) : "";
}

export function formatDateDisplay(value) {
	const date = parseDateValue(value);
	return date ? format(date, DATE_DISPLAY_FORMAT) : "";
}
