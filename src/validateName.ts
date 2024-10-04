import { ValidateFunctions } from "./types";

const defaultErrorMsg: string[] = [
	"Name cannot be empty",
	"Name cannot contain numbers",
	"Name cannot contain special characters",
	"This name is not valid",
	"Name too big, try again",
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
 * @param name
 * @param minLength
 * @param maxLength
 * @param errorMsg
 * @default minLength number: default: 1
 * @default maxLength number: default: 20
 * @example validateName('John', { minLength: 2, maxLength: 20 }); // Returns { isValid: true, errorMsg: null }
 * @info minLength cannot be greater than maxLength
 * @description This function returns 6 errors in the following order,
 *
 * default:
 *
 * [
  'Name cannot be empty',
  'Name cannot contain numbers',
  'Name cannot contain special characters',
  'This name is not valid',
  'Name too big, try again',
];
 * @returns An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
function validateName(
	name: string,
	{ minLength, maxLength, errorMsg }: OptionsParams = defaultOptionsParams,
): ValidateFunctions {
	if (typeof name !== "string") {
		throw new TypeError("The input should be a string.");
	}

	validateErrorMsg(errorMsg);

	const minNameLength: number = minLength ?? 1;
	const maxNameLength: number = maxLength ?? 20;

	validateLengths(minNameLength, maxNameLength);

	const getErrorMessage: (index: number) => string =
		createErrorMessageGetter(errorMsg);

	if (!name) {
		return createInvalidResult(getErrorMessage(0));
	}
	if (name.length > maxNameLength) {
		return createInvalidResult(getErrorMessage(4));
	}
	if (name.length < minNameLength) {
		return createInvalidResult(getErrorMessage(3));
	}
	if (RegExp(/\d/).exec(name)) {
		return createInvalidResult(getErrorMessage(1));
	}
	if (RegExp(/[^\w\s]/).exec(name)) {
		return createInvalidResult(getErrorMessage(2));
	}
	if (/(\w)\1\1/.test(name)) {
		return createInvalidResult(getErrorMessage(3));
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

function validateLengths(minLength: number, maxLength: number): void {
	if (
		maxLength < 1 ||
		minLength < 1 ||
		typeof minLength !== "number" ||
		typeof maxLength !== "number"
	) {
		throw new Error(
			"maxLength or minLength must be a number and cannot be less than 1",
		);
	}

	if (minLength > maxLength) {
		throw new Error("minLength cannot be greater than maxLength");
	}
}

function createErrorMessageGetter(errorMsg: (string | null)[] | undefined) {
	return function getErrorMessage(index: number): string {
		const errorMessage: string | null = errorMsg ? errorMsg[index] : null;
		return errorMessage ?? defaultErrorMsg[index];
	};
}

function createInvalidResult(errorMsg: string): ValidateFunctions {
	return {
		isValid: false,
		errorMsg,
	};
}

export default validateName;
