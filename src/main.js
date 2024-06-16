import EventsModel from "./models/events.js";
import OffersModel from "./models/offers.js";
import DestinationModel from "./models/destination.js";
import EventsPresenter from "./presenters/events.js";
import { ActiveFilterModel } from "./models/filters.js";
import FiltersPresenter from "./presenters/filters.js";
import { getOffersMock } from "./mock/offer.js";
import { getEventsMock } from "./mock/events.js";
import { FILTERS } from "./mock/filters.js";
import NewEvent from "./presenters/new-event.js";

const tripMainContainer = document.querySelector(".trip-main");
const eventItemsContainer = document.querySelector(".trip-events__list");
const tripControlsFiltersContainer = tripMainContainer.querySelector(
  ".trip-controls__filters"
);

const eventsModel = new EventsModel(getEventsMock());
const offersModel = new OffersModel(getOffersMock());
const destinationModel = new DestinationModel();
const activeFilterModel = new ActiveFilterModel();

const newEventPresenter = new NewEvent(
  tripMainContainer,
  eventItemsContainer,
  destinationModel,
  offersModel
);

const eventsPresenter = new EventsPresenter(
  eventsModel,
  offersModel,
  destinationModel,
  activeFilterModel,
  newEventPresenter,
  eventItemsContainer
);

const filtersPresenter = new FiltersPresenter(
  activeFilterModel,
  FILTERS,
  tripControlsFiltersContainer
);

eventsPresenter.init();
filtersPresenter.init();
newEventPresenter.init(eventsPresenter.onHandlerNewEvent);
