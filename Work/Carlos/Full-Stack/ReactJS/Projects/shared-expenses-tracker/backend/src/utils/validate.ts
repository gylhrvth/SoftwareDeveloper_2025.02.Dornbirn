export function isValidEmail(email: string): boolean {
  // Simple regex for email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function isPositiveNumber(value: any): boolean {
  return typeof value === "number" && value > 0;
}