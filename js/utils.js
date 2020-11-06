'use strict';

(function () {
  const MAP_PINS = document.querySelector(`.map__pins`);
  const NUMBER_OF_PINS = 8;
  const MIN_PRICE = 1000;
  const MAX_PRICE = 10000;
  const ROOMS_MAX = 100;
  const ROOMS_MIN = 1;
  const GUESTS_MIN = 1;
  const GUESTS_MAX = 10;
  const MAP_START_X = 25;
  const MAX_X_POSITION = MAP_PINS.clientWidth;
  const PIN_TOP_Y = 130;
  const PIN_BOTTOM_Y = 630;
  const TYPE_HOTEL = [
    `palace`,
    `flat`,
    `house`,
    `bungalow`
  ];
  const TIME = [
    `12:00`,
    `13:00`,
    `14:00`
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

  window.randomPin = function (array) {
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
})();
