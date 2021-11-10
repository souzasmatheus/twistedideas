export const getYear = (date: Date | string): number =>
  date instanceof Date ? date.getFullYear() : new Date(date).getFullYear();
