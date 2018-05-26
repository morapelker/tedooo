import {LOAD_MARKETS_SUCCESS} from "../actions/managerConstants";

export default (state = {markets: [], cities: []}, action) => {
    switch (action.type) {
        case LOAD_MARKETS_SUCCESS:
            let cities = [];
            action.markets.map(market => {
                if (!cities.includes(market.city))
                    cities.push(market.city);
                return true;
            });
            return {markets: action.markets.map(market => ({
                    label: market.name
                })), cities: cities.map(city => ({
                    label: city
                }))};
        default:
            return state;
    }
}