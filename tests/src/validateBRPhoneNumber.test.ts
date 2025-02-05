import type { ValidateFunctions } from "../../src/types";
import validateBRPhoneNumber from "../../src/validateBRPhoneNumber";

describe("validateBRPhoneNumber", () => {
  it("should throw an error when the input is not a string", () => {
    expect(() => validateBRPhoneNumber(12345678 as unknown as string)).toThrow(
      "The input should be a string.",
    );
  });

  it("should throw an error when errorMsg is not an array", () => {
    expect(() =>
      validateBRPhoneNumber("12345678", "not an array" as unknown as string[]),
    ).toThrow("errorMsg must be an Array");
  });

  it("should throw an error when errorMsg contains non-string values", () => {
    expect(() =>
      validateBRPhoneNumber("12345678", [123 as unknown as string, null]),
    ).toThrow("All values within the array must be strings or null/undefined.");
  });

  it("should return an object with isValid false and the appropriate error message when the phone number is empty", () => {
    const result: ValidateFunctions = validateBRPhoneNumber("");
    expect(result).toEqual({
      isValid: false,
      errorMsg: "Field phone number cannot be empty",
    });
  });

  it("should return an object with isValid false and the appropriate error message when the phone number is invalid", () => {
    const result: ValidateFunctions = validateBRPhoneNumber("12345678");
    expect(result).toEqual({
      isValid: false,
      errorMsg: "Invalid phone number",
    });
  });

  it("should return an object with isValid true and errorMsg null when the phone number is valid", () => {
    const result: ValidateFunctions = validateBRPhoneNumber("(11) 98765-4321");
    expect(result).toEqual({
      isValid: true,
      errorMsg: null,
    });
  });

  it("should return default error messages when errorMsg['etc', null] is passed", () => {
    const result: ValidateFunctions = validateBRPhoneNumber("12345678", [
      "etc",
      null,
    ]);
    expect(result).toEqual({
      isValid: false,
      errorMsg: "Invalid phone number",
    });
  });

  it("should return default error messages when errorMsg is null", () => {
    const result: ValidateFunctions = validateBRPhoneNumber("12345678", null);
    expect(result).toEqual({
      isValid: false,
      errorMsg: "Invalid phone number",
    });
  });
});
