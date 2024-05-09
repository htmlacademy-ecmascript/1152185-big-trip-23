import { render, RenderPosition } from "../render.js";
import Filter from "../views/filter.js";
import Event from "../views/event.js";
import Sort from "../views/sort.js";
import TripInfo from "../views/trip-info.js";
import EventUpdate from "../views/event-update.js";

const tripMainContainer = document.querySelector(".trip-main");
const tripControlsFiltersContainer = tripMainContainer.querySelector(
  ".trip-controls__filters"
);
const eventItemsContainer = document.querySelector(".trip-events__list");

export default class Presenter {
  tripInfo = new TripInfo();
  filterElement = new Filter();
  sortElement = new Sort();
  eventUpdate = new EventUpdate();

  constructor(eventsModel, offersModel, destinationsModel) {
    this.eventsModel = eventsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  renderComponents() {
    render(this.tripInfo, tripMainContainer, RenderPosition.AFTERBEGIN);
    render(this.filterElement, tripControlsFiltersContainer);
    render(this.sortElement, eventItemsContainer, RenderPosition.BEFOREBEGIN);
    render(this.eventUpdate, eventItemsContainer);

    if (this.eventsModel.events) {
      this.eventsModel.events.forEach((event) => {
        const currentOffer = this.offersModel.offers
          .find((item) => item.type === event.type)
          ?.offers.filter((item) => event.offers.includes(item.id));
        const currentDestination = this.destinationsModel.destinations.find(
          (destination) => destination.id === event.destination
        );

        render(
          new Event(event, currentOffer, currentDestination),
          eventItemsContainer
        );
      });
    }
  }
}
