// Testes para isDate
import isDate from "../../src/isDate";

describe("isDate", () => {
	it("should return true when the input is a valid date", () => {
		const result = isDate("2022-12-31");
		expect(result).toBe(true);
	});

	it("should throw an error when the input is not a string", () => {
		expect(() => isDate(12345678 as any)).toThrow(
			"Input value must be a string.",
		);
	});

	it("should throw an error when the input is a empty string", () => {
		expect(() => isDate("")).toThrow("Input value must not be an empty string.");
		expect(() => isDate(" ")).toThrow("Input value must not be an empty string.");
	});

	it("should return false if isNaN or !(dateObject instanceof Date)", () => {
		const result = isDate("Hello");
		expect(result).toBe(false);
	});

	it("should return false if day year or month is invalid format YYYY-MM-DD", () => {
		const result = isDate("2022-13-31");
		expect(result).toBe(false);
	});

	it("should return false if day year or month is invalid format MM/DD/YYYY", () => {
		const result = isDate("12/31/2022");
		expect(result).toBe(true);
	});

	it("should return false if day year or month is invalid format MMMM D, YYYY", () => {
		const result = isDate("December 31, 2022");
		expect(result).toBe(true);
	});

	it("should return false if day year or month is invalid format MMMM D, YYYY", () => {
		const result = isDate("December 31, 2022");
		expect(result).toBe(true);
	});

	it("should return false if day > daysInMonth[month - 1]", () => {
		const result = isDate("2022-02-31");
		expect(result).toBe(false);
	});
});
