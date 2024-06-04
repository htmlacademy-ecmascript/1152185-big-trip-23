import AbstractView from '../framework/view/abstract-view.js';
import { SORT_VALUES, DISABLED_SORT_VALUES } from '../const.js';

function createSortTemplate(activeSortType) {
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${Object.values(SORT_VALUES)
    .map((item) => `
    <div class="trip-sort__item  trip-sort__item--${item}">
      <input id="sort-${item}" class="trip-sort__input  visually-hidden" type="radio" name="trip-${item}" value="sort-${item}" ${
  item === activeSortType ? 'checked' : ''
} ${DISABLED_SORT_VALUES.includes(item) ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${item}">${item}</label>
    </div>`)
    .join('')}
</form>`;
}

export default class Sort extends AbstractView {
  #handlerSortChange = null;
  #activeSortType = undefined;

  constructor(onHandleSortChange, activeSortType) {
    super();
    this.#handlerSortChange = onHandleSortChange;
    this.#activeSortType = activeSortType;

    this.element.addEventListener('change', this.#sortChangeHandler);
  }

  get template() {
    return createSortTemplate(this.#activeSortType);
  }

  #sortChangeHandler = (evt) => {
    const sortType = evt.target.id.replace('sort-', '');
    this.#handlerSortChange(sortType);
  };
}
