export function formatCents(cents: number): string {
  const sign = cents < 0 ? "-" : "";
  const abs = Math.abs(cents);

  const eurosPart = Math.floor(abs / 100);
  const centsPart = String(abs % 100).padStart(2, "0");

  return `${sign}${eurosPart}.${centsPart}€`;
}
