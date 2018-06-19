import React from 'react';
import ReactDOM from 'react-dom';

import Page from './components/page';
import registerServiceWorker from './registerServiceWorker';

let template = <Page/>;

ReactDOM.render(template, document.getElementById('root'));

registerServiceWorker();