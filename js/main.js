'use strict';

(function () {
  const MAP = document.querySelector(`.map`);
  const MAP_PINS = document.querySelector(`.map__pins`);
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

  const errorHandler = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const successHandler = function (pins) {
    const FRAGMENT = document.createDocumentFragment();

    for (let i = 0; i < pins.length; i++) {
      FRAGMENT.appendChild(window.renderElement(pins[i]));
    }
    MAP_PINS.appendChild(FRAGMENT);
  };

  const activatePage = function () {
    enablePage(MAP_FILTERS);
    MAP.classList.remove(`map--faded`);
    AD_FORM.classList.remove(`ad-form--disabled`);
    window.fieldAddress(PinsSize.OFFSET_X, PinsSize.HEIGHT);
    window.load(successHandler, errorHandler);
    MAP_PIN_MAIN.removeEventListener(`mousedown`, onMouseLeftPress);
    MAP_PIN_MAIN.removeEventListener(`keydown`, onEnterPress);
  };

  disabledPage(MAP_FILTERS);
  window.fieldAddress(PinsSize.OFFSET_X, PinsSize.OFFSET_X);
  MAP_PIN_MAIN.addEventListener(`mousedown`, onMouseLeftPress);
  MAP_PIN_MAIN.addEventListener(`keydown`, onEnterPress);
})();
