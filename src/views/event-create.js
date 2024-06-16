import AbstractView from "../framework/view/abstract-view.js";

const createEventTemplate = () =>
  '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class NewEventView extends AbstractView {
  #handleButtonClick = null;

  constructor(onClick) {
    super();
    this.#handleButtonClick = onClick;

    this.element.addEventListener("click", this.#buttonClickHandler);
  }

  setDisabled(isDisabled) {
    this.element.disabled = isDisabled;
  }

  #buttonClickHandler = (evt) => {
    evt.preventDefault();
    this.#handleButtonClick();
  };

  get template() {
    return createEventTemplate();
  }
}
