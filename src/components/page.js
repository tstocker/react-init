import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'

import LanguageService from "../services/LanguageService";

import Home from "../templates/home";
import Page404 from "../templates/404";
import Login from "../templates/login";

import Header from '../components/organismes/header.js';
import Footer from '../components/organismes/footer.js';

class Page extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }

    render() {
        let content;
        content = <div className="app">
            <Header/>
                <div className="app-body">
                    <main className="main">
                        <Route exact path={'/' + LanguageService.lang + '/'} component={Home} />
                        <Route exact path={'/' + LanguageService.lang + '/404'} component={Page404} />
                        <Route exact path={'/' + LanguageService.lang + '/login'} component={Login} />
                    </main>
                </div>
            <Footer />
        </div>;

        return (<Router>{content}</Router>);
    }
}

export default Page;
