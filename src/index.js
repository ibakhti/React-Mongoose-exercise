import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import'bootstrap/dist/css/bootstrap.min.css'

import App from './component/App';
import reducers from './reducers';


const store = createStore(reducers,applyMiddleware(logger,thunk));



ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'))