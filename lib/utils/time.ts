interface Duration {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function calculateDuration(startDate: string, startTime: string): Duration | null {
  if (!startDate) return null;

  const [year, month, day] = startDate.split('-').map(Number);
  const [startHours, startMinutes] = startTime ? startTime.split(':').map(Number) : [0, 0];
  
  // Criar data no fuso horário local (Brasília)
  const start = new Date(Date.UTC(year, month - 1, day, startHours - 3, startMinutes));
  const now = new Date();
  
  if (isNaN(start.getTime())) return null;
  
  const diff = now.getTime() - start.getTime();
  
  return calculateTimeDifference(diff);
}

function calculateTimeDifference(milliseconds: number): Duration {
  const millisecondsPerYear = 1000 * 60 * 60 * 24 * 365.25; // Considerando anos bissextos
  const millisecondsPerMonth = millisecondsPerYear / 12;
  const millisecondsPerDay = 1000 * 60 * 60 * 24;
  const millisecondsPerHour = 1000 * 60 * 60;
  const millisecondsPerMinute = 1000 * 60;

  const years = Math.floor(milliseconds / millisecondsPerYear);
  const months = Math.floor((milliseconds % millisecondsPerYear) / millisecondsPerMonth);
  const days = Math.floor((milliseconds % millisecondsPerMonth) / millisecondsPerDay);
  const hours = Math.floor((milliseconds % millisecondsPerDay) / millisecondsPerHour);
  const minutes = Math.floor((milliseconds % millisecondsPerHour) / millisecondsPerMinute);
  const seconds = Math.floor((milliseconds % millisecondsPerMinute) / 1000);

  return { years, months, days, hours, minutes, seconds };
}