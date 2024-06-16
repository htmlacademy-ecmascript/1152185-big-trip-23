import Observable from "../framework/observable";
import { DEFAULT_FILTER } from "../mock/filters";

export class ActiveFilterModel extends Observable {
  #activeFilter = DEFAULT_FILTER;

  get() {
    return this.#activeFilter;
  }

  set(updateType, update) {
    this.#activeFilter = update;
    this._notify(updateType, update);
  }
}
