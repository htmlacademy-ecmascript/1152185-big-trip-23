import AbstractView from "../framework/view/abstract-view";

const getCurrentText = (filterType) => {
  switch (filterType) {
    case "everything":
      return "Click New Event to create your first point";
    case "past":
      return "There are no past events now";
    case "present":
      return "There are no present events now";
    case "future":
      return "There are no future events now";

    default:
      throw new Error("unknow filterType");
  }
};

const createEmptyEventsTemplate = (text) =>
  `<p class="trip-events__msg">${text}</p>`;

export default class EmptyEvents extends AbstractView {
  constructor(activeFilter) {
    super();
    this.activeFilter = activeFilter;
  }

  get template() {
    return createEmptyEventsTemplate(getCurrentText(this.activeFilter));
  }
}
