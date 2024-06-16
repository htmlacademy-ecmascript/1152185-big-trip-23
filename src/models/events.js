import Observable from "../framework/observable.js";
import { updateData } from "../utils/updateData.js";

export default class EventsModel extends Observable {
  #events = null;

  constructor(events) {
    super();
    this.#events = events;
  }

  getData() {
    return this.#events;
  }

  getById(id) {
    return this.#events.find((event) => event.id === id);
  }

  update(updateType, data) {
    this.#events = updateData(this.#events, data);
    this._notify(updateType, data);
  }

  add(updateType, data) {
    this.#events.push(data);
    this._notify(updateType, this.getData());
  }

  delete(updateType, data) {
    this.#events = this.#events.filter((item) => item.id !== data.id);
    this._notify(updateType);
  }
}
