import {FIND_SHOP_SUCCESS, UPDATE_MY_SHOPS} from "../actions/shopConstants";
import {LOGOUT} from "../actions/authenticationConstants";

export default (state = {results: [], cachedShops: {}, myShops: undefined}, action) => {
    switch (action.type) {
        case FIND_SHOP_SUCCESS: {
            const cachedShops = Object.assign({}, state.cachedShops);
            action.shops.forEach(shop => {
                if (!cachedShops.hasOwnProperty(shop._id))
                    cachedShops[shop._id] = shop;
            });
            return Object.assign({}, state, {results: action.shops, cachedShops});
        }
        case LOGOUT:
            return Object.assign({}, state, {myShops: undefined});
        case UPDATE_MY_SHOPS: {
            const cachedShops = Object.assign({}, state.cachedShops);
            action.shops.forEach(shop => {
                if (!cachedShops.hasOwnProperty(shop._id))
                    cachedShops[shop._id] = shop;
            });
            return Object.assign({}, state, {myShops: action.shops, cachedShops});
        }
        default:
            return state;
    }
}