const MSEC_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_DAY = 24;
export const DATE_FORMATS = {
  time: "HH:mm",
  shortDate: "MMM DD",
  formDateTime: "DD/MM/YY HH:mm",
};
export const DURATION_FORMATS = {
  days: "DD[D] HH[H] mm[M]",
  hours: "HH[H] mm[M]",
  mins: "mm[M]",
};

export const MSEC_IN_HOUR = MSEC_IN_SEC * SEC_IN_MIN * MIN_IN_HOUR;
export const MSEC_IN_DAY = MSEC_IN_HOUR * HOUR_IN_DAY;

export const MODE_EVENT = {
  VIEW: "VIEW",
  EDIT: "EDIT",
};

export const EVENT_TYPES = [
  "bus",
  "check-in",
  "drive",
  "flight",
  "restaurant",
  "ship",
  "sightseeing",
  "taxi",
  "train",
];

export const SORT_VALUES = {
  DAY: "day",
  EVENT: "event",
  TIME: "time",
  PRICE: "price",
  OFFER: "offer",
};

export const DISABLED_SORT_VALUES = [SORT_VALUES.EVENT, SORT_VALUES.OFFER];

export const DEFAULT_SORT_TYPE = SORT_VALUES.DAY;

export const USER_ACTIONS = {
  UPDATE_EVENT: "UPDATE_EVENT",
  DELETE_EVENT: "DELETE_EVENT",
  ADD_EVENT: "ADD_EVENT",
};

export const UPDATE_TYPES = {
  EVENT_DATA_CHANGE: "EVENT_DATA_CHANGE",
  NEW_DATA: "NEW_DATA",
  FILTER_DATA: "FILTER_DATA",
};

export const FILTERS_TYPE = {
  EVERYTHING: "EVERYTHING",
  FUTURE: "FUTURE",
  PRESENT: "PRESENT",
  PAST: "PAST",
};

export const EVENT_EMPTY = {
  basePrice: 0,
  dateFrom: new Date(),
  dateTo: new Date(),
  destination: null,
  isFavorite: false,
  offers: [],
  type: EVENT_TYPES[0],
};
