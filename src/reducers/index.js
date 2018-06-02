import {combineReducers} from 'redux'
import shops from './shopReducer'
import firebase from './firebase'
import manager from './manager'
import local from './localStuff'
import {persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import authentication from "./authentication";

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({local, authentication}));

const rootReducer = combineReducers({
    shops,
    saved: persistedReducer,
    manager,
    firebase
});

export default rootReducer;