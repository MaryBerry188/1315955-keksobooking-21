'use strict';

(function () {
  const MAX_PINS = 5;
  const DISPLACEMENT_X = 25;
  const DISPLACEMENT_Y = 70;
  const MAP_PINS = document.querySelector(`.map__pins`);
  const PIN_TEMPLATE = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
  const cleanPin = function () {
    const PINS = document.querySelectorAll(`.map__pin`);

    PINS.forEach(function (element) {
      if (element.classList.contains(`map__pin--active`)) {
        element.classList.remove(`map__pin--active`);
      }
    });
  };

  window.pin = {
    renderElements: function (pins) {
      const FRAGMENT = document.createDocumentFragment();
      let maxPins = pins.length > MAX_PINS ? MAX_PINS : pins.length;

      for (let i = 0; i < maxPins; i++) {
        const PIN_ELEMENT = PIN_TEMPLATE.cloneNode(true);
        PIN_ELEMENT.style = `left: ${pins[i].location.x - DISPLACEMENT_X}px; top: ${pins[i].location.y - DISPLACEMENT_Y}px;`;
        PIN_ELEMENT.querySelector(`img`).src = pins[i].author.avatar;
        PIN_ELEMENT.querySelector(`img`).alt = pins[i].offer.title;
        FRAGMENT.appendChild(PIN_ELEMENT);
        PIN_ELEMENT.addEventListener(`click`, function () {
          cleanPin();
          PIN_ELEMENT.classList.add(`map__pin--active`);
          window.map.showCard(pins[i]);
        });
      }

      MAP_PINS.appendChild(FRAGMENT);
    },
    removePins: function () {
      const PINS = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);

      for (let i = 0; i < PINS.length; i++) {
        MAP_PINS.removeChild(PINS[i]);
      }
    }
  };
})();
