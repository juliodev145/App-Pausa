// Funções auxiliares (datas e formatação de tempo)

export const getMonthKey = (date = new Date()) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

export const getDayKey = (date = new Date()) =>
  `${getMonthKey(date)}-${String(date.getDate()).padStart(2, '0')}`;

export const emptyMonth = () => ({
  opens: 0,
  completedPauses: 0,
  importantMissed: 0,
  abandonedPauses: 0,
  activeDays: [],
});

export const emptyStats = () => ({
  totalPauses: 0,
  importantMissed: 0,
  totalAbandonments: 0,
  months: {},
});

// Nome do mês sem depender do Intl (que nem sempre funciona no Android)
const MONTHS = [
  'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
  'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro',
];

export const getMonthName = (date = new Date()) =>
  `${MONTHS[date.getMonth()]} de ${date.getFullYear()}`;

export const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (hours > 0) {
    const remainingMinutes = Math.floor((seconds % 3600) / 60);
    return `${String(hours).padStart(2, '0')}:${String(remainingMinutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  }

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};

export const formatRemainingTime = (seconds) => {
  if (seconds >= 3600) {
    const hours = Math.ceil(seconds / 3600);
    return `${hours} ${hours === 1 ? 'hora' : 'horas'}`;
  }

  if (seconds >= 60) {
    const minutes = Math.ceil(seconds / 60);
    return `${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`;
  }

  return `${seconds} ${seconds === 1 ? 'segundo' : 'segundos'}`;
};