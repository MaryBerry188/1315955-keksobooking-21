'use strict';

(function () {
  const MAP_FILTERS = document.querySelector(`.map__filters`);
  const HOUSING_TYPE = MAP_FILTERS.querySelector(`#housing-type`);

  const filterType = function (pin) {
    let houseType = HOUSING_TYPE.value;
    return pin.offer.type === houseType;
  };

  window.filter = {
    housingTypeChange: function (pins) {
      const houseType = HOUSING_TYPE.value;
      window.pin.removePins();
      window.map.closeCard();
      if (houseType !== `any`) {
        window.pin.renderElements(pins.filter(filterType));
      } else {
        window.pin.renderElements(pins);
      }
    }
  };
})();
