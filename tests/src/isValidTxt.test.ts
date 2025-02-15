import isValidTxt from "../../src/isValidTxt";

import * as path from "path";
import * as fs from "fs";

describe("isValidTxt", () => {
  let fileBuffer1: Buffer, fileBuffer2: Buffer;

  beforeAll(() => {
    fileBuffer1 = fs.readFileSync(
      path.join(__dirname, "..", "assets", "isValidTxt", "invalid.txt"),
    ); // Invalid TXT
    fileBuffer2 = fs.readFileSync(
      path.join(__dirname, "..", "assets", "isValidTxt", "valid.txt"),
    ); // Valid TXT
  });

  it("should return false for an empty buffer", () => {
    const fileBuffer: Buffer<ArrayBuffer> = Buffer.from([]);
    const result: boolean = isValidTxt(fileBuffer);
    expect(result).toBe(false);
  });

  it("should return false for an invalid TXT", () => {
    const result: boolean = isValidTxt(fileBuffer1);
    expect(result).toBe(false);
  });

  it("should return true for a valid TXT", () => {
    const result: boolean = isValidTxt(fileBuffer2);
    expect(result).toBe(true);
  });
});
