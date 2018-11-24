import {CHANGE_AVATAR, LOGIN_SUCCESS, LOGOUT} from "../actions/authenticationConstants";

export default (state = {
    token: '',
    firstName: '',
    admin: false,
    userId: '',
    avatar: undefined
}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                token: action.token,
                firstName: action.firstName,
                admin: action.admin,
                userId: action.userId,
                avatar: action.avatar
            };
        case LOGOUT:
            return {token: '', firstName: '', admin: false, userId: '', avatar: undefined};
        case CHANGE_AVATAR:
            return {...state, avatar: action.avatar};
        default:
            return state;
    }
}