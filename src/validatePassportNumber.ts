import type { ValidatePassportNumber } from "./types";

/**
 * @example validatePassportNumber('A1234567');
 * @example validatePassportNumber('123456789');
 * @description Values have to be passed as a string
 * @returns return { isValid: boolean, country: string }
 */
function validatePassportNumber(
  passaportNumber: string,
): ValidatePassportNumber {
  // Verificar se o parâmetro é uma string
  if (typeof passaportNumber !== "string") {
    throw new TypeError("The input should be a string.");
  }
  // Remover espaços em branco antes de realizar a validação
  const cleanedPassportNumber: string = passaportNumber.replace(/\s/g, "");
  // Mapear os formatos comuns de passaporte e seus respectivos países
  const passportFormats: {
    country: string;
    regex: RegExp;
  }[] = [
    { country: "United States", regex: /^\d{9}$/ },
    { country: "United Kingdom", regex: /^[A-Z]{2}\d{6}$/ },
    { country: "Germany", regex: /^[A-Z]{2}\d{8}$/ },
    { country: "Canada", regex: /^[A-Z]\d{7}$/ },
    { country: "Australia", regex: /^[A-Z]\d{7}$/ },
    { country: "Brazil", regex: /^\d{9}$/ },
    { country: "France", regex: /^[A-Z]{2}\d{7}$/ },
    { country: "Italy", regex: /^[A-Z]\d{7}$/ },
    { country: "India", regex: /^[A-Z]\d{7}$/ },
    { country: "China", regex: /^[A-Z]\d{8}$/ },
  ];
  // Verificar o formato do passaporte antes de verificar o país
  for (const format of passportFormats) {
    if (format.regex.test(cleanedPassportNumber)) {
      return { isValid: true, country: format.country };
    }
  }
  // Caso o formato não seja válido, retornar { isValid: false, country: null }
  return { isValid: false, country: null };
}

export default validatePassportNumber;
