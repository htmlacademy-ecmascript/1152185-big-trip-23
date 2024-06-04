import { SORT_VALUES } from '../const';

const getTimeDifference = ({ dateFrom, dateTo }) =>
  new Date(dateTo).getDate() - new Date(dateFrom).getDate();

const sortPointsBy = {
  [SORT_VALUES.DAY]: (points) => [...points],
  [SORT_VALUES.TIME]: (points) =>
    [...points].sort((a, b) => getTimeDifference(b) - getTimeDifference(a)),
  [SORT_VALUES.PRICE]: (points) =>
    [...points].sort((a, b) => Number(b.basePrice) - Number(a.basePrice)),
};

export const sortPoints = (points, sortPointType) =>
  sortPointsBy[sortPointType](points);
