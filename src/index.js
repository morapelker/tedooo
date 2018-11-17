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
import { faStar, faStarHalfAlt, faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons'

library.add(faStar, faStarHalfAlt, emptyStar, faChevronDown, faChevronUp);
const {store, persistor} = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>, document.getElementById('root')
);
registerServiceWorker();
