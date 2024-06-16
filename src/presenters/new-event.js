import { EVENT_EMPTY, UPDATE_TYPES, USER_ACTIONS } from "../const";
import { remove, render, RenderPosition } from "../framework/render";
import { onEscKeydown } from "../utils/isEscapeKeyDown";
import NewEventView from "../views/event-create";
import EventUpdate from "../views/event-update";

export default class NewEvent {
  #container = null;
  #component = null;
  #addPointComponent = null;
  #handleButtonClick = null;
  #containerNewEvent = null;
  #destinationsModel = null;
  #offersModel = null;
  #onHandlerData = null;

  constructor(container, containerNewEvent, destinationsModel, offersModel) {
    this.#container = container;
    this.#containerNewEvent = containerNewEvent;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  init(onButtonClick) {
    this.#handleButtonClick = onButtonClick;
    this.#component = new NewEventView(this.#buttonClickHandler);
    render(this.#component, this.#container);
  }

  disableButton() {
    this.#component.setDisabled(true);
  }

  enableButton() {
    this.#component.setDisabled(false);
  }

  #buttonClickHandler = () => {
    this.#handleButtonClick();
  };

  initNewEventForm = (onHandlerData) => {
    this.#onHandlerData = onHandlerData;
    this.#addPointComponent = new EventUpdate(
      EVENT_EMPTY,
      this.#offersModel,
      this.#destinationsModel,
      this.#closeNewEvent,
      this.#submitForm,
      this.#closeNewEvent
    );
    document.addEventListener("keydown", this.#onEscKeydownHandler);

    render(
      this.#addPointComponent,
      this.#containerNewEvent,
      RenderPosition.AFTERBEGIN
    );
  };

  #submitForm = (data) => {
    this.#onHandlerData(USER_ACTIONS.ADD_EVENT, UPDATE_TYPES.NEW_DATA, data);
    this.enableButton();
    remove(this.#addPointComponent);
    document.removeEventListener("keydown", this.#onEscKeydownHandler);
  };

  #onEscKeydownHandler = (e) => onEscKeydown(e, this.#closeNewEvent);

  #closeNewEvent = () => {
    remove(this.#addPointComponent);
    document.removeEventListener("keydown", this.#onEscKeydownHandler);
    this.enableButton();
  };
}
