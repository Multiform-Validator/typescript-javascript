import type { ValidateFunctions } from "../types";

const defaultErrorMsg: string[] = [
  "CNPJ invalid",
  "CNPJ must have 14 alphanumerical digits",
  "CNPJ is not valid",
];

const tamanhoCNPJSemDV: number = 12;
const regexCNPJSemDV: RegExp = /^([A-Z\d]){12}$/;
const regexCNPJ: RegExp = /^([A-Z\d]){12}(\d){2}$/;
const regexCaracteresMascara: RegExp = /[./-]/g;
const regexCaracteresNaoPermitidos: RegExp = /[^A-Z\d./-]/i;
const valorBase: number = "0".charCodeAt(0); // nosonar
const pesosDV: number[] = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
const cnpjZerado: string = "00000000000000";

function isValid(cnpj: string): boolean {
  if (!regexCaracteresNaoPermitidos.test(cnpj)) {
    const cnpjSemMascara: string = removeMascaraCNPJ(cnpj);

    if (regexCNPJ.test(cnpjSemMascara) && cnpjSemMascara !== cnpjZerado) {
      const dvInformado: string = cnpjSemMascara.substring(tamanhoCNPJSemDV);

      const dvCalculado: string = calculaDV(
        cnpjSemMascara.substring(0, tamanhoCNPJSemDV),
      );

      return dvInformado === dvCalculado;
    }
  }

  return false;
}

function calculaDV(cnpj: string): string {
  if (!regexCaracteresNaoPermitidos.test(cnpj)) {
    const cnpjSemMascara: string = removeMascaraCNPJ(cnpj);

    if (
      regexCNPJSemDV.test(cnpjSemMascara) &&
      cnpjSemMascara !== cnpjZerado.substring(0, tamanhoCNPJSemDV)
    ) {
      let somatorioDV1: number = 0;
      let somatorioDV2: number = 0;

      for (let i: number = 0; i < tamanhoCNPJSemDV; i++) {
        const asciiDigito: number = cnpjSemMascara.charCodeAt(i) - valorBase; // nosonar

        somatorioDV1 += asciiDigito * pesosDV[i + 1];
        somatorioDV2 += asciiDigito * pesosDV[i];
      }

      const dv1: number = somatorioDV1 % 11 < 2 ? 0 : 11 - (somatorioDV1 % 11);
      somatorioDV2 += dv1 * pesosDV[tamanhoCNPJSemDV];

      const dv2: number = somatorioDV2 % 11 < 2 ? 0 : 11 - (somatorioDV2 % 11);

      return `${String(dv1)}${String(dv2)}`;
    }
  }

  throw new Error(
    "Não é possível calcular o DV pois o CNPJ fornecido é inválido",
  );
}

function removeMascaraCNPJ(cnpj: string): string {
  return cnpj.replace(regexCaracteresMascara, ""); // nosonar
}

function cnpjIsValid(
  cnpj: string,
  errorMsg: (string | null)[] | null = defaultErrorMsg,
): ValidateFunctions {
  // Função interna para obter a mensagem de erro
  function getErrorMessage(index: number): string {
    const errorMessage: string | null = errorMsg ? errorMsg[index] : null;
    return errorMessage ?? defaultErrorMsg[index];
  }

  if (!cnpj) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(0), // 'CNPJ invalid'
    };
  }
  // Check if the CNPJ has 14 digits
  if (cnpj.length !== 14 && cnpj.length !== 18) {
    return {
      isValid: false,
      errorMsg: getErrorMessage(1), // 'CNPJ must have 14 numerical digits'
    };
  }

  try {
    if (isValid(cnpj)) {
      return {
        isValid: true,
        errorMsg: null,
      };
    }
  } catch {
    return {
      isValid: false,
      errorMsg: getErrorMessage(2), // 'CNPJ is not valid'
    };
  }

  return {
    isValid: false,
    errorMsg: getErrorMessage(2), // 'CNPJ is not valid'
  };
}

export default cnpjIsValid;
