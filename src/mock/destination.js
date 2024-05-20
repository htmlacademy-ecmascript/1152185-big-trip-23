import { getRandomInteger } from '../utils/getRandomInteger';

const CITIES_MOCK = ['Минск', 'Сочи', 'Прага', 'Вильнюс', 'Карловы Вары'];

const DESCCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
  'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
];

export const getDestinationMock = () => {
  const ID = getRandomInteger(0, 5);
  return {
    id: ID,
    description: DESCCRIPTIONS[getRandomInteger(0, DESCCRIPTIONS.length - 1)],
    name: CITIES_MOCK[getRandomInteger(0, CITIES_MOCK.length - 1)],
    pictures: Array.from(
      {
        length: getRandomInteger(0, 5),
      },
      () => ({
        src: `https://loremflickr.com/248/152?${ID}`,
        description:
          DESCCRIPTIONS[getRandomInteger(0, DESCCRIPTIONS.length - 1)],
      })
    ),
  };
};

//Создаем массив объектов пунктов назначения
const getDestinations = () =>
  Array.from({ length: CITIES_MOCK.length }, getDestinationMock);

export { getDestinations };
