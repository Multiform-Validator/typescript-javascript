import { ValidateFunctions } from "../../src/types";
import validateSurname from "../../src/validateSurname";

describe("validateSurname", () => {
  it("validates surname with correct length", () => {
    const result = validateSurname("Jackson", { minLength: 3, maxLength: 25 });
    expect(result).toEqual({ isValid: true, errorMsg: null });
  });

  it("returns error for empty surname", () => {
    const result = validateSurname("");
    expect(result).toEqual({
      isValid: false,
      errorMsg: "Surname cannot be empty",
    });
  });

  it("returns error for surname with numbers", () => {
    const result = validateSurname("Jack5on");
    expect(result).toEqual({
      isValid: false,
      errorMsg: "Surname cannot contain numbers",
    });
  });

  it("should return false if the surname is empty", () => {
    const result: ValidateFunctions = validateSurname("");
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("Surname cannot be empty");
  });

  it("should return false if (/(\\w)\\1\\1/.test(surname)) is true", () => {
    const result: ValidateFunctions = validateSurname("Johnnn");
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("This surname is not valid");
  });

  it("should throw an error if maxLength or minLength less than 1", () => {
    expect(() =>
      validateSurname("John", { minLength: 0, maxLength: 20 }),
    ).toThrow(
      "maxLength or minLength must be a number and cannot be less than 1",
    );
    expect(() =>
      validateSurname("John", { minLength: 1, maxLength: 0 }),
    ).toThrow(
      "maxLength or minLength must be a number and cannot be less than 1",
    );
  });

  it("should throw an error if minLength is greater than maxLength", () => {
    expect(() =>
      validateSurname("John", { minLength: 20, maxLength: 1 }),
    ).toThrow("minLength cannot be greater than maxLength");
  });

  it("returns error for surname with special characters", () => {
    const result = validateSurname("Jack$on");
    expect(result).toEqual({
      isValid: false,
      errorMsg: "Surname cannot contain special characters",
    });
  });

  it("returns error for invalid surname", () => {
    const result = validateSurname("Ja", { minLength: 3, maxLength: 25 });
    expect(result).toEqual({
      isValid: false,
      errorMsg: "This surname is not valid",
    });
  });

  it("returns error for too long surname", () => {
    const result = validateSurname("JacksonJacksonJacksonJacksonJackson", {
      minLength: 3,
      maxLength: 25,
    });
    expect(result).toEqual({
      isValid: false,
      errorMsg: "Surname too big, try again",
    });
  });

  it("throws error for invalid errorMsg parameter", () => {
    expect(() =>
      validateSurname("Jackson", {
        minLength: 3,
        maxLength: 25,
        errorMsg: [123 as unknown as string],
      }),
    ).toThrow("All values within the array must be strings or null/undefined.");
  });

  it("should return true for valid surnames with custom min and max length", () => {
    const result = validateSurname("Jackson", { minLength: 1, maxLength: 20 });
    expect(result.isValid).toBe(true);
  });

  it("should return false for surnames that are too short", () => {
    const result = validateSurname("J", { minLength: 2, maxLength: 20 });
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("This surname is not valid");
  });

  it("should return false for surnames that are too long", () => {
    const result = validateSurname("JacksonJacksonJacksonJacksonJackson", {
      minLength: 2,
      maxLength: 20,
    });
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("Surname too big, try again");
  });

  it("Should return true for a valid surname Jackson, Johnson, or Smith", () => {
    const result1 = validateSurname("Jackson");
    const result2 = validateSurname("Johnson");
    const result3 = validateSurname("Smith");
    expect(result1.isValid).toBe(true);
    expect(result2.isValid).toBe(true);
    expect(result3.isValid).toBe(true);
  });

  it("should throw an error when errorMsg is not an array or null", () => {
    expect(() =>
      validateSurname("Johnson", {
        errorMsg: "Custom error" as unknown as (string | null)[],
      }),
    ).toThrow("errorMsg must be an Array or null");
  });

  it("should throw an error when the input is not a string", () => {
    expect(() => validateSurname(123 as unknown as string)).toThrow(
      "The input should be a string.",
    );
  });
});
