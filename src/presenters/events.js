import EventPresenter from "./event.js";
import { updateData } from "../utils/updateData.js";
import Sort from "../views/sort.js";
import { DEFAULT_SORT_TYPE, UPDATE_TYPES, USER_ACTIONS } from "../const.js";
import { RenderPosition, render, remove } from "../framework/render.js";
import { sortPoints } from "../utils/sortPoints.js";
import { filter } from "../utils/filterEvents.js";
import EmptyEvents from "../views/empty-events.js";
import LoadingView from "../views/loading.js";

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
      this.#newEventPresenter.disableButton();
      this.#renderLoading();
    } else {
      this.#renderEvents();
      this.#renderSort();
    }
  }

  onHandlerNewEvent = () => {
    this.#newEventPresenter.disableButton();
    this.#newEventPresenter.initNewEventForm(this.#handleDataChange);
    this.#resetAllViews();
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

    render(this.#sortView, this.#container, RenderPosition.AFTERBEGIN);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#container);
  }

  #renderEvents() {
    this.#newEventPresenter.enableButton();
    const activeFilterType = this.#activeFilterModel.get();
    const filteredEvents = filter[activeFilterType.toUpperCase()](this.#events);

    if (filteredEvents.length > 0) {
      filteredEvents.forEach((event) => {
        const eventPresenter = new EventPresenter(
          this.#offersModel,
          this.#destinationsModel,
          this.#handleDataChange,
          this.#resetAllViews,
          this.#container
        );
        eventPresenter.init(event);
        this.#eventPresenters.set(event.id, eventPresenter);
      });
    } else {
      this.#eventList = new EmptyEvents(activeFilterType);
      render(this.#eventList, this.#container);
    }
  }

  #resetAllViews = () => {
    this.#eventPresenters.forEach((item) => item.resetEditMode());
  };

  #handleDataChange = async (actionType, updateType, updatedItem) => {
    if (actionType === USER_ACTIONS.UPDATE_EVENT) {
      try {
        await this.#eventsModel.update(updateType, updatedItem);
      } catch (error) {
        console.log(error);
      }
    }

    if (actionType === USER_ACTIONS.ADD_EVENT) {
      try {
        await this.#eventsModel.add(updateType, updatedItem);
      } catch (error) {
        console.log(error);
      }
    }

    if (actionType === USER_ACTIONS.DELETE_EVENT) {
      try {
        await this.#eventsModel.delete(updateType, updatedItem);
      } catch (error) {
        console.log(error);
      }
    }

    if (actionType === USER_ACTIONS.UPDATE_EVENT) {
      try {
        await this.#eventsModel.update(updateType, updatedItem);
      } catch (error) {
        console.log(error);
      }
    }
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
      this.#isError = data.isError;
      this.#events = this.#eventsModel.get();
      remove(this.#loadingComponent);
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
