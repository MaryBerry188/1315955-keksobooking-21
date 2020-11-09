'use strict';

(function () {
  const PIN_TEMPLATE = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
  const PIN_WIDTH = 25;
  const PIN_SCALE = 70;

  window.renderElement = function (pin) {
    const PIN_ELEMENT = PIN_TEMPLATE.cloneNode(true);

    PIN_ELEMENT.style = `left: ${pin.location.x - PIN_WIDTH}px; top: ${pin.location.y - PIN_SCALE}px;`;
    PIN_ELEMENT.querySelector(`img`).src = pin.author.avatar;
    PIN_ELEMENT.querySelector(`img`).alt = pin.offer.title;
    PIN_ELEMENT.addEventListener(`click`, function () {
      window.showCard(pin);
    });

    return PIN_ELEMENT;
  };
})();
