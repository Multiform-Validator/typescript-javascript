export type PasswordStrengthType =
	| "Very weak"
	| "Weak"
	| "Regular"
	| "Strong"
	| "Very strong"
	| "Not classified";

export type PasswordStrengthFunction = (
	password: string,
	passwordLength: number,
) => boolean;

export interface PasswordStrengthTesterOptions {
	isVeryWeak: PasswordStrengthFunction;
	isWeak: PasswordStrengthFunction;
	isRegular: PasswordStrengthFunction;
	isStrong: PasswordStrengthFunction;
	isVeryStrong: PasswordStrengthFunction;
}

/**
 * @param password - The password to test
 * @param Options - An object containing functions to test the password strength
 * @param Options.isVeryWeak - A function to test if the password is very weak
 * @param Options.isWeak - A function to test if the password is weak
 * @param Options.isRegular - A function to test if the password is regular
 * @param Options.isStrong - A function to test if the password is strong
 * @param Options.isVeryStrong - A function to test if the password is very strong
 * @throws {TypeError} - If the input is not a string
 *
 * @example
 * const options = {
 * 	isVeryWeak: (password, passwordLength) => passwordLength < 6,
 * 	isWeak: (password, passwordLength) => passwordLength < 8,
 * 	isRegular: (password, passwordLength) => passwordLength < 10,
 * 	isStrong: (password, passwordLength) => passwordLength < 12,
 * 	isVeryStrong: (password, passwordLength) => passwordLength >= 12,
 * }
 *
 * passwordStrengthTester("12345", options); // Very weak
 * passwordStrengthTester("1234567", options); // Weak
 * @returns {string}
 */
function passwordStrengthTester(
	password: string,
	{
		isVeryWeak,
		isWeak,
		isRegular,
		isStrong,
		isVeryStrong,
	}: PasswordStrengthTesterOptions,
): string {
	if (typeof password !== "string") {
		throw new TypeError("The input should be a string.");
	}
	const passwordLength: number = password.length;
	let strengthType: PasswordStrengthType;

	switch (true) {
		case isVeryWeak(password, passwordLength):
			strengthType = "Very weak";
			break;

		case isWeak(password, passwordLength):
			strengthType = "Weak";
			break;

		case isRegular(password, passwordLength):
			strengthType = "Regular";
			break;

		case isStrong(password, passwordLength):
			strengthType = "Strong";
			break;

		case isVeryStrong(password, passwordLength):
			strengthType = "Very strong";
			break;

		default:
			strengthType = "Not classified";
			break;
	}

	return strengthType;
}

export default passwordStrengthTester;
