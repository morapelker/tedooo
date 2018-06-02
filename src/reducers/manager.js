import {LOAD_MARKETS_SUCCESS, LOAD_STORE_SUCCESS} from "../actions/managerConstants";

export default (state = {markets: [], items: undefined}, action) => {
    switch (action.type) {
        case LOAD_STORE_SUCCESS:
            return Object.assign({}, state, {items: action.items});
        case LOAD_MARKETS_SUCCESS:
            return {markets: action.markets};
        default:
            return state;
    }
}