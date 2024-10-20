export default function validateJpeg(fileBuffer: Buffer): boolean {
	const jpegSignature: boolean =
		fileBuffer[0] === 0xff && fileBuffer[1] === 0xd8 && fileBuffer[2] === 0xff;

	if (jpegSignature) {
		const fileSize: number = fileBuffer.length;
		// Valid JPEG ends with marker 0xFF, 0xD9

		// Check if the last two bytes are 0xFF, 0xD9
		if (
			fileBuffer[fileSize - 2] !== 0xff ||
			fileBuffer[fileSize - 1] !== 0xd9
		) {
			return false;
		}

		return true;
	}

	return jpegSignature;
}
