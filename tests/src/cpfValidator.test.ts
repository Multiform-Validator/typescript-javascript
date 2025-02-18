import cpfIsValid from "../../src/cpfValidator";
import type { ValidateFunctions } from "../../src/types";

describe("cpfIsValid", () => {
  it("should return isValid as false and the correct error message when CPF is invalid", () => {
    const result: ValidateFunctions = cpfIsValid("12345678902");
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("CPF is not valid");
  });

  test("errorMessage should be default if pass an empty array", () => {
    const result: ValidateFunctions = cpfIsValid("12345678902", []);
    expect(result.isValid).toBe(false);
  });

  test("errorMessage should be default if errorMsg[index] is falsy", () => {
    const result: ValidateFunctions = cpfIsValid("12345678902", null);
    expect(result.isValid).toBe(false);
  });

  it("should return isValid as true and errorMsg as null when CPF is valid", () => {
    const result: ValidateFunctions = cpfIsValid("12345678909");
    expect(result.isValid).toBe(true);
    expect(result.errorMsg).toBe(null);
  });

  it("should return isValid as false and the correct error message when CPF is invalid", () => {
    const result: ValidateFunctions = cpfIsValid("123.456.789-02");
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("CPF is not valid");
  });

  it("should return isValid as true and errorMsg as null when CPF is valid", () => {
    const result: ValidateFunctions = cpfIsValid("123.456.789-09");
    expect(result.isValid).toBe(true);
    expect(result.errorMsg).toBe(null);
  });

  it("should return isValid as false and the correct error message when CPF is invalid", () => {
    const result: ValidateFunctions = cpfIsValid("123456789-02");
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("CPF is not valid");
  });

  it("should throw an error when the input is not a string", () => {
    expect(() => cpfIsValid(12345678910 as unknown as string)).toThrow(
      "The input should be a string.",
    );
  });

  it("should throw an error when errorMsg is not an array", () => {
    expect(() =>
      cpfIsValid("12345678910", "not an array" as unknown as string[]),
    ).toThrow("Must be an Array");
  });

  it("should throw an error when errorMsg contains non-string values", () => {
    expect(() =>
      cpfIsValid("12345678910", [123 as unknown as string, "error message"]),
    ).toThrow("All values within the array must be strings or null/undefined.");
  });

  it("should throw an error when errorMsg contains non-string values", () => {
    expect(() =>
      cpfIsValid("12345678910", ["error message", 123 as unknown as string]),
    ).toThrow("All values within the array must be strings or null/undefined.");
  });

  it("it should return false when all digits are repeated", () => {
    const result: ValidateFunctions = cpfIsValid("11111111111");
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("CPF is not valid");
  });

  it("should return isValid as false and the correct error message when CPF is null or empty", () => {
    const result: ValidateFunctions = cpfIsValid("");
    expect(result.isValid).toBe(false);

    expect(() => cpfIsValid(null as unknown as string)).toThrow(
      "The input should be a string.",
    );
  });

  it("should return isValid as false and the correct error message when CPF does not have 11 digits after cleaning", () => {
    const result: ValidateFunctions = cpfIsValid("123.456.789-0");
    expect(result.isValid).toBe(false);
  });
});
