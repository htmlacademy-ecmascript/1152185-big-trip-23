import { FILTERS_TYPE } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const getCurrentText = (filterType) => {
  switch (filterType) {
    case FILTERS_TYPE.EVERYTHING:
      return 'Click New Event to create your first point';
    case FILTERS_TYPE.PAST:
      return 'There are no past events now';
    case FILTERS_TYPE.PRESENT:
      return 'There are no present events now';
    case FILTERS_TYPE.FUTURE:
      return 'There are no future events now';

    default:
      throw new Error('unknow filterType');
  }
};

const createEmptyEventsTemplate = (text) =>
  `<p class="trip-events__msg">${text}</p>`;

export default class EmptyEvents extends AbstractView {
  constructor(activeFilter) {
    super();
    this.activeFilter = activeFilter;
  }

  get template() {
    return createEmptyEventsTemplate(getCurrentText(this.activeFilter));
  }
}
