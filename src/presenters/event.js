import { onEscKeydown } from "../utils/isEscapeKeyDown.js";
import Event from "../views/event.js";
import EventUpdate from "../views/event-update.js";
import { render, replace } from "../framework/render";
import { MODE_EVENT } from "../const.js";

const eventItemsContainer = document.querySelector(".trip-events__list");

export default class EventPresenter {
  #eventUpdateView = null;
  #eventView = null;
  #handleEventUpdate = null;
  #handleEditStart = null;
  #mode = MODE_EVENT.VIEW;

  constructor(
    destination,
    offers,
    destinationsModel,
    onHandleEventUpdate,
    onHandleEditStart
  ) {
    this.destination = destination;
    this.offers = offers;
    this.destinationsModel = destinationsModel;
    this.#handleEventUpdate = onHandleEventUpdate;
    this.#handleEditStart = onHandleEditStart;
  }

  init(event) {
    this.event = event;
    this.render(this.event, this.destination, this.offers);
  }

  resetEditMode = () => {
    if (this.#mode === MODE_EVENT.EDIT) {
      this.#swicthToView();
    }
  };

  render(event, destination, offers) {
    const prevPointView = this.#eventView;

    this.#eventView = new Event(
      event,
      offers,
      destination,
      this.#swicthToEdit,
      () => {
        const updatePoint = {
          ...this.event,
          isFavorite: !this.event.isFavorite,
        };
        this.#handleEventUpdate(updatePoint);
      }
    );

    this.#eventUpdateView = new EventUpdate(
      event,
      offers,
      this.destinationsModel,
      destination,
      this.#swicthToView,
      this.#submitEventUpdate,
      this.#deleteEvent
    );

    if (prevPointView === null) {
      render(this.#eventView, eventItemsContainer);
    } else {
      replace(this.#eventView, prevPointView);
    }
  }

  #onEscKeydownHandler = (e) => onEscKeydown(e, this.#swicthToView);

  #submitEventUpdate = () => {
    console.log("submit");
  };

  #deleteEvent = () => {
    console.log("delete");
  };

  #swicthToEdit = () => {
    this.#handleEditStart();
    replace(this.#eventUpdateView, this.#eventView);
    document.addEventListener("keydown", this.#onEscKeydownHandler);
    this.#mode = MODE_EVENT.EDIT;
  };

  #swicthToView = () => {
    replace(this.#eventView, this.#eventUpdateView);
    document.removeEventListener("keydown", this.#onEscKeydownHandler);
    this.#mode = MODE_EVENT.VIEW;
  };
}
