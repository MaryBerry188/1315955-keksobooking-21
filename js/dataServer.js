'use strict';

(function () {
  const CODE = {
    ok: 200,
    BadRequest: 400,
    Unauthorized: 401,
    NotFound: 404
  };
  const TIMEOUT = 10000;

  window.load = function (url, method, onSuccess, onError, data) {
    const XHR = new XMLHttpRequest();
    XHR.responseType = `json`;

    XHR.addEventListener(`load`, function () {
      let sms;
      switch (XHR.status) {
        case CODE.ok:
          onSuccess(XHR.response);

          break;

        case CODE.BadRequest:
          sms = `Неверный запрос ${XHR.status} + ${XHR.statusText}`;
          break;
        case CODE.Unauthorized:
          sms = `Пользователь не авторизован`;
          break;
        case CODE.NotFound:
          sms = `Ничего не найдено`;
          break;

        default:
          sms = `${XHR.status}  + ${XHR.statusText}`;
      }
      if (sms) {
        onError(sms);
      }
    });

    XHR.addEventListener(`error`, function () {
      onError(`Произошла ошибка соединения`);
    });
    XHR.addEventListener(`timeout`, function () {
      onError(`Запрос не успел выполниться за ${XHR.timeout}мс`);
    });

    XHR.timeout = TIMEOUT;

    XHR.open(method, url);

    if (data) {
      XHR.send(data);
    } else {
      XHR.send();
    }
  };
})();
