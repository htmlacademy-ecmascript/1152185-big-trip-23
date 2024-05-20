import dayjs from 'dayjs';
import { calculateDuration } from '../utils/calculateDuration.js';
import AbstractView from '../framework/view/abstract-view.js';
import { getCurrentEventTypeIcon } from '../utils/getCurrentEventTypeIcon.js';

const createEventTemplate = (
  { id, basePrice, dateFrom, dateTo, isFavorite, offers, type },
  offer,
  destination
) => `<li class="trip-events__item" id={${id}}>
  <div class="event">
    <time class="event__date" datetime="2019-03-18">MAR 18</time>
    <div class="event__type">
      <img class="event__type-icon" width="42" height="42" src="img/icons/${getCurrentEventTypeIcon(
    type
  )}.png" alt="Event type icon">
    </div>
    <h3 class="event__title">${type} ${destination ? destination.name : ''}</h3>
    <div class="event__schedule">
      <p class="event__time">
        <time class="event__start-time" datetime="${dateFrom}">${dayjs(
  dateFrom
).format('HH:mm')}</time>
        —
        <time class="event__end-time" datetime="${dateTo}">${dayjs(
  dateTo
).format('HH:mm')}</time>
      </p>
        <p class="event__duration">${calculateDuration(dateFrom, dateTo)}</p>
    </div>
    <p class="event__price">
      €&nbsp;<span class="event__price-value">${basePrice}</span>
    </p>
    ${
  offers.length > 0
    ? `<h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
      ${offer
    .map(
      (item) => `<li class="event__offer">
        <span class="event__offer-title">${item.title}</span>
        +€&nbsp;
        <span class="event__offer-price">${item.price}</span>
      </li>`
    )
    .join('')}
      </ul>`
    : ''
}
    <button class="event__favorite-btn ${
  isFavorite ? '' : 'event__favorite-btn--active'
}" type="button">
      <span class="visually-hidden">${
  isFavorite ? 'Remove favorite' : 'Add to favorite'
}</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"></path>
      </svg>
    </button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </div>
</li>`;

export default class Event extends AbstractView {
  #event = null;
  #offers = null;
  #destinations = null;
  #onHanldlerClickRollupBtn = null;
  #rollupBtn = null;

  constructor(event, offers, destinations, onHanldlerClickRollupBtn) {
    super();
    this.#event = event;
    this.#offers = offers;
    this.#destinations = destinations;
    this.#onHanldlerClickRollupBtn = onHanldlerClickRollupBtn;
    this.#rollupBtn = this.element.querySelector('.event__rollup-btn');
    this.#rollupBtn.addEventListener('click', this.#handlerClickRollupBtn);
  }

  get template() {
    return createEventTemplate(this.#event, this.#offers, this.#destinations);
  }

  #handlerClickRollupBtn = (e) => {
    e.preventDefault();
    this.#onHanldlerClickRollupBtn();
  };
}
