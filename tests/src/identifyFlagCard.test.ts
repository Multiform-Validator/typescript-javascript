import identifyFlagCard from "../../src/identifyFlagCard";

describe("identifyFlagCard", () => {
  it("should identify Visa card", () => {
    const result: string = identifyFlagCard("4111111111111111");
    expect(result).toBe("Visa");
  });

  it("should identify Mastercard", () => {
    const result: string = identifyFlagCard("5555555555554444");
    expect(result).toBe("Mastercard");
  });

  it("should identify American Express", () => {
    const result: string = identifyFlagCard("378282246310005");
    expect(result).toBe("American Express");
  });

  it("should identify Discover", () => {
    const result: string = identifyFlagCard("6011111111111117");
    expect(result).toBe("Discover");
  });

  it("should identify JCB", () => {
    const result: string = identifyFlagCard("3530111333300000");
    expect(result).toBe("JCB");
  });

  it("should identify Diners Club", () => {
    const result: string = identifyFlagCard("30569309025904");
    expect(result).toBe("Diners Club");
  });

  it("should identify Maestro", () => {
    const result: string = identifyFlagCard("6759649826438453");
    expect(result).toBe("Maestro");
  });

  it("should identify UnionPay", () => {
    const result: string = identifyFlagCard("6221558812340002");
    expect(result).toBe("UnionPay");
  });

  it("should identify Unknown", () => {
    const result: string = identifyFlagCard("6362970000457013");
    expect(result).toBe("Unknown");
  });

  it("should identify Hipercard", () => {
    const result: string = identifyFlagCard("6062825624254001");
    expect(result).toBe("Hipercard");
  });

  it('should return "Unknown" for unknown card numbers', () => {
    const result: string = identifyFlagCard("1234567812345678");
    expect(result).toBe("Unknown");
  });

  it("should throw an error when the input is not a string", () => {
    expect(() =>
      identifyFlagCard(1234567812345678 as unknown as string),
    ).toThrow("The input should be a string.");
  });
});
