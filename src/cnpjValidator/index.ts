import type { ValidateFunctions } from "../types";
import cnpjIsValid1 from "./cnpjValidator1";
import cnpjIsValid2 from "./cnpjValidator2";

const defaultErrorMsg: string[] = [
  "CNPJ invalid",
  "CNPJ must have 14 numerical digits",
  "CNPJ is not valid",
];

function cnpjIsValid(
  cnpj: string,
  errorMsg: (string | null)[] | null = defaultErrorMsg,
  cnpjVersion: "v1" | "v2" = "v1",
): ValidateFunctions {
  if (cnpjVersion === "v2") {
    return cnpjIsValid2(cnpj, errorMsg);
  }

  return cnpjIsValid1(cnpj, errorMsg);
}

export default cnpjIsValid;
