import { v4 as uuidv4 } from "uuid";

import { getRandomInteger } from "../utils/getRandomInteger";

const EVENT_TYPES = [
  "taxi",
  "bus",
  "train",
  "ship",
  "drive",
  "flight",
  "check-in",
  "sightseeing",
  "restaurant",
];

export const getEventMock = () => {
  const dateFrom = new Date(
    2024,
    getRandomInteger(0, 11),
    getRandomInteger(0, 28),
    getRandomInteger(0, 23)
  );
  const dateTo = new Date(
    dateFrom.getTime() + getRandomInteger(1, 5) * 60 * 1000 * 1000
  );

  return {
    id: uuidv4(),
    basePrice: getRandomInteger(100, 1000),
    dateFrom: dateFrom,
    dateTo: dateTo,
    destination: getRandomInteger(0, 5),
    isFavorite: getRandomInteger(0, 1) === 1,
    offers: Array.from({ length: getRandomInteger(0, 5) }, (_, i) => i),
    type: EVENT_TYPES[getRandomInteger(0, EVENT_TYPES.length - 1)],
  };
};
