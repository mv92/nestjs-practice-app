export interface TimestampConfig {
	date: number;
	month: number;
	year: number;
	hours: number;
}

export const getTimestamp = (config?: TimestampConfig): string => {
	const dateObj = new Date();
	const { date, month, year, hours } = config || {};

	if (date) dateObj.setDate(date);
	if (month) dateObj.setMonth(month);
	if (year) dateObj.setFullYear(year);
	if (hours) dateObj.setHours(hours);

	return dateObj.toISOString();
};
