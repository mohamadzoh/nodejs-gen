// import camelCase from './camel-case'
const UPPERCASE = /[\p{Lu}]/u;
const LOWERCASE = /[\p{Ll}]/u;
const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[_.\- ]+/;

const LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER = new RegExp(
  SEPARATORS.source + IDENTIFIER.source,
  "gu"
);
const NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");

const preserveCamelCase = (
  string: string,
  toLowerCase: { (string: string): string; (arg0: string): string },
  toUpperCase: { (string: string): string; (arg0: string): string }
) => {
  let isLastCharLower = false;
  let isLastCharUpper = false;
  let isLastLastCharUpper = false;

  for (let index = 0; index < string.length; index++) {
    const character = string[index];

    if (isLastCharLower && UPPERCASE.test(character)) {
      string = string.slice(0, index) + "-" + string.slice(index);
      isLastCharLower = false;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = true;
      index++;
    } else if (
      isLastCharUpper &&
      isLastLastCharUpper &&
      LOWERCASE.test(character)
    ) {
      string = string.slice(0, index - 1) + "-" + string.slice(index - 1);
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper = false;
      isLastCharLower = true;
    } else {
      isLastCharLower =
        toLowerCase(character) === character &&
        toUpperCase(character) !== character;
      isLastLastCharUpper = isLastCharUpper;
      isLastCharUpper =
        toUpperCase(character) === character &&
        toLowerCase(character) !== character;
    }
  }

  return string;
};

const postProcess = (
  input: string,
  toUpperCase: { (string: any): any; (arg0: any): any }
) => {
  SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
  NUMBERS_AND_IDENTIFIER.lastIndex = 0;

  return input
    .replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) =>
      toUpperCase(identifier)
    )
    .replace(NUMBERS_AND_IDENTIFIER, (m) => toUpperCase(m));
};

function camelCase(input: string) {
  if (!(typeof input === "string")) {
    throw new TypeError("Expected the input to be `string | string[]`");
  }
  input = input.trim();
  if (input.length === 0) {
    return "";
  }

  const toLowerCase = (string: string) => string.toLowerCase();

  const toUpperCase = (string: string) => string.toUpperCase();

  if (input.length === 1) {
    if (SEPARATORS.test(input)) {
      return "";
    }
    return toLowerCase(input);
  }

  const hasUpperCase = input !== toLowerCase(input);
  if (hasUpperCase) {
    input = preserveCamelCase(input, toLowerCase, toUpperCase);
  }
  input = input.replace(LEADING_SEPARATORS, "");
  input = toLowerCase(input);
  return postProcess(input, toUpperCase);
}
function pascalCase(string: string) {
  string = camelCase(string);
  return string[0].toUpperCase() + string.slice(1);
}
function kebabCase(string: string) {
  return string
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    .map((x) => x.toLowerCase())
    .join("-");
}
export { pascalCase, camelCase, kebabCase };
