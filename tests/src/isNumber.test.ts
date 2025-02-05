// Testes para isNumber
import isNumber from "../../src/isNumber";

describe("isNumber", () => {
  it("should return true when the input is a valid string of number", () => {
    const result: boolean = isNumber("123");
    expect(result).toBe(true);
  });

  it("should return true when the input is a valid number", () => {
    const result: boolean = isNumber(123);
    expect(result).toBe(true);
  });

  it("should return false when the input is not a valid number", () => {
    const result: boolean = isNumber("abc");
    expect(result).toBe(false);
  });

  it("should return false when the input is an array", () => {
    const result: boolean = isNumber([]);
    expect(result).toBe(false);
  });

  it("should return false when the input is an object", () => {
    const result: boolean = isNumber({});
    expect(result).toBe(false);
  });

  it("should return false when the input is a boolean", () => {
    const result: boolean = isNumber(true);
    expect(result).toBe(false);
  });

  it("should return false when the input is empty", () => {
    const result: boolean = isNumber("");
    expect(result).toBe(false);
  });
});
