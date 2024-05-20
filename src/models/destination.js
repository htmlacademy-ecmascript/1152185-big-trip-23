import { getDestinationMock } from '../mock/destination';
import { getRandomInteger } from '../utils/getRandomInteger';

export default class DestinationModel {
  destinations = Array.from(
    { length: getRandomInteger(0, 5) },
    getDestinationMock
  );

  getData() {
    return this.destinations;
  }
}
