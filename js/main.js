'use strict';

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);
const MAP_PINS = document.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`)
  .content.querySelector(`.map__pin`);
const NUMBER_OF_PINS = 8;
const MIN_PRICE = 1000;
const MAX_PRICE = 10000;
const ROOMS_MAX = 5;
const ROOMS_MIN = 1;
const GUESTS_MIN = 1;
const GUESTS_MAX = 10;
const TIME = [`12:00`, `13:00`, `14:00`];
const MAP_START_X = 25;
const MAX_X_POSITION = MAP_PINS.clientWidth;
const PIN_TOP_Y = 130;
const PIN_BOTTOM_Y = 630;
const PIN_WIDTH = 25;
const PIN_SCALE = 70;
const TYPE_HOTEL = [
  `palace`,
  `flat`,
  `house`,
  `bungalow`
];
const FEATURES = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`
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
const DESCRIPTION = [
  `Описание1`,
  `Описание2`,
  `Описание3`,
  `Описание4`,
  `Описание5`,
];
const PHOTOS_OF_HOTEL = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];


const getRandomRange = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomArray = function (array, quantity) {
  let newArray = [];

  for (let i = 0; i < getRandomRange(1, quantity); i++) {
    let number = getRandomRange(0, quantity);
    newArray[i] = array[number];
  }

  newArray = newArray.filter(function (item, index) {
    return newArray.indexOf(item) === index;
  });
  return newArray;
};


const randomPin = function () {
  const array = [];

  for (let i = 0; i < NUMBER_OF_PINS; i++) {
    const pinLocationX = getRandomRange(MAP_START_X, MAX_X_POSITION);
    const pinLocationY = getRandomRange(PIN_TOP_Y, PIN_BOTTOM_Y);
    const photosOfHotel = getRandomRange(1, PHOTOS_OF_HOTEL.length);

    array[i] = {
      'author': {
        avatar: `img/avatars/user0` + (i + 1) + `.png`
      },
      'offer': {
        'title': `${TITLE[getRandomRange(0, TITLE.length)]} `,
        'address': `Адрес предложения ${pinLocationX}, ${pinLocationY}`,
        'price': getRandomRange(MIN_PRICE, MAX_PRICE),
        'type': TYPE_HOTEL[getRandomRange(1, TYPE_HOTEL.length)],
        'rooms': getRandomRange(ROOMS_MIN, ROOMS_MAX),
        'guests': getRandomRange(GUESTS_MIN, GUESTS_MAX),
        'checkin': `Заезд до ${TIME[getRandomRange(0, TIME.length)]}`,
        'checkout': `выезд до ${TIME[getRandomRange(0, TIME.length)]}`,
        'features': getRandomArray(FEATURES),
        'description': `${DESCRIPTION[getRandomRange(0, DESCRIPTION.length)]} `,
        'photos': PHOTOS_OF_HOTEL.slice(0, photosOfHotel),
      },
      'location': {
        'x': pinLocationX,
        'y': pinLocationY
      }
    };
  }
  return array;
};

const renderElement = function (render) {
  const element = document.createDocumentFragment();

  for (let i = 0; i < render.length; i++) {
    const PIN_ELEMENT = PIN_TEMPLATE.cloneNode(true);

    PIN_ELEMENT.style = `left: ${render[i].location.x - PIN_WIDTH}px; top: ${render[i].location.y - PIN_SCALE}px;`;
    PIN_ELEMENT.querySelector(`img`).src = render[i].author.avatar;
    PIN_ELEMENT.querySelector(`img`).alt = render[i].offer.title;
    element.appendChild(PIN_ELEMENT);
  }
  MAP_PINS.appendChild(element);
};

const pinsBase = randomPin();
renderElement(pinsBase);


const offerCard = document.querySelector(`#card`).content.querySelector(`.map__card`);

const getOfferCard = function (element) {
  const card = offerCard.cloneNode(true);
  card.querySelector(`.popup__avatar`).src = element.author.avatar;
  card.querySelector(`.popup__title`).textContent = element.offer.title;
  card.querySelector(`.popup__text--address`).textContent = element.offer.address;
  card.querySelector(`.popup__text--price`).textContent = `${element.offer.price} ₽/ночь`;
  card.querySelector(`.popup__text--capacity`).textContent = `${element.offer.rooms} комнаты для ${element.offer.guests}`;
  card.querySelector(`.popup__text--time`).textContent = `Заезд после ${element.offer.checkin}, выезд до ${element.offer.checkout}`;
  card.querySelector(`.popup__type`).textContent = element.offer.type;
  const featuresList = card.querySelector(`.popup__features`);
  featuresList.innerHTML = ``;

  if (element.offer.features.length === 0) {
    card.removeChild(featuresList);
  }

  for (let i = 0; i < element.offer.features.length; i++) {
    const featuresItem = document.createElement(`li`);
    featuresItem.classList.add(`.popup__feature`, `popup__feature--${element.offer.features[i]}`);
    featuresList.appendChild(featuresItem);
  }

  card.querySelector(`.popup__description`).textContent = element.offer.description;
  const photoList = card.querySelector(`.popup__photos`);
  const photoItem = photoList.querySelector(`.popup__photo`);

  if (element.offer.photos.length === 0) {
    card.removeChild(photoList);
  }

  for (let j = 0; j < element.offer.photos.length; j++) {
    const item = photoItem.cloneNode(true);
    item.src = element.offer.photos[j];
    photoList.appendChild(item);
  }
  photoList.removeChild(photoItem);

  return card;
};

const mapFilter = map.querySelector(`.map__filters-container`);
const pinPopupFragment = document.createDocumentFragment();
const pinPopup = getOfferCard(pinsBase[0]);
map.insertBefore(pinPopupFragment.appendChild(pinPopup), mapFilter);
