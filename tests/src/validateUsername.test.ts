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

	it("should throw an error if maxLength or minlength is NaN", () => {
		expect(() =>
			validateUsername("User123", {
				minLength: "a" as any,
				maxLength: 25,
			}),
		).toThrow("maxLength or minLength must be a number");
		expect(() =>
			validateUsername("User123", {
				minLength: 3,
				maxLength: "a" as any,
			}),
		).toThrow("maxLength or minLength must be a number");
	});

	it("should throw an error if minLength is greater than maxLength", () => {
		expect(() =>
			validateUsername("User123", {
				minLength: 20,
				maxLength: 1,
			}),
		).toThrow("Minimum cannot be greater than maximum");
	});

	it("should throw an error if maxLength or minLength less than 1", () => {
		expect(() =>
			validateUsername("User123", {
				minLength: 0,
				maxLength: 20,
			}),
		).toThrow("Size parameters cannot be less than one");
	});

	it("returns error for empty username", () => {
		const result = validateUsername("");
		expect(result).toEqual({
			isValid: false,
			errorMsg: "Username cannot be empty",
		});
	});

	it("returns error for username with spaces", () => {
		const result = validateUsername("User 123");
		expect(result).toEqual({
			isValid: false,
			errorMsg: "Username cannot contain spaces",
		});
	});

	it("returns error for username starting with number", () => {
		const result = validateUsername("123User");
		expect(result).toEqual({
			isValid: false,
			errorMsg: "Cannot start with a number",
		});
	});

	it("returns error for username containing only numbers", () => {
		const result = validateUsername("123456");
		expect(result).toEqual({
			isValid: false,
			errorMsg: "Cannot contain only numbers",
		});
	});

	it("returns error for invalid username", () => {
		const result = validateUsername("Us", { minLength: 3, maxLength: 25 });
		expect(result).toEqual({
			isValid: false,
			errorMsg: "Username must be between 3 and 25 characters",
		});
	});

	it("returns error for too long username", () => {
		const result = validateUsername("User123User123User123User123User123", {
			minLength: 3,
			maxLength: 25,
		});
		expect(result).toEqual({
			isValid: false,
			errorMsg: "Username must be between 3 and 25 characters",
		});
	});

	it("throws error for invalid errorMsg parameter", () => {
		expect(() =>
			validateUsername("User123", {
				minLength: 3,
				maxLength: 25,
				errorMsg: [123 as any],
			}),
		).toThrow("All values within the array must be strings or null/undefined.");
	});

	it("should return true for valid usernames with custom min and max length", () => {
		const result = validateUsername("User123", { minLength: 1, maxLength: 20 });
		expect(result.isValid).toBe(true);
	});

	it("should return false for usernames that are too short", () => {
		const result = validateUsername("U", { minLength: 2, maxLength: 20 });
		expect(result.isValid).toBe(false);
		expect(result.errorMsg).toBe(
			"Username must be between 2 and 20 characters",
		);
	});

	it("should return false for usernames that are too long", () => {
		const result = validateUsername("User123User123User123User123", {
			minLength: 2,
			maxLength: 20,
		});
		expect(result.isValid).toBe(false);
		expect(result.errorMsg).toBe(
			"Username must be between 2 and 20 characters",
		);
	});

	it("Should return true for a valid username User123, User, or User1234", () => {
		const result1 = validateUsername("User123");
		const result2 = validateUsername("User");
		const result3 = validateUsername("User1234");
		expect(result1.isValid).toBe(true);
		expect(result2.isValid).toBe(true);
		expect(result3.isValid).toBe(true);
	});

	it("Should return false for invalid usernames", () => {
		const result1 = validateUsername("User 123");
		const result2 = validateUsername("123User");
		const result3 = validateUsername("@@@@@@");
		expect(result1.isValid).toBe(false);
		expect(result2.isValid).toBe(false);
		expect(result3.isValid).toBe(false);
	});

	it("should return default error messages when errorMsg['etc', null] is passed", () => {
		const result = validateUsername("Us", {
			minLength: 3,
			maxLength: 25,
			errorMsg: ["etc", null],
		});
		expect(result.errorMsg).toBe("Username too short");
	});

	it("should return default error messages when errorMsg is null", () => {
		const result = validateUsername("Us", {
			minLength: 3,
			maxLength: 25,
			errorMsg: null as any,
		});
		expect(result.errorMsg).toBe("Username must be between 3 and 25 characters");
	});

	it("should throw an error if minLength is number but maxLength is not", () => {
		expect(() =>
			validateUsername("User123", {
				minLength: 3,
				maxLength: "aw" as any,
			}),
		).toThrow("maxLength or minLength must be a number");
	});
});
