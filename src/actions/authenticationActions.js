import {LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS} from "./authenticationConstants";
import authenticationApi from "../api/authenticationApi";

export function loginSuccess(token, firstName, admin, userId) {
    return {
        type: LOGIN_SUCCESS, token,  firstName, admin, userId
    }
}

export function registerSuccess(user) {
    return {
        type: REGISTER_SUCCESS, user
    }
}

export function logOut() {
    return {
        type: LOGOUT
    }
}

export function register(user) {
    return function(dispatch) {
        return authenticationApi.register(user).then(() => {
            dispatch(registerSuccess());
        }).catch(err=>{
            throw err;
        });
    };
}

export function login(username, password) {
    return function(dispatch) {
        return authenticationApi.login(username, password).then(props => {
            dispatch(loginSuccess(props.token, props.firstName, props.admin, props.userId));
        }).catch(err=>{
            throw err;
        });
    };
}