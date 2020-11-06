'use strict';

(function () {
  const MAP = document.querySelector(`.map`);

  const onCardEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      closeCard();
    }
  };

  const closeCard = function () {
    const ELEMENT = MAP.querySelector(`.map__card`);
    MAP.removeChild(ELEMENT);
    document.removeEventListener(`keydown`, onCardEscPress);
  };

  window.showCard = function (element) {
    let CARD = MAP.querySelector(`.map__card`);

    if (CARD) {
      MAP.removeChild(CARD);
    }

    window.renderCard(element);

    CARD = MAP.querySelector(`.map__card`);

    document.addEventListener(`keydown`, onCardEscPress);

    CARD.querySelector(`.popup__close`).addEventListener(`click`, function () {
      closeCard();
    });

    CARD.querySelector(`.popup__close`).addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        closeCard();
      }
    });
  };
})();
