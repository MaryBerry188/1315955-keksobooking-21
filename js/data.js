'use strict';

(function () {
  const LOAD_URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;

  window.load = function (onSuccess, onError) {
    const XHR = new XMLHttpRequest();
    XHR.responseType = `json`;

    XHR.addEventListener(`load`, function () {
      if (XHR.status === StatusCode.OK) {
        onSuccess(XHR.response);
      } else {
        onError(`Статус ответа: ${XHR.status} ${XHR.statusText}`);
      }
    });
    XHR.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    XHR.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${XHR.timeout}мс`);
    });

    XHR.timeout = TIMEOUT_IN_MS;

    XHR.open(`GET`, LOAD_URL);
    XHR.send();
  };
})();
