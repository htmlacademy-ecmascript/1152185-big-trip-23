import { EVENT_TYPES, EVENT_UPDATE_STATE } from '../const.js';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getCurrentEventTypeIcon } from '../utils/get-current-event-type-icon.js';
import dayjs from 'dayjs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import he from 'he';
import { capitalizeFirstLetter } from '../utils/capitalize-first-letter.js';

const MIN_PRICE = 0;

const createDataListWithDestinationsTemplate = (
  destinations
) => `      <datalist id="destination-list-1">${destinations
  .map(
    (item) => `<option id=${item.id} value=${item.name}>${item.name}</option>`
  )
  .join('')}
  </datalist>`;

const createOfferTemplate = (
  offer,
  offersInEvent
) => `<div class="event__offer-selector">
  <input class="event__offer-checkbox  visually-hidden" id="${
  offer.id
}" type="checkbox" name="event-offer-luggage" ${
  offersInEvent.includes(offer.id) ? 'checked' : ''
} value='${offer.price}'>
  <label class="event__offer-label" for="${offer.id}">
    <span class="event__offer-title">${offer.title}</span>
    +€&nbsp;
    <span class="event__offer-price">${offer.price}</span>
  </label>
</div>`;

const createEventType = (type) => `<fieldset class="event__type-group">
<legend class="visually-hidden">Event type</legend>
${EVENT_TYPES.map(
    (item) => `<div class="event__type-item">
    <input ${
  item === type ? 'checked' : ''
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
  destination.pictures && destination.pictures.length > 0
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
    : '<p>No pictures destination</p>'
}
</section>`;

const createEventUpdateTemplate = (state, allDestinations, allOffers, mode) => {
  const { id, basePrice, dateFrom, dateTo, offers, type, destination } = state;
  const dateFromText = dateFrom ? dayjs(dateFrom).format('DD/MM/YY HH:mm') : '';
  const dateToText = dateTo ? dayjs(dateTo).format('DD/MM/YY HH:mm') : '';

  const currentDestination = allDestinations.find(
    (item) => item.id === destination
  );
  const currentOffer =
    allOffers.length > 0
      ? allOffers.filter((item) => item.type === type)
      : undefined;

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
      ${capitalizeFirstLetter(he.encode(type))}
      </label>
      <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${
  currentDestination && currentDestination.name
    ? currentDestination.name
    : ''
}" list="destination-list-1">
      ${createDataListWithDestinationsTemplate(allDestinations)}
    </div>

    <div class="event__field-group  event__field-group--time">
      <label class="visually-hidden" for="event-start-time">From</label>
      <input class="event__input  event__input--time" id='event-start-time' type="text" name="event-start-time" value="${dateFromText}">
      —
      <label class="visually-hidden" for="event-end-time">To</label>
      <input class="event__input  event__input--time" id='event-end-time' type="text" name="event-end-time" value="${dateToText}">
    </div>

    <div class="event__field-group  event__field-group--price">
      <label class="event__label" for="event-price-1">
        <span class="visually-hidden">${basePrice}</span>
        €
      </label>
      <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${basePrice}">
    </div>

    <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
    <button class="event__reset-btn" type="reset">${
  mode === EVENT_UPDATE_STATE.CREATE ? 'Cancel' : 'Delete'
}</button>
    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>
  </header>
  <section class="event__details">
    ${
  currentOffer && currentOffer[0].offers.length > 0
    ? `<section class="event__section  event__section--offers">
      <h3 class="event__section-title  event__section-title--offers">Offers</h3>

      <div class="event__available-offers">
      ${currentOffer[0].offers
    .map((item) => createOfferTemplate(item, offers))
    .join('')}
      </div>
    </section>`
    : ''
}

    ${
  currentDestination &&
      (currentDestination.description || currentDestination.pictures.length > 0)
    ? createDestinationTemplate(currentDestination)
    : ''
}
  </section>
</form></li>`;
};

export default class EventUpdate extends AbstractStatefulView {
  #event = null;
  #destinations = null;
  #offers = null;
  #onHandlerClickRollupBtn = null;
  #onHandlerClickSubmitBtn = null;
  #onHandlerClickDeleteBtn = null;
  #rollupBtn = null;
  #submitBtn = null;
  #deleteBtn = null;
  #eventForm = null;
  #datePickerStart = null;
  #datePickerEnd = null;
  #mode = null;

  constructor(
    event,
    offers,
    destinations,
    onHandlerClickRollupBtn,
    onHandlerClickSubmitBtn,
    onHandlerClickDeleteBtn,
    mode
  ) {
    super();
    this._setState(event);
    this.#event = event;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#onHandlerClickRollupBtn = onHandlerClickRollupBtn;
    this.#onHandlerClickSubmitBtn = onHandlerClickSubmitBtn;
    this.#onHandlerClickDeleteBtn = onHandlerClickDeleteBtn;
    this.#mode = mode;
    this._restoreHandlers();
  }

  get template() {
    return createEventUpdateTemplate(
      this._state,
      this.#destinations,
      this.#offers,
      this.#mode
    );
  }

  #disableSaveButton() {
    if (this.#submitBtn) {
      if (this._state.basePrice <= MIN_PRICE || !this._state.destination) {
        this.#submitBtn.disabled = true;
      }
    }
  }

  #unableSaveButton() {
    if (this._state.destination && this._state.basePrice > MIN_PRICE) {
      this.#submitBtn.disabled = false;
    }
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
    this.#setDatepickers();
    this.#disableSaveButton();
  }

  #setDatepickers = () => {
    const startDateNode = this.element.querySelector(
      '.event__input--time[name="event-start-time"]'
    );

    const endDateNode = this.element.querySelector(
      '.event__input--time[name="event-end-time"]'
    );
    const flatpickrConfig = {
      dateFormat: 'd/m/y H:i',
      enableTime: true,
      locale: {
        firstDayOfWeek: 1,
      },
      // eslint-disable-next-line camelcase
      time_24hr: true,
    };

    this.#datePickerStart = flatpickr(startDateNode, {
      ...flatpickrConfig,
      defaultDate: this._state.dateFrom,
      onClose: this.#startDateCloseHandler,
      maxDate: this._state.dateTo,
    });

    this.#datePickerEnd = flatpickr(endDateNode, {
      ...flatpickrConfig,
      defaultDate: this._state.dateTo,
      onClose: this.#endDateCloseHandler,
      minDate: this._state.dateFrom,
    });
  };

  removeDatepickers = () => {
    if (this.#datePickerStart) {
      this.#datePickerStart.destroy();
      this.#datePickerStart = null;
    }

    if (this.#datePickerEnd) {
      this.#datePickerEnd.destroy();
      this.#datePickerEnd = null;
    }
  };

  #startDateCloseHandler = ([enteredDate]) => {
    this._setState({
      ...this._state.point,
      dateFrom: enteredDate,
    });
    this.#datePickerEnd.set('minDate', this._state.dateFrom);
  };

  #endDateCloseHandler = ([enteredDate]) => {
    this._setState({
      ...this._state.point,
      dateTo: enteredDate,
    });
    this.#datePickerStart.set('maxDate', this._state.dateTo);
  };

  #handlerClickRollupBtn = (e) => {
    e.preventDefault();
    this.resetState();
    this.#onHandlerClickRollupBtn();
  };

  resetState = () => {
    this.updateElement({ ...this.#event });
    this._setState({ ...this.#event });
  };

  #handlerClickSubmitBtn = (e) => {
    e.preventDefault();
    this.#onHandlerClickSubmitBtn(this._state);
  };

  #handlerClickDeleteBtn = (e) => {
    e.preventDefault();
    this.#onHandlerClickDeleteBtn();
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
      this.#unableSaveButton();
    }

    if (e.target.name === 'event-start-time') {
      this.#handlerChangeEventTimeStart(e.target.value);
    }

    if (e.target.name === 'event-end-time') {
      this.#handlerChangeEventTimeEnd(e.target.value);
    }

    if (e.target.name === 'event-price') {
      this.#handlerChangeEventPrice(Number(e.target.value));
      this.#unableSaveButton();
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
    this.updateElement({ ...this._state, type: value, offers: [] });
  };

  #handlerChangeEventOffer = (id, value) => {
    const newOffers = [...this._state.offers];

    if (value === true) {
      newOffers.push(id);
      this.updateElement({
        ...this._state,
        offers: newOffers,
      });
    } else {
      this.updateElement({
        ...this._state,
        offers: newOffers.filter((item) => item !== id),
      });
    }
  };

  #handlerChangeEventDestination = (value) => {
    const newDestination = this.#destinations.find(
      (item) => item.name === value
    );
    this.updateElement({
      ...this._state,
      destination: newDestination ? newDestination.id : undefined,
    });
  };
}
