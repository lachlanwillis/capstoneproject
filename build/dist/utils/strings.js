"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Checks a string to see if it's valid. E.g. not just whitespace.
 * @param string the string to be checked
 * @returns whether or not the string is empty or not
 */
function isValidSting(string) {
    return string.replace(' ', '').split('').length > 0;
}
exports.isValidSting = isValidSting;
