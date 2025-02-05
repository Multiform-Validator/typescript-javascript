// Testes para isDate
import isDate from "../../src/isDate";

describe("isDate", () => {
  it("should return true when the input is a valid date", () => {
    const result: boolean = isDate("2022-12-31");
    expect(result).toBe(true);
  });

  it("should throw an error when the input is not a string", () => {
    expect(() => isDate(12345678 as unknown as string)).toThrow(
      "Input value must be a string.",
    );
  });

  it("should throw an error when the input is a empty string", () => {
    expect(() => isDate("")).toThrow(
      "Input value must not be an empty string.",
    );
    expect(() => isDate(" ")).toThrow(
      "Input value must not be an empty string.",
    );
  });

  it("should return false if isNaN or !(dateObject instanceof Date)", () => {
    const result: boolean = isDate("Hello");
    expect(result).toBe(false);
  });

  it("should return false if day year or month is invalid format YYYY-MM-DD", () => {
    const result: boolean = isDate("2022-13-31");
    expect(result).toBe(false);
  });

  it("should return false if day year or month is invalid format MM/DD/YYYY", () => {
    const result: boolean = isDate("12/31/2022");
    expect(result).toBe(true);
  });

  it("should return false if day year or month is invalid format MMMM D, YYYY", () => {
    const result: boolean = isDate("December 31, 2022");
    expect(result).toBe(true);
  });

  it("should return false if day year or month is invalid format MMMM D, YYYY", () => {
    const result: boolean = isDate("December 31, 2022");
    expect(result).toBe(true);
  });

  it("should return false if day > daysInMonth[month - 1]", () => {
    const result: boolean = isDate("2022-02-31");
    expect(result).toBe(false);
  });

  it("should return false for a date in February of a non-leap year divisible by 100 but not by 400", () => {
    const result: boolean = isDate("1900-02-29");
    expect(result).toBe(false);
  });

  it("should return true for February 29 in a leap year divisible by 4 but not by 100", () => {
    const result: boolean = isDate("2024-02-29");
    expect(result).toBe(true);
  });

  it("should return true for February 29 in a leap year divisible by 400", () => {
    const result: boolean = isDate("2000-02-29");
    expect(result).toBe(true);
  });
});
