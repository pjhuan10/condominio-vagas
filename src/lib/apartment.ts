export function normalizeApartmentNumber(input: string): string {
  return input
    .trim()
    .toUpperCase()
    .replace(/^APTO\s*/i, "")
    .replace(/\s+/g, "");
}

export function isValidApartmentNumber(input: string): boolean {
  return /^\d+[A-D]$/.test(input);
}

export function formatApartmentLabel(input: string): string {
  return `Apto ${input}`;
}
