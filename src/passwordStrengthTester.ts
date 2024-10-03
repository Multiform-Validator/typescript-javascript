/**
 * @description Avalia a força de uma senha e retorna o tipo de força da senha.
 *
 * @returns O tipo de força da senha ('veryWeak', 'weak', 'regular', 'strong' ou 'veryStrong').
 *
 * @example
 * passwordStrengthTester('12345'); // Output: 'veryWeak'
 *
 * @example
 * passwordStrengthTester('abcdef'); // Output: 'weak'
 *
 * @example
 * passwordStrengthTester('abc12345'); // Output: 'regular'
 *
 * @example
 * passwordStrengthTester('Abc123awdasd'); // Output: 'strong'
 *
 * @example
 * passwordStrengthTester('SuperSecurePassword123!@'); // Output: 'veryStrong'
 */
function passwordStrengthTester(password: string): string {
	if (typeof password !== "string") {
		throw new TypeError("The input should be a string.");
	}
	const passwordLength: number = password.length;
	let strengthType: string;

	switch (true) {
		case isVeryWeak(password, passwordLength) || commonPassword(password):
			strengthType = "veryWeak";
			break;

		case isWeak(password, passwordLength):
			strengthType = "weak";
			break;

		case isRegular(password, passwordLength):
			strengthType = "regular";
			break;

		case isVeryStrong(password, passwordLength):
			strengthType = "veryStrong";
			break;

		case isStrong(password, passwordLength):
			strengthType = "strong";
			break;

		case isRegular2(password, passwordLength):
			strengthType = "regular";
			break;

		default:
			strengthType = "not classified";
			break;
	}

	return strengthType;
}

function isVeryWeak(password: string, passwordLength: number): boolean {
	return passwordLength <= 5 && /^\d+$/.test(password);
}

function isWeak(password: string, passwordLength: number): boolean {
	return (
		(passwordLength <= 5 && /^[a-zA-Z0-9]+$/.test(password)) ||
		(passwordLength >= 6 &&
			/^[a-zA-Z0-9]+$/.test(password) &&
			passwordLength <= 7) ||
		(passwordLength < 10 && /(.)\1{3,}/.test(password)) ||
		(passwordLength >= 5 && passwordLength <= 8 && /^\d+$/.test(password))
	);
}

function isRegular(password: string, passwordLength: number): boolean {
	return /(.)\1{5,}/.test(password) && passwordLength > 10;
}

function isVeryStrong(password: string, passwordLength: number): boolean {
	return (
		passwordLength > 16 ||
		(password.length >= 8 &&
			/[A-Z]/.test(password) &&
			/[a-z]/.test(password) &&
			/\d/.test(password) &&
			/[\W_]/.test(password))
	);
}

function isRegular2(password: string, passwordLength: number): boolean {
	return (
		(passwordLength >= 9 && passwordLength <= 12) ||
		(password.length >= 6 &&
			password.length <= 8 &&
			/\d/.test(password) &&
			/[a-zA-Z]/.test(password))
	);
}

function isStrong(password: string, passwordLength: number): boolean {
	return (
		(passwordLength >= 13 && passwordLength <= 16) ||
		(password.length >= 8 &&
			/[A-Z]/.test(password) &&
			/[a-z]/.test(password) &&
			/\d/.test(password))
	);
}

function commonPassword(password: string): boolean {
	const commonPasswords: string[] = [
		"123",
		"1234",
		"12345",
		"123456",
		"1234567",
		"12345678",
		"123456789",
		"password",
		"password",
		"password!",
		"password!1",
		"admin",
		"admin!",
		"Admin",
		"Admin!",
		"admin123",
		"P@ssw0rd",
		"Password",
		"password123",
		"password123!",
		"Qwerty",
		"Qwerty!",
		"Qwerty123",
		"Qwerty123!",
	];

	return commonPasswords.includes(password);
}

export default passwordStrengthTester;
