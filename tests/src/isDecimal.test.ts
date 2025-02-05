// Testes para isDecimal
import isDecimal from "../../src/isDecimal";

describe("isDecimal", () => {
  const errorToThrow: string = "Input value must be a string or a number."; // Mensagem de erro a ser lançada

  it("should return true when the input is a valid decimal number", () => {
    const result: boolean = isDecimal("123.45");
    expect(result).toBe(true);
  });

  it("should return false when the input is not a valid decimal number", () => {
    const result: boolean = isDecimal("123.456.789");
    expect(result).toBe(false);
  });

  it("should return false when the input is an integer", () => {
    const result: boolean = isDecimal("123");
    expect(result).toBe(false);
  });

  it("should return false when the input is a string", () => {
    const result: boolean = isDecimal("abc");
    expect(result).toBe(false);
  });

  it("should throw error when the input is an array", () => {
    expect(() => isDecimal([] as unknown as string)).toThrow(errorToThrow);
  });

  it("should throw error when the input is an object", () => {
    expect(() => isDecimal({} as unknown as string)).toThrow(errorToThrow);
  });

  it("should throw error when the input is a boolean", () => {
    expect(() => isDecimal(true as unknown as string)).toThrow(errorToThrow);
  });

  it("should throw error when the input is empty", () => {
    expect(() => isDecimal("")).toThrow(
      "Input value must not be an empty string.",
    );
  });

  it("should throw error when the input is a whitespace", () => {
    expect(() => isDecimal(" ")).toThrow(
      "Input value must not be an empty string.",
    );
  });

  it("should throw error when the input is a null", () => {
    expect(() => isDecimal(null as unknown as string)).toThrow(errorToThrow);
  });

  it("should throw error when the input is undefined", () => {
    expect(() => isDecimal(undefined as unknown as string)).toThrow(
      errorToThrow,
    );
  });

  it("should throw error when the input is NaN", () => {
    expect(() => isDecimal(NaN as unknown as string)).toThrow(
      "Input value must not be NaN.",
    );
  });

  it("should throw error when the input is Infinity", () => {
    expect(() => isDecimal(Infinity as unknown as string)).toThrow(
      "Input value must not be Infinity, -Infinity or NaN.",
    );
  });

  it("should throw error when the input is -Infinity", () => {
    expect(() => isDecimal(-Infinity as unknown as string)).toThrow(
      "Input value must not be Infinity, -Infinity or NaN.",
    );
  });

  it("should throw error when the input is a function", () => {
    function func(): void {
      /* document why this function 'func' is empty */
    }

    expect(() => isDecimal(func as unknown as string)).toThrow(errorToThrow);
  });

  it("should throw error when the input is a symbol", () => {
    expect(() => isDecimal(Symbol() as unknown as string)).toThrow(
      errorToThrow,
    );
  });

  it("should throw error when the input is a date", () => {
    expect(() => isDecimal(new Date() as unknown as string)).toThrow(
      errorToThrow,
    );
  });

  it("should throw error when the input is an empty array", () => {
    expect(() => isDecimal([] as unknown as string)).toThrow(errorToThrow);
  });

  it("should throw error when the input is an empty object", () => {
    expect(() => isDecimal({} as unknown as string)).toThrow(errorToThrow);
  });

  it("should throw error when the input is a Map", () => {
    expect(() => isDecimal(new Map() as unknown as string)).toThrow(
      errorToThrow,
    );
  });

  it("should throw error when the input is a Set", () => {
    expect(() => isDecimal(new Set() as unknown as string)).toThrow(
      errorToThrow,
    );
  });

  it("should throw error when the input is a WeakMap", () => {
    expect(() => isDecimal(new WeakMap() as unknown as string)).toThrow(
      errorToThrow,
    );
  });

  it("should throw error when the input is a WeakSet", () => {
    expect(() => isDecimal(new WeakSet() as unknown as string)).toThrow(
      errorToThrow,
    );
  });

  it("should throw error when the input is a regular expression", () => {
    expect(() => isDecimal(/abc/g as unknown as string)).toThrow(errorToThrow);
  });

  it("should throw error when the input is a class", () => {
    class A {
      public method(): string {
        return "This is a method";
      }
    }

    expect(() => isDecimal(A as unknown as string)).toThrow(errorToThrow);
  });

  it("should throw error when the input is a class instance", () => {
    class A {
      public method(): string {
        return "This is a method";
      }
    }

    expect(() => isDecimal(new A() as unknown as string)).toThrow(errorToThrow);
  });

  it("should throw error when the input is a BigInt", () => {
    expect(() => isDecimal(BigInt(10) as unknown as string)).toThrow(
      errorToThrow,
    );
  });

  it("should throw error when the input is a URL", () => {
    expect(() =>
      isDecimal(new URL("https://example.com") as unknown as string),
    ).toThrow(errorToThrow);
  });

  it("should throw error when the input is a Buffer", () => {
    expect(() => isDecimal(Buffer.from("hello") as unknown as string)).toThrow(
      errorToThrow,
    );
  });

  it("should throw error when the input is a DataView", () => {
    expect(() =>
      isDecimal(new DataView(new ArrayBuffer(2)) as unknown as string),
    ).toThrow(errorToThrow);
  });

  it("should throw error when the input is a Float32Array", () => {
    expect(() => isDecimal(new Float32Array(2) as unknown as string)).toThrow(
      errorToThrow,
    );
  });

  it("should throw error when the input is a Float64Array", () => {
    expect(() => isDecimal(new Float64Array(2) as unknown as string)).toThrow(
      errorToThrow,
    );
  });

  it("should return false when the input is a integer number", () => {
    const result: boolean = isDecimal(123);
    expect(result).toBe(false);
  });

  it("should return true when the input is a valid decimal number", () => {
    const result: boolean = isDecimal(123.45);
    expect(result).toBe(true);
  });

  it("should throw error when the input is a boolean", () => {
    expect(() => isDecimal(true as unknown as string)).toThrow(
      "Input value must be a string or a number.",
    );
  });

  it("should throw error when the input is an array", () => {
    expect(() => isDecimal([] as unknown as string)).toThrow(
      "Input value must be a string or a number.",
    );
  });

  it("should throw error when the input is an object", () => {
    expect(() => isDecimal({} as unknown as string)).toThrow(
      "Input value must be a string or a number.",
    );
  });

  it("should throw error when the input is a function", () => {
    function func(): void {
      /* document why this function 'func' is empty */
    }

    expect(() => isDecimal(func as unknown as string)).toThrow(
      "Input value must be a string or a number.",
    );
  });

  it("should throw error when the input is a symbol", () => {
    expect(() => isDecimal(Symbol() as unknown as string)).toThrow(
      "Input value must be a string or a number.",
    );
  });

  it("should return false when the input contains both decimal separators", () => {
    const result: boolean = isDecimal("1.234,56");
    expect(result).toBe(false);
  });

  it("should return false when the input contains both decimal separators in reverse order", () => {
    const result: boolean = isDecimal("1,234.56");
    expect(result).toBe(false);
  });

  it("should return false when the input starts with a negative sign and has another negative sign elsewhere", () => {
    const result: boolean = isDecimal("-1-23.45");
    expect(result).toBe(false);
  });

  it("should return true when the input starts with a negative sign and has only one negative sign at the beginning", () => {
    const result: boolean = isDecimal("-123.45");
    expect(result).toBe(true);
  });

  it("should return false if has multiple separators", () => {
    const result: boolean = isDecimal("14.56.78");
    const result2: boolean = isDecimal("14,56,78");
    expect(result).toBe(false);
    expect(result2).toBe(false);
  });

  it("should return false when have invalid negative sign", () => {
    const result: boolean = isDecimal("123.-45");
    expect(result).toBe(false);
  });
});
