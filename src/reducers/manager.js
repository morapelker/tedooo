import {
    LOAD_CATEGORY_SUCCESS,
    LOAD_MARKETS_SUCCESS,
    LOAD_STORE_SUCCESS
} from "../actions/managerConstants";

function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

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
            const cat = shuffle(action.categories);
            return Object.assign({}, state, {categories: cat});
        default:
            return state;
    }
}