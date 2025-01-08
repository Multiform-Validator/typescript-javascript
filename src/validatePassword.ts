import { ValidateFunctions } from "./types";

const defaultErrorMsg: string[] = [
	"This password is too long",
	"Password too short",
	"Password requires at least one capital letter",
	"Password requires at least one special character",
	"Password requires at least one number",
	"Password requires at least one letter",
];

interface Options {
	requireUppercase?: boolean;
	requireSpecialChar?: boolean;
	requireNumber?: boolean;
	requireString?: boolean;
}

interface OptionsParams {
	minLength?: number;
	maxLength?: number;
	options?: Options;
	errorMsg?: (string | null)[];
}

const defaultOptionsParams: OptionsParams = {
	minLength: undefined,
	maxLength: undefined,
	options: {
		requireUppercase: false,
		requireSpecialChar: false,
		requireNumber: false,
		requireString: false,
	},
	errorMsg: defaultErrorMsg,
};

/**
 * @param password
 * @param minLength optional
 * @param maxLength optional
 * @param options optional
 * @param options.requireUppercase optional
 * @param options.requireSpecialChar optional
 * @param options.requireNumber optional
 * @param options.requireString optional
 * @param errorMsg optional
 * @default minLength number: 1
 * @default maxLength number: Infinity
 * @default {requireUppercase}: false
 * @default {requireSpecialChar}: false -> Examples !@#$%^&*(),.?":{}|<>
 * @default {requireNumber}: false
 * @default {requireString}: false
 * @example validatePassword('MyP@ssw0rd', { minLength: 8, maxLength: 20, options: { requireUppercase: true, requireSpecialChar: true, requireNumber: true, requireString: true } });
 * @info minLength cannot be greater than maxLength
 * @description This function returns 7 errors in the following order,
 *
 * If you want to use a default parameter, use null.
 *
 * Default:
 *   [
  'This password is too long',// Password must be between ${minLenthPassword} and ${maxLenthPassword} characters
  'Password too short',// Password must be between ${minLenthPassword} and ${maxLenthPassword} characters
  'Requires at least one capital letter',
  'Requires at least one special character',
  'Requires at least one number',
  'Requires at least one letter',
];

 *
 * Create a list of errors separated by commas in strings
 * @returns An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
function validatePassword(
	password: string,
	{
		minLength,
		maxLength,
		options,
		errorMsg,
	}: OptionsParams = defaultOptionsParams,
): ValidateFunctions {
	if (typeof password !== "string") {
		throw new TypeError("The input should be a string.");
	}

	validateErrorMsg(errorMsg);

	const minLenthPassword: number = minLength ?? 1;
	const maxLenthPassword: number = maxLength ?? Infinity;

	validateLengthParams(minLenthPassword, maxLenthPassword);

	const errorMessage: string | null = validatePasswordLength(
		password,
		minLenthPassword,
		maxLenthPassword,
		errorMsg,
	);
	if (errorMessage) {
		return {
			isValid: false,
			errorMsg: errorMessage,
		};
	}

	const optionErrorMessage: string | null = validatePasswordOptions(
		password,
		options,
		errorMsg,
	);
	if (optionErrorMessage) {
		return {
			isValid: false,
			errorMsg: optionErrorMessage,
		};
	}

	return {
		isValid: true,
		errorMsg: null,
	};
}

function validateErrorMsg(errorMsg: (string | null)[] | undefined) {
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
	minLenthPassword: number,
	maxLenthPassword: number,
) {
	if (
		typeof minLenthPassword !== "number" ||
		typeof maxLenthPassword !== "number"
	) {
		throw new Error("maxLength and/or minLength must be a number");
	}

	if (minLenthPassword > maxLenthPassword) {
		throw new Error("the minimum size cannot be larger than the maximum");
	}

	if (minLenthPassword < 1 || maxLenthPassword < 1) {
		throw new Error("No size can be smaller than 1");
	}
}

function validatePasswordLength(
	password: string,
	minLenthPassword: number,
	maxLenthPassword: number,
	errorMsg: (string | null)[] | undefined,
): string | null {
	if (password.length > maxLenthPassword) {
		return getErrorMessage(0, minLenthPassword, maxLenthPassword, errorMsg);
	}
	if (password.length < minLenthPassword) {
		return getErrorMessage(1, minLenthPassword, maxLenthPassword, errorMsg);
	}
	return null;
}

function validatePasswordOptions(
	password: string,
	options: Options | undefined,
	errorMsg: (string | null)[] | undefined,
): string | null {
	if (options?.requireUppercase && !/[A-Z]/.test(password)) {
		return getErrorMessage(2, 0, 0, errorMsg);
	}
	if (options?.requireSpecialChar && !/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
		return getErrorMessage(3, 0, 0, errorMsg);
	}
	if (options?.requireNumber && !/\d/.test(password)) {
		return getErrorMessage(4, 0, 0, errorMsg);
	}
	if (options?.requireString && !/[a-zA-Z]/.test(password)) {
		return getErrorMessage(5, 0, 0, errorMsg);
	}
	return null;
}

function getErrorMessage(
	index: number,
	minLenthPassword: number,
	maxLenthPassword: number,
	errorMsg: (string | null)[] | undefined,
): string {
	const errorMessage: string | null = errorMsg
		? errorMsg[index]
		: defaultErrorMsg[index];
	if (
		errorMessage === "This password is too long" ||
		errorMessage === "Password too short"
	) {
		if (maxLenthPassword === Infinity) {
			return `Password must be greater than ${minLenthPassword.toString()} characters`;
		}
		return `Password must be between ${minLenthPassword.toString()} and ${maxLenthPassword.toString()} characters`;
	}
	return errorMessage ?? defaultErrorMsg[index];
}

export default validatePassword;
