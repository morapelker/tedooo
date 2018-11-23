import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css';
import App from "./App";
import {PersistGate} from 'redux-persist/integration/react'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
    faStar,
    faStarHalfAlt,
    faChevronDown,
    faChevronUp,
    faSearch,
    faBars,
} from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar, faUser, faHeart } from '@fortawesome/free-regular-svg-icons'

library.add(faStar, faStarHalfAlt, emptyStar, faChevronDown, faChevronUp, faSearch, faBars, faUser, faHeart);
const {store, persistor} = configureStore();

/*
* <FontAwesomeIcon color={'#c6c6c6'}
                                         style={{cursor: 'pointer'}}
                                         icon={'people-carry'}/>*/

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>, document.getElementById('root')
);
registerServiceWorker();
