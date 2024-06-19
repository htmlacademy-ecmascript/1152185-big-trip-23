import AbstractView from '../framework/view/abstract-view.js';
import {
  getTripRoute,
  getTripDurationPeriod,
  getTripCost,
} from '../utils/current-trip-info.js';

const createTripInfoTemplate = (isEmpty, route, duration, cost) =>
  isEmpty
    ? `
<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">Loading...</h1>
      <p class="trip-info__dates">Loading...</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">0</span>
    </p>
  </section>`
    : `
<section class="trip-main__trip-info  trip-info">
  <div class="trip-info__main">
    <h1 class="trip-info__title">${route}</h1>
    <p class="trip-info__dates">${duration}</p>
  </div>

  <p class="trip-info__cost">
    Total: &euro;&nbsp;<span class="trip-info__cost-value">${cost}</span>
  </p>
</section>`;

export default class TripInfoView extends AbstractView {
  #events = [];
  #destinations = null;
  #offers = null;

  constructor(destinations, offers, events) {
    super();
    this.#events = events;
    this.#destinations = destinations;
    this.#offers = offers;
  }

  get template() {
    return createTripInfoTemplate(
      this.#events.length === 0,
      getTripRoute(this.#events, this.#destinations),
      getTripDurationPeriod(this.#events),
      getTripCost(this.#events, this.#offers)
    );
  }
}
