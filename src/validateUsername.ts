import { ValidateFunctions } from "./types";

const regexHasSpaces: RegExp = /\s/;
const regexOnlyNumbers: RegExp = /^\d+$/;
const regexStartsWithNumber: RegExp = /^\d/;
const defaultErrorMsg: string[] = [
	"Username cannot be empty",
	"Username too short",
	"This username is too long",
	"Username cannot contain spaces",
	"Cannot start with a number",
	"Cannot contain only numbers",
];

interface OptionsParams {
	minLength?: number;
	maxLength?: number;
	errorMsg?: (string | null)[];
}

const defaultOptionsParams: OptionsParams = {
	minLength: undefined,
	maxLength: undefined,
	errorMsg: defaultErrorMsg,
};

/**
 * @param username
 * @param minLength optional
 * @param maxLength optional
 * @param errorMsg optional
 * @default minLength number: 1
 * @default maxLength number: Infinity
 * @example validateUsername('User999', { minLength: 8, maxLength: 20 });
 * @example validateUsername('User999', { minLength: 8, maxLength: 20, errorMsg: ['My own errorsMsg'] });
 * @info minLength cannot be greater than maxLength
 * @description This function returns 7 errors in the following order,
 *
 * If you want to use a default parameter, use null.
 *
 * Default:
 *   [
  'Username cannot be empty',
  'Username must be between ${maxLenthUsername} and ${maxLenthUsername} characters',
  'Username must be between ${maxLenthUsername} and ${maxLenthUsername} characters',
  'Username cannot contain spaces',
  'Cannot start with a number',
  'Cannot contain only numbers',
];
 *
 * Create a list of errors separated by commas in strings
 * @returns An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
function validateUsername(
	username: string,
	{ minLength, maxLength, errorMsg }: OptionsParams = defaultOptionsParams,
): ValidateFunctions {
	if (typeof username !== "string") {
		throw new TypeError("The input should be a string.");
	}

	validateErrorMsg(errorMsg);

	const minLenthUsername: number = minLength ?? 1;
	const maxLenthUsername: number = maxLength ?? Infinity;

	if (!username) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(
				0,
				errorMsg,
				minLenthUsername,
				maxLenthUsername,
			),
		};
	}

	validateLengthParams(minLenthUsername, maxLenthUsername);

	if (regexHasSpaces.test(username)) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(
				3,
				errorMsg,
				minLenthUsername,
				maxLenthUsername,
			),
		};
	}
	if (regexOnlyNumbers.test(username)) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(
				5,
				errorMsg,
				minLenthUsername,
				maxLenthUsername,
			),
		};
	}
	if (regexStartsWithNumber.test(username)) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(
				4,
				errorMsg,
				minLenthUsername,
				maxLenthUsername,
			),
		};
	}
	if (username.length < minLenthUsername) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(
				1,
				errorMsg,
				minLenthUsername,
				maxLenthUsername,
			),
		};
	}
	if (username.length > maxLenthUsername) {
		return {
			isValid: false,
			errorMsg: getErrorMessage(
				2,
				errorMsg,
				minLenthUsername,
				maxLenthUsername,
			),
		};
	}

	if (containsMultipleSpecialChars(username)) {
		return {
			isValid: false,
			errorMsg: "Username cannot contain multiple special characters",
		};
	}

	return {
		isValid: true,
		errorMsg: null,
	};
}

function validateErrorMsg(errorMsg: (string | null)[] | undefined): void {
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
}

function validateLengthParams(
	minLenthUsername: number,
	maxLenthUsername: number,
): void {
	if (
		typeof minLenthUsername !== "number" ||
		typeof maxLenthUsername !== "number"
	) {
		throw new Error("maxLength or minLength must be a number");
	}
	if (minLenthUsername > maxLenthUsername) {
		throw new Error("Minimum cannot be greater than maximum");
	}
	if (minLenthUsername < 1 || maxLenthUsername < 1) {
		throw new Error("Size parameters cannot be less than one");
	}
}

function getErrorMessage(
	index: number,
	errorMsg: (string | null)[] | undefined,
	minLenthUsername: number,
	maxLenthUsername: number,
): string {
	const errorMessage: string | null = errorMsg
		? errorMsg[index]
		: defaultErrorMsg[index];
	if (
		errorMessage === "Username too short" ||
		errorMessage === "This username is too long"
	) {
		return `Username must be between ${minLenthUsername.toString()} and ${maxLenthUsername.toString()} characters`;
	}
	return errorMessage ?? defaultErrorMsg[index];
}

function containsMultipleSpecialChars(username: string): boolean {
	const specialChars: string[] = [
		"!",
		"@",
		"#",
		"$",
		"%",
		"^",
		"&",
		"*",
		"(",
		")",
		"-",
		"_",
		"=",
		"+",
		"[",
		"]",
		"{",
		"}",
		"|",
		"\\",
		";",
		":",
		"'",
		'"',
		",",
		".",
		"<",
		">",
		"/",
		"?",
	];

	const charCount: { [key: string]: number } = {};

	for (const char of username) {
		if (specialChars.includes(char)) {
			charCount[char] = (charCount[char] || 0) + 1;
			if (charCount[char] > 2) {
				return true;
			}
		}
	}
	return false;
}
export default validateUsername;
