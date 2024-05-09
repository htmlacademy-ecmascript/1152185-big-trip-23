import EventsModel from "./models/event.js";
import OffersModel from "./models/offer.js";
import DestinationModel from "./models/destination.js";
import Presenter from "./presenters/index.js";

const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationModel = new DestinationModel();
new Presenter(eventsModel, offersModel, destinationModel).renderComponents();
