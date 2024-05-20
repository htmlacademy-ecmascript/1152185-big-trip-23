import { getEventMock } from '../mock/event';
import { getRandomInteger } from '../utils/getRandomInteger';

export default class EventsModel {
  events = Array.from({ length: getRandomInteger(0, 5) }, getEventMock);

  getData() {
    return this.events;
  }
}
