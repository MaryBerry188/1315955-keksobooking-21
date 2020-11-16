'use strict';

(function () {
  const MOVING_INTERVAL = 500;

  window.moving = function (cb) {
    let lastTimeout = null;

    return function (...rest) {
      let parameters = rest;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb(...parameters);
      }, MOVING_INTERVAL);
    };
  };
})();
