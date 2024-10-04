import { ValidateFunctions } from "./types";

const defaultErrorMsg: string[] = [
	"Surname cannot be empty",
	"Surname cannot contain numbers",
	"Surname cannot contain special characters",
	"This surname is not valid",
	"Surname too big, try again",
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
 * @param surname
 * @param minLength
 * @param maxLength
 * @param errorMsg
 * @default minLength number: default: 1
 * @default maxLength number: default: 25
 * @example validateSurname('Jackson', { minLength: 3, maxLength: 25 });
 * @info minLength cannot be greater than maxLength
 * @description This function returns 6 errors in the following order,
 *
 * default:
 *
 * [
  'Surname cannot be empty',
  'Surname cannot contain numbers',
  'Surname cannot contain special characters',
  'This surname is not valid',
  'Surname too big, try again',
];
 * @returns An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
function validateSurname(
	surname: string,
	{ minLength, maxLength, errorMsg }: OptionsParams = defaultOptionsParams,
): ValidateFunctions {
	if (typeof surname !== "string") {
		throw new TypeError("The input should be a string.");
	}

	validateErrorMsg(errorMsg);

	const minNameLength: number = minLength ?? 1;
	const maxNameLength: number = maxLength ?? 25;

	validateLengths(minNameLength, maxNameLength);

	if (!surname) {
		return createErrorResponse(0, errorMsg);
	}

	if (surname.length > maxNameLength) {
		return createErrorResponse(4, errorMsg);
	}
	if (surname.length < minNameLength) {
		return createErrorResponse(3, errorMsg);
	}

	if (RegExp(/\d/).exec(surname)) {
		return createErrorResponse(1, errorMsg);
	}

	if (RegExp(/[^\w\s]/).exec(surname)) {
		return createErrorResponse(2, errorMsg);
	}

	if (/(\w)\1\1/.test(surname)) {
		return createErrorResponse(3, errorMsg);
	}

	return {
		isValid: true,
		errorMsg: null,
	};
}

function validateErrorMsg(errorMsg: (string | null)[] | undefined): void {
	if (errorMsg) {
		if (!Array.isArray(errorMsg)) {
			throw new Error("errorMsg must be an Array or null");
		}
		for (const element of errorMsg) {
			if (element != null && typeof element !== "string") {
				throw new TypeError(
					"All values within the array must be strings or null/undefined.",
				);
			}
		}
	}
}

function validateLengths(minNameLength: number, maxNameLength: number): void {
	if (
		maxNameLength < 1 ||
		minNameLength < 1 ||
		typeof minNameLength !== "number" ||
		typeof maxNameLength !== "number"
	) {
		throw new Error(
			"maxLength or minLength must be a number and cannot be less than 1",
		);
	}

	if (minNameLength > maxNameLength) {
		throw new Error("minLength cannot be greater than maxLength");
	}
}

function createErrorResponse(
	index: number,
	errorMsg: (string | null)[] | undefined,
): ValidateFunctions {
	return {
		isValid: false,
		errorMsg: getErrorMessage(index, errorMsg),
	};
}

function getErrorMessage(
	index: number,
	errorMsg: (string | null)[] | undefined,
): string {
	const errorMessage: string | null = errorMsg ? errorMsg[index] : null;
	return errorMessage ?? defaultErrorMsg[index];
}
export default validateSurname;
