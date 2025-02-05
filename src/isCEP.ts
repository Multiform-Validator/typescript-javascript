/**
 * @example isCEP('12345-678');
 * @example isCEP('12345678');
 * @example isCEP('12.345-678');
 */
function isCEP(cep: string): boolean {
  if (typeof cep !== "string") {
    throw new TypeError("Input value must be a string.");
  }
  if (cep.length < 8 || cep.length > 10) {
    return false;
  }
  // Clean the CEP and keep only the numbers
  const cepString: string = cep.replace(/\D/g, ""); // The \D pattern matches any non-digit character
  // Check if the cleaned CEP contains only numbers
  if (cepString.length !== 8) {
    return false;
  }

  return true;
}
export default isCEP;
