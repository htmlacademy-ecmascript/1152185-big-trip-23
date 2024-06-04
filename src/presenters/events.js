import EventPresenter from "./event.js";
import { updateData } from "../utils/updateData.js";
import Sort from "../views/sort.js";
import { DEFAULT_SORT_TYPE } from "../const.js";
import { RenderPosition, render, remove } from "../framework/render.js";
import EventListView from "../views/event-list.js";
import { sortPoints } from "../utils/sortPoints.js";

const eventItemsContainer = document.querySelector(".trip-events__list");

export default class EventsPresenter {
  #eventPresenters = new Map();
  #sortView = null;
  activeSortType = DEFAULT_SORT_TYPE;
  #eventList = null;
  #events = null;

  constructor(eventsModel, offersModel, destinationsModel) {
    this.eventsModel = eventsModel;
    this.#events = eventsModel.events;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.#renderEvents();
    this.#renderSort();
  }

  #clearTreap() {
    this.#eventPresenters.forEach((item) => item.destroy());
    this.#eventPresenters.clear();

    remove(this.#eventList);
    this.#eventList = null;

    remove(this.#sortView);
  }

  #renderSort() {
    this.#sortView = new Sort(
      this.#onHandlerClickSortItem,
      this.activeSortType
    );

    render(this.#sortView, eventItemsContainer, RenderPosition.AFTERBEGIN);
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
    this.#events = updateData(this.#events, updatedEvent);
    this.#eventPresenters.get(updatedEvent.id).init(updatedEvent);
  };

  #onHandlerClickSortItem = (item) => {
    this.activeSortType = item;
    this.#events = sortPoints(this.#events, this.activeSortType);

    this.#clearTreap();
    this.init();
  };
}
