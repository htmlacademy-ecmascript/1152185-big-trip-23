import ApiService from "../framework/api-service.js";
import { Method, SourceUrl } from "../const.js";

export default class EventsApiService extends ApiService {
  get events() {
    return this._load({ url: SourceUrl.POINTS }).then(ApiService.parseResponse);
  }

  get destinations() {
    return this._load({ url: SourceUrl.DESTINATIONS }).then(
      ApiService.parseResponse
    );
  }

  get offers() {
    return this._load({ url: SourceUrl.OFFERS }).then(ApiService.parseResponse);
  }

  async updateEvent(event) {
    const response = await this._load({
      url: `${SourceUrl.POINTS}/${event.id}`,
      method: Method.PUT,
      body: JSON.stringify(event),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async addEvent(event) {
    const response = await this._load({
      url: SourceUrl.POINTS,
      method: Method.POST,
      body: JSON.stringify(event),
      headers: new Headers({ "Content-Type": "application/json" }),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  async deleteEvent(event) {
    await this._load({
      url: `${SourceUrl.POINTS}/${event.id}`,
      method: Method.DELETE,
    });
  }
}
