'use strict';

const PIN_WIDTH = 25;
const PIN_SCALE = 70;
const NUMBER_OF_PINS = 8;
const TYPE_HOTEL = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];
const TITLE = [
  `Большая уютная квартира`,
  `Маленькая неуютная квартира`,
  `Огромный прекрасный дворец`,
  `Маленький ужасный дворец`,
  `Красивый гостевой домик`,
  `Некрасивый негостеприимный домик`,
  `Уютное бунгало далеко от моря`,
  `Неуютное бунгало по колено в воде`
];
const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
];
const PHOTOS_OF_HOTEL = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
const DESCRIPTION = [
  `Описание1`,
  `Описание2`,
  `Описание3`,
  `Описание4`,
  `Описание5`,
];
const MAP_WIDTH = 1200;
const MAP_START_X = 25;
const PIN_TOP_Y = 130;
const PIN_BOTTOM_Y = 630;
const TIME_CHECKIN = [`12:00`, `13:00`, `14:00`];
const TIME_CHECKOUT = [`12:00`, `13:00`, `14:00`];
const MIN_PRICE = 0;
const MAX_PRICE = 10000;
const ROOMS_MAX = 5;
const ROOMS_MIN = 1;
const GUESTS_MIN = 1;
const GUESTS_MAX = 10;

const getRandomRange = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

document.querySelector(`.map`).classList.remove(`map--faded`);

const getRandomElement = function (array) {
  let randomStr;
  randomStr = array.slice(0, getRandomRange(0, array.length));

  return randomStr;
};

const getRandomPins = function () {
  const pins = [];
  for (let i = 1; i <= NUMBER_OF_PINS; i++) {
    pins.push(randomPin(i));
  }
  return pins;
};

const randomPin = function (counter) {
  const pinLocationX = getRandomRange(MAP_START_X, MAP_WIDTH);
  const pinLocationY = getRandomRange(PIN_TOP_Y, PIN_BOTTOM_Y);
  return {
    'author': {
      'avatar': `img/avatars/user0${counter}.png`
    },
    'offer': {
      'title': `${TITLE[getRandomRange(0, TITLE.length)]} `,
      'address': `Адрес предложения ${pinLocationX}, ${pinLocationY}`,
      'price': getRandomRange(MIN_PRICE, MAX_PRICE),
      'type': TYPE_HOTEL[getRandomRange(1, TYPE_HOTEL.length)],
      'rooms': getRandomRange(ROOMS_MIN, ROOMS_MAX),
      'guests': getRandomRange(GUESTS_MIN, GUESTS_MAX),
      'checkin': `${getRandomRange(TIME_CHECKIN, TIME_CHECKOUT)}:00`,
      'checkout': `${getRandomRange(TIME_CHECKIN, TIME_CHECKOUT)}:00`,
      'features': getRandomElement(FEATURES),
      'description': `${DESCRIPTION[getRandomRange(0, DESCRIPTION.length)]} `,
      'photos': getRandomElement(PHOTOS_OF_HOTEL),
    },
    'location': {
      'x': pinLocationX,
      'y': pinLocationY
    }
  };
};


const pinsBase = getRandomPins();

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mapList = document.querySelector(`.map__pins`);

const renderElement = function (render) {
  const element = pinTemplate.cloneNode(true);
  element.style = `left: ${render.location.x - PIN_WIDTH}px; top: ${render.location.y - PIN_SCALE}px;`;
  element.querySelector(`img`).src = render.author.avatar;
  element.querySelector(`img`).alt = render.offer.title;

  return element;
};

const mapFragment = document.createDocumentFragment();

for (let i = 0; i < pinsBase.length; i++) {
  mapFragment.appendChild(renderElement(pinsBase[i]));
  mapList.appendChild(mapFragment);
}
