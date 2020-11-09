'use strict';

(function () {
  const MAP = document.querySelector(`.map`);
  const MAP_PIN_MAIN = MAP.querySelector(`.map__pin--main`);

  const AD_FORM = document.querySelector(`.ad-form`);
  const ADDRESS_FIELD = AD_FORM.querySelector(`#address`);
  const AD_TYPE = AD_FORM.querySelector(`#type`);
  const AD_PRICE = AD_FORM.querySelector(`#price`);
  const AD_TIME_IN = AD_FORM.querySelector(`#timein`);
  const AD_TIME_OUT = AD_FORM.querySelector(`#timeout`);
  const HOTEL_TYPES_PRICE = {
    palace: `10000`,
    flat: `1000`,
    house: `5000`,
    bungalow: `0`
  };

  window.fieldAddress = function (offsetX, offsetY) {
    let xLocation = parseInt(MAP_PIN_MAIN.style.left, 10) + offsetX;
    let yLocation = parseInt(MAP_PIN_MAIN.style.top, 10) + offsetY;
    ADDRESS_FIELD.value = `${xLocation}, ${yLocation}`;
  };

  const checkValidType = function () {
    let type = AD_TYPE.value;
    let minPrice = HOTEL_TYPES_PRICE[type];

    AD_PRICE.setAttribute(`placeholder`, minPrice);
    AD_PRICE.setAttribute(`min`, minPrice);
  };

  const userForm = document.querySelector(`.ad-form`);

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

  const checkValidTime = function (timeSource, timeChange) {
    const time = timeChange.options;

    for (let i = 0; i < time.length; i++) {
      time[i].removeAttribute(`selected`);
    }

    time[timeSource.selectedIndex].setAttribute(`selected`, `selected`);
  };

  const activateForm = function () {
    checkValidType();
  };

  activateForm();

  AD_TYPE.addEventListener(`change`, function () {
    checkValidType();
  });

  AD_TIME_IN.addEventListener(`change`, function () {
    checkValidTime(AD_TIME_IN, AD_TIME_OUT);
  });

  AD_TIME_OUT.addEventListener(`change`, function () {
    checkValidTime(AD_TIME_OUT, AD_TIME_IN);
  });
})();
