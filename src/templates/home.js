import React, { Component } from 'react';

const Translate = require('react-i18nify').Translate;

class Home extends Component
{
    render() {

        return (
            <div className="app-content">
                <h1>Hello world !</h1>
                <p><Translate value="app-content"/></p>
            </div>
        );
    }
}

export default Home;
