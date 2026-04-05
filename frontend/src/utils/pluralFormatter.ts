export type PluralFormsType = [string, string, string];

export const pluralFormatter = (n: number, forms: PluralFormsType): string => {
  const mod10 = n % 10;
  const mod100 = n % 100;

  if (mod100 >= 11 && mod100 <= 14) return `${n} ${forms[2]}`;
  if (mod10 === 1) return `${n} ${forms[0]}`;
  if (mod10 >= 2 && mod10 <= 4) return `${n} ${forms[1]}`;

  return `${n} ${forms[2]}`;
};
