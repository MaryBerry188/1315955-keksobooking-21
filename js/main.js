'use strict';

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);
const MAP_PINS = document.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`)
  .content.querySelector(`.map__pin`);
const CARD_TEMPLATE = document.querySelector(`#card`)
  .content
  .querySelector(`.map__card`);
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
const HOTEL_TYPES_RUS = {
  palace: `Дворец`,
  flat: `Квартира`,
  house: `Дом`,
  bungalow: `Бунгало`
};
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

//

const getRoomText = function (rooms) {
  let room;

  if (rooms === 1) {
    room = `комната`;
  } else if (rooms === 5) {
    room = `комнат`;
  } else {
    room = `комнаты`;
  }
  return room;
};

const getGuestText = function (guests) {
  let guest;

  if (guests === 1) {
    guest = `гостя`;
  } else {
    guest = `гостей`;
  }
  return guest;
};

const fillSrcField = function (element, src) {
  if (src) {
    element.src = src;
  } else {
    element.style.display = `none`;
  }
};

const fillTextField = function (element, text) {
  if (text) {
    element.textContent = text;
  } else {
    element.style.display = `none`;
  }
};

const fillTextCapacity = function (element, rooms, guests) {
  const ROOM_TEXT = getRoomText(rooms);
  const GUEST_TEXT = getGuestText(guests);

  if (rooms && guests) {
    element.textContent = `${rooms} ${ROOM_TEXT} для ${guests} ${GUEST_TEXT}`;
  } else {
    element.style.display = `none`;
  }
};

const fillTextTime = function (element, checkin, checkout) {
  if (checkin && checkout) {
    element.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    element.style.display = `none`;
  }
};

const setFeatures = function (parent, target, source) {
  if (source) {
    parent.innerHTML = ``;
    for (let i = 0; i < source.length; i++) {
      for (let j = 0; j < target.length; j++) {
        if (target[j].classList.contains(`popup__feature--${source[i]}`)) {
          parent.appendChild(target[j]);
        }
      }
    }
  } else {
    parent.style.display = `none`;
  }
};

const addPhotos = function (target, element, source) {
  if (source) {
    target.innerHTML = ``;
    for (let i = 0; i < source.length; i++) {
      let newElement = element.cloneNode(true);
      target.appendChild(newElement);
      newElement.src = source[i];
    }
  } else {
    target.style.display = `none`;
  }
};

const renderCard = function (element) {
  const FRAGMENT = document.createDocumentFragment();
  const PARENT = document.querySelector(`.map`);
  const ELEMENT_AFTER = document.querySelector(`.map__filters-container`);
  const CARD = CARD_TEMPLATE.cloneNode(true);
  const FEATURES_LIST = CARD.querySelector(`.popup__features`);
  const FEATURE_ITEMS = CARD.querySelectorAll(`.popup__feature`);
  const PHOTOS_LIST = CARD.querySelector(`.popup__photos`);
  const PHOTO_ITEM = CARD.querySelector(`.popup__photo`);

  fillSrcField(CARD.querySelector(`.popup__avatar`), element.author.avatar);
  fillTextField(CARD.querySelector(`.popup__title`), element.offer.title);
  fillTextField(CARD.querySelector(`.popup__text--address`), element.offer.address);
  fillTextField(CARD.querySelector(`.popup__text--price`), element.offer.price);
  fillTextField(CARD.querySelector(`.popup__type`), HOTEL_TYPES_RUS[element.offer.type]);
  fillTextCapacity(CARD.querySelector(`.popup__text--capacity`), element.offer.rooms, element.offer.guests);
  fillTextTime(CARD.querySelector(`.popup__text--time`), element.offer.checkin, element.offer.checkout);
  setFeatures(FEATURES_LIST, FEATURE_ITEMS, element.offer.features);
  fillTextField(CARD.querySelector(`.popup__description`), element.offer.description);
  addPhotos(PHOTOS_LIST, PHOTO_ITEM, element.offer.photos);

  FRAGMENT.appendChild(CARD);
  PARENT.insertBefore(FRAGMENT, ELEMENT_AFTER);
};

//
const pinsBase = randomPin();
renderElement(pinsBase);
renderCard(pinsBase[0]);
