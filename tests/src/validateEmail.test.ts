import validateEmail from "../../src/validateEmail";

describe("validateEmail", () => {
  it("should throw an error if the input is not a string", () => {
    expect(() => validateEmail(123 as any)).toThrow(TypeError);
  });

  it("should return defaultErrorMsg when errorMsg is null", () => {
    const result = validateEmail("foo@bar.com", { errorMsg: null as any });
    expect(result.isValid).toBeTruthy();
  });

  it("should validate a correct email", () => {
    const result = validateEmail("test@gmail.com");
    expect(result.isValid).toBe(true);
    expect(result.errorMsg).toBe(null);
  });

  it("should invalidate an incorrect email", () => {
    const result = validateEmail("test");
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("This e-mail is not valid");
  });

  it("should validate an corret email length", () => {
    const result = validateEmail("test@teste.com", { maxLength: 25 });
    expect(result.isValid).toBe(true);
    expect(result.errorMsg).toBe(null);
  });

  it("should validate an corret email length", () => {
    const result = validateEmail("test@testaaaaaaaaaaaaae.com", {
      maxLength: 15,
    });
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("Email cannot be greater than 15 characters");
  });

  it("should invalidate an email with a non-allowed domain", () => {
    // @ts-ignore
    const result = validateEmail("test@notallowed.com", {
      validDomains: ["@gmail.com"],
    });
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("Email domain is not allowed.");
  });

  it("should validate an email with a custom allowed domain", () => {
    // @ts-ignore
    const result = validateEmail("test@mydomain.com", {
      validDomains: ["@mydomain.com"],
    });
    expect(result.isValid).toBe(true);
    expect(result.errorMsg).toBe(null);
  });

  it("should validate an email with the defaults allowed domain", () => {
    // @ts-ignore
    const result = validateEmail("test@gmail.com", {
      validDomains: true,
    });
    expect(result.isValid).toBe(true);
    expect(result.errorMsg).toBe(null);
  });

  it("should invalidate an email with the defaults allowed domain", () => {
    // @ts-ignore
    const result = validateEmail("test@mydomain.com", {
      validDomains: true,
    });
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("Email domain is not allowed.");
  });

  it("should invalidate an email that is too long", () => {
    const result = validateEmail("a".repeat(401) + "@gmail.com", {
      maxLength: 400,
    });
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("Email cannot be greater than 400 characters");
  });

  it("should return false when an empty string is passed", () => {
    const result = validateEmail("");
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("Email cannot be empty");
  });

  it("should throw an error when errorMsg is not an array or null", () => {
    // @ts-ignore
    expect(() => validateEmail("jor@dio.com", { errorMsg: 123 })).toThrow(
      "errorMsg must be an Array or null",
    );
  });

  it("should throw an error if any element of the errorMsg array is different from string or null", () => {
    expect(() =>
      validateEmail("jd@dio.com", { errorMsg: [123 as any] }),
    ).toThrow("All values within the array must be strings or null/undefined.");
  });

  it("should throw an error when maxLength must be a number and cannot be less than 1", () => {
    expect(() => validateEmail("aa@dao.com", { maxLength: 0 })).toThrow(
      "maxLength must be a number and cannot be less than 1",
    );
  });

  it("should invalidate an email that does not end with the country code", () => {
    const result = validateEmail("test@gmail.com", { country: "us" });
    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("This email is not valid in the country");
  });

  it("should validate an email that ends with the country code", () => {
    const result = validateEmail("test@gmail.com.us", { country: "us" });
    expect(result.isValid).toBe(true);
    expect(result.errorMsg).toBe(null);
  });

  it("should validate email and return the custom error message and defaultMsgErrors too", () => {
    const result = validateEmail("1@gmail.com", {
      errorMsg: ["Custom error message", null, "Custom error message 2"],
    });

    expect(result.isValid).toBe(false);
    expect(result.errorMsg).toBe("This e-mail is not valid");
  });
});
