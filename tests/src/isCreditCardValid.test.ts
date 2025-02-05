// Testes para isCreditCardValid
import isCreditCardValid from "../../src/isCreditCardValid";

describe("isCreditCardValid", () => {
  it("should return true when the input is a valid credit card number", () => {
    const result: boolean = isCreditCardValid("5344 9393 8369 0842");
    expect(result).toBe(true);
  });

  it("should return false when the input is not a valid credit card number", () => {
    const result: boolean = isCreditCardValid("4111111111111112");
    expect(result).toBe(false);
  });

  it("should return false when the length of the input is less than 13", () => {
    const result: boolean = isCreditCardValid("123456781234");
    expect(result).toBe(false);
  });

  it("should return false when the length of the input is greater than 19", () => {
    const result: boolean = isCreditCardValid("12345678123456781234");
    expect(result).toBe(false);
  });

  it("should throw an error when the input is not a string", () => {
    expect(() =>
      isCreditCardValid(1234567812345678 as unknown as string),
    ).toThrow("The input should be a string.");
  });

  it("should return false when the input is an empty string", () => {
    const result: boolean = isCreditCardValid("");
    expect(result).toBe(false);
  });

  it("should return false when the input is a string with only spaces", () => {
    const result: boolean = isCreditCardValid("    ");
    expect(result).toBe(false);
  });

  it("should return false when the input is a string with only letters", () => {
    const result: boolean = isCreditCardValid("abcdefgh");
    const result2: boolean = isCreditCardValid("asdfghjklcmvnshdg==");
    const result3: boolean = isCreditCardValid("asdfghjklcmvnshdg");
    expect(result).toBe(false);
    expect(result2).toBe(false);
    expect(result3).toBe(false);
  });

  it("should return false when having a letter in the middle of the string", () => {
    const result: boolean = isCreditCardValid("1234a5678");
    expect(result).toBe(false);
  });

  it("should return false when the input is a string with only special characters", () => {
    const result: boolean = isCreditCardValid("++++");
    expect(result).toBe(false);
  });

  it("should return false when the input is a string with only special characters and numbers", () => {
    const result: boolean = isCreditCardValid("1234++++");
    expect(result).toBe(false);
  });

  it("should return false when the input is a string with only special characters and letters", () => {
    const result: boolean = isCreditCardValid("abcd++++");
    expect(result).toBe(false);
  });

  it("should return false when the input is a string with only special characters, letters and numbers", () => {
    const result: boolean = isCreditCardValid("abcd1234++++");
    expect(result).toBe(false);
  });

  it("should return false when the input is a string with only special characters and spaces", () => {
    const result: boolean = isCreditCardValid("    ++++");
    expect(result).toBe(false);
  });

  it("should return false when the input is a string with only special characters, spaces and numbers", () => {
    const result: boolean = isCreditCardValid("1234    ++++");
    expect(result).toBe(false);
  });

  it("should return false when the input is a string with only special characters, spaces and letters", () => {
    const result: boolean = isCreditCardValid("abcd    ++++");
    expect(result).toBe(false);
  });

  it("should return false when the input is a string with only special characters, spaces, letters and numbers", () => {
    const result: boolean = isCreditCardValid("abcd1234    ++++");
    expect(result).toBe(false);
  });

  it("should return false when the input is a string with only spaces and letters", () => {
    const result: boolean = isCreditCardValid("    abcd");
    expect(result).toBe(false);
  });
});
