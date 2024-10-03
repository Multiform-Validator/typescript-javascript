import { ValidateFunctions } from "./types";

const defaultErrorMsg: string[] = [
	"US phone number cannot be empty",
	"Invalid phone number",
];

/**
 * @param phoneNumber
 * @param errorMsg optional
 * @example validateUSPhoneNumber('555-123-4567');
 * @example validateUSPhoneNumber('(555) 123-4567', [null, 'Custom error 2']);
 * @description This function validates phone numbers in the USA. It supports various formats, including "XXX-XXX-XXXX", "(XXX) XXX-XXXX", and "1 (XXX) XXX-XXXX".
 * @default {errorMsg} "['US phone number cannot be empty', 'Invalid phone number']"
 * @returns An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
function validateUSPhoneNumber(
	phoneNumber: string,
	errorMsg: (string | null)[] | null = defaultErrorMsg,
): ValidateFunctions {
	if (typeof phoneNumber !== "string") {
		throw new TypeError("The input should be a string.");
	}
	// Check to see if the passed error messages are valid; otherwise, return an error
	if (errorMsg) {
		if (!Array.isArray(errorMsg))
			throw new Error("errorMsg must be an Array or null");
		for (const element of errorMsg) {
			if (element != null && typeof element !== "string") {
				throw new TypeError(
					"All values within the array must be strings or null/undefined.",
				);
			}
		}
	}
	// Regular expression to validate USA phone numbers
	const usPhoneNumberRegex: RegExp =
		/^(1\s?)?(\(\d{3}\)|\d{3})(\s?|-)\d{3}(\s?|-)\d{4}$/;
	// Internal function to get the error message
	function getErrorMessage(index: number): string {
		const errorMessage: string | null = errorMsg ? errorMsg[index] : null;
		return errorMessage ?? defaultErrorMsg[index];
	}

	if (!phoneNumber) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(0),
		};
	}
	if (!usPhoneNumberRegex.test(phoneNumber)) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(1),
		};
	}
	return {
		isValid: true,
		errorMsg: null,
	};
}

export default validateUSPhoneNumber;
