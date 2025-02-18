import isValidVideo from "../../src/isValidVideo";

import * as path from "path";
import * as fs from "fs";

describe("isValidVideo", () => {
  let fileBuffer1: Buffer,
    fileBuffer2: Buffer,
    fileBuffer3: Buffer,
    fileBuffer4: Buffer,
    fileBuffer5: Buffer,
    fileBuffer6: Buffer;

  beforeAll(() => {
    fileBuffer1 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidVideo",
        "invalid",
        "invalid.mkv",
      ),
    ); // Invalid MKV image
    fileBuffer2 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidVideo",
        "invalid",
        "invalid.mp4",
      ),
    ); // Invalid MP4 image
    fileBuffer3 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidVideo",
        "invalid",
        "invalid.mov",
      ),
    ); // Invalid MOV image
    fileBuffer4 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidVideo",
        "valid",
        "valid.mkv",
      ),
    ); // valid MKV image
    fileBuffer5 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidVideo",
        "valid",
        "valid.mp4",
      ),
    ); // valid MP4 image
    fileBuffer6 = fs.readFileSync(
      path.join(
        __dirname,
        "..",
        "assets",
        "isValidVideo",
        "valid",
        "valid.mov",
      ),
    ); // valid MOV image
  });

  it("should return false for an empty buffer", () => {
    const fileBuffer: Buffer<ArrayBuffer> = Buffer.from([]);
    const result: boolean = isValidVideo(fileBuffer);
    expect(result).toBe(false);
  });

  it("should return false for an invalid MKV video", () => {
    const result: boolean = isValidVideo(fileBuffer1);
    expect(result).toBe(false);
  });

  it("should return false for an invalid MP4 video", () => {
    const result: boolean = isValidVideo(fileBuffer2);
    expect(result).toBe(false);
  });

  it("should return false for an invalid MOV video", () => {
    const result: boolean = isValidVideo(fileBuffer3);
    expect(result).toBe(false);
  });

  it("should return true for a valid MKV video", () => {
    const result: boolean = isValidVideo(fileBuffer4);
    expect(result).toBe(true);
  });

  it("should return true for a valid MP4 video", () => {
    const result: boolean = isValidVideo(fileBuffer5);
    expect(result).toBe(true);
  });

  it("should return true for a valid MOV video", () => {
    const result: boolean = isValidVideo(fileBuffer6);
    expect(result).toBe(true);
  });

  it("should return false when excluding MP4 files", () => {
    const result: boolean = isValidVideo(fileBuffer5, { exclude: ["mp4"] });
    expect(result).toBe(false);
  });

  it("should return false when excluding MOV files", () => {
    const result: boolean = isValidVideo(fileBuffer6, { exclude: ["mov"] });
    expect(result).toBe(false);
  });

  it("should return false when excluding MKV files", () => {
    const result: boolean = isValidVideo(fileBuffer4, { exclude: ["mkv"] });
    expect(result).toBe(false);
  });

  it("should return true when excluding MP4 files", () => {
    const result: boolean = isValidVideo(fileBuffer6, { exclude: ["mp4"] });
    expect(result).toBe(true);
  });

  it("should return true when excluding MOV files", () => {
    const result: boolean = isValidVideo(fileBuffer4, { exclude: ["mov"] });
    expect(result).toBe(true);
  });

  it("should return true when excluding MKV files", () => {
    const result: boolean = isValidVideo(fileBuffer5, { exclude: ["mkv"] });
    expect(result).toBe(true);
  });

  it("should return false when excluding MP4 files and MOV files", () => {
    const result: boolean = isValidVideo(fileBuffer5, {
      exclude: ["mp4", "mov"],
    });
    expect(result).toBe(false);
  });

  it("should return false when excluding MKV files and MP4 files", () => {
    const result: boolean = isValidVideo(fileBuffer5, {
      exclude: ["mkv", "mp4"],
    });
    expect(result).toBe(false);
  });

  it("should return false when excluding MKV files, MP4 files, and MOV files", () => {
    const result: boolean = isValidVideo(fileBuffer5, {
      exclude: ["mkv", "mp4", "mov"],
    });
    expect(result).toBe(false);
  });

  it("should return false when excluding all video files", () => {
    const result1: boolean = isValidVideo(fileBuffer4, {
      exclude: ["mkv", "mp4", "mov"],
    });
    const result2: boolean = isValidVideo(fileBuffer5, {
      exclude: ["mkv", "mp4", "mov"],
    });
    const result3: boolean = isValidVideo(fileBuffer6, {
      exclude: ["mkv", "mp4", "mov"],
    });
    expect(result3).toBe(false);
    expect(result2).toBe(false);
    expect(result1).toBe(false);
  });

  test("validateMp4 should return true for specific byte sequence", () => {
    const fileBuffer: Buffer<ArrayBuffer> = Buffer.from([
      0x00,
      0x00,
      0x00,
      0x18, // First 4 bytes
      0x66,
      0x74,
      0x79,
      0x70, // Next 4 bytes
    ]);

    const result: boolean = isValidVideo(fileBuffer);
    expect(result).toBe(true);
  });

  test("validateMp4 should return true for byte sequence 1", () => {
    const fileBuffer: Buffer<ArrayBuffer> = Buffer.from([
      0x00,
      0x00,
      0x00,
      0x20, // First 4 bytes
      0x66,
      0x74,
      0x79,
      0x70, // Next 4 bytes
      0x6d,
      0x70,
      0x34,
      0x32, // Last 4 bytes
    ]);

    const result: boolean = isValidVideo(fileBuffer);
    expect(result).toBe(true);
  });

  test("validateMp4 should return true for byte sequence 2", () => {
    const fileBuffer: Buffer<ArrayBuffer> = Buffer.from([
      0x00,
      0x00,
      0x00,
      0x1c, // First 4 bytes
      0x66,
      0x74,
      0x79,
      0x70, // Next 4 bytes
      0x69,
      0x73,
      0x6f,
      0x6d, // Last 4 bytes
    ]);

    const result: boolean = isValidVideo(fileBuffer);
    expect(result).toBe(true);
  });
});
