import { EVENT_TYPES } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getCurrentEventTypeIcon } from '../utils/getCurrentEventTypeIcon.js';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const createDataListWithDestinationsTemplate = (
  destinations
) => `      <datalist id="destination-list-1">${destinations
  .map(
    (item) => `<option id=${item.id} value=${item.name}>${item.name}</option>`
  )
  .join('')}
  </datalist>`;

const createOfferTemplate = (offer, offersInEvent) => {
  const currentId = `${uuidv4()}-MY_ID-${offer.id}`;

  return `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="${currentId}" type="checkbox" name="event-offer-luggage" ${
  offersInEvent.includes(offer.id) ? 'checked' : ''
}>
  <label class="event__offer-label" for="${currentId}">
    <span class="event__offer-title">${offer.title}</span>
    +€&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`;
};

const createEventType = (type) => `<fieldset class="event__type-group">
<legend class="visually-hidden">Event type</legend>
${EVENT_TYPES.map(
    (item) => `<div class="event__type-item">
    <input ${
  item === type ? 'checked=' : ''
} id="event-type-${item}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${item}">
    <label class="event__type-label  event__type-label--${item}" for="event-type-${item}-1"
  }>${item}</label>
  </div>`
  ).join('')}
</fieldset>`;

const createDestinationTemplate = (
  destination
) => `<section class="event__section  event__section--destination">
<h3 class="event__section-title  event__section-title--destination">Destination</h3>
<p class="event__destination-description">${destination.description}</p>
${
  destination.pictures
    ? `<div class="event__photos-container">
                <div class="event__photos-tape">
                  ${destination.pictures
    .map(
      (item) =>
        `<img class="event__photo" src=${item.src} alt=${item.description}>`
    )
    .join('')}
                </div>
              </div>`
    : ''
}
</section>`;

const createEventUpdateTemplate = (state, allDestinations, allOffers) => {
  const { id, basePrice, dateFrom, dateTo, offers, type, destination } = state;
  const dateFromText = dayjs(dateFrom).format('DD/MM/YY HH:mm');
  const dateToText = dayjs(dateTo).format('DD/MM/YY HH:mm');
  const currentTypeOffer = allOffers.offers.find((item) => item.type === type);

  const currentDestination = allDestinations.destinations.find(
    (item) => item.id === destination
  );

  return `
  <li class="trip-events__item" id=${id}>
  <form class="event event--edit" action="#" method="post">
  <header class="event__header">
    <div class="event__type-wrapper">
      <label class="event__type  event__type-btn" for="event-type-toggle-1">
        <span class="visually-hidden">Choose event type</span>
        <img class="event__type-icon" width="17" height="17" src="img/icons/${getCurrentEventTypeIcon(
    type
  )}.png" alt="Event type icon">
      </label>
      <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

      <div class="event__type-list">
      ${createEventType(type)}
      </div>
    </div>

    <div class="event__field-group  event__field-group--destination">
      <label class="event__label  event__type-output" for="event-destination-1">
        ${type}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${
  currentDestination && currentDestination.name
    ? currentDestination.name
    : ''
}" list="destination-list-1">
      ${createDataListWithDestinationsTemplate(allDestinations.destinations)}
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time-1">From</label>
      <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${dateFromText}">
      —
      <label class="visually-hidden" for="event-end-time-1">To</label>
      <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${dateToText}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">${basePrice}</span>
        €
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="160">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">Delete</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    ${
  currentTypeOffer.offers.length > 0
    ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${currentTypeOffer.offers
    .map((item) => createOfferTemplate(item, offers))
    .join('')}
      </div>
    </section>`
    : ''
}

    ${currentDestination ? createDestinationTemplate(currentDestination) : ''}
  </section>
</form></li>`;
};

//TODO: предусмотреть случай с cancel
export default class EventUpdate extends AbstractStatefulView {
  #event = null;
  #destinations = null;
  #offers = null;
  #onHanldlerClickRollupBtn = null;
  #onHanldlerClickSubmitBtn = null;
  #onHanldlerClickDeleteBtn = null;
  #rollupBtn = null;
  #submitBtn = null;
  #deleteBtn = null;
  #eventForm = null;

  constructor(
    event,
    offers,
    destinations,
    onHanldlerClickRollupBtn,
    onHanldlerClickSubmitBtn,
    onHanldlerClickDeleteBtn
  ) {
    super();
    this._setState(event);
    this.#event = event;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onHanldlerClickRollupBtn = onHanldlerClickRollupBtn;
    this.#onHanldlerClickSubmitBtn = onHanldlerClickSubmitBtn;
    this.#onHanldlerClickDeleteBtn = onHanldlerClickDeleteBtn;
    this._restoreHandlers();
  }

  get template() {
    return createEventUpdateTemplate(
      this._state,
      this.#destinations,
      this.#offers
    );
  }

  _restoreHandlers() {
    this.#rollupBtn = this.element.querySelector('.event__rollup-btn');
    this.#submitBtn = this.element.querySelector('.event__save-btn');
    this.#deleteBtn = this.element.querySelector('.event__reset-btn');
    this.#eventForm = this.element.querySelector('.event--edit');

    this.#rollupBtn.addEventListener('click', this.#handlerClickRollupBtn);
    this.#submitBtn.addEventListener('click', this.#handlerClickSubmitBtn);
    this.#deleteBtn.addEventListener('click', this.#handlerClickDeleteBtn);
    this.#eventForm.addEventListener('change', this.#handlerEventForm);
  }

  #handlerClickRollupBtn = (e) => {
    e.preventDefault();
    this.updateElement({ ...this.#event });
    this.#onHanldlerClickRollupBtn();
  };

  #handlerClickSubmitBtn = (e) => {
    e.preventDefault();
    this.#onHanldlerClickSubmitBtn();
  };

  #handlerClickDeleteBtn = (e) => {
    e.preventDefault();
    this.#onHanldlerClickDeleteBtn();
  };

  #handlerEventForm = (e) => {
    if (e.target.name === 'event-offer-luggage') {
      this.#handlerChangeEventOffer(e.target.id, e.target.checked);
    }

    if (e.target.name === 'event-type') {
      this.#handlerChangeEventType(e.target.value);
    }

    if (e.target.name === 'event-destination') {
      this.#handlerChangeEventDestination(e.target.value);
    }

    if (e.target.name === 'event-start-time') {
      this.#handlerChangeEventTimeStart(e.target.value);
    }

    if (e.target.name === 'event-end-time') {
      this.#handlerChangeEventTimeEnd(e.target.value);
    }

    if (e.target.name === 'event-price') {
      this.#handlerChangeEventPrice(Number(e.target.value));
    }
  };

  #handlerChangeEventTimeStart = (value) => {
    this.updateElement({ ...this._state, dateFrom: value });
  };

  #handlerChangeEventTimeEnd = (value) => {
    this.updateElement({ ...this._state, dateTo: value });
  };

  #handlerChangeEventPrice = (value) => {
    this.updateElement({ ...this._state, basePrice: value });
  };

  #handlerChangeEventType = (value) => {
    this.updateElement({ ...this._state, type: value });
  };

  #handlerChangeEventOffer = (id, value) => {
    const newOffers = [...this._state.offers];
    const currentPosition = id.indexOf('MY_ID-');

    const targetOfferId = Number(id.slice(currentPosition + 6));

    if (value === true) {
      newOffers.push(targetOfferId);
      this.updateElement({
        ...this._state,
        offers: newOffers,
      });
    } else {
      this.updateElement({
        ...this._state,
        offers: newOffers.filter((item) => +item !== targetOfferId),
      });
    }
  };

  #handlerChangeEventDestination = (value) => {
    const newDestinationId = this.#destinations.destinations.find(
      (item) => item.name === value
    ).id;
    this.updateElement({ ...this._state, destination: newDestinationId });
  };
}
