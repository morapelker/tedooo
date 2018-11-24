import {CHANGE_AVATAR, LOGIN_SUCCESS, LOGOUT, REGISTER_SUCCESS} from "./authenticationConstants";
import authenticationApi from "../api/authenticationApi";
import managerApi from "../api/managerApi";
import {moneyPendingLoaded} from "./manager";

export function loginSuccess(token, firstName, admin, userId, avatar) {
    return {
        type: LOGIN_SUCCESS, token, firstName, admin, userId, avatar
    }
}

export function changeAvatar(avatar) {
    return {
        type: CHANGE_AVATAR, avatar
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
    return function (dispatch) {
        return authenticationApi.register(user).then(() => {
            dispatch(registerSuccess());
        }).catch(err => {
            throw err;
        });
    };
}

export function login(username, password) {
    return function (dispatch) {
        return authenticationApi.login(username, password).then(props => {
            dispatch(loginSuccess(props.token, props.firstName, props.admin, props.userId, props.avatar));
            managerApi.fetchPendingMoneyCount(props.token).then(count => {
                dispatch(moneyPendingLoaded(count));
            }).catch(err => {
                throw err;
            });

        }).catch(err => {
            throw err;
        });
    };
}