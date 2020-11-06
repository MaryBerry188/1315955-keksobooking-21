'use strict';

(function () {
  const MAP = document.querySelector(`.map`);
  const CARD_TEMPLATE = document.querySelector(`#card`)
    .content
    .querySelector(`.map__card`);
  const HOTEL_TYPES_RUS = {
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`
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

  window.renderCard = function (element) {
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
})();
