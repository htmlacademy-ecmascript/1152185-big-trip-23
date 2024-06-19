import { UPDATE_TYPES } from '../const.js';
import { remove, render } from '../framework/render.js';
import Filter from '../views/filter.js';

export default class FiltersPresenter {
  #activeFilterModel = null;
  #allFilters = null;
  #filters = null;

  constructor(activeFilterModel, allFilters, container) {
    this.#activeFilterModel = activeFilterModel;
    this.container = container;
    this.#allFilters = allFilters;

    this.#activeFilterModel.addObserver(this.#modelEventHandler);
  }

  init() {
    if (this.#filters) {
      remove(this.#filters);
    }

    this.#filters = new Filter(
      this.#activeFilterModel.get(),
      this.#allFilters,
      this.#filterTypesChangeHandler
    );
    render(this.#filters, this.container);
  }

  #filterTypesChangeHandler = (filterType) => {
    this.#activeFilterModel.set(UPDATE_TYPES.FILTER_DATA, filterType);
  };

  #modelEventHandler = () => {
    this.init();
  };
}
