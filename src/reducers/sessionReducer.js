import {LOAD_CATEGORY_SUCCESS, LOAD_MARKETS_SUCCESS} from "../actions/managerConstants";

export default (state = {loadedMarkets: false, loadedCategories: false}, action) => {
    switch (action.type) {
        case LOAD_MARKETS_SUCCESS:
            if (state.loadedMarkets)
                return state;
            return Object.assign({}, state, {loadedMarkets: true});
        case LOAD_CATEGORY_SUCCESS:
            if (state.loadedCategories || action.categories.length === 0)
                return state;
            return Object.assign({}, state, {loadedCategories: true});
        default:
            return state;
    }
}