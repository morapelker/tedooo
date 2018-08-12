import {
    AUTO_COMPLETE_LOADED,
    LOAD_CATEGORY_SUCCESS,
    LOAD_MARKETS_SUCCESS, START_AUTO_COMPLETE
} from "../actions/managerConstants";

export default (state = {loadedMarkets: false, loadedCategories: false,
    suggestions: {requestId: 0, items: []}}, action) => {
    switch (action.type) {
        case AUTO_COMPLETE_LOADED:
            if (state.suggestions.requestId !== action.requestId)
                return state;
            return Object.assign({}, state, {suggestions: {requestId: state.suggestions.requestId,
                    items: action.items.map(item => item)}});
        case START_AUTO_COMPLETE:
            return Object.assign({}, state,
                {suggestions: {requestId: state.suggestions.requestId + 1, items: state.suggestions.items}});
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