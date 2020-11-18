'use strict';

(function () {
  const LOW_PRICE = 10000;
  const HIGH_PRICE = 50000;
  const MAP_FILTERS = document.querySelector(`.map__filters`);
  const HOUSING_TYPE = MAP_FILTERS.querySelector(`#housing-type`);
  const HOUSING_PRICE = MAP_FILTERS.querySelector(`#housing-price`);
  const HOUSING_ROOMS = MAP_FILTERS.querySelector(`#housing-rooms`);
  const HOUSING_GUESTS = MAP_FILTERS.querySelector(`#housing-guests`);
  const FEATURES_LIST = MAP_FILTERS.querySelectorAll(`#housing-features input`);

  const filterType = function (pin, value) {
    if (value === `any`) {
      return true;
    } else {
      return String(pin) === value;
    }
  };

  const filterPrice = function (pin, value) {
    let price;
    if (value === `any`) {
      return true;
    } else {
      if (pin < LOW_PRICE) {
        price = `low`;
      } else if (pin >= LOW_PRICE && pin <= HIGH_PRICE) {
        price = `middle`;
      } else {
        price = `high`;
      }
      return price === value;
    }
  };

  const getFeatures = function () {
    let features = [];
    for (let i = 0; i < FEATURES_LIST.length; i++) {
      if (FEATURES_LIST[i].checked) {
        features.push(FEATURES_LIST[i].value);
      }
    }
    return features;
  };

  const filterFeatures = function (element, features) {
    return features.every(function (feature) {
      return element.offer.features.indexOf(feature) !== -1;
    });
  };

  const filter = function (pins) {
    let houseType = HOUSING_TYPE.value;
    let housePrice = HOUSING_PRICE.value;
    let houseRooms = HOUSING_ROOMS.value;
    let houseGuests = HOUSING_GUESTS.value;
    let features = getFeatures();
    return pins.filter(function (element) {
      return filterType(element.offer.type, houseType) && filterPrice(element.offer.price, housePrice) && filterType(element.offer.rooms, houseRooms) && filterType(element.offer.guests, houseGuests) && filterFeatures(element, features);
    });
  };

  window.filterPins = window.moving(function (pins) {
    window.pin.removePins();
    window.map.closeCard();

    window.pin.renderElements(filter(pins));
  });
})();
