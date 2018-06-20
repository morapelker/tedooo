import {combineReducers} from 'redux'
import shops from './shopReducer'
import firebase from './firebase'
import manager from './manager'
import local from './localStuff'
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authentication from "./authentication";
import transactions from "./transactionReducer";
import session from "./sessionReducer";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({local, authentication, manager}));

const rootReducer = combineReducers({
    shops,
    saved: persistedReducer,
    firebase,
    transactions,
    session
});

export default rootReducer;