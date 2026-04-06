/**
 * Normaliza telefone brasileiro para o formato +55XXXXXXXXXXX
 */
export function normalizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, '');
  while (digits.length > 11 && digits.startsWith('55')) {
    digits = digits.substring(2);
  }
  digits = digits.slice(0, 11);
  return `+55${digits}`;
}
