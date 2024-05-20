import { render, RenderPosition, replace } from '../framework/render';
import Event from '../views/event.js';
import EventUpdate from '../views/event-update.js';
import Sort from '../views/sort.js';
import { onEscKeydown } from '../utils/isEscapeKeyDown.js';

const eventItemsContainer = document.querySelector('.trip-events__list');

export default class EventsPresenter {
  constructor(eventsModel, offersModel, destinationsModel) {
    this.eventsModel = eventsModel;
    this.offersModel = offersModel;
    this.destinationsModel = destinationsModel;
  }

  init() {
    this.#renderEvents();
    this.#renderSort();
  }

  #renderSort() {
    render(new Sort(), eventItemsContainer, RenderPosition.AFTERBEGIN);
  }

  #renderEvents() {
    if (this.eventsModel.events) {
      this.eventsModel.events.forEach((event) => {
        const currentTypeOffer = this.offersModel.offers.find(
          (item) => item.type === event.type
        );

        const currentOffer = currentTypeOffer
          ? currentTypeOffer.offers.filter((item) =>
            event.offers.includes(item.id)
          )
          : undefined;

        const currentDestination = this.destinationsModel.destinations.find(
          (destination) => destination.id === event.destination
        );

        const eventView = new Event(
          event,
          currentOffer,
          currentDestination,
          swicthToEdit
        );

        const eventUpdateView = new EventUpdate(
          event,
          currentTypeOffer,
          this.destinationsModel,
          currentDestination,
          swicthToView,
          submitEventUpdate,
          deleteEvent
        );

        const onEscKeydownHandler = (e) => onEscKeydown(e, swicthToView);

        function submitEventUpdate() {
          console.log('submit');
        }

        function deleteEvent() {
          console.log('delete');
        }

        function swicthToEdit() {
          replace(eventUpdateView, eventView);
          document.addEventListener('keydown', onEscKeydownHandler);
        }

        function swicthToView() {
          replace(eventView, eventUpdateView);
          document.removeEventListener('keydown', onEscKeydownHandler);
        }

        render(eventView, eventItemsContainer);
      });
    }
  }
}
