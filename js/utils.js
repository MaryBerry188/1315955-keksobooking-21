'use strict';

(function () {
  const MAP = document.querySelector(`.map`);
  const MAP_PINS = document.querySelector(`.map__pins`);
  const MAP_PIN_MAIN = MAP.querySelector(`.map__pin--main`);
  const MainPinDimensions = {
    WIDTH: 62,
    HEIGHT: 84,
    OFFSET_X: 31
  };
  const MIN_X_POSITION = 0 - (MainPinDimensions.WIDTH / 2);
  const MAX_X_POSITION = MAP_PINS.clientWidth - (MainPinDimensions.WIDTH / 2);
  const MIN_Y_POSITION = 130 - MainPinDimensions.HEIGHT;
  const MAX_Y_POSITION = 630 - MainPinDimensions.HEIGHT;

  const dragMainPin = function (evt) {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const checkValidPosition = function (coords) {
      if (coords.x <= MIN_X_POSITION) {
        coords.x = MIN_X_POSITION;
      }
      if (coords.x >= MAX_X_POSITION) {
        coords.x = MAX_X_POSITION;
      }
      if (coords.y <= MIN_Y_POSITION) {
        coords.y = MIN_Y_POSITION;
      }
      if (coords.y >= MAX_Y_POSITION) {
        coords.y = MAX_Y_POSITION;
      }
    };

    const getNewCoords = function (moveEvt) {
      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      let newCoords = {
        x: MAP_PIN_MAIN.offsetLeft - shift.x,
        y: MAP_PIN_MAIN.offsetTop - shift.y
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      checkValidPosition(newCoords);
      MAP_PIN_MAIN.style.top = (newCoords.y) + `px`;
      MAP_PIN_MAIN.style.left = (newCoords.x) + `px`;
      window.fieldAddress(MainPinDimensions.OFFSET_X, MainPinDimensions.HEIGHT);
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      getNewCoords(moveEvt);
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      getNewCoords(upEvt);
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  MAP_PIN_MAIN.addEventListener(`mousedown`, function (evt) {
    dragMainPin(evt);
  });
})();
