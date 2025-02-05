// Testes para isPostalCode
import isPostalCode from "../../src/isPostalCode";

describe("isPostalCode", () => {
  it("should return true when the input is a valid postal code", () => {
    const result: boolean = isPostalCode("90210");
    expect(result).toBe(true);
  });

  it("should throw an error when the input is not a string", () => {
    expect(() => isPostalCode(12345678 as unknown as string)).toThrow(
      "Input value must be a string.",
    );
  });
});
