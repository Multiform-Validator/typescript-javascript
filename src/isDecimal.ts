/**
 * @example isDecimal('123.45'); // true
 * @example isDecimal('-123.45'); // true
 * @example isDecimal('0.123'); // true
 * @example isDecimal('1,234.56'); // true
 * @example isDecimal('1.234,56'); // false (invalid format)
 * @example isDecimal('abc'); // false (not a valid number)
 * @example isDecimal('12a.34'); // false (not a valid number)
 * @example isDecimal('12.34.56'); // false (not a valid number)
 * @description Values have to be passed as a string
 * @returns true or false
 */
function isDecimal(value: string | number): boolean {
	let getValued: string | number = value;
	validateInput(getValued);

	if (typeof getValued === "number") {
		if (Number.isInteger(getValued)) {
			return false;
		}
		getValued = getValued.toString();
	}

	if (getValued.trim().length === 0) {
		throw new Error("Input value must not be an empty string.");
	}

	if (isInteger(getValued)) {
		return false;
	}

	if (!isValidDecimal(getValued)) {
		return false;
	}

	if (hasMultipleSeparators(getValued)) {
		return false;
	}

	if (hasInvalidNegativeSign(getValued)) {
		return false;
	}

	return true;
}

function validateInput(value: string | number): void {
	if (typeof value === "number" && Number.isNaN(value)) {
		throw new TypeError("Input value must not be NaN.");
	}

	if (typeof value === "number" && !isFinite(value)) {
		throw new TypeError("Input value must not be Infinity, -Infinity or NaN.");
	}

	if (typeof value !== "string" && typeof value !== "number") {
		throw new TypeError("Input value must be a string or a number.");
	}
}

function isInteger(value: string): boolean {
	const integerRegex: RegExp = /^\d+$/;
	return integerRegex.test(value);
}

function isValidDecimal(value: string): boolean {
	const decimalRegex: RegExp = /^[-+]?(?:\d+(?:[,.]\d*)?|\d*[,.]\d+)$/;
	return decimalRegex.test(value);
}

function hasMultipleSeparators(value: string): boolean {
	const decimalSeparator: Separators = value.includes(".") ? "." : ",";
	const otherSeparator: Separators = decimalSeparator === "." ? "," : ".";
	return value.includes(decimalSeparator) && value.includes(otherSeparator);
}

function hasInvalidNegativeSign(value: string): boolean {
	return value.startsWith("-") && value.lastIndexOf("-") > 0;
}

export default isDecimal;

type Separators = "." | ",";
