import EventsModel from "./models/events.js";
import OffersModel from "./models/offers.js";
import DestinationsModel from "./models/destinations.js";
import EventsPresenter from "./presenters/events.js";
import { ActiveFilterModel } from "./models/filters.js";
import FiltersPresenter from "./presenters/filters.js";
import { FILTERS } from "./mock/filters.js";
import NewEvent from "./presenters/new-event.js";
import EventsApiService from "./services/api-service-event.js";
import { AUTHORIZATION, END_POINT } from "./const.js";

const tripMainContainer = document.querySelector(".trip-main");
const eventItemsContainer = document.querySelector(".trip-events__list");
const tripControlsFiltersContainer = tripMainContainer.querySelector(
  ".trip-controls__filters"
);

const pointsApiService = new EventsApiService(END_POINT, AUTHORIZATION);

const destinationsModel = new DestinationsModel(pointsApiService);
const offersModel = new OffersModel(pointsApiService);
const eventsModel = new EventsModel(
  pointsApiService,
  destinationsModel,
  offersModel
);
const activeFilterModel = new ActiveFilterModel();
eventsModel.init();

const newEventPresenter = new NewEvent(
  tripMainContainer,
  eventItemsContainer,
  destinationsModel,
  offersModel
);

const eventsPresenter = new EventsPresenter(
  eventsModel,
  offersModel,
  destinationsModel,
  activeFilterModel,
  newEventPresenter,
  eventItemsContainer
);

const filtersPresenter = new FiltersPresenter(
  activeFilterModel,
  FILTERS,
  tripControlsFiltersContainer
);

newEventPresenter.init(eventsPresenter.onHandlerNewEvent);
eventsPresenter.init();
filtersPresenter.init();
