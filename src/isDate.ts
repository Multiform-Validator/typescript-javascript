/**
 * @example isDate('2023-07-24'); // true
 * @example isDate('2023/07/24'); // true
 * @example isDate('24-07-2023'); // true
 * @example isDate('24/07/2023'); // true
 * @example isDate('July 24, 2023'); // true
 * @example isDate('2023-13-24'); // false (invalid month)
 * @example isDate('2023-07-40'); // false (invalid day)
 * @example isDate('2023-07'); // false (incomplete date)
 * @example isDate('Hello'); // false (not a valid date format)
 * @description Values have to be passed as a string
 */
function isDate(value: string): boolean {
  if (typeof value !== "string") {
    throw new TypeError("Input value must be a string.");
  }
  if (value.trim().length === 0) {
    throw new Error("Input value must not be an empty string.");
  }

  // Check if the date string is in a valid format (e.g., 'YYYY-MM-DD', 'MM/DD/YYYY', 'MMMM D, YYYY')
  const dateStringRegex1: RegExp = /^\d{4}[-/]\d{2}[-/]\d{2}$/; // 'YYYY-MM-DD' or 'YYYY/MM/DD'
  const dateStringRegex2: RegExp = /^\d{2}[-/]\d{2}[-/]\d{4}$/; // 'MM-DD-YYYY' or 'MM/DD/YYYY'
  const dateStringRegex3: RegExp = /^[A-Za-z]+\s\d{1,2}, \d{4}$/; // 'MMMM D, YYYY'
  if (
    !dateStringRegex1.test(value) &&
    !dateStringRegex2.test(value) &&
    !dateStringRegex3.test(value)
  ) {
    return false;
  }

  let year: number, month: number, day: number;

  if (dateStringRegex1.test(value)) {
    // 'YYYY-MM-DD' or 'YYYY/MM/DD'
    const parts: string[] = value.split(/[-/]/);
    year = parseInt(parts[0], 10);
    month = parseInt(parts[1], 10);
    day = parseInt(parts[2], 10);
  } else if (dateStringRegex2.test(value)) {
    // 'MM-DD-YYYY' or 'MM/DD/YYYY'
    const parts: string[] = value.split(/[-/]/);
    month = parseInt(parts[0], 10);
    day = parseInt(parts[1], 10);
    year = parseInt(parts[2], 10);
  } else {
    // 'MMMM D, YYYY'
    const parts: string[] = value.split(/[\s,]+/);
    month = new Date(Date.parse(parts[0] + " 1, 2000")).getMonth() + 1;
    day = parseInt(parts[1], 10);
    year = parseInt(parts[2], 10);
  }

  if (
    year < 1000 ||
    year > 9999 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return false;
  }

  // Check if the day is valid for the given month and year
  const daysInMonth: number[] = [
    31,
    (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ];
  if (day > daysInMonth[month - 1]) {
    return false;
  }
  return true;
}
export default isDate;
