import { onEscKeydown } from '../utils/is-escape-keydown.js';
import Event from '../views/event.js';
import EventUpdate from '../views/event-update.js';
import { render, replace, remove } from '../framework/render.js';
import {
  EVENT_UPDATE_STATE,
  MODE_EVENT,
  UPDATE_TYPES,
  USER_ACTIONS,
} from '../const.js';

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
    this.renderEvent(this.event, this.destinationsModel, this.offersModel);
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
    document.removeEventListener('keydown', this.#onEscKeydownHandler);
  }

  renderEvent(event, destinationsModel, offersModel) {
    const prevPointView = this.#eventView;
    const prevPointEdit = this.#eventUpdateView;

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
      this.#deleteEvent,
      EVENT_UPDATE_STATE.UPDATE
    );

    if (prevPointView === null) {
      render(this.#eventView, this.container);
    } else {
      replace(this.#eventView, prevPointView);
    }

    remove(prevPointView);
    remove(prevPointEdit);
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
    document.addEventListener('keydown', this.#onEscKeydownHandler);
    this.#mode = MODE_EVENT.EDIT;
  };

  #swicthToView = () => {
    document.removeEventListener('keydown', this.#onEscKeydownHandler);
    this.#mode = MODE_EVENT.VIEW;
    this.#eventUpdateView.removeDatepickers();
    this.#eventUpdateView.resetState();
    replace(this.#eventView, this.#eventUpdateView);
  };
}
