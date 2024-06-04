import { render, RenderPosition } from "../framework/render";
import Sort from "../views/sort.js";
import EventPresenter from "./event.js";
import { updateData } from "../utils/updateData.js";

const eventItemsContainer = document.querySelector(".trip-events__list");

export default class EventsPresenter {
  #eventPresenters = new Map();

  constructor(eventsModel, offersModel, destinationsModel) {
    this.eventsModel = eventsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.#renderEvents();
    this.#renderSort();
  }

  #renderSort() {
    render(new Sort(), eventItemsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEvents() {
    if (this.eventsModel.events) {
      this.eventsModel.events.forEach((event) => {
        const eventPresenter = new EventPresenter(
          this.offersModel,
          this.destinationsModel,
          this.#hanldeDataChange,
          this.#resetAllViews
        );
        eventPresenter.init(event);
        this.#eventPresenters.set(event.id, eventPresenter);
      });
    }
  }

  #resetAllViews = () => {
    this.#eventPresenters.forEach((item) => item.resetEditMode());
  };

  #hanldeDataChange = (updatedEvent) => {
    this.eventsModel.events = updateData(this.eventsModel.events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };
}
