export const generateValidationErrorMessage = (details: any): string => {
	return details.map((detail: any) => detail.message).join(", ");
};
