import type { ValidateFunctions } from "../../src/types";
import validateTextarea from "../../src/validateTextarea";

describe("validateTextarea", () => {
  it("should throw an error when the input is not a string", () => {
    expect(() => validateTextarea(12345678 as unknown as string)).toThrow(
      "The input should be a string.",
    );
  });

  it("should throw an error when errorMsg is not an array", () => {
    expect(() =>
      validateTextarea("This is a valid textarea.", {
        isRequired: true,
        maxLength: 50,
        errorMsg: 123 as unknown as string[],
      }),
    ).toThrow("errorMsg must be an Array or null");
  });

  it("should throw an error if maxLength is less than 1 or !== number", () => {
    expect(() =>
      validateTextarea("This is a valid textarea.", {
        isRequired: true,
        maxLength: -1,
      }),
    ).toThrow(
      "maxLength or minLength must be a number and cannot be less than 1",
    );
    expect(() =>
      validateTextarea("This is a valid textarea.", {
        isRequired: true,
        maxLength: "a" as unknown as number,
      }),
    ).toThrow(
      "maxLength or minLength must be a number and cannot be less than 1",
    );
  });

  it("validates textarea with correct length", () => {
    const result: ValidateFunctions = validateTextarea(
      "This is a valid textarea.",
      {
        isRequired: true,
        maxLength: 50,
      },
    );
    expect(result).toEqual({ isValid: true, errorMsg: null });
  });

  it("returns error for empty textarea when isRequired is true", () => {
    const result: ValidateFunctions = validateTextarea("", {
      isRequired: true,
      maxLength: 50,
    });
    expect(result).toEqual({ isValid: false, errorMsg: "Can not be empty" });
  });

  it("returns error for textarea exceeding maxLength", () => {
    const result: ValidateFunctions = validateTextarea(
      "This is a very long textarea that exceeds the maximum length.",
      { isRequired: true, maxLength: 20 },
    );
    expect(result).toEqual({
      isValid: false,
      errorMsg: "Textarea cannot exceed 20 characters",
    });
  });

  it("returns custom error for textarea exceeding maxLength", () => {
    const result: ValidateFunctions = validateTextarea(
      "This is a very long textarea that exceeds the maximum length.",
      {
        isRequired: true,
        maxLength: 20,
        errorMsg: ["Custom error 1", "Custom error 2", "Custom error 3"],
      },
    );
    expect(result).toEqual({ isValid: false, errorMsg: "Custom error 1" });
  });

  it("throws error for invalid errorMsg parameter", () => {
    expect(() =>
      validateTextarea("This is a valid textarea.", {
        isRequired: true,
        maxLength: 50,
        errorMsg: [123 as unknown as string],
      }),
    ).toThrow("All values within the array must be strings or null/undefined.");
  });

  it("should return default error messages when errorMsg[null, 'etc'] is passed", () => {
    const result: ValidateFunctions = validateTextarea(
      "This is a valid textarea.",
      {
        isRequired: true,
        maxLength: 15,
        errorMsg: [null, "etc"],
      },
    );
    expect(result.errorMsg).toBe("This textarea is too big");
  });

  it("should return default error messages when errorMsg is null", () => {
    const result: ValidateFunctions = validateTextarea(
      "This is a valid textarea.",
      {
        isRequired: true,
        maxLength: 15,
        errorMsg: null as unknown as string[],
      },
    );
    expect(result.errorMsg).toBe("Textarea cannot exceed 15 characters");
  });
});
