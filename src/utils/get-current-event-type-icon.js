import { EVENT_TYPES_VALUES } from '../const.js';

const getCurrentEventTypeIcon = (type) => {
  switch (type) {
    case EVENT_TYPES_VALUES.BUS:
      return 'bus';

    case EVENT_TYPES_VALUES.CHECK_IN:
      return 'check-in';

    case EVENT_TYPES_VALUES.DRIVE:
      return 'drive';

    case EVENT_TYPES_VALUES.FLIGHT:
      return 'flight';

    case EVENT_TYPES_VALUES.RESTAURANT:
      return 'restaurant';

    case EVENT_TYPES_VALUES.SHIP:
      return 'ship';

    case EVENT_TYPES_VALUES.SIGHTSEEING:
      return 'sightseeing';

    case EVENT_TYPES_VALUES.TAXI:
      return 'taxi';

    case EVENT_TYPES_VALUES.TRAIN:
      return 'train';

    default:
      return 'check-in';
  }
};

export { getCurrentEventTypeIcon };
