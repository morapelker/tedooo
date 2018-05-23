import {FIND_SHOP_SUCCESS, SHOP_ALTERED, UPDATE_MY_SHOPS} from "../actions/shopConstants";
import {LOGOUT} from "../actions/authenticationConstants";

export default (state = {results: [], cachedShops: {}, myShops: undefined, pendingShops: undefined}, action) => {
    switch (action.type) {
        case SHOP_ALTERED: {
            const {shop} = action;
            const cachedShops = Object.assign({}, state.cachedShops);
            if (cachedShops.hasOwnProperty(shop._id))
                cachedShops[shop._id] = shop;
            return Object.assign({}, state, {cachedShops});
        }
        case FIND_SHOP_SUCCESS: {
            const cachedShops = Object.assign({}, state.cachedShops);
            let pendingShops;
            action.shops.forEach(shop => {
                if (!cachedShops.hasOwnProperty(shop._id))
                    cachedShops[shop._id] = shop;
                if (shop.authorized === '0') {
                    if (!state.pendingShops)
                        pendingShops = [];
                    else
                        pendingShops = Object.assign({}, state.pendingShops);

                    const index = pendingShops.map(shop => shop._id).indexOf(shop._id);
                    if (index === -1)
                        pendingShops.push({_id: shop._id, name: shop.name, shop_number: shop.shop_number});
                } else if (pendingShops) {
                    const index = pendingShops.map(shop => shop._id).indexOf(shop._id);
                    if (index !== -1)
                        pendingShops.splice(index, 1);
                }
            });
            if (pendingShops) {
                return Object.assign({}, state, {results: action.shops, cachedShops, pendingShops});
            }
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