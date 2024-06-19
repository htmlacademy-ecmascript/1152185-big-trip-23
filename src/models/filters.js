import { DEFAULT_FILTER } from '../const.js';
import Observable from '../framework/observable.js';

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
