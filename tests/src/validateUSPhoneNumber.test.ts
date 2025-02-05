import { ValidateFunctions } from "../../src/types";
import validateUSPhoneNumber from "../../src/validateUSPhoneNumber";

describe("validateUSPhoneNumber", () => {
  it("validates US phone number in correct format", () => {
    const result: ValidateFunctions = validateUSPhoneNumber("(555) 123-4567");
    expect(result).toEqual({ isValid: true, errorMsg: null });
  });

  it("returns error for empty US phone number", () => {
    const result: ValidateFunctions = validateUSPhoneNumber("");
    expect(result).toEqual({
      isValid: false,
      errorMsg: "US phone number cannot be empty",
    });
  });

  it("returns error for invalid US phone number", () => {
    const result: ValidateFunctions = validateUSPhoneNumber("1234567");
    expect(result).toEqual({
      isValid: false,
      errorMsg: "Invalid phone number",
    });
  });

  it("returns custom error for invalid US phone number", () => {
    const result: ValidateFunctions = validateUSPhoneNumber("1234567", [
      null,
      "Custom error 2",
    ]);
    expect(result).toEqual({ isValid: false, errorMsg: "Custom error 2" });
  });

  it("throws error for invalid errorMsg parameter", () => {
    expect(() =>
      validateUSPhoneNumber("(555) 123-4567", [123 as unknown as string]),
    ).toThrow("All values within the array must be strings or null/undefined.");
  });

  it("should throw an error when errorMsg is not an array or null", () => {
    expect(() =>
      validateUSPhoneNumber(
        "(555) 123-4567",
        "error msg" as unknown as string[],
      ),
    ).toThrow("errorMsg must be an Array or null");
  });

  it("should throw an error when the input is not a string", () => {
    expect(() => validateUSPhoneNumber(123 as unknown as string)).toThrow(
      "The input should be a string.",
    );
  });

  it("should return default error messages when errorMsg['etc', null] is passed", () => {
    const result: ValidateFunctions = validateUSPhoneNumber("1234567", [
      "etc",
      null,
    ]);
    expect(result.errorMsg).toBe("Invalid phone number");
  });

  it("should return default error messages when errorMsg is null", () => {
    const result: ValidateFunctions = validateUSPhoneNumber("1234567", null);
    expect(result.errorMsg).toBe("Invalid phone number");
  });
});
