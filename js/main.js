'use strict';

(function () {
  const MAP_FILTERS = document.querySelector(`.map__filters`);
  const HOUSING_TYPE = MAP_FILTERS.querySelector(`#housing-type`);

  window.deactivatePage();
  window.scrollTo(0, 0);

  HOUSING_TYPE.addEventListener(`change`, function () {
    window.filter.housingTypeChange(window.pins);
  });
})();
