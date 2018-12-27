import React, { Component } from 'react';
import Form from '../components/form';
import sessionService from "../services/sessionService";
import { Request } from "../config";

const Translate = require('react-i18nify').Translate;
const { I18n } = require('react-i18nify');

class Login extends Component
{
  constructor(props) {
    super(props);

    this.fields = [
        {
          type: "text",
          name: "login",
          id: "login",
          label: I18n.t("login.form.login"),
          require: true
        },
        {
          type: "password",
          name: "password",
          id: "password",
          label: I18n.t("login.form.password"),
          require: true
        },
      ];

    this.buttons = [
      {
        label: I18n.t("login.form.button.connect"),
        onClick: this.submit
      }
    ]

    this.state = {};
  }

  componentWillMount() {
    this.initState();
  }

  async initState() {
    let me = await Request.get('/api/users/me');
    this.setState({ me: me });
    console.log(this.state);
  }

  // async isConnected() {
  //   let me = await Request.get('/api/users/me');
  //   if (me && me._id)
  //     return true;
  //   return false;
  // }

  async submit(){
    try {
      await sessionService.login(this.state.login, this.state.password);
    } catch(err) {
      console.log(err);
      // TODO errors
    }

    // TODO good play
  }

  logout() {
    console.log('logout');
    sessionService.logout();
    this.setState({ me: {} });
  }

  display(){
    if(this.state.me && this.state.me._id) {
      return <div>
          <div>You are already connected</div>
          <div><button onClick={this.logout.bind(this)} type="button">logout</button></div>
        </div>;
    }
    return <Form fields={this.fields} buttons={this.buttons}/>
  };

  render() {

    return (
      <div className="app-content">
        <h1><Translate value="login.title" /></h1>
        <div>
          {this.display()}
        </div>
      </div>
    );
  }
}

export default Login;
