import React, { Component } from 'react';

class Form extends Component {

  constructor(props){
    super(props);
    this.state = {
      propsButtons: props.buttons,
    };

    this.handleChange = this.handleChange.bind(this);
    this.fields = this.renderFields(props.fields);
  }

  handleChange(event) {
    let state = {};
    state[event.target.id] = event.target.value;
    this.setState(state);
  }

  button(button) {
    return <button onClick={button.onClick.bind(this)}>{button.label}</button>;
  }

  inputText(field) {
    return <div>
      <label>{field.label}</label>
      <input type="text"
             id={field.id}
             name={field.name}
             value={this.state[field.id]}
             onChange={this.handleChange}
      />
    </div>;
  }

  inputPassword(field) {
    return <div>
      <label>{field.label}</label>
      <input type="password"
             id={field.id}
             name={field.name}
             value={this.state[field.id]}
             onChange={this.handleChange}
      />
    </div>;
  }

  renderFields(propsFields){
    let fields = [];
    for(let index in propsFields) {
      let field = propsFields[index];
      switch (field.type) {
        case "text":
          fields.push(this.inputText(field));
          break;
        case "password":
          fields.push(this.inputPassword(field));
          break;
        default:
          break;
      }
    }
    return fields;
  }

  /**
   * Render button division
   *
   * @returns {string || component}
   */
  renderButtons() {
    let buttons = [];

    for(let index in this.state.propsButtons) {
      let button = this.state.propsButtons[index];
      buttons.push(this.button(button));
    }

    if (buttons.length > 0) {
      return <div>{buttons}</div>;
    }

    return "";
  }

  render() {


    return <form onSubmit={(e) => {e.preventDefault(); return false;}}>
      {this.fields}
      {this.renderButtons()}
    </form>;
  }
}

export default Form;
