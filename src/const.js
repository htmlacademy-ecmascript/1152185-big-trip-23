export const DATE_FORMATS = {
  time: 'HH:mm',
  shortDate: 'MMM DD',
  formDateTime: 'DD/MM/YY HH:mm',
};
export const DURATION_FORMATS = {
  days: 'DD[D] HH[H] mm[M]',
  hours: 'HH[H] mm[M]',
  mins: 'mm[M]',
};

export const AUTHORIZATION = 'Basic umB1tRoVHKu5p32dQ';
export const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

export const MODE_EVENT = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};

export const EVENT_TYPES = [
  'bus',
  'check-in',
  'drive',
  'flight',
  'restaurant',
  'ship',
  'sightseeing',
  'taxi',
  'train',
];

export const FILTERS = ['everything', 'future', 'present', 'past'];

export const DEFAULT_FILTER = FILTERS[0];

export const EVENT_TYPES_VALUES = {
  BUS: 'bus',
  CHECK_IN: 'check-in',
  DRIVE: 'drive',
  FLIGHT: 'flight',
  RESTAURANT: 'restaurant',
  SHIP: 'ship',
  SIGHTSEEING: 'sightseeing',
  TAXI: 'taxi',
  TRAIN: 'train',
};

export const SORT_VALUES = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

export const DISABLED_SORT_VALUES = [SORT_VALUES.EVENT, SORT_VALUES.OFFER];

export const DEFAULT_SORT_TYPE = SORT_VALUES.DAY;

export const USER_ACTIONS = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
};

export const UPDATE_TYPES = {
  EVENT_DATA_CHANGE: 'event_data_change',
  NEW_DATA: 'new_data',
  FILTER_DATA: 'filter_data',
  INIT: 'init',
};

export const TIME_LIMIT = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

export const FILTERS_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

export const EVENT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: EVENT_TYPES_VALUES.FLIGHT,
};

export const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

export const SourceUrl = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};

export const EVENT_UPDATE_STATE = {
  CREATE: 'create',
  UPDATE: 'update',
};
