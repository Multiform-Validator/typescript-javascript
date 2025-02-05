import { ValidateFunctions } from "./types";
import isEmail from "./isEmail";

const defaultErrorMsg: string[] = [
  "Email cannot be empty",
  "This e-mail is not valid",
  "Email too big, try again",
  "This email is not valid in the country",
  "Email domain is not allowed.",
];

const validDomainsDefault: string[] = [
  "@gmail.com",
  "@outlook.com",
  "@yahoo.com",
  "@icloud.com",
  "@hotmail.com",
  "@mail.ru",
  "@yandex.ru",
  "@gmx.com",
  "@zoho.com",
  "@protonmail.com",
  "@protonmail.ch",
];

interface OptionsParams {
  maxLength?: number;
  country?: string;
  errorMsg?: (string | null)[];
  validDomains?: boolean | string[];
}

const defaultOptionsParams: OptionsParams = {
  maxLength: undefined,
  country: "",
  errorMsg: defaultErrorMsg,
  validDomains: false,
};

/**
 * @param email
 * @param maxLength optional
 * @param country optional
 * @param errorMsg optional
 * @param validDomains optional
 * @default maxLength number: 400, validDomains = false
 * @example validateEmail('foor@bar.com', { maxLength: 30, country: "us" });
 * @example validateEmail('foor@bar.com', { maxLength: 30 });
 * @example validateEmail('foor@bar.com', { maxLength: 30, errorMsg: ['My own error message'] }); Country is set to null
 * @example validateEmail('joao@myOwnDomain.com', { validDomains: ['@myOwnDomain.com'] });
 * @example validateEmail('joaoaoao@gmail.com.com', { validDomains: true } );
 * @description This function returns six errors in the following order,
 *
 * If you want to use a default parameter, use null.
 *
 * Default:
 * ['Email cannot be empty', 'This e-mail is not valid', 'Email cannot be greater than ${maxEmailLength} characters', 'This email is not valid in the country','Email domain is not allowed.']
 *
 * Create a list of errors separated by commas in strings
 *
 * @description You can also pass a list of domains that will be allowed, if you leave the parameter empty, it will be set to false and no check will be performed, you can also pass only true and the following list will be used by default:
 *
 * Default:
 * ['@gmail.com', '@outlook.com', '@yahoo.com', '@icloud.com', '@hotmail.com',
  '@mail.ru', '@yandex.ru', '@gmx.com', '@zoho.com', '@protonmail.com', '@protonmail.ch'];

 * You can also create a custom list, your list will completely replace the default list.

	DOCUMENTATION: https://gabriel-logan.github.io/multiform-validator/srcPage/subPages/functions/validateEmail

 * @returns An object with 'isValid' (boolean) and 'errorMsg' (string) properties.
 */
function validateEmail(
  email: string,
  {
    maxLength,
    country,
    errorMsg,
    validDomains,
  }: OptionsParams = defaultOptionsParams,
): ValidateFunctions {
  if (typeof email !== "string") {
    throw new TypeError("The input should be a string.");
  }

  const regex: RegExp | null = getDomainRegex(validDomains ?? false);

  validateErrorMsg(errorMsg);

  const maxEmailLength: number = validateMaxLength(maxLength);

  if (!email) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(0, errorMsg, maxEmailLength),
    };
  }

  if (regex && !regex.test(email)) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(4, errorMsg, maxEmailLength),
    };
  }
  if (!isEmail(email)) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(1, errorMsg, maxEmailLength),
    };
  }
  if (email.length > maxEmailLength) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(2, errorMsg, maxEmailLength),
    };
  }
  if (country && !email.endsWith(`.${country}`)) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(3, errorMsg, maxEmailLength),
    };
  }
  return {
    isValid: true,
    errorMsg: null,
  };
}

function getDomainRegex(validDomains: boolean | string[]): RegExp | null {
  if (Array.isArray(validDomains) && validDomains.length > 0) {
    const validDomainsCustom: string[] = validDomains.map((domain: string) =>
      domain.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    );
    return new RegExp(`${validDomainsCustom.join("|")}$`, "i");
  }
  if (validDomains) {
    return new RegExp(`${validDomainsDefault.join("|")}$`, "i");
  }
  return null;
}

function validateErrorMsg(errorMsg: (string | null)[] | undefined): void {
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
}

function validateMaxLength(maxLength: number | undefined): number {
  if (maxLength || maxLength === 0) {
    if (maxLength < 1 || typeof maxLength !== "number") {
      throw new Error("maxLength must be a number and cannot be less than 1");
    }
  }
  return maxLength ?? 400;
}

function getErrorMessage(
  index: number,
  errorMsg: (string | null)[] | undefined,
  maxEmailLength: number,
): string {
  const errorMessage: string | null = errorMsg
    ? errorMsg[index]
    : defaultErrorMsg[index];
  if (errorMessage === "Email too big, try again") {
    return `Email cannot be greater than ${maxEmailLength.toString()} characters`;
  }
  return errorMessage ?? defaultErrorMsg[index];
}
export default validateEmail;
