// Testes para isCreditCardValid
import isCreditCardValid from "../../src/isCreditCardValid";

describe("isCreditCardValid", () => {
	it("should return true when the input is a valid credit card number", () => {
		const result = isCreditCardValid("5344 9393 8369 0842");
		expect(result).toBe(true);
	});

	it("should return false when the input is not a valid credit card number", () => {
		const result = isCreditCardValid("4111111111111112");
		expect(result).toBe(false);
	});

	it("should return false when the length of the input is less than 13", () => {
		const result = isCreditCardValid("123456781234");
		expect(result).toBe(false);
	});

	it("should return false when the length of the input is greater than 19", () => {
		const result = isCreditCardValid("12345678123456781234");
		expect(result).toBe(false);
	});

	it("should throw an error when the input is not a string", () => {
		expect(() => isCreditCardValid(1234567812345678 as any)).toThrow(
			"The input should be a string.",
		);
	});

	it("should return false when the input is an empty string", () => {
		const result = isCreditCardValid("");
		expect(result).toBe(false);
	});

	it("should return false when the input is a string with only spaces", () => {
		const result = isCreditCardValid("    ");
		expect(result).toBe(false);
	});

	it("should return false when the input is a string with only letters", () => {
		const result = isCreditCardValid("abcdefgh");
		const result2 = isCreditCardValid("asdfghjklcmvnshdg==");
		const result3 = isCreditCardValid("asdfghjklcmvnshdg");
		expect(result).toBe(false);
		expect(result2).toBe(false);
		expect(result3).toBe(false);
	});

	it("should return false when having a letter in the middle of the string", () => {
		const result = isCreditCardValid("1234a5678");
		expect(result).toBe(false);
	});

	it("should return false when the input is a string with only special characters", () => {
		const result = isCreditCardValid("++++");
		expect(result).toBe(false);
	});

	it("should return false when the input is a string with only special characters and numbers", () => {
		const result = isCreditCardValid("1234++++");
		expect(result).toBe(false);
	});

	it("should return false when the input is a string with only special characters and letters", () => {
		const result = isCreditCardValid("abcd++++");
		expect(result).toBe(false);
	});

	it("should return false when the input is a string with only special characters, letters and numbers", () => {
		const result = isCreditCardValid("abcd1234++++");
		expect(result).toBe(false);
	});

	it("should return false when the input is a string with only special characters and spaces", () => {
		const result = isCreditCardValid("    ++++");
		expect(result).toBe(false);
	});

	it("should return false when the input is a string with only special characters, spaces and numbers", () => {
		const result = isCreditCardValid("1234    ++++");
		expect(result).toBe(false);
	});

	it("should return false when the input is a string with only special characters, spaces and letters", () => {
		const result = isCreditCardValid("abcd    ++++");
		expect(result).toBe(false);
	});

	it("should return false when the input is a string with only special characters, spaces, letters and numbers", () => {
		const result = isCreditCardValid("abcd1234    ++++");
		expect(result).toBe(false);
	});

	it("should return false when the input is a string with only spaces and letters", () => {
		const result = isCreditCardValid("    abcd");
		expect(result).toBe(false);
	});
});
