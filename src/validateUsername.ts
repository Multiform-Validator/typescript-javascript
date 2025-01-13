import { ValidateFunctions } from "./types";

const defaultErrorMsg: string[] = [
	"Username cannot be empty",
	"Username too short",
	"This username is too long",
];

interface OptionsParams {
	minLength?: number;
	maxLength?: number;
	cbValidate?: (username: string) => ValidateFunctions;
	errorMsg?: (string | null)[];
}

const defaultOptionsParams: OptionsParams = {
	minLength: undefined,
	maxLength: undefined,
	cbValidate: undefined,
	errorMsg: defaultErrorMsg,
};

/**
 * @param username
 * @param minLength optional
 * @param maxLength optional
 * @param cbValidate optional
 * @param errorMsg optional
 * @default minLength number: 1
 * @default maxLength number: Infinity
 * @default cbValidate function: undefined
 * @info minLength cannot be greater than maxLength
 * @description This function returns 3 errors in the following order,
 *
 * If you want to use a default parameter, use null.
 *
 * Default:
 *  [
  "Username cannot be empty",
  "Username must be between ${maxLenthUsername} and ${maxLenthUsername} characters",
  "Username must be between ${maxLenthUsername} and ${maxLenthUsername} characters",
];
 *
 * Create a list of errors separated by commas in strings
 * @returns An object with "isValid" (boolean) and "errorMsg" (string) properties.
 */
function validateUsername(
	username: string,
	{
		minLength,
		maxLength,
		cbValidate,
		errorMsg,
	}: OptionsParams = defaultOptionsParams,
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

	const cbValidateResult: ValidateFunctions | undefined =
		cbValidate?.(username);

	if (cbValidateResult && !cbValidateResult.isValid) {
		return cbValidateResult;
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

export default validateUsername;
