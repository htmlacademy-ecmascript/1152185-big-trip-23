import EventPresenter from './event.js';
import { updateData } from '../utils/update-data.js';
import Sort from '../views/sort.js';
import {
  DEFAULT_FILTER,
  DEFAULT_SORT_TYPE,
  TIME_LIMIT,
  UPDATE_TYPES,
  USER_ACTIONS,
} from '../const.js';
import { RenderPosition, render, remove } from '../framework/render.js';
import { sortPoints } from '../utils/sort-points.js';
import { filter } from '../utils/filter-events.js';
import EmptyEvents from '../views/empty-events.js';
import LoadingView from '../views/loading.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class EventsPresenter {
  #eventPresenters = new Map();
  #sortView = null;
  activeSortType = DEFAULT_SORT_TYPE;
  #eventList = null;
  #events = null;
  #newEventPresenter = null;
  #isLoading = true;
  #isError = false;
  #loadingComponent = new LoadingView();
  #container = null;
  #eventsModel = null;
  #offersModel = null;
  #destinationsModel = null;
  #activeFilterModel = null;
  #empty = null;
  #uiBlocker = new UiBlocker({
    lowerLimit: TIME_LIMIT.LOWER_LIMIT,
    upperLimit: TIME_LIMIT.UPPER_LIMIT,
  });

  constructor(
    eventsModel,
    offersModel,
    destinationsModel,
    activeFilterModel,
    newEventPresenter,
    container
  ) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#activeFilterModel = activeFilterModel;
    this.#newEventPresenter = newEventPresenter;

    this.#eventsModel.addObserver(this.#modelEventHandler);
    this.#activeFilterModel.addObserver(this.#modelEventHandler);
  }

  init() {
    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (this.#isError) {
      this.#newEventPresenter.disableButton();
      return;
    }

    this.#newEventPresenter.enableButton();
    this.#renderEvents();
    this.#renderSort();
  }

  #resetListEventsToDefault() {
    this.#resetAllViews();
    this.#activeFilterModel.set(UPDATE_TYPES.FILTER_DATA, DEFAULT_FILTER);
  }

  onHandlerNewEvent = () => {
    this.#newEventPresenter.initNewEventForm(
      this.#handleDataChange,
      this.#empty ? this.#empty : null
    );

    this.#resetListEventsToDefault();

    if (this.#empty) {
      remove(this.#empty);
      this.#empty = null;
    }
  };

  #clearTreap() {
    this.#eventPresenters.forEach((item) => item.destroy());
    this.#eventPresenters.clear();

    remove(this.#eventList);
    this.#eventList = null;

    remove(this.#sortView);
  }

  #renderSort() {
    this.#sortView = new Sort(
      this.#onHandlerClickSortItem,
      this.activeSortType
    );

    render(this.#sortView, this.#container, RenderPosition.BEFOREBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container);
  }

  #renderEvents() {
    if (this.#empty) {
      remove(this.#empty);
      this.#empty = null;
    }

    const activeFilterType = this.#activeFilterModel.get();

    this.#events = filter[activeFilterType](this.#events);
    this.#events = sortPoints(this.#events, this.activeSortType);

    if (this.#events.length > 0) {
      this.#events.forEach((event) => {
        const eventPresenter = new EventPresenter(
          this.#offersModel,
          this.#destinationsModel,
          this.#handleDataChange,
          this.#onHandlerChangeToView,
          this.#container
        );
        eventPresenter.init(event);
        this.#eventPresenters.set(event.id, eventPresenter);
      });
    } else {
      this.#empty = new EmptyEvents(activeFilterType);
      render(this.#empty, this.#container);
    }
  }

  #onHandlerChangeToView = () => {
    this.#newEventPresenter.closeNewEvent();
    this.#resetAllViews();
  };

  #resetAllViews = () => {
    this.#eventPresenters.forEach((item) => item.resetEditMode());
  };

  #handleDataChange = async (actionType, updateType, updatedItem) => {
    this.#uiBlocker.block();

    if (actionType === USER_ACTIONS.ADD_EVENT) {
      try {
        await this.#eventsModel.add(updateType, updatedItem);
      } catch (error) {
        throw new Error(error);
      }
    }

    if (actionType === USER_ACTIONS.DELETE_EVENT) {
      try {
        await this.#eventsModel.delete(updateType, updatedItem);
      } catch (error) {
        throw new Error(error);
      }
    }

    if (actionType === USER_ACTIONS.UPDATE_EVENT) {
      try {
        await this.#eventsModel.update(updateType, updatedItem);
      } catch (error) {
        throw new Error(error);
      }
    }

    this.#uiBlocker.unblock();
  };

  #modelEventHandler = (updateType, data) => {
    if (updateType === UPDATE_TYPES.EVENT_DATA_CHANGE) {
      this.#events = updateData(this.#events, data);
      this.#eventPresenters.get(data.id).init(data);
    }

    if (updateType === UPDATE_TYPES.NEW_DATA) {
      this.#events = this.#eventsModel.get();

      this.#clearTreap();
      this.init();
    }

    if (updateType === UPDATE_TYPES.FILTER_DATA) {
      this.#events = this.#eventsModel.get();
      this.activeSortType = DEFAULT_SORT_TYPE;

      this.#clearTreap();
      this.init();
    }

    if (updateType === UPDATE_TYPES.INIT) {
      this.#isLoading = false;
      this.#events = this.#eventsModel.get();
      if (this.#loadingComponent) {
        remove(this.#loadingComponent);
      }

      this.#clearTreap();
      this.init();
    }
  };

  #onHandlerClickSortItem = (item) => {
    this.activeSortType = item;
    this.#events = sortPoints(this.#events, this.activeSortType);

    this.#clearTreap();
    this.init();
  };
}
