'use strict';

(function () {
  const FILTER = document.querySelector(`.map__filters`);

  window.deactivatePage();
  window.scrollTo(0, 0);

  FILTER.addEventListener(`change`, function () {
    window.filterPins(window.pins);
  });
})();
