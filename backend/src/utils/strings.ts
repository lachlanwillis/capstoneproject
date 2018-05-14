/**
 * Checks a string to see if it's valid. E.g. not just whitespace.
 * @param string the string to be checked
 * @returns whether or not the string is empty or not
 */
export function isValidSting(string: string): boolean {
    return string.replace(' ', '').split('').length > 0;
  }