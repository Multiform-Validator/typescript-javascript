export default function validatePng(fileBuffer: Buffer): boolean {
	const pngSignature: boolean =
		fileBuffer[0] === 0x89 &&
		fileBuffer[1] === 0x50 &&
		fileBuffer[2] === 0x4e &&
		fileBuffer[3] === 0x47 &&
		fileBuffer[4] === 0x0d &&
		fileBuffer[5] === 0x0a &&
		fileBuffer[6] === 0x1a &&
		fileBuffer[7] === 0x0a;

	if (pngSignature) {
		const fileSize: number = fileBuffer.length;
		// A valid PNG structure has a specific byte sequence at the end
		const pngEndSignature: number[] = [
			0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
		];
		for (let i: number = 0; i < pngEndSignature.length; i++) {
			if (fileBuffer[fileSize - 8 + i] !== pngEndSignature[i]) {
				return false; // PNG file is corrupt or invalid
			}
		}
	}

	return pngSignature;
}
