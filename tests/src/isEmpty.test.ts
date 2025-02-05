import isEmpty from "../../src/isEmpty";

describe("isEmpty", () => {
  it("returns true for empty string", () => {
    expect(isEmpty("")).toBe(true);
  });

  it("returns true for string with only spaces", () => {
    expect(isEmpty("   ")).toBe(true);
  });

  it("returns false for string with characters", () => {
    expect(isEmpty("Hello")).toBe(false);
  });

  it("returns false for string with characters and spaces", () => {
    expect(isEmpty("   Hello   ")).toBe(false);
  });

  it("throws TypeError for non-string input", () => {
    expect(() => isEmpty(null as unknown as string)).toThrow(TypeError);
    expect(() => isEmpty(undefined as unknown as string)).toThrow(TypeError);
  });
});
