import {FIREBASE_INIT} from "../actions/managerConstants";

export default (state = {storageRef: false}, action) => {
    switch (action.type) {
        case FIREBASE_INIT:
            return {storageRef: action.storageRef};
        default:
            return state;
    }
}