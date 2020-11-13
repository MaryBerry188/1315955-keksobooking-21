'use strict';

(function () {
  const MAP = document.querySelector(`.map`);

  const onCardEscPress = function (evt) {
    if (evt.key === `Escape`) {
      evt.preventDefault();
      window.map.closeCard();
    }
  };

  window.map = {
    closeCard: function () {
      const ELEMENT = MAP.querySelector(`.map__card`);
      if (ELEMENT) {
        MAP.removeChild(ELEMENT);
        document.removeEventListener(`keydown`, onCardEscPress);
      }
    },
    showCard: function (element) {
      let CARD = MAP.querySelector(`.map__card`);

      if (CARD) {
        MAP.removeChild(CARD);
      }

      window.renderCard(element);

      CARD = MAP.querySelector(`.map__card`);

      document.addEventListener(`keydown`, onCardEscPress);

      CARD.querySelector(`.popup__close`).addEventListener(`click`, function () {
        window.map.closeCard();
      });

      CARD.querySelector(`.popup__close`).addEventListener(`keydown`, function (evt) {
        if (evt.key === `Enter`) {
          window.map.closeCard();
        }
      });
    }
  };
})();
