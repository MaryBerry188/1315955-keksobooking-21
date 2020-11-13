'use strict';

(function () {
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const MAP = document.querySelector(`.map`);
  const MAP_PIN_MAIN = MAP.querySelector(`.map__pin--main`);
  const AD_FORM = document.querySelector(`.ad-form`);
  const ALL_FORM_FILDSET = document.querySelectorAll(`.ad-form fieldset, .map__filters select, .map__filters fieldset`);
  const AD_FORM_FIELDS = document.querySelectorAll(`.ad-form fieldset`);
  const MAP_FILTERS = document.querySelectorAll(`.map__filters select, .map__filters fieldset`);
  const AD_FORM_RESET = document.querySelector(`.ad-form__reset`);
  const PinsSize = {
    WIDTH: 62,
    HEIGHT: 84,
    OFFSET_X: 31
  };
  window.pins = [];

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

  const onMousePress = function (evt) {
    if (evt.button === 0) {
      activatePage();
    }
  };

  const onEnterPress = function (evt) {
    window.util.isEnterEvent(evt, function () {
      activatePage();
    });
  };

  const onDataLoadError = function (errorMessage) {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;

    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const onDataLoadSuccess = function (data) {
    window.pins = data;
    window.pin.renderElements(data);
    enablePage(MAP_FILTERS);
  };

  const activatePage = function () {
    enablePage(AD_FORM_FIELDS);
    MAP.classList.remove(`map--faded`);
    AD_FORM.classList.remove(`ad-form--disabled`);
    window.fieldAddress(PinsSize.OFFSET_X, PinsSize.HEIGHT);
    window.load(LOAD_URL, `GET`, onDataLoadSuccess, onDataLoadError);
    MAP_PIN_MAIN.removeEventListener(`mousedown`, onMousePress);
    MAP_PIN_MAIN.removeEventListener(`keydown`, onEnterPress);
    AD_FORM_RESET.addEventListener(`click`, function () {
      resetPage();
    });
  };

  window.deactivatePage = function () {
    AD_FORM.reset();
    disabledPage(ALL_FORM_FILDSET);
    window.fieldAddress(PinsSize.OFFSET_X, PinsSize.OFFSET_X);
    MAP.classList.add(`map--faded`);
    AD_FORM.classList.add(`ad-form--disabled`);
    MAP_PIN_MAIN.addEventListener(`mousedown`, onMousePress);
    MAP_PIN_MAIN.addEventListener(`keydown`, onEnterPress);
    window.pin.removePins();
    window.map.closeCard();
  };

  const resetPage = function (evt) {
    evt.preventDefault();
    window.deactivatePage();
    AD_FORM_RESET.removeEventListener(`click`, function () {
      resetPage();
    });
  };
})();
