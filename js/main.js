'use strict';

(function () {
  const MAP = document.querySelector(`.map`);
  const MAP_PIN_MAIN = MAP.querySelector(`.map__pin--main`);
  const AD_FORM = document.querySelector(`.ad-form`);
  const MAP_FILTERS = document.querySelectorAll(`.map__filters select, .map__filters fieldset, .ad-form fieldset`);
  const PinsSize = {
    WIDTH: 62,
    HEIGHT: 84,
    OFFSET_X: 31
  };

  const disabledPage = function (fields) {
    for (let i = 0; i < fields.length; i++) {
      fields[i].setAttribute(`disabled`, `disabled`);
    }
  };

  const enablePage = function (fields) {
    for (let i = 0; i < fields.length; i++) {
      fields[i].removeAttribute(`disabled`);
    }
  };

  const onMouseLeftPress = function (evt) {
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
    const PINS = window.randomPin();

    enablePage(MAP_FILTERS);
    MAP.classList.remove(`map--faded`);
    AD_FORM.classList.remove(`ad-form--disabled`);
    window.renderElement(PINS);
    MAP_PIN_MAIN.removeEventListener(`mousedown`, onMouseLeftPress);
    MAP_PIN_MAIN.removeEventListener(`keydown`, onEnterPress);
  };

  disabledPage(MAP_FILTERS);
  window.fieldAddress(PinsSize.OFFSET_X, PinsSize.OFFSET_X);
  MAP_PIN_MAIN.addEventListener(`mousedown`, onMouseLeftPress);
  MAP_PIN_MAIN.addEventListener(`keydown`, onEnterPress);
})();
