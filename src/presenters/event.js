import { onEscKeydown } from "../utils/isEscapeKeyDown.js";
import Event from "../views/event.js";
import EventUpdate from "../views/event-update.js";
import { render, replace, remove } from "../framework/render";
import { MODE_EVENT, UPDATE_TYPES, USER_ACTIONS } from "../const.js";

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
    onHandleEditStart,
    container
  ) {
    this.container = container;
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

  destroy() {
    remove(this.#eventView);
    remove(this.#eventUpdateView);
    this.#eventView = null;
    this.#eventUpdateView = null;
    document.removeEventListener("keydown", this.#onEscKeydownHandler);
  }

  render(event, destinationsModel, offersModel) {
    const prevPointView = this.#eventView;

    this.#eventView = new Event(
      event,
      offersModel.get(),
      destinationsModel.get(),
      this.#swicthToEdit,
      this.#updateEvent
    );

    this.#eventUpdateView = new EventUpdate(
      event,
      offersModel.get(),
      destinationsModel.get(),
      this.#swicthToView,
      this.#submitEventUpdate,
      this.#deleteEvent
    );

    if (prevPointView === null) {
      render(this.#eventView, this.container);
    } else {
      replace(this.#eventView, prevPointView);
    }
  }

  #onEscKeydownHandler = (e) => onEscKeydown(e, this.#swicthToView);

  #updateEvent = () => {
    const updatePoint = {
      ...this.event,
      isFavorite: !this.event.isFavorite,
    };
    this.#handleEventUpdate(
      USER_ACTIONS.UPDATE_EVENT,
      UPDATE_TYPES.EVENT_DATA_CHANGE,
      updatePoint
    );
  };

  #submitEventUpdate = (data) => {
    this.#handleEventUpdate(
      USER_ACTIONS.UPDATE_EVENT,
      UPDATE_TYPES.NEW_DATA,
      data
    );
  };

  #deleteEvent = () => {
    this.#handleEventUpdate(
      USER_ACTIONS.DELETE_EVENT,
      UPDATE_TYPES.NEW_DATA,
      this.event
    );
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
