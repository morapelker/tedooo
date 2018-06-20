import {
    LOAD_CATEGORY_SUCCESS,
    LOAD_MARKETS_SUCCESS,
    LOAD_STORE_SUCCESS
} from "../actions/managerConstants";

export default (state = {markets: [], items: undefined, categories: []}, action) => {
    switch (action.type) {
        case LOAD_STORE_SUCCESS:
            return Object.assign({}, state, {items: action.items});
        case LOAD_MARKETS_SUCCESS:
            if (action.markets.length === 0)
                return state;
            return Object.assign({}, state, {markets: action.markets});
        case LOAD_CATEGORY_SUCCESS:
            if (action.categories.length === 0)
                return state;
            return Object.assign({}, state, {categories: action.categories});
        default:
            return state;
    }
}