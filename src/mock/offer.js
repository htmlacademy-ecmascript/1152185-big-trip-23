import { getRandomInteger } from '../utils/getRandomInteger';

const TEXT_MOCK = [
  'Вызвать такси',
  'Сырный борт',
  'Уборка номера',
  'Кислые червеладки',
];

export const getOffersMock = () => [
  {
    type: 'taxi',
    offers: Array.from({ length: getRandomInteger(0, 5) }, (_, id) => ({
      id: id,
      title: TEXT_MOCK[getRandomInteger(0, TEXT_MOCK.length - 1)],
      price: getRandomInteger(100, 1000),
    })),
  },
  {
    type: 'bus',
    offers: Array.from({ length: getRandomInteger(0, 5) }, (_, id) => ({
      id: id,
      title: TEXT_MOCK[getRandomInteger(0, TEXT_MOCK.length - 1)],
      price: getRandomInteger(100, 1000),
    })),
  },
  {
    type: 'train',
    offers: Array.from({ length: getRandomInteger(0, 5) }, (_, id) => ({
      id: id,
      title: TEXT_MOCK[getRandomInteger(0, TEXT_MOCK.length - 1)],
      price: getRandomInteger(100, 1000),
    })),
  },
  {
    type: 'ship',
    offers: Array.from({ length: getRandomInteger(0, 5) }, (_, id) => ({
      id: id,
      title: TEXT_MOCK[getRandomInteger(0, TEXT_MOCK.length - 1)],
      price: getRandomInteger(100, 1000),
    })),
  },
  {
    type: 'drive',
    offers: Array.from({ length: getRandomInteger(0, 5) }, (_, id) => ({
      id: id,
      title: TEXT_MOCK[getRandomInteger(0, TEXT_MOCK.length - 1)],
      price: getRandomInteger(100, 1000),
    })),
  },
  {
    type: 'flight',
    offers: Array.from({ length: getRandomInteger(0, 5) }, (_, id) => ({
      id: id,
      title: TEXT_MOCK[getRandomInteger(0, TEXT_MOCK.length - 1)],
      price: getRandomInteger(100, 1000),
    })),
  },
  {
    type: 'sightseeing',
    offers: Array.from({ length: getRandomInteger(0, 5) }, (_, id) => ({
      id: id,
      title: TEXT_MOCK[getRandomInteger(0, TEXT_MOCK.length - 1)],
      price: getRandomInteger(100, 1000),
    })),
  },
  {
    type: 'check-in',
    offers: Array.from({ length: getRandomInteger(0, 5) }, (_, id) => ({
      id: id,
      title: TEXT_MOCK[getRandomInteger(0, TEXT_MOCK.length - 1)],
      price: getRandomInteger(100, 1000),
    })),
  },
  {
    type: 'restaurant',
    offers: Array.from({ length: getRandomInteger(0, 5) }, (_, id) => ({
      id: id,
      title: TEXT_MOCK[getRandomInteger(0, TEXT_MOCK.length - 1)],
      price: getRandomInteger(100, 1000),
    })),
  },
];
