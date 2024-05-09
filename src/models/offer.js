import { getOffersMock } from "../mock/offer";

export default class OffersModel {
  offers = getOffersMock();

  getData() {
    return this.offers;
  }
}
