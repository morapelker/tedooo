import {
    LOAD_CATEGORY_SUCCESS,
    LOAD_MARKETS_SUCCESS, PENDING_LOADED
} from "../actions/managerConstants";

export default (state = {pendingMoneyRequest: -1, loadedMarkets: false, loadedCategories: false,
    suggestions: {requestId: 0, items: []}}, action) => {
    switch (action.type) {
        case PENDING_LOADED:
            return Object.assign({}, state, {pendingMoneyRequest: action.count});
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