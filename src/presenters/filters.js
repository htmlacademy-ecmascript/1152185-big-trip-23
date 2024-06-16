import { UPDATE_TYPES } from "../const.js";
import { render } from "../framework/render.js";
import Filter from "../views/filter.js";

export default class FiltersPresenter {
  #activeFilterModel = null;
  #allFilters = null;

  constructor(activeFilterModel, allFilters, container) {
    this.#activeFilterModel = activeFilterModel;
    this.container = container;
    this.#allFilters = allFilters;
  }

  init() {
    const filter = new Filter(
      this.#activeFilterModel.get(),
      this.#allFilters,
      this.#filterTypesChangeHandler
    );
    render(filter, this.container);
  }

  #filterTypesChangeHandler = (filterType) => {
    this.#activeFilterModel.set(UPDATE_TYPES.FILTER_DATA, filterType);
  };
}
