import {Request} from "../config";

const I18n = require('react-i18nify').I18n;

class SessionService {

  constructor(){
  }

  getCookie(name) {
    console.log(document.cookie);
    let value = "; " + document.cookie;
    let parts = value.split("; " + name + "=");
    if (parts.length === 2) return parts.pop().split(";").shift();
  }

  async logout() {
    try {
      let response = await Request.get("/api/logout");
    } catch(err) {
      console.log('error here');
      alert(err);
    }
  }

  async login(email, password){
    try {
      let response = await Request.post('http://localhost' + "/api/login/session", {
        "email": email,
        "password": password,
      });
      window.location.href = "/";
    } catch(err) {
      alert(err);
    }
  }

  // async isConnected() {
  //   let me = await Request.get('/api/users/me');
  //   if (me && me._id)
  //     return true;
  //   return false;
  // }
}

let sessionService = new SessionService();

export default sessionService;
