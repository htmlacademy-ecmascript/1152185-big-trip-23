import AbstractView from "../framework/view/abstract-view.js";

function createEventListTemplate() {
  return `<ul class='trip-events__list'></ul>`;
}

export default class EventListView extends AbstractView {
  #element = document.querySelector(".trip-events__list");

  constructor() {
    super();

    this.#element = document.querySelector(".trip-events__list");
  }

  get template() {
    return createEventListTemplate();
  }
}
