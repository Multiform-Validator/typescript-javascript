import type { ValidateFunctions } from "../types";
import cnpjIsValid1 from "./cnpjValidator1";
import cnpjIsValid2 from "./cnpjValidator2";

function cnpjIsValid(
  cnpj: string,
  errorMsg: (string | null)[] | null = null,
  cnpjVersion: "v1" | "v2" | null = null,
): ValidateFunctions {
  if (typeof cnpj !== "string") {
    throw new TypeError("The input should be a string.");
  }

  // Check para saber se as mensagens que sao passadas sao validas
  // caso contrario retorna um ERRO
  if (errorMsg) {
    if (!Array.isArray(errorMsg)) throw new Error("Must be an Array");

    for (const element of errorMsg) {
      if (element != null && typeof element !== "string") {
        throw new TypeError(
          "All values within the array must be strings or null/undefined.",
        );
      }
    }
  }

  if (cnpjVersion === "v1") {
    return cnpjIsValid1(cnpj, errorMsg);
  }

  if (cnpjVersion === "v2") {
    return cnpjIsValid2(cnpj, errorMsg);
  }

  const isCnpjOnlyNumbers: boolean = /^\d+$/.test(cnpj);

  if (isCnpjOnlyNumbers) {
    return cnpjIsValid1(cnpj, errorMsg);
  }

  return cnpjIsValid2(cnpj, errorMsg);
}

export default cnpjIsValid;
