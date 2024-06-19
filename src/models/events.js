import { UPDATE_TYPES } from '../const.js';
import Observable from '../framework/observable.js';
import { adaptToClient, adaptToServer } from '../utils/adapters.js';
import { updateData } from '../utils/update-data.js';

export default class EventsModel extends Observable {
  #events = [];
  #service = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor(service, destinationsModel, offersModel) {
    super();
    this.#service = service;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  get() {
    return this.#events;
  }

  getById(id) {
    return this.#events.find((point) => point.id === id);
  }

  async init() {
    try {
      await Promise.all([
        this.#destinationsModel.init(),
        this.#offersModel.init(),
      ]);
      const events = await this.#service.events;
      this.#events = events.map(adaptToClient);
      this._notify(UPDATE_TYPES.INIT, { isError: false });
    } catch {
      this.#events = [];
      this._notify(UPDATE_TYPES.INIT, { isError: true });
    }
  }

  async update(updateType, event) {
    try {
      const updatedEvent = await this.#service.updateEvent(
        adaptToServer(event)
      );
      const adaptedEvent = adaptToClient(updatedEvent);
      this.#events = updateData(this.#events, adaptedEvent);
      this._notify(updateType, adaptedEvent);
    } catch {
      throw new Error('Update failure');
    }
  }

  async add(updateType, event) {
    try {
      const addedEvent = await this.#service.addEvent(adaptToServer(event));
      const adaptedEvent = adaptToClient(addedEvent);
      this.#events.push(adaptedEvent);
      this._notify(updateType, adaptedEvent);
    } catch {
      throw new Error('Add failure');
    }
  }

  async delete(updateType, event) {
    try {
      await this.#service.deleteEvent(event);
      this.#events = this.#events.filter((item) => item.id !== event.id);
      this._notify(updateType);
    } catch {
      throw new Error('Delete failure');
    }
  }
}
