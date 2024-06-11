// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const generateValidationErrorMessage = (details: any): string => {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	return details.map((detail: any) => detail.message).join(", ");
};
