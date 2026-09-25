/** A phone number of 7 to 20 characters: digits, spaces, brackets and dashes, optionally with a leading +. */
export const PHONE_PATTERN = /^\+?[0-9\s()-]{7,20}$/;

/** At least one non-whitespace character, so "   " doesn't pass as a filled-in field. */
export const NOT_BLANK = /\S/;
