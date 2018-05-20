import {LOGIN_SUCCESS, LOGOUT} from "../actions/authenticationConstants";

export default (state = {token: '', firstName: '', admin: false, userId: ''}, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {token: action.token, firstName: action.firstName, admin: action.admin, userId: action.userId};
        case LOGOUT:
            return {token: '', firstName: '', admin: false, userId: ''};
        default:
            return state;
    }
}