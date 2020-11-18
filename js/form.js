'use strict';

(function () {
  const HOTEL_TYPES_PRICE = {
    palace: `10000`,
    flat: `1000`,
    house: `5000`,
    bungalow: `0`
  };
  const UPLOAD_URL = `https://21.javascript.pages.academy/keksobooking`;
  const PAGE = document.querySelector(`main`);
  const MAP = document.querySelector(`.map`);
  const MAP_PIN_MAIN = MAP.querySelector(`.map__pin--main`);
  const SUCCESS_MODAL = document.querySelector(`#success`)
    .content
    .querySelector(`.success`);
  const ERROR_MODAL = document.querySelector(`#error`)
    .content
    .querySelector(`.error`);
  const AD_FORM = document.querySelector(`.ad-form`);
  const AD_ADDRESS = AD_FORM.querySelector(`#address`);
  const AD_TYPE = AD_FORM.querySelector(`#type`);
  const AD_PRICE = AD_FORM.querySelector(`#price`);
  const AD_TIME_IN = AD_FORM.querySelector(`#timein`);
  const AD_TIME_OUT = AD_FORM.querySelector(`#timeout`);

  window.fieldAddress = function (offsetX, offsetY) {
    let xLocation = parseInt(MAP_PIN_MAIN.style.left, 10) + offsetX;
    let yLocation = parseInt(MAP_PIN_MAIN.style.top, 10) + offsetY;
    AD_ADDRESS.value = `${xLocation}, ${yLocation}`;
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

  const getTargetElement = function () {
    const error = PAGE.querySelector(`.error`);
    const success = PAGE.querySelector(`.success`);
    return error ? error : success;
  };

  const onPopupPressEsc = function (evt) {
    window.util.isEscEvent(evt, function () {
      closePopup();
    });
  };

  const onEnterPress = function (evt) {
    window.util.isEnterEvent(evt, function () {
      closePopup();
    });
  };

  const onPopupOutsideClick = function (evt) {
    const ELEMENT = getTargetElement();

    evt.preventDefault();

    if (evt.target === ELEMENT) {
      closePopup();
    }
  };

  const closePopup = function () {
    const ELEMENT = getTargetElement();

    PAGE.removeChild(ELEMENT);
    document.removeEventListener(`keydown`, onPopupPressEsc);
    document.removeEventListener(`click`, onPopupOutsideClick);
  };

  const onDataLoadSuccess = function () {
    const FRAGMENT = document.createDocumentFragment();
    const SUCCESS_MESSAGE = SUCCESS_MODAL.cloneNode(true);

    FRAGMENT.appendChild(SUCCESS_MESSAGE);
    PAGE.appendChild(FRAGMENT);

    document.addEventListener(`keydown`, onPopupPressEsc);
    document.addEventListener(`click`, onPopupOutsideClick);
    window.deactivatePage();
  };

  const getError = function () {
    const FRAGMENT = document.createDocumentFragment();
    const ERROR_MESSAGE = ERROR_MODAL.cloneNode(true);
    const TRY_AGAIN_BUTTON = ERROR_MESSAGE.querySelector(`.error__button`);

    FRAGMENT.appendChild(ERROR_MESSAGE);
    PAGE.appendChild(FRAGMENT);

    TRY_AGAIN_BUTTON.addEventListener(`click`, closePopup);
    TRY_AGAIN_BUTTON.addEventListener(`keydown`, onEnterPress);
    document.addEventListener(`keydown`, onPopupPressEsc);
    document.addEventListener(`click`, onPopupOutsideClick);
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

  AD_FORM.addEventListener(`submit`, function (evt) {
    evt.preventDefault();

    window.load(UPLOAD_URL, `POST`, onDataLoadSuccess, getError, new FormData(AD_FORM));
  });
})();
