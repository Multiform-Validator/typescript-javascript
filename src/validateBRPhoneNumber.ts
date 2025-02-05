import { ValidateFunctions } from "./types";

const defaultErrorMsg: string[] = [
  "Field phone number cannot be empty",
  "Invalid phone number",
];
/**
 * @param phoneNumber
 * @param errorMsg optional
 * @example validateBRPhoneNumber('(11) 98765-4321');
 * @example validateBRPhoneNumber('(11) 98765-4321', ['Invalid phone number', 'Invalid format']);
 * @description This function returns three errors in the following order:
 *
 * Default:
 * ['Field phone number cannot be empty', 'Invalid phone number']
 *
 * Create a list of errors separated by commas in strings
 * @returns An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
function validateBRPhoneNumber(
  phoneNumber: string,
  errorMsg: (string | null)[] | null = defaultErrorMsg,
): ValidateFunctions {
  if (typeof phoneNumber !== "string") {
    throw new TypeError("The input should be a string.");
  }
  // Check to see if the passed error messages are valid; otherwise, return an error
  if (errorMsg) {
    if (!Array.isArray(errorMsg)) throw new Error("errorMsg must be an Array");
    for (const element of errorMsg) {
      if (element != null && typeof element !== "string") {
        throw new TypeError(
          "All values within the array must be strings or null/undefined.",
        );
      }
    }
  }

  // Internal function to get the error message
  function getErrorMessage(index: number): string {
    const errorMessage: string | null = errorMsg ? errorMsg[index] : null;
    return errorMessage ?? defaultErrorMsg[index];
  }

  if (!phoneNumber) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(0),
    };
  }
  // Regular expression to validate Brazilian phone numbers
  const brPhoneNumberRegex: RegExp = /^\(\d{2}\) \d{5}-\d{4}$/;
  if (!brPhoneNumberRegex.test(phoneNumber)) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(1),
    };
  }
  return {
    isValid: true,
    errorMsg: null,
  };
}
export default validateBRPhoneNumber;
