import dayjs from 'dayjs';
import { FILTERS_TYPE } from '../const.js';

const isPointFuture = (point) => dayjs(point.dateFrom).isAfter(dayjs(), 'D');
const isPointPresent = (point) =>
  (dayjs(point.dateFrom).isBefore(dayjs(), 'D') ||
    dayjs(point.dateFrom).isSame(dayjs(), 'D')) &&
  (dayjs(point.dateTo).isAfter(dayjs(), 'D') ||
    dayjs(point.dateTo).isSame(dayjs(), 'D'));
const isPointPast = (point) => dayjs(point.dateTo).isBefore(dayjs(), 'D');

export const filter = {
  [FILTERS_TYPE.EVERYTHING]: (points) => [...points],
  [FILTERS_TYPE.FUTURE]: (points) =>
    points.filter((point) => isPointFuture(point)),
  [FILTERS_TYPE.PRESENT]: (points) =>
    points.filter((point) => isPointPresent(point)),
  [FILTERS_TYPE.PAST]: (points) => points.filter((point) => isPointPast(point)),
};
