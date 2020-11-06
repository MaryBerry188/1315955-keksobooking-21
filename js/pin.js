'use strict';

(function () {
  const MAP_PINS = document.querySelector(`.map__pins`);
  const PIN_TEMPLATE = document.querySelector(`#pin`)
    .content
    .querySelector(`.map__pin`);
  const PIN_WIDTH = 25;
  const PIN_SCALE = 70;

  window.renderElement = function (render) {
    const elements = document.createDocumentFragment();

    for (let i = 0; i < render.length; i++) {
      const PIN_ELEMENT = PIN_TEMPLATE.cloneNode(true);

      PIN_ELEMENT.style = `left: ${render[i].location.x - PIN_WIDTH}px; top: ${render[i].location.y - PIN_SCALE}px;`;
      PIN_ELEMENT.querySelector(`img`).src = render[i].author.avatar;
      PIN_ELEMENT.querySelector(`img`).alt = render[i].offer.title;
      elements.appendChild(PIN_ELEMENT);
    }
    MAP_PINS.appendChild(elements);
  };
})();
