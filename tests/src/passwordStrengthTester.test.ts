import { passwordStrengthTester } from "../../index";
import type { PasswordStrengthTesterOptions } from "../../src/passwordStrengthTester";

describe("passwordStrengthTester function", () => {
  let options: PasswordStrengthTesterOptions;

  beforeEach(() => {
    options = {
      isVeryWeak: (password: string, passwordLength: number): boolean => {
        return passwordLength < 6 && password === "12345";
      },
      isWeak: (password: string, passwordLength: number): boolean => {
        return passwordLength < 8 && password === "1234567";
      },
      isRegular: (password: string, passwordLength: number): boolean => {
        return passwordLength < 10 && password === "123456789";
      },
      isStrong: (password: string, passwordLength: number): boolean => {
        return passwordLength < 12 && password === "12345678910";
      },
      isVeryStrong: (password: string, passwordLength: number): boolean => {
        return passwordLength >= 12 && password === "1234567891011";
      },
    };
  });

  it("should throw an error if the input is not a string", () => {
    expect(() =>
      passwordStrengthTester(
        123 as unknown as string,
        {} as PasswordStrengthTesterOptions,
      ),
    ).toThrow("The input should be a string.");
  });

  it("should return 'Very weak' if the password is very weak", () => {
    expect(passwordStrengthTester("12345", options)).toBe("Very weak");
  });

  it("should return 'Weak' if the password is weak", () => {
    expect(passwordStrengthTester("1234567", options)).toBe("Weak");
  });

  it("should return 'Regular' if the password is regular", () => {
    expect(passwordStrengthTester("123456789", options)).toBe("Regular");
  });

  it("should return 'Strong' if the password is strong", () => {
    expect(passwordStrengthTester("12345678910", options)).toBe("Strong");
  });

  it("should return 'Very strong' if the password is very strong", () => {
    expect(passwordStrengthTester("1234567891011", options)).toBe(
      "Very strong",
    );
  });

  it("should return 'Not classified' if the password is not classified", () => {
    expect(passwordStrengthTester("123456789101112", options)).toBe(
      "Not classified",
    );
  });
});
