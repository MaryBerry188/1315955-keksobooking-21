'use strict';

const MAP = document.querySelector(`.map`);
const MAP_PINS = document.querySelector(`.map__pins`);
const PIN_TEMPLATE = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const CARD_TEMPLATE = document.querySelector(`#card`).content.querySelector(`.map__card`);
const MAP_PIN_MAIN = MAP.querySelector(`.map__pin--main`);
const PinsSize = {
  WIDTH: 62,
  HEIGHT: 84,
  OFFSET_X: 31
};
const PINS = [];
const NUMBER_OF_PINS = 8;
const MIN_PRICE = 1000;
const MAX_PRICE = 10000;
const ROOMS_MAX = 100;
const ROOMS_MIN = 1;
const GUESTS_MIN = 1;
const GUESTS_MAX = 10;
const TIME = [
  `12:00`,
  `13:00`,
  `14:00`
];
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

const HOTEL_TYPES_PRICE = {
  palace: `10000`,
  flat: `1000`,
  house: `5000`,
  bungalow: `0`
};
const AD_FORM = document.querySelector(`.ad-form`);
const MAP_FILTERS = document.querySelectorAll(`.map__filters select, .map__filters fieldset, .ad-form fieldset`);
const ADDRESS_FIELD = AD_FORM.querySelector(`#address`);
const AD_TYPE = AD_FORM.querySelector(`#type`);
const AD_PRICE = AD_FORM.querySelector(`#price`);
const AD_TIME_IN = AD_FORM.querySelector(`#timein`);
const AD_TIME_OUT = AD_FORM.querySelector(`#timeout`);
const AD_ROOM_NUMBER = AD_FORM.querySelector(`#room_number`);
const CAPACITY = AD_FORM.querySelector(`#capacity`);
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

const randomPin = function (array) {
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
};


const renderElement = function (render) {
  const elements = document.createDocumentFragment();

  for (let i = 0; i < render.length; i++) {
    const PIN_ELEMENT = PIN_TEMPLATE.cloneNode(true);

    PIN_ELEMENT.style = `left: ${render[i].location.x - PIN_WIDTH}px; top: ${render[i].location.y - PIN_SCALE}px;`;
    PIN_ELEMENT.querySelector(`img`).src = render[i].author.avatar;
    PIN_ELEMENT.querySelector(`img`).alt = render[i].offer.title;
    elements.appendChild(PIN_ELEMENT);
  }
  MAP_PINS.appendChild(elements);
};

const disableFormFields = function (fields) {
  for (let i = 0; i < fields.length; i++) {
    fields[i].setAttribute(`disabled`, `disabled`);
  }
};

const enableFormFields = function (fields) {
  for (let i = 0; i < fields.length; i++) {
    fields[i].removeAttribute(`disabled`);
  }
};

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
  MAP.insertBefore(FRAGMENT, ELEMENT_AFTER);
};

const fieldAddress = function (offsetX, offsetY) {
  let xLocation = parseInt(MAP_PIN_MAIN.style.left, 10) + offsetX;
  let yLocation = parseInt(MAP_PIN_MAIN.style.top, 10) + offsetY;
  ADDRESS_FIELD.value = `${xLocation}, ${yLocation}`;
};

const onCardEscPress = function (evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    closeCard();
  }
};

const closeCard = function () {
  const ELEMENT = MAP.querySelector(`.map__card`);
  MAP.removeChild(ELEMENT);
  document.removeEventListener(`keydown`, onCardEscPress);
};

const showCard = function (element) {
  let CARD = MAP.querySelector(`.map__card`);

  if (CARD) {
    MAP.removeChild(CARD);
  }

  renderCard(element);

  CARD = MAP.querySelector(`.map__card`);

  document.addEventListener(`keydown`, onCardEscPress);

  CARD.querySelector(`.popup__close`).addEventListener(`click`, function () {
    closeCard();
  });

  CARD.querySelector(`.popup__close`).addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closeCard();
    }
  });
};

const setPinHandlers = function (array) {
  const PIN_ELEMENTS = MAP.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  for (let i = 0; i < array.length; i++) {
    PIN_ELEMENTS[i].addEventListener(`click`, function () {
      showCard(array[i]);
    });
  }
};

const checkValidType = function () {
  let type = AD_TYPE.value;
  let minPrice = HOTEL_TYPES_PRICE[type];

  AD_PRICE.setAttribute(`placeholder`, minPrice);
  AD_PRICE.setAttribute(`min`, minPrice);
};

const checkValidTime = function (timeSource, timeChange) {
  const time = timeChange.options;

  for (let i = 0; i < time.length; i++) {
    time[i].removeAttribute(`selected`);
  }

  time[timeSource.selectedIndex].setAttribute(`selected`, `selected`);
};

let userForm = document.querySelector(`.ad-form`);

let setDisabledValue = function (elements, values) {
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
    if (values.indexOf(elements[i].value) > -1) {
      elements[i].disabled = true;
    }
  }
};

let roomsInputElement = userForm.querySelector(`select[name="rooms"]`);

let calculateRoomsAndCapacity = function () {
  let capacityInputSelect = userForm.querySelector(`select[name="capacity"]`);
  let capacityOptionOptions = capacityInputSelect.querySelectorAll(`option`);
  let roomsInputValue = roomsInputElement.value;

  switch (roomsInputValue) {
    case `1`:
      setDisabledValue(capacityOptionOptions, [`0`, `2`, `3`]);
      capacityOptionOptions[0].selected = true;
      break;
    case `2`:
      setDisabledValue(capacityOptionOptions, [`0`, `3`]);
      capacityOptionOptions[1].selected = true;
      break;
    case `3`:
      setDisabledValue(capacityOptionOptions, [`0`]);
      capacityOptionOptions[2].selected = true;
      break;
    case `100`:
      setDisabledValue(capacityOptionOptions, [`1`, `2`, `3`]);
      capacityOptionOptions[3].selected = true;
      break;
  }
};

let roomsInputChangeHandler = function () {
  calculateRoomsAndCapacity();
};

roomsInputElement.addEventListener(`change`, roomsInputChangeHandler);

const onMousePress = function (evt) {
  if (evt.button === 0) {
    activatePage();
  }
};

const onEnterPress = function (evt) {
  if (evt.key === `Enter`) {
    activatePage();
  }
};

const activatePage = function () {
  enableFormFields(MAP_FILTERS);
  MAP.classList.remove(`map--faded`);
  AD_FORM.classList.remove(`ad-form--disabled`);
  fieldAddress(PinsSize.OFFSET_X, PinsSize.HEIGHT);
  randomPin(PINS);
  renderElement(PINS);
  setPinHandlers(PINS);
  checkValidType();
  userForm();

  MAP_PIN_MAIN.removeEventListener(`mousedown`, onMousePress);
  MAP_PIN_MAIN.removeEventListener(`keydown`, onEnterPress);
};

fieldAddress(PinsSize.OFFSET_X, PinsSize.OFFSET_X);
disableFormFields(MAP_FILTERS);

MAP_PIN_MAIN.addEventListener(`mousedown`, onMousePress);
MAP_PIN_MAIN.addEventListener(`keydown`, onEnterPress);

AD_TYPE.addEventListener(`change`, function () {
  checkValidType();
});

AD_TIME_IN.addEventListener(`change`, function () {
  checkValidTime(AD_TIME_IN, AD_TIME_OUT);
});

AD_TIME_OUT.addEventListener(`change`, function () {
  checkValidTime(AD_TIME_OUT, AD_TIME_IN);
});

CAPACITY.addEventListener(`change`, function () {
  userForm();
});

AD_ROOM_NUMBER.addEventListener(`change`, function () {
  userForm();
});

