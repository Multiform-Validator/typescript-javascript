/**
 * Checks if a file buffer represents a valid text file.
 * @param fileBuffer - The buffer containing the file data.
 * @returns A boolean indicating whether the file is a valid text file.
 */
export default function isValidTxt(fileBuffer: Buffer): boolean {
	if (fileBuffer.length === 0) {
		return false;
	}
	for (const element of fileBuffer) {
		if (
			(element < 0x20 || element > 0x7e) &&
			element !== 0x0a &&
			element !== 0x0d
		) {
			return false;
		}
	}
	return true;
}
