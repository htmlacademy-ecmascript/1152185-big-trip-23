export default class OffersModel {
  #offers = null;

  constructor(offers) {
    this.#offers = offers;
  }

  getData() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type).offers;
  }
}
