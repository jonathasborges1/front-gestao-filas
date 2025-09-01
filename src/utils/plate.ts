// src/utils/plate.ts
export type PlateKind = "old" | "mercosul" | "invalid";

// BR antigo: LLL-9999 ou LLL9999
const OLD_RE = /^([A-Z]{3})[-\s]?(\d{4})$/;
// Mercosul (Brasil): LLL9L99
const NEW_RE = /^([A-Z]{3})(\d)([A-Z])(\d{2})$/;

export function normalizePlate(input?: string): string {
  if (!input) return "";
  return input
    .toUpperCase()
    .replace(/[^A-Z0-9- ]/g, "")
    .trim();
}

export function isOldPlate(raw?: string): boolean {
  const s = normalizePlate(raw).replace(/\s/g, "");
  return OLD_RE.test(s);
}

export function isMercosulPlate(raw?: string): boolean {
  const s = normalizePlate(raw).replace(/[\s-]/g, "");
  return NEW_RE.test(s);
}

export function detectPlateKind(raw?: string): PlateKind {
  if (isOldPlate(raw)) return "old";
  if (isMercosulPlate(raw)) return "mercosul";
  return "invalid";
}

/**
 * Formata APENAS para exibição, sem conversão de modelo:
 * - old: mostra como "ABC-1234"
 * - mercosul: mostra como "ABC 1C34"
 * - inválida: placeholder
 */
export function formatPlate(raw?: string): string {
  if (!raw) return "— — — —";
  const s = normalizePlate(raw);

  // Mercosul → "ABC 1C34"
  const merc = s.replace(/[\s-]/g, "").match(NEW_RE);
  if (merc) {
    const [, l3, n1, l1, n2] = merc;
    return `${l3} ${n1}${l1}${n2}`;
  }

  // Antiga → "ABC-1234"
  const old = s.replace(/\s/g, "").match(OLD_RE);
  if (old) {
    const [, l3, d4] = old;
    return `${l3}-${d4}`;
  }

  return "— — — —";
}
