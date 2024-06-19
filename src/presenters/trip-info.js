import {
  render,
  replace,
  remove,
  RenderPosition,
} from '../framework/render.js';
import TripInfoView from '../views/trip-info.js';

export default class TripInfoPresenter {
  #container = null;
  #eventsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #tripInfoComponent = null;

  constructor(container, eventsModel, destinationsModel, offersModel) {
    this.#container = container;
    this.#eventsModel = eventsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#eventsModel.addObserver(this.#modelEventHandler);
  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    this.#tripInfoComponent = new TripInfoView(
      this.#destinationsModel.get(),
      this.#offersModel.get(),
      this.#eventsModel.get()
    );

    if (!prevTripInfoComponent) {
      render(
        this.#tripInfoComponent,
        this.#container,
        RenderPosition.AFTERBEGIN
      );
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);

    render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
  }

  #modelEventHandler = () => {
    this.init();
  };
}
