import AbstractView from "../framework/view/abstract-view.js";

function createFiltersTemplate(activeFilter, allFilters) {
  return `<form class="trip-filters" action="#" method="get">
  ${allFilters
    .map((filter) => {
      return `
      <div class="trip-filters__filter">
      <input id="filter-${filter}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filter}" ${
        activeFilter === filter ? "checked" : ""
      }>
      <label class="trip-filters__filter-label" for="filter-${filter}">${filter}</label>
    </div>`;
    })
    .join("")}
  <button class="visually-hidden" type="submit">Accept filter</button>
</form>`;
}

export default class Filter extends AbstractView {
  #activeFilter = null;
  #allFilters = null;
  #onHandlerClickFilter = null;

  constructor(activeFilter, allFilters, onHandlerClickFilter) {
    super();
    this.#activeFilter = activeFilter;
    this.#allFilters = allFilters;
    this.#onHandlerClickFilter = onHandlerClickFilter;

    this.element.addEventListener("change", this.#handlerChangeForm);
  }

  get template() {
    return createFiltersTemplate(this.#activeFilter, this.#allFilters);
  }

  #handlerChangeForm = (e) => {
    this.#onHandlerClickFilter(e.target.value);
  };
}
