import validateUsername from "../../src/validateUsername";

describe("validateUsername", () => {
	it("should throw an error for non-string inputs", () => {
		expect(() => validateUsername(123 as any)).toThrow(
			"The input should be a string.",
		);
	});
	it("validates username with correct length", () => {
		const result = validateUsername("User123", { minLength: 3, maxLength: 25 });
		expect(result).toEqual({ isValid: true, errorMsg: null });
	});

	it("should throw an error if errorMsg is not an array", () => {
		expect(() =>
			validateUsername("User123", {
				minLength: 3,
				maxLength: 25,
				errorMsg: "Error message" as any,
			}),
		).toThrow("errorMsg must be an Array or null");
	});

	it("should throw an error if minLength is greater than maxLength", () => {
		expect(() =>
			validateUsername("User123", {
				minLength: 25,
				maxLength: 3,
			}),
		).toThrow("Minimum cannot be greater than maximum");
	});

	it("should throw an error if minLength or maxLength is not a number", () => {
		expect(() =>
			validateUsername("User123", {
				minLength: "3" as any,
				maxLength: 25,
			}),
		).toThrow("maxLength or minLength must be a number");
	});

	it("should throw an error if errorMsg array contains !== string|null|undefined", () => {
		expect(() =>
			validateUsername("User123", {
				minLength: 3,
				maxLength: 25,
				errorMsg: ["Error message", 123] as any,
			}),
		).toThrow("All values within the array must be strings or null/undefined.");
	});

	it("should throw an error if minLength or maxLength is less than 1", () => {
		expect(() =>
			validateUsername("User123", {
				minLength: 0,
				maxLength: 25,
			}),
		).toThrow("Size parameters cannot be less than one");
	});

	it("should return default error message if errorMsg is not provided", () => {
		const result = validateUsername("User123", {
			minLength: 3,
			maxLength: 25,
		});
		expect(result).toEqual({
			isValid: true,
			errorMsg: null,
		});
	});

	it("should return custom error message if errorMsg is provided", () => {
		const result = validateUsername("User123", {
			minLength: 8,
			maxLength: 25,
			errorMsg: [null, "Error message"],
		});
		expect(result).toEqual({
			isValid: false,
			errorMsg: "Error message",
		});
	});

	it("should return false if username is empty", () => {
		const result = validateUsername("", {
			minLength: 3,
			maxLength: 25,
		});
		expect(result).toEqual({
			isValid: false,
			errorMsg: "Username cannot be empty",
		});
	});

	it("should return false if username.length > maxLength", () => {
		const result = validateUsername("User123", {
			minLength: 3,
			maxLength: 5,
		});
		expect(result).toEqual({
			isValid: false,
			errorMsg: "Username must be between 3 and 5 characters",
		});
	});

	it("should return false if username.length < minLength", () => {
		const result = validateUsername("Us", {
			minLength: 3,
			maxLength: 25,
		});
		expect(result).toEqual({
			isValid: false,
			errorMsg: "Username must be between 3 and 25 characters",
		});
	});

	it("should return false based on the cbValidation function", () => {
		const result = validateUsername("User1232", {
			minLength: 3,
			maxLength: 25,
			cbValidate: (username: string) => username === "User123",
		});
		expect(result).toEqual({
			isValid: false,
			errorMsg: "Invalid username",
		});
	});

	it("should return defaultErrorMsg when passed null to errorMsg index", () => {
		const result = validateUsername("", {
			minLength: 3,
			maxLength: 25,
			errorMsg: [null, "Error message"],
		});
		expect(result).toEqual({
			isValid: false,
			errorMsg: "Username cannot be empty",
		});
	});
});
