export default function validateGif(fileBuffer: Buffer): boolean {
  const isGifSignature: boolean =
    fileBuffer[0] === 0x47 && // 'G'
    fileBuffer[1] === 0x49 && // 'I'
    fileBuffer[2] === 0x46 && // 'F'
    fileBuffer[3] === 0x38 && // '8'
    (fileBuffer[4] === 0x39 || fileBuffer[4] === 0x37) && // '9' ou '7'
    fileBuffer[5] === 0x61; // 'a'

  if (isGifSignature) {
    const fileSize: number = fileBuffer.length;
    // The GIF ends with 0x00 0x3B (end marker)
    if (
      fileBuffer[fileSize - 2] === 0x00 &&
      fileBuffer[fileSize - 1] === 0x3b
    ) {
      return true;
    }
    return false; // Corrupted or invalid GIF file
  }

  return isGifSignature;
}
