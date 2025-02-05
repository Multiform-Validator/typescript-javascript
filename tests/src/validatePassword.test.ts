import { ValidateFunctions } from "../../src/types";
import validatePassword from "../../src/validatePassword";

describe("validatePassword", () => {
  it("validates password with minimum length", () => {
    const result: ValidateFunctions = validatePassword("Passw0rd!", {
      minLength: 8,
    });
    expect(result).toEqual({ isValid: true, errorMsg: null });
  });

  it("should use default error message if errorMsg passed is not valid", () => {
    const result: ValidateFunctions = validatePassword("Passw0rd!", {
      minLength: 8,
      errorMsg: null as unknown as string[],
    });
    expect(result.isValid).toBe(true);
  });

  it("validates password with maximum length", () => {
    const result: ValidateFunctions = validatePassword("Passw0rd!", {
      maxLength: 10,
    });
    expect(result).toEqual({ isValid: true, errorMsg: null });
  });

  it("validates password with required uppercase", () => {
    const result: ValidateFunctions = validatePassword("Passw0rd!", {
      options: { requireUppercase: true },
    });
    expect(result).toEqual({ isValid: true, errorMsg: null });
  });

  it("validates password with required special character", () => {
    const result: ValidateFunctions = validatePassword("Passw0rd!", {
      options: { requireSpecialChar: true },
    });
    expect(result).toEqual({ isValid: true, errorMsg: null });
  });

  it("validates password with required number", () => {
    const result: ValidateFunctions = validatePassword("Passw0rd!", {
      options: { requireNumber: true },
    });
    expect(result).toEqual({ isValid: true, errorMsg: null });
  });

  it("validates password with required string", () => {
    const result: ValidateFunctions = validatePassword("Passw0rd!", {
      options: { requireString: true },
    });
    expect(result).toEqual({ isValid: true, errorMsg: null });
  });

  it("returns invalid for incorrect password", () => {
    const result: ValidateFunctions = validatePassword("password", {
      minLength: 8,
    });
    expect(result).toEqual({ isValid: true, errorMsg: null });
  });

  it("validates password with all required check modules", () => {
    const result: ValidateFunctions = validatePassword("Passw0rd2!", {
      options: {
        requireString: true,
        requireNumber: true,
        requireSpecialChar: true,
        requireUppercase: true,
      },
    });
    expect(result).toEqual({ isValid: true, errorMsg: null });
  });

  it("validates password with all required check modules", () => {
    const result: ValidateFunctions = validatePassword("Passw0rd!", {
      options: {
        requireString: true,
        requireNumber: true,
        requireSpecialChar: true,
        requireUppercase: true,
      },
    });
    expect(result).toEqual({ isValid: true, errorMsg: null });
  });

  it("Returns correct error message for password too long or too short", () => {
    const result1: ValidateFunctions = validatePassword("Passw0rd!", {
      maxLength: 6,
    });
    expect(result1.errorMsg).toBe(
      "Password must be between 1 and 6 characters",
    );

    const result2: ValidateFunctions = validatePassword("Passw0rd!", {
      minLength: 20,
    });
    expect(result2.errorMsg).toBe(
      "Password must be greater than 20 characters",
    );
  });

  it("Returns correct error message for password without uppercase", () => {
    const result: ValidateFunctions = validatePassword("passw0rd!", {
      options: { requireUppercase: true },
    });
    expect(result.errorMsg).toBe(
      "Password requires at least one capital letter",
    );
  });

  it("Returns correct error message for password without special character", () => {
    const result: ValidateFunctions = validatePassword("Passw0rd", {
      options: { requireSpecialChar: true },
    });
    expect(result.errorMsg).toBe(
      "Password requires at least one special character",
    );
  });

  it("Returns correct error message for password without number", () => {
    const result: ValidateFunctions = validatePassword("Password!", {
      options: { requireNumber: true },
    });
    expect(result.errorMsg).toBe("Password requires at least one number");
  });

  it("Returns correct error message for password without string", () => {
    const result: ValidateFunctions = validatePassword("12345678!", {
      options: { requireString: true },
    });
    expect(result.errorMsg).toBe("Password requires at least one letter");
  });

  it("should throw error for invalid errorMsg parameter", () => {
    expect(() =>
      validatePassword("Passw0rd!", {
        minLength: 8,
        errorMsg: [123 as unknown as string],
      }),
    ).toThrow("All values within the array must be strings or null/undefined.");
  });

  it("should throw error for invalid password parameter", () => {
    expect(() => validatePassword(123 as unknown as string)).toThrow(
      "The input should be a string.",
    );
  });

  it("should throw error for invalid minLength parameter", () => {
    expect(() =>
      validatePassword("Passw0rd!", { minLength: 8, maxLength: 6 }),
    ).toThrow("the minimum size cannot be larger than the maximum");
  });

  it("should throw error for invalid errorMsg parameter", () => {
    expect(() =>
      validatePassword("Passw0rd!", {
        minLength: 8,
        maxLength: 20,
        errorMsg: [123 as unknown as string],
      }),
    ).toThrow("All values within the array must be strings or null/undefined.");
  });

  it("should throw an error if errorMsg is not an array", () => {
    expect(() =>
      validatePassword("Passw0rd!", {
        minLength: 8,
        maxLength: 20,
        errorMsg: 123 as unknown as string[],
      }),
    ).toThrow("errorMsg must be an Array or null");
  });

  it("should throw an error if maxLength or minLength is not a number", () => {
    expect(() =>
      validatePassword("Passw0rd!", {
        minLength: 8,
        maxLength: "20" as unknown as number,
      }),
    ).toThrow("maxLength and/or minLength must be a number");
  });

  it("should throw an error if minLength or maxLength is less than 1", () => {
    expect(() =>
      validatePassword("Passw0rd!", {
        minLength: 0,
        maxLength: 20,
      }),
    ).toThrow("No size can be smaller than 1");
  });

  it("should return default error messages when errorMsg is undefined", () => {
    const result: ValidateFunctions = validatePassword("Passw", {
      minLength: 8,
      maxLength: 20,
      errorMsg: undefined,
    });

    expect(result.errorMsg).toBe(
      "Password must be between 8 and 20 characters",
    );
  });

  it("should return default error messages when errorMsg['etc', null] is passed", () => {
    const result: ValidateFunctions = validatePassword("Passw", {
      minLength: 8,
      maxLength: 20,
      errorMsg: ["etc", null],
    });
    expect(result.errorMsg).toBe("Password too short");
  });
});
