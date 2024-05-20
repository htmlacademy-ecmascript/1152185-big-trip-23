import Filter from '../views/filter.js';
import TripInfo from '../views/trip-info.js';
import { render, RenderPosition } from '../framework/render.js';

const tripMainContainer = document.querySelector('.trip-main');
const tripControlsFiltersContainer = tripMainContainer.querySelector(
  '.trip-controls__filters'
);

export default class Presenter {
  tripInfo = new TripInfo();
  filterElement = new Filter();

  renderComponents() {
    render(this.tripInfo, tripMainContainer, RenderPosition.AFTERBEGIN);
    render(this.filterElement, tripControlsFiltersContainer);
  }
}
