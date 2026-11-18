export const DEFAULT_WHATSAPP_MESSAGE =
  "Olá, gostaria de informações para agendar um horário na ÁUREA.";

/**
 * Recebe telefone internacional com DDI. Retorna null quando o número não
 * está configurado ou não tem formato plausível, evitando links fictícios.
 */
export function buildWhatsAppUrl(
  phone: string | null | undefined,
  message = DEFAULT_WHATSAPP_MESSAGE,
): string | null {
  const input = phone?.trim();
  if (!input || !/^\+?[\d ().-]+$/.test(input)) return null;
  const number = input.replace(/\D/g, "");

  if (!/^[1-9]\d{9,14}$/.test(number)) return null;

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
