import EventsModel from './models/event.js';
import OffersModel from './models/offer.js';
import DestinationModel from './models/destination.js';
import Presenter from './presenters/index.js';
import EventsPresenter from './presenters/events.js';

const eventsModel = new EventsModel();
const offersModel = new OffersModel();
const destinationModel = new DestinationModel();
new EventsPresenter(eventsModel, offersModel, destinationModel).init();
new Presenter().renderComponents();
