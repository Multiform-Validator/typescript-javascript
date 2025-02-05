import getOnlyEmail from "../../src/getOnlyEmail";

type GetOnlyEmailReturn = string | string[];

describe("getOnlyEmail", () => {
  it("should return the first email when multiple is false", () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe: joao@empresa.com, maria@empresa.com, contato@empresa.com",
      { multiple: false },
    );
    expect(result).toBe("joao@empresa.com");
  });

  it("should return all emails when multiple is true", () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe: joao@empresa.com, maria@empresa.com, contato@empresa.com",
      { multiple: true },
    );
    expect(result).toEqual([
      "joao@empresa.com",
      "maria@empresa.com",
      "contato@empresa.com",
    ]);
  });

  it("should return cleaned emails when cleanDomain is true", () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe: joao@empresa.com.br, maria@empresa.com.io, contato@empresa.com.pt jonyjony@gmail.comAwaodiawdoi",
      { multiple: true, cleanDomain: true },
    );
    expect(result).toEqual([
      "joao@empresa.com.br",
      "maria@empresa.com.io",
      "contato@empresa.com.pt",
      "jonyjony@gmail.com",
    ]);
  });

  // multiple true, cleanDomain false
  test("multiple true, cleanDomain false", () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe: john@gmail.com, jon2@gmail.com,",
      { multiple: true, cleanDomain: false },
    );

    expect(result).toEqual(["john@gmail.com", "jon2@gmail.com"]);
  });

  // multiple false, cleanDomain true
  test("multiple false, cleanDomain true", () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe: john@gmail.com, jon2@gmail.com,",
      { multiple: false, cleanDomain: true },
    );

    expect(result).toEqual("john@gmail.com");
  });

  it("should return unique emails when repeatEmail is false", () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe: joao@empresa.com, joao@empresa.com, joao@empresa.com",
      { multiple: true, cleanDomain: false, repeatEmail: false },
    );
    expect(result).toEqual(["joao@empresa.com"]);
  });

  it("should return repeated emails when repeatEmail is true", () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe: joao@empresa.com, joao@empresa.com, joao@empresa.com",
      { multiple: true, cleanDomain: false, repeatEmail: true },
    );
    expect(result).toEqual([
      "joao@empresa.com",
      "joao@empresa.com",
      "joao@empresa.com",
    ]);
  });

  it('should return "No email found" when no email is present', () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe",
      {
        multiple: false,
      },
    );
    expect(result).toBe("No email found");
  });

  it('should return "No email found" even if non of the options are passed', () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe",
    );
    expect(result).toBe("No email found");
  });

  it("should return an email even if non of the options are passed", () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe:	alexa@google.com",
    );
    expect(result).toBe("alexa@google.com");
  });

  it("should clean the domain from the email when cleanDomain is true", () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe:	alexa@google.com.br",
      { cleanDomain: true },
    );
    expect(result).toBe("alexa@google.com.br");
  });

  it("should clean the domain from the email using a custom domain list", () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe:	alexa@google.custom",
      { cleanDomain: [".custom"] },
    );
    expect(result).toBe("alexa@google.custom");
  });

  it("should return the first email when repeatEmail is true and multiple is false", () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe: john@gmail.com, john@gmail.com",
      { multiple: false, cleanDomain: false, repeatEmail: true },
    );
    expect(result).toBe("john@gmail.com");
  });

  it("should return the first cleaned email when repeatEmail is true and multiple is false", () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe: john@gmail.comXTRA, alexa@gmail.comXTRA",
      { multiple: false, cleanDomain: true, repeatEmail: true },
    );
    expect(result).toBe("john@gmail.com");
  });

  it("should return all cleaned emails when repeatEmail is true and multiple is true", () => {
    const result: GetOnlyEmailReturn = getOnlyEmail(
      "Entre em contato com a equipe: john@gmail.comXTRA, alexa@gmail.comXTRA",
      { multiple: true, cleanDomain: true, repeatEmail: true },
    );
    expect(result).toEqual(["john@gmail.com", "alexa@gmail.com"]);
  });
});
