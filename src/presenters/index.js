import { render, RenderPosition } from "../render.js";
import Filter from "../view/filter.js";
import Event from "../view/event.js";
import Sort from "../view/sort.js";
import TripInfo from "../view/trip-info.js";
import FromUpdate from "../view/form-update.js";

const tripMainContainer = document.querySelector(".trip-main");
const tripControlsFiltersContainer = tripMainContainer.querySelector(
  ".trip-controls__filters"
);
const eventItemsContainer = document.querySelector(".trip-events__list");

//TODO: методы удаления/обновления View - это ответственность Presenter или Model?
export default class Presenter {
  constructor() {
    this.filterElement = undefined;
    this.buttonFormCreateElement = undefined;
    this.sortElement = undefined;
    this.tripInfo = undefined;
  }

  renderComponents() {
    this.filterElement = new Filter();
    this.formUpdate = new FromUpdate();
    this.sortElement = new Sort();
    this.tripInfo = new TripInfo();

    render(this.tripInfo, tripMainContainer, RenderPosition.AFTERBEGIN);
    render(this.filterElement, tripControlsFiltersContainer);
    render(this.sortElement, eventItemsContainer, RenderPosition.BEFOREBEGIN);
    render(this.formUpdate, eventItemsContainer);
    //TODO: мб имеет смысл завести отдельный перезентер для списка ивентов?
    [1, 2, 3].forEach(() => render(new Event(), eventItemsContainer));
  }
}
