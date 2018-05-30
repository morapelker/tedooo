import {LOAD_MARKETS_SUCCESS} from "../actions/managerConstants";

export default (state = {markets: []}, action) => {
    switch (action.type) {
        case LOAD_MARKETS_SUCCESS:
            return {markets: action.markets};
        default:
            return state;
    }
}