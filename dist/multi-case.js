"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kebabCase = exports.camelCase = exports.pascalCase = void 0;
// import camelCase from './camel-case'
const UPPERCASE = /[\p{Lu}]/u;
const LOWERCASE = /[\p{Ll}]/u;
const IDENTIFIER = /([\p{Alpha}\p{N}_]|$)/u;
const SEPARATORS = /[_.\- ]+/;
const LEADING_SEPARATORS = new RegExp("^" + SEPARATORS.source);
const SEPARATORS_AND_IDENTIFIER = new RegExp(SEPARATORS.source + IDENTIFIER.source, "gu");
const NUMBERS_AND_IDENTIFIER = new RegExp("\\d+" + IDENTIFIER.source, "gu");
const preserveCamelCase = (string, toLowerCase, toUpperCase) => {
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
        }
        else if (isLastCharUpper &&
            isLastLastCharUpper &&
            LOWERCASE.test(character)) {
            string = string.slice(0, index - 1) + "-" + string.slice(index - 1);
            isLastLastCharUpper = isLastCharUpper;
            isLastCharUpper = false;
            isLastCharLower = true;
        }
        else {
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
const postProcess = (input, toUpperCase) => {
    SEPARATORS_AND_IDENTIFIER.lastIndex = 0;
    NUMBERS_AND_IDENTIFIER.lastIndex = 0;
    return input
        .replace(SEPARATORS_AND_IDENTIFIER, (_, identifier) => toUpperCase(identifier))
        .replace(NUMBERS_AND_IDENTIFIER, (m) => toUpperCase(m));
};
function camelCase(input) {
    if (!(typeof input === "string")) {
        throw new TypeError("Expected the input to be `string | string[]`");
    }
    input = input.trim();
    if (input.length === 0) {
        return "";
    }
    const toLowerCase = (string) => string.toLowerCase();
    const toUpperCase = (string) => string.toUpperCase();
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
exports.camelCase = camelCase;
function pascalCase(string) {
    string = camelCase(string);
    return string[0].toUpperCase() + string.slice(1);
}
exports.pascalCase = pascalCase;
function kebabCase(string) {
    return string
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map((x) => x.toLowerCase())
        .join("-");
}
exports.kebabCase = kebabCase;
