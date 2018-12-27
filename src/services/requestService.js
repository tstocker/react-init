const I18n = require('react-i18nify').I18n;

class requestService {

  constructor(defaultHeaders) {
    this.headers = defaultHeaders;
  }

  async get(url) {
    return new Promise((resolve, reject) => {
      console.log(url);
      let req = new XMLHttpRequest();
      req.open('GET', url, false);

      // set headers
      for (let header in this.headers) {
        req.setRequestHeader(header, this.headers[header]);
      }

      req.send(null);

      if (req.status === 200) {
        // this is only for API with json format
        let result = JSON.parse(req.responseText);
        resolve(result);
      } else {
        reject("Status de la réponse: %d (%s)", req.status, req.statusText)
      }
    });

  }

  async post(url, data, headers) {
    headers = headers || [];
    return new Promise((resolve, reject) => {
      // combine default header with specifics headers
      headers = Object.assign(this.headers, headers);

      let req = new XMLHttpRequest();
      req.open("POST", url, true);

      // set headers
      for (let header in headers) {
        req.setRequestHeader(header, headers[header]);
      }

      req.onload = function (e) {

        if (req.readyState === 4) {
          if (req.status === 200) {

            console.log(req);
            console.log(req.getResponseHeader('set-cookie'));

            // this is only for API with json format
            let result = {
              json: JSON.parse(req.responseText),
              // TODO verify if this set-cookie is always used
              cookie: req.getResponseHeader('Set-Cookie')
            };
            resolve(result);
          } else {
            reject(req.statusText);
          }
        }
      };
      req.onerror = function (e) {
        console.error(e);
      };
      // stringify  json content
      if(headers["Content-type"] === "application/json")
        data = JSON.stringify(data);

      req.send(data);
    });
  }

}

export default requestService;
