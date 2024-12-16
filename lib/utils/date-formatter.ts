import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDateToBrazilian(date: string | Date): string {
  if (!date) return '';
  
  try {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    // Ajusta o fuso horário para Brasília (UTC-3)
    const utcDate = new Date(Date.UTC(
      dateObj.getUTCFullYear(),
      dateObj.getUTCMonth(),
      dateObj.getUTCDate(),
      dateObj.getUTCHours() - 3,
      dateObj.getUTCMinutes()
    ));
    
    return format(utcDate, "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  } catch {
    return '';
  }
}