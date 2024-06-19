import dayjs from 'dayjs';
import { SORT_VALUES } from '../const';
import { sortPoints } from './sort-points';

const DESTINATIONS_ITEMS_COUNT = 3;

const getTripRoute = (points = [], destinations = []) => {
  const destinationNames = sortPoints([...points], SORT_VALUES.DAY).map(
    (point) =>
      destinations.find((destination) => destination.id === point.destination)
        .name
  );

  return destinationNames <= DESTINATIONS_ITEMS_COUNT
    ? destinationNames.join('&nbsp;&mdash;&nbsp;')
    : `${destinationNames.at(
      0
    )}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${destinationNames.at(-1)}`;
};

const getTripDurationPeriod = (points = []) => {
  const sortedPoints = sortPoints([...points], SORT_VALUES.DAY);

  return sortedPoints.length
    ? `${dayjs(sortedPoints.at(0).dateFrom).format(
      'DD MMM'
    )}&nbsp;&mdash;&nbsp;${dayjs(sortedPoints.at(-1).dateTo).format(
      'DD MMM'
    )}`
    : '';
};

const getCheckedOffers = (offers, type) =>
  offers.find((offer) => type === offer.type)?.offers;

const getOffersCost = (offerIDs = [], offers = []) =>
  offerIDs.reduce(
    (offerCost, id) =>
      offerCost + (offers.find((offer) => offer.id === id)?.price ?? 0),
    0
  );

const getTripCost = (points = [], offers = []) =>
  points.reduce(
    (total, point) =>
      total +
      point.basePrice +
      getOffersCost(point.offers, getCheckedOffers(offers, point.type)),
    0
  );

export { getTripRoute, getTripCost, getTripDurationPeriod };
