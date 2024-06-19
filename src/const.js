const DATE_FORMATS = {
  time: 'HH:mm',
  shortDate: 'MMM DD',
  formDateTime: 'DD/MM/YY HH:mm',
};

const DURATION_FORMATS = {
  days: 'DD[D] HH[H] mm[M]',
  hours: 'HH[H] mm[M]',
  mins: 'mm[M]',
};

const AUTHORIZATION = 'Basic umB1tRoVHKu5p32dQ';
const END_POINT = 'https://23.objects.htmlacademy.pro/big-trip';

const MODE_EVENT = {
  VIEW: 'VIEW',
  EDIT: 'EDIT',
};

const EVENT_TYPES = [
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

const FILTERS = ['everything', 'future', 'present', 'past'];

const DEFAULT_FILTER = FILTERS[0];

const EVENT_TYPES_VALUES = {
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

const SORT_VALUES = {
  DAY: 'day',
  EVENT: 'event',
  TIME: 'time',
  PRICE: 'price',
  OFFER: 'offer',
};

const DISABLED_SORT_VALUES = [SORT_VALUES.EVENT, SORT_VALUES.OFFER];

const DEFAULT_SORT_TYPE = SORT_VALUES.DAY;

const USER_ACTIONS = {
  UPDATE_EVENT: 'UPDATE_EVENT',
  DELETE_EVENT: 'DELETE_EVENT',
  ADD_EVENT: 'ADD_EVENT',
};

const UPDATE_TYPES = {
  EVENT_DATA_CHANGE: 'event_data_change',
  NEW_DATA: 'new_data',
  FILTER_DATA: 'filter_data',
  INIT: 'init',
};

const TIME_LIMIT = {
  LOWER_LIMIT: 350,
  UPPER_LIMIT: 1000,
};

const FILTERS_TYPE = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PRESENT: 'present',
  PAST: 'past',
};

const EVENT_EMPTY = {
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: null,
  isFavorite: false,
  offers: [],
  type: EVENT_TYPES_VALUES.FLIGHT,
};

const Method = {
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  DELETE: 'DELETE',
};

const SourceUrl = {
  POINTS: 'points',
  OFFERS: 'offers',
  DESTINATIONS: 'destinations',
};

const EVENT_UPDATE_STATE = {
  CREATE: 'create',
  UPDATE: 'update',
};

export {
  DATE_FORMATS,
  DURATION_FORMATS,
  AUTHORIZATION,
  MODE_EVENT,
  END_POINT,
  EVENT_TYPES,
  FILTERS,
  SORT_VALUES,
  EVENT_UPDATE_STATE,
  SourceUrl,
  Method,
  EVENT_EMPTY,
  FILTERS_TYPE,
  TIME_LIMIT,
  UPDATE_TYPES,
  USER_ACTIONS,
  DEFAULT_SORT_TYPE,
  DISABLED_SORT_VALUES,
  EVENT_TYPES_VALUES,
  DEFAULT_FILTER,
};
