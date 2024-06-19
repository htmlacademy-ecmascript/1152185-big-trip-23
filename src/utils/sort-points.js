import dayjs from 'dayjs';
import { SORT_VALUES } from '../const';

const getPointsByDate = (pointA, pointB) =>
  dayjs(pointA.dateFrom).diff(dayjs(pointB.dateFrom));

const getPointsByTime = (pointA, pointB) => {
  const pointADuration = dayjs(pointA.dateTo).diff(dayjs(pointA.dateFrom));
  const pointBDuration = dayjs(pointB.dateTo).diff(dayjs(pointB.dateFrom));
  return pointBDuration - pointADuration;
};

const sortPointsBy = {
  [SORT_VALUES.DAY]: (points) => points.toSorted(getPointsByDate),
  [SORT_VALUES.TIME]: (points) => points.toSorted(getPointsByTime),
  [SORT_VALUES.PRICE]: (points) =>
    [...points].sort((a, b) => Number(b.basePrice) - Number(a.basePrice)),
};

const sortPoints = (points, sortPointType) =>
  sortPointsBy[sortPointType](points);

export { sortPoints };
