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
    offersModel,
    destinationsModel,
    onHandleEventUpdate,
    onHandleEditStart
  ) {
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
    this.#handleEventUpdate = onHandleEventUpdate;
    this.#handleEditStart = onHandleEditStart;
  }

  init(event) {
    this.event = event;
    this.render(this.event, this.destinationsModel, this.offersModel);
  }

  resetEditMode = () => {
    if (this.#mode === MODE_EVENT.EDIT) {
      this.#swicthToView();
    }
  };

  render(event, destinationsModel, offersModel) {
    const prevPointView = this.#eventView;

    this.#eventView = new Event(
      event,
      offersModel,
      destinationsModel,
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
      offersModel,
      destinationsModel,
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
