import type { ValidateFunctions } from "./types";

const defaultErrorMsg: string[] = [
  "This textarea is too big",
  "Can not be empty",
];

interface OptionsParams {
  isRequired: boolean;
  maxLength?: number;
  errorMsg?: (string | null)[];
}

const defaultOptionsParams: OptionsParams = {
  isRequired: false,
  maxLength: undefined,
  errorMsg: defaultErrorMsg,
};

/**
 * @default isRequired boolean: default: false
 * @default maxLength number: default: 50
 * @description This function returns 2 errors in the following order,
 *
 * default:
 * [
  'Textarea cannot exceed ${maxTextAreaLength} characters',
  'Can not be empty',
];
 * @returns An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
function validateTextarea(
  textarea: string,
  { isRequired, maxLength, errorMsg }: OptionsParams = defaultOptionsParams,
): ValidateFunctions {
  if (typeof textarea !== "string") {
    throw new TypeError("The input should be a string.");
  }
  // Check para saber se as mensagens que sao passadas sao validas
  // caso contrario retorna um ERRO
  if (errorMsg) {
    if (!Array.isArray(errorMsg))
      throw new Error("errorMsg must be an Array or null");
    for (const element of errorMsg) {
      if (element != null && typeof element !== "string") {
        throw new TypeError(
          "All values within the array must be strings or null/undefined.",
        );
      }
    }
  }

  const maxTextAreaLength: number = maxLength ?? 50;

  // Função interna para obter a mensagem de erro
  function getErrorMessage(index: number): string {
    const errorMessage: string | null = errorMsg
      ? errorMsg[index]
      : defaultErrorMsg[index];

    if (errorMessage === "This textarea is too big") {
      return `Textarea cannot exceed ${maxTextAreaLength.toString()} characters`;
    }
    return errorMessage ?? defaultErrorMsg[index];
  }

  if (maxTextAreaLength < 1 || typeof maxTextAreaLength !== "number") {
    throw new Error(
      "maxLength or minLength must be a number and cannot be less than 1",
    );
  }
  if (textarea === "" && isRequired) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(1),
    };
  }

  if (textarea.length > maxTextAreaLength) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(0),
    };
  }
  return {
    isValid: true,
    errorMsg: null,
  };
}
export default validateTextarea;
