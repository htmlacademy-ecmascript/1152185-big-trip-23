import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const calculateDuration = (dateFrom, dateTo) => {
  const diff = dayjs(dateTo).diff(dayjs(dateFrom));
  const eventDuration = dayjs.duration(diff);
  if (eventDuration.days()) {
    return eventDuration.format('DD[D] HH[H] mm[M]');
  }
  if (eventDuration.hours()) {
    return eventDuration.format('HH[H] mm[M]');
  }
  return eventDuration.format('mm[M]');
};
