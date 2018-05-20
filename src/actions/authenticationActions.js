import {LOGIN_SUCCESS, LOGOUT} from "./authenticationConstants";
import authenticationApi from "../api/authenticationApi";

export function loginSuccess(token, firstName, admin, userId) {
    return {
        type: LOGIN_SUCCESS, token,  firstName, admin, userId
    }
}

export function logOut() {
    return {
        type: LOGOUT
    }
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